import { ref } from 'vue'

// 配置
let TAIHU_KEY = '' // 默认值，将被本地 key.txt 覆盖
const IDENTITY_SAFE_MODE = true // 建议可配置, 兼容或明文模式下需要设置为 false，最终需要设置为 true

// jose 库实例（延迟加载）
let joseLib = null

// 存储当前用户信息（全局变量，供其他模块使用）
if (!window.currentUserInfo) {
  window.currentUserInfo = {
    staffid: null,
    staffname: null,
    fullPayload: null
  }
}

/**
 * 从本地 key.txt 文件加载 TAIHU_KEY
 */
async function loadTahuKeyFromFile() {
  try {
    const response = await fetch('/key.txt')
    if (response.ok) {
      TAIHU_KEY = (await response.text()).trim()
      console.log('✅ 已从 key.txt 加载 TAIHU_KEY')
    } else {
      console.warn('⚠️ key.txt 文件不存在，使用默认值')
    }
  } catch (error) {
    console.warn('⚠️ 无法加载 key.txt 文件，使用默认值:', error.message)
  }
}

/**
 * 加载 jose 加密库
 */
async function loadJoseLibrary() {
  if (joseLib) {
    return joseLib
  }
  
  try {
    console.log('正在加载 jose 加密库...')
    // 使用 ES Module 动态导入
    joseLib = await import('https://cdn.jsdelivr.net/npm/jose@4.14.4/+esm')
    console.log('jose 库加载成功')
    return joseLib
  } catch (error) {
    console.error('jose 库加载失败:', error)
    throw new Error('无法加载加密库，请检查网络连接')
  }
}

/**
 * 将字符串密钥转换为 Uint8Array
 */
function stringToUint8Array(str) {
  const encoder = new TextEncoder()
  return encoder.encode(str)
}

/**
 * 解密授权头信息
 */
async function decodeAuthorizationHeader(taiIdentity, keyBytes) {
  try {
    // 确保 jose 库已加载
    const jose = await loadJoseLibrary()
    
    // 使用 jose 库进行解密
    const { plaintext } = await jose.compactDecrypt(taiIdentity, keyBytes)
    
    // 将 Uint8Array 转换为字符串
    const decoder = new TextDecoder()
    const payloadStr = decoder.decode(plaintext)
    const payload = JSON.parse(payloadStr)

    const exp = new Date(payload.Expiration)
    // 检验 token 是否已经过期，增加3分钟缓冲，避免服务器时间差异
    if (new Date() - 3 * 60 * 1000 > exp) {
      console.warn('Token 已过期，但继续处理（demo模式）')
      // demo 为了正常运行，此处异常注释了，实际环境需要开启验证
      // throw new Error('expired')
    }
    return payload
  } catch (error) {
    console.error('解密 Authorization Header 失败:', error)
    throw error
  }
}

/**
 * 检查签名
 */
async function checkSignature(key, timestampSeconds, signature, extHeaders) {
  if (!timestampSeconds || isNaN(timestampSeconds)) {
    console.warn('⚠️ 时间戳无效')
    return false
  }
  if (!(Math.abs(parseInt(timestampSeconds, 10) * 1000 - Date.now()) <= 180000)) {
    console.warn('⚠️ 时间戳超出允许范围（±3分钟），但继续处理（demo模式）')
    // demo 为了正常运行，此处异常注释了，实际环境需要开启验证
    // return false
  }
  
  try {
    // 使用 Web Crypto API 进行 SHA256 哈希
    const message = timestampSeconds + key + extHeaders.join(',') + timestampSeconds
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    const isValid = signature.toLowerCase() === hashHex.toLowerCase()
    if (isValid) {
      console.log('✅ 签名验证通过')
    } else {
      console.warn('❌ 签名验证未通过')
    }
    return isValid
  } catch (error) {
    console.error('❌ 签名验证过程出错:', error)
    return false
  }
}

/**
 * 获取身份信息
 */
