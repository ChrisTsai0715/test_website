<template>
  <div>
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <a href="/" class="nav-logo">
          <span class="logo-text">NotifyHub</span>
        </a>
        <ul class="nav-menu">
          <li class="contact-dropdown">
            <a href="#" class="nav-link contact-link">联系我们</a>
            <div class="contact-card">
              <div class="contact-title">接入咨询</div>
              <div class="contact-buttons">
                <a href="mailto:support@notifyhub.example.com" class="contact-btn">
                  <span>发送邮件咨询</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 用户信息区域 -->
    <div class="user-info" id="user-info" v-if="userInfo" :style="{ display: 'flex' }">
      <img v-if="userInfo.avatar && userInfo.avatar.trim()" class="user-avatar" :src="userInfo.avatar" alt="用户头像" @error="handleAvatarError">
      <div v-else class="user-avatar-default">{{ (userInfo.name || userInfo.staffname || 'U').charAt(0).toUpperCase() }}</div>
      <span class="user-name">{{ userInfo.name || '加载中...' }}</span>
    </div>

    <!-- API文档主体 -->
    <div class="api-docs">
      <div class="docs-container">
        <!-- 侧边栏导航 -->
        <aside class="docs-sidebar">
          <div class="sidebar-content">
            <!-- 搜索框 -->
            <div class="sidebar-search">
              <el-input
                v-model="searchTerm"
                placeholder="搜索文档..."
                :prefix-icon="Search"
                clearable
                @input="handleSearch"
                @keydown="handleSearchKeydown"
                ref="searchInput"
              >
                <template v-if="searchResults.length > 0" #suffix>
                  <span class="search-info">{{ currentSearchIndex + 1 }}/{{ searchResults.length }}</span>
                </template>
              </el-input>
            </div>
            <nav class="docs-nav">
              <ul>
                <li><a href="#quick-start" class="nav-item" :class="{ active: activeSection === 'quick-start' }" @click="scrollToSection('quick-start')">快速开始</a></li>
                <li><a href="#authentication" class="nav-item" :class="{ active: activeSection === 'authentication' }" @click="scrollToSection('authentication')">身份认证</a></li>
                <li class="nav-group">
                  <span class="nav-group-title collapsible" @click="toggleGroup('api-access')">
                    <span class="nav-group-text">API接入</span>
                    <i class="fas toggle-icon" :class="expandedGroups['api-access'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                  </span>
                  <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['api-access'] }">
                    <li class="nav-group">
                      <span class="nav-group-title collapsible" @click="toggleGroup('reader-api')">
                        <span class="nav-group-text">基础通知API</span>
                        <i class="fas toggle-icon" :class="expandedGroups['reader-api'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                      </span>
                      <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['reader-api'] }">
                        <li><a href="#sms-api" class="nav-item" :class="{ active: activeSection === 'sms-api' }" @click="scrollToSection('sms-api')"><code>/sms/send</code><span class="nav-item-desc">发送短信</span></a></li>
                        <li><a href="#email-api" class="nav-item" :class="{ active: activeSection === 'email-api' }" @click="scrollToSection('email-api')"><code>/email/send</code><span class="nav-item-desc">发送邮件</span></a></li>
                        <li><a href="#push-api" class="nav-item" :class="{ active: activeSection === 'push-api' }" @click="scrollToSection('push-api')"><code>/push/send</code><span class="nav-item-desc">发送Push通知</span></a></li>
                        <li><a href="#voice-api" class="nav-item" :class="{ active: activeSection === 'voice-api' }" @click="scrollToSection('voice-api')"><code>/voice/call</code><span class="nav-item-desc">发送语音通知</span></a></li>
                        <li><a href="#batch-api" class="nav-item" :class="{ active: activeSection === 'batch-api' }" @click="scrollToSection('batch-api')"><code>/batch/send</code><span class="nav-item-desc">批量多渠道发送</span></a></li>
                        <li><a href="#status-api" class="nav-item" :class="{ active: activeSection === 'status-api' }" @click="scrollToSection('status-api')"><code>/message/status</code><span class="nav-item-desc">查询消息状态</span></a></li>
                      </ul>
                    </li>
                    <li class="nav-group">
                      <span class="nav-group-title collapsible" @click="toggleGroup('extractor-api')">
                        <span class="nav-group-text">AI智能通知 <span class="beta-badge">内测中</span></span>
                        <i class="fas toggle-icon" :class="expandedGroups['extractor-api'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                      </span>
                      <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['extractor-api'] }">
                        <li><a href="#smart-notify-api" class="nav-item" :class="{ active: activeSection === 'smart-notify-api' }" @click="scrollToSection('smart-notify-api')"><code>/smart/notify</code><span class="nav-item-desc">AI选择最优渠道通知</span></a></li>
                      </ul>
                    </li>
                    <li class="nav-group">
                      <span class="nav-group-title collapsible" @click="toggleGroup('searcher-api')">
                        <span class="nav-group-text">模板管理</span>
                        <i class="fas toggle-icon" :class="expandedGroups['searcher-api'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                      </span>
                      <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['searcher-api'] }">
                        <li><a href="#template-api" class="nav-item" :class="{ active: activeSection === 'template-api' }" @click="scrollToSection('template-api')"><code>/template/list</code><span class="nav-item-desc">查询消息模板</span></a></li>
                      </ul>
                    </li>
                    <li><a href="#error-handling" class="nav-item" :class="{ active: activeSection === 'error-handling' }" @click="scrollToSection('error-handling')">错误处理</a></li>
                  </ul>
                </li>
                <li class="nav-group">
                  <span class="nav-group-title collapsible" @click="toggleGroup('serverless-docs')">
                    <span class="nav-group-text">Serverless接入</span>
                    <i class="fas toggle-icon" :class="expandedGroups['serverless-docs'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                  </span>
                  <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['serverless-docs'] }">
                    <li><a href="#serverless-content-api" class="nav-item" :class="{ active: activeSection === 'serverless-content-api' }" @click="scrollToSection('serverless-content-api')"><code>sms.send</code><span class="nav-item-desc">发送短信</span></a></li>
                    <li><a href="#serverless-markdown-api" class="nav-item" :class="{ active: activeSection === 'serverless-markdown-api' }" @click="scrollToSection('serverless-markdown-api')"><code>email.send</code><span class="nav-item-desc">发送邮件</span></a></li>
                    <li><a href="#serverless-screenshot-api" class="nav-item" :class="{ active: activeSection === 'serverless-screenshot-api' }" @click="scrollToSection('serverless-screenshot-api')"><code>push.send</code><span class="nav-item-desc">发送Push通知</span></a></li>
                    <li><a href="#serverless-pdf-api" class="nav-item" :class="{ active: activeSection === 'serverless-pdf-api' }" @click="scrollToSection('serverless-pdf-api')"><code>voice.call</code><span class="nav-item-desc">发送语音通知</span></a></li>
                    <li><a href="#serverless-links-api" class="nav-item" :class="{ active: activeSection === 'serverless-links-api' }" @click="scrollToSection('serverless-links-api')"><code>batch.send</code><span class="nav-item-desc">批量多渠道发送</span></a></li>
                  </ul>
                </li>
                <li class="nav-group">
                  <span class="nav-group-title collapsible" @click="toggleGroup('mcp-docs')">
                    <span class="nav-group-text">Webhook &amp; SDK 接入<span class="new-badge">NEW</span></span>
                    <i class="fas toggle-icon" :class="expandedGroups['mcp-docs'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                  </span>
                  <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['mcp-docs'] }">
                    <li class="nav-group">
                      <span class="nav-group-title collapsible" @click="toggleGroup('mcp-reader')">
                        <span class="nav-group-text">Webhook 接入</span>
                        <i class="fas toggle-icon" :class="expandedGroups['mcp-reader'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                      </span>
                      <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['mcp-reader'] }">
                        <li><a href="#mcp-reader-overview" class="nav-item" :class="{ active: activeSection === 'mcp-reader-overview' }" @click="scrollToSection('mcp-reader-overview')">概述</a></li>
                        <li><a href="#mcp-reader-quickstart" class="nav-item" :class="{ active: activeSection === 'mcp-reader-quickstart' }" @click="scrollToSection('mcp-reader-quickstart')">快速配置</a></li>
                        <li><a href="#mcp-reader-cursor" class="nav-item" :class="{ active: activeSection === 'mcp-reader-cursor' }" @click="scrollToSection('mcp-reader-cursor')">签名验证</a></li>
                      </ul>
                    </li>
                    <li class="nav-group">
                      <span class="nav-group-title collapsible" @click="toggleGroup('mcp-browser')">
                        <span class="nav-group-text">SDK 接入</span>
                        <i class="fas toggle-icon" :class="expandedGroups['mcp-browser'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                      </span>
                      <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['mcp-browser'] }">
                        <li><a href="#mcp-browser-overview" class="nav-item" :class="{ active: activeSection === 'mcp-browser-overview' }" @click="scrollToSection('mcp-browser-overview')">概述</a></li>
                        <li><a href="#mcp-browser-quickstart" class="nav-item" :class="{ active: activeSection === 'mcp-browser-quickstart' }" @click="scrollToSection('mcp-browser-quickstart')">安装</a></li>
                        <li><a href="#mcp-browser-cursor" class="nav-item" :class="{ active: activeSection === 'mcp-browser-cursor' }" @click="scrollToSection('mcp-browser-cursor')">使用示例</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="nav-group">
                  <span class="nav-group-title collapsible" @click="toggleGroup('changelog')">
                    <span class="nav-group-text">Changelog</span>
                    <i class="fas toggle-icon" :class="expandedGroups['changelog'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                  </span>
                  <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['changelog'] }">
                    <li><a href="#changelog-2026-03-05" class="nav-item" :class="{ active: activeSection === 'changelog-2026-03-05' }" @click="scrollToSection('changelog-2026-03-05')">2026-03-18</a></li>
                    <li><a href="#changelog-2026-02-05" class="nav-item" :class="{ active: activeSection === 'changelog-2026-02-05' }" @click="scrollToSection('changelog-2026-02-05')">2026-02-10</a></li>
                    <li><a href="#changelog-2026-01-12" class="nav-item" :class="{ active: activeSection === 'changelog-2026-01-12' }" @click="scrollToSection('changelog-2026-01-12')">2026-01-15</a></li>
                    <li><a href="#changelog-2025-11-27" class="nav-item" :class="{ active: activeSection === 'changelog-2025-11-27' }" @click="scrollToSection('changelog-2025-11-27')">2025-12-01</a></li>
                    <li><a href="#changelog-2025-11-17" class="nav-item" :class="{ active: activeSection === 'changelog-2025-11-17' }" @click="scrollToSection('changelog-2025-11-17')">2025-11-01</a></li>
                    <li><a href="#changelog-2025-10-29" class="nav-item" :class="{ active: activeSection === 'changelog-2025-10-29' }" @click="scrollToSection('changelog-2025-10-29')">2025-10-15</a></li>
                    <li><a href="#changelog-2025-10-23" class="nav-item" :class="{ active: activeSection === 'changelog-2025-10-23' }" @click="scrollToSection('changelog-2025-10-23')">2025-09-20</a></li>
                    <li><a href="#changelog-2025-10-10" class="nav-item" :class="{ active: activeSection === 'changelog-2025-10-10' }" @click="scrollToSection('changelog-2025-10-10')">2025-08-01</a></li>
                    <li><a href="#changelog-2025-09-10" class="nav-item" :class="{ active: activeSection === 'changelog-2025-09-10' }" @click="scrollToSection('changelog-2025-09-10')">2025-06-01</a></li>
                  </ul>
                </li>
                <li class="nav-group">
                  <span class="nav-group-title collapsible" @click="toggleGroup('llm-resources')">
                    <span class="nav-group-text">LLM resources</span>
                    <i class="fas toggle-icon" :class="expandedGroups['llm-resources'] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                  </span>
                  <ul class="nav-sublist" :class="{ collapsed: !expandedGroups['llm-resources'] }">
                    <li><a href="llm_instruction/llm_prompt.txt" class="nav-item" target="_blank">llms_prompt.txt</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <!-- 主要内容 -->
        <div class="docs-content">
          <!-- 通用部分 -->
          <CommonSections />

          <!-- API 组件 -->
          <ContentApi
            :activeTab="activeTab"
            :activeParamsTab="activeParamsTab"
            :expandedParams="expandedParams"
            @set-active-tab="setActiveTab"
            @set-active-params-tab="setActiveParamsTab"
            @toggle-param="toggleParam"
          />

          <MarkdownApi
            :activeTab="activeTab"
            :expandedParams="expandedParams"
            @set-active-tab="setActiveTab"
            @toggle-param="toggleParam"
          />

          <ScreenshotApi
            :activeTab="activeTab"
            :expandedParams="expandedParams"
            @set-active-tab="setActiveTab"
            @toggle-param="toggleParam"
          />

          <PdfApi
            :activeTab="activeTab"
            :expandedParams="expandedParams"
            @set-active-tab="setActiveTab"
            @toggle-param="toggleParam"
          />

          <LinksApi
            :activeTab="activeTab"
            :expandedParams="expandedParams"
            @set-active-tab="setActiveTab"
            @toggle-param="toggleParam"
          />

          <SnapshotApi
            :activeTab="activeTab"
            :expandedParams="expandedParams"
            @set-active-tab="setActiveTab"
            @toggle-param="toggleParam"
          />

          <ExtractApi
            :activeParamsTab="activeParamsTab"
            :expandedParams="expandedParams"
            @set-active-params-tab="setActiveParamsTab"
            @toggle-param="toggleParam"
          />

          <SerpApi
            :activeTab="activeTab"
            :expandedParams="expandedParams"
            @set-active-tab="setActiveTab"
            @toggle-param="toggleParam"
          />

          <ErrorHandling />

          <ServerlessApi
            :expandedParams="expandedParams"
            @toggle-param="toggleParam"
          />

          <McpDocs />

          <Changelog />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonSections from '@/components/api-docs/CommonSections.vue'