async function getIdentity(headers) {
  try {
    console.log('开始解析员工信息...')
    console.log('请求头:', headers)

    let extHeaders = [headers['x-rio-seq'] || '', '', '', '']
    if (!IDENTITY_SAFE_MODE) {
      extHeaders = [
        headers['x-rio-seq'] || '', 
        headers['staffid'] || '', 
        headers['staffname'] || '', 
        headers['x-ext-data'] || ''
      ]
    }

    // 检查是否有签名信息（如果没有，说明在本地环境）
    const hasSignature = headers.timestamp && headers.signature
    
    if (hasSignature) {
      // 检查签名
      const signatureValid = await checkSignature(
        TAIHU_KEY, 
        headers.timestamp, 
        headers.signature, 
        extHeaders
      )
      
      if (!signatureValid) {
        console.warn('⚠️ 签名验证失败（太湖环境需要有效签名）')
        // throw new Error('check smartgate signature failed')
      }
    } else {
      console.log('ℹ️ 未检测到签名信息，跳过签名验证（本地开发模式）')
    }

    const taiIdentity = headers['x-tai-identity']
    if (taiIdentity) {
      console.log('发现 x-tai-identity，开始解密...')
      const keyBytes = stringToUint8Array(TAIHU_KEY)
      const payload = await decodeAuthorizationHeader(taiIdentity, keyBytes)
      console.log('解密成功！员工信息:', payload)
      console.log('员工ID (StaffId):', payload.StaffId)
      console.log('登录名 (LoginName):', payload.LoginName)
      return { 
        staffid: payload.StaffId, 
        staffname: payload.LoginName,
        fullPayload: payload
      }
    }

    // 如果没有加密的身份信息，使用明文
    console.log('未找到 x-tai-identity，使用明文信息')
    const staffid = parseInt(headers.staffid, 10) || 0
    const staffname = headers.staffname || ''
    console.log('员工ID (staffid):', staffid)
    console.log('员工名 (staffname):', staffname)
    return { 
      staffid: staffid, 
      staffname: staffname 
    }
  } catch (error) {
    console.error('获取员工信息失败:', error)
    throw error
  }
}

/**
 * 获取代理基地址
 */
function getProxyBaseUrl() {
  console.log('🔍 获取代理基地址...')
  console.log('   window.CONFIG 存在:', !!window.CONFIG)
  console.log('   当前协议:', window.location.protocol)
  console.log('   当前域名:', window.location.host)
  
  try {
    if (window.CONFIG && CONFIG.PROXY_SERVER && typeof CONFIG.PROXY_SERVER.getBaseUrl === 'function') {
      const v = CONFIG.PROXY_SERVER.getBaseUrl()
      console.log('   从 CONFIG 获取到 URL:', v)
      if (v) {
        const url = v.replace(/\/+$/, '')
        console.log('✅ 使用配置的代理地址:', url)
        return url
      }
    }
  } catch (e) {
    console.warn('⚠️ 读取 CONFIG.PROXY_SERVER.getBaseUrl 失败:', e)
  }
  
  // 默认策略：HTTPS 同源相对路径，HTTP 场景回退到本地 443
  if (window.location.protocol === 'https:') {
    console.log('✅ 使用 HTTPS 同源相对路径: ""')
    return ''
  }
  
  console.log('✅ 使用默认地址: https://localhost:443')
  return 'https://localhost:443'
}

/**
 * 从后端 API 获取请求头信息
 */