import ContentApi from '@/components/api-docs/ContentApi.vue'
import MarkdownApi from '@/components/api-docs/MarkdownApi.vue'
import ScreenshotApi from '@/components/api-docs/ScreenshotApi.vue'
import PdfApi from '@/components/api-docs/PdfApi.vue'
import LinksApi from '@/components/api-docs/LinksApi.vue'
import SnapshotApi from '@/components/api-docs/SnapshotApi.vue'
import ExtractApi from '@/components/api-docs/ExtractApi.vue'
import SerpApi from '@/components/api-docs/SerpApi.vue'
import ErrorHandling from '@/components/api-docs/ErrorHandling.vue'
import ServerlessApi from '@/components/api-docs/ServerlessApi.vue'
import McpDocs from '@/components/api-docs/McpDocs.vue'
import Changelog from '@/components/api-docs/Changelog.vue'
import Prism from 'prismjs'
import { useAuth } from '@/composables/useAuth'
import { Search } from '@element-plus/icons-vue'

export default {
    name: 'ApiDocsView',
    components: {
        CommonSections,
        ContentApi,
        MarkdownApi,
        ScreenshotApi,
        PdfApi,
        LinksApi,
        SnapshotApi,
        ExtractApi,
        SerpApi,
        ErrorHandling,
        ServerlessApi,
        McpDocs,
        Changelog
    },
    setup() {
        const { userInfo, initAuth } = useAuth()

        return {
            userInfo,
            initAuth,
            Search
        }
    },
    data() {
        return {
            activeSection: 'quick-start',
            activeTab: 'content-curl',
            activeParamsTab: 'http-params',
            expandedGroups: {
                'api-access': false,
                'reader-api': false,
                'extractor-api': false,
                'searcher-api': false,
                'serverless-docs': false,
                'mcp-docs': false,
                'mcp-reader': false,
                'mcp-browser': false,
                'changelog': false,
                'llm-resources': false
            },
            expandedParams: {},
            searchTerm: '',
            searchResults: [],
            currentSearchIndex: 0,
            originalContent: ''
        }
    },
    async mounted() {
        if (!window.currentUserInfo) {
            window.currentUserInfo = {
                staffid: null,
                staffname: null,
                fullPayload: null
            }
        }

        await this.initAuth()

        this.updateActiveSection()
        window.addEventListener('scroll', this.updateActiveSection)

        const contentArea = document.querySelector('.docs-content')
        if (contentArea) {
            this.originalContent = contentArea.innerHTML
        }

        this.$nextTick(() => {
            Prism.highlightAll()
        })
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.updateActiveSection)
    },
    methods: {
        handleAvatarError(event) {
            const img = event.target
            const name = this.userInfo?.name || this.userInfo?.staffname || 'U'
            const initial = name.charAt(0).toUpperCase()

            img.style.display = 'none'

            const defaultAvatar = document.createElement('div')
            defaultAvatar.className = 'user-avatar-default'
            defaultAvatar.textContent = initial
            defaultAvatar.style.cssText = `
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: #006EFF;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
                border: 2px solid #e5e7eb;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            `

            img.parentNode.insertBefore(defaultAvatar, img)
        },
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId)
            if (element) {
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - 120

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        },
        toggleGroup(groupId) {
            this.expandedGroups[groupId] = !this.expandedGroups[groupId]
        },
        setActiveTab(tab) {
            this.activeTab = tab
        },
        setActiveParamsTab(tab) {
            this.activeParamsTab = tab
        },
        toggleParam(param) {
            this.expandedParams[param] = !this.expandedParams[param]
        },
        updateActiveSection() {
            const sections = document.querySelectorAll('.docs-section')
            let currentSection = 'quick-start'

            sections.forEach(section => {
                const rect = section.getBoundingClientRect()
                if (rect.top <= 120 && rect.bottom > 120) {
                    currentSection = section.id
                }
            })

            this.activeSection = currentSection
        },
        handleSearch() {
            const searchTerm = this.searchTerm.trim()
            if (searchTerm.length > 0) {
                this.performSearch(searchTerm)
            } else {
                this.clearSearch()
            }
        },
        handleSearchKeydown(e) {
            if (e.key === 'Enter') {
                e.preventDefault()
                if (this.searchResults.length > 0) {
                    this.navigateToNext()
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                this.navigateToNext()
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                this.navigateToPrevious()
            }
        },
        performSearch(searchTerm) {
            this.clearSearch()

            const contentArea = document.querySelector('.docs-content')
            if (!contentArea) return

            const searchRegex = new RegExp(`(${this.escapeRegExp(searchTerm)})`, 'gi')

            const walker = document.createTreeWalker(
                contentArea,
                NodeFilter.SHOW_TEXT,
                null,
                false
            )

            const textNodes = []
            let node
            while (node = walker.nextNode()) {
                if (node.nodeValue.trim() && node.parentElement.tagName !== 'SCRIPT') {
                    textNodes.push(node)
                }
            }

            this.searchResults = []
            textNodes.forEach((textNode) => {
                const text = textNode.nodeValue
                if (searchRegex.test(text)) {
                    const highlightedText = text.replace(searchRegex,
                        `<mark class="search-highlight" data-search-index="${this.searchResults.length}">$1</mark>`)

                    const tempDiv = document.createElement('div')
                    tempDiv.innerHTML = highlightedText

                    const parent = textNode.parentNode
                    while (tempDiv.firstChild) {
                        const child = tempDiv.firstChild
                        if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('search-highlight')) {
                            this.searchResults.push(child)
                        }
                        parent.insertBefore(child, textNode)
                    }
                    parent.removeChild(textNode)
                }
            })

            if (this.searchResults.length > 0) {
                this.currentSearchIndex = 0
                this.highlightCurrentResult()
                this.scrollToCurrentResult()
            }
        },
        clearSearch() {
            const highlights = document.querySelectorAll('.search-highlight')
            highlights.forEach(highlight => {
                const parent = highlight.parentNode
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight)
                parent.normalize()
            })

            this.searchResults = []
            this.currentSearchIndex = 0
        },
        navigateToNext() {
            if (this.searchResults.length === 0) return

            this.currentSearchIndex = (this.currentSearchIndex + 1) % this.searchResults.length
            this.highlightCurrentResult()
            this.scrollToCurrentResult()
        },
        navigateToPrevious() {
            if (this.searchResults.length === 0) return

            this.currentSearchIndex = this.currentSearchIndex === 0 ? this.searchResults.length - 1 : this.currentSearchIndex - 1
            this.highlightCurrentResult()
            this.scrollToCurrentResult()
        },
        highlightCurrentResult() {
            document.querySelectorAll('.search-highlight.current').forEach(el => {
                el.classList.remove('current')
            })

            if (this.searchResults[this.currentSearchIndex]) {
                this.searchResults[this.currentSearchIndex].classList.add('current')
            }
        },
        scrollToCurrentResult() {
            if (this.searchResults[this.currentSearchIndex]) {
                this.searchResults[this.currentSearchIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }
        },
        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        }
    }
}
</script>

<style scoped>
@import '@/assets/css/style.css';
@import '@/assets/css/api-docs.css';

.user-avatar-default {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #006EFF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid #e5e7eb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.user-avatar-default:hover {
    border-color: #667eea;
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
    transform: scale(1.05);
}
</style>