async function fetchHeadersFromBackend() {
  try {
    const baseUrl = getProxyBaseUrl()
    const proxyUrl = `${baseUrl}/api/get-headers`
    console.log('📡 正在从后端获取请求头')
    console.log('   Base URL:', baseUrl)
    console.log('   完整 URL:', proxyUrl)
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // 包含凭证
    })

    console.log('📡 收到响应:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ HTTP 错误响应:', errorText)
      throw new Error(`获取请求头失败: HTTP ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('📡 后端返回的数据:', data)
    
    if (data.success && data.headers) {
      console.log('✅ 成功获取请求头')
      return data.headers
    } else {
      console.error('❌ 后端返回数据格式错误:', data)
      throw new Error('后端返回数据格式错误')
    }
  } catch (error) {
    console.error('❌ 从后端获取请求头失败:', error)
    console.error('错误类型:', error.name)
    console.error('错误信息:', error.message)
    throw error
  }
}

/**
 * 提取员工信息
 */
async function extractStaffInfoFromRequest() {
  try {
    console.log('=== 🔐 开始提取员工信息 ===')
    console.log('📍 步骤 1: 从后端 API 获取请求头')
    
    // 从后端 API 获取请求头
    const headers = await fetchHeadersFromBackend()
    console.log('✅ 步骤 1 完成: 获取到请求头')
    console.log('   请求头内容:', headers)
    
    // 检查是否有有效的请求头
    const hasValidHeaders = headers['x-tai-identity'] || 
                           headers['staffid'] || 
                           headers['timestamp']

    if (!hasValidHeaders) {
      console.log('')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('ℹ️  本地开发模式')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('未检测到太湖环境的员工信息请求头，这在本地开发环境是正常的。')
      console.log('将使用默认的"访客"用户继续运行。')
      console.log('')
      console.log('💡 提示：')
      console.log('   • 在太湖环境中，这些请求头会由网关自动注入')
      console.log('   • 本地开发时会使用默认值（staffname: hello）')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('')
      return null
    }

    console.log('📍 步骤 2: 解析员工身份信息')
    const identity = await getIdentity(headers)
    console.log('✅ 步骤 2 完成: 身份信息解析成功')
    console.log('   员工ID:', identity?.staffid)
    console.log('   员工名:', identity?.staffname)
    
    // 更新全局用户信息
    if (identity && identity.staffid) {
      console.log('📍 步骤 3: 更新全局用户信息')
      window.currentUserInfo = identity
      console.log('✅ 步骤 3 完成: 全局用户信息已更新')
    }
    
    console.log('=== ✅ 员工信息提取完成 ===')
    console.log('')
    
    return identity
  } catch (error) {
    console.log('')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('❌ 提取员工信息时出错')
    console.error('错误信息:', error.message)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('')
    return null
  }
}

/**
 * Vue Composable: 用户认证
 */
export function useAuth() {
  const userInfo = ref(null)
  const loading = ref(false)

  /**
   * 初始化用户认证
   */
  async function initAuth() {
    loading.value = true
    try {
      // 加载密钥
      await loadTahuKeyFromFile()
      
      // 提取员工信息
      const identity = await extractStaffInfoFromRequest()
      
      if (identity && identity.staffid) {
        userInfo.value = {
          staffid: identity.staffid,
          staffname: identity.staffname,
          name: identity.staffname || `用户${identity.staffid}`,
          avatar: `https://api.example.com/avatar/${identity.staffname}.png`,
          fullPayload: identity.fullPayload
        }
        console.log('✅ 用户信息已设置:', userInfo.value)
      } else {
        // 即使未能获取到员工信息，也设置一个默认值以显示用户信息区域
        console.log('⚠️ 未能提取到员工信息，使用默认员工名')
        userInfo.value = {
          staffid: 0,
          staffname: 'hello',
          name: '访客',
          avatar: '',
          fullPayload: null
        }
        console.log('✅ 已设置默认用户信息:', userInfo.value)
      }
    } catch (error) {
      console.error('❌ 用户认证初始化失败:', error)
      // 发生错误时也设置默认值
      userInfo.value = {
        staffid: 0,
        staffname: 'hello',
        name: '访客',
        avatar: '',
        fullPayload: null
      }
    } finally {
      loading.value = false
    }
  }

  return {
    userInfo,
    loading,
    initAuth,
    getProxyBaseUrl,
    extractStaffInfoFromRequest
  }
}

