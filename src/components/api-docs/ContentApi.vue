<template>
  <section id="sms-api" class="docs-section">
    <h2>1. sms/send - 发送短信</h2>
    <p>向指定手机号发送短信通知，支持单发和批量发送。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">POST</span>
        <span class="path">/v1/sms/send</span>
      </div>
      <p class="endpoint-desc">发送短信通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="code-tabs">
          <button class="tab-button" :class="{ active: activeTab === 'content-curl' }" @click="setActiveTab('content-curl')">CURL</button>
          <button class="tab-button" :class="{ active: activeTab === 'content-python' }" @click="setActiveTab('content-python')">Python</button>
          <button class="tab-button" :class="{ active: activeTab === 'content-golang' }" @click="setActiveTab('content-golang')">Go</button>
          <button class="tab-button" :class="{ active: activeTab === 'content-js' }" @click="setActiveTab('content-js')">JavaScript</button>
        </div>
        <div class="code-content">
          <div class="tab-pane" :class="{ active: activeTab === 'content-curl' }" v-show="activeTab === 'content-curl'">
            <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/sms/send \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+8613800138000",
    "template_id": "tpl_verify_code",
    "template_params": {
      "code": "123456",
      "expire": "5"
    }
  }'</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'content-python' }" v-show="activeTab === 'content-python'">
            <pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/sms/send"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "to": "+8613800138000",
    "template_id": "tpl_verify_code",
    "template_params": {
        "code": "123456",
        "expire": "5"
    }
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'content-golang' }" v-show="activeTab === 'content-golang'">
            <pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/sms/send"

    payload := map[string]interface{}{
        "to":          "+8613800138000",
        "template_id": "tpl_verify_code",
        "template_params": map[string]string{
            "code":   "123456",
            "expire": "5",
        },
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("api-token", "YOUR_API_TOKEN")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'content-js' }" v-show="activeTab === 'content-js'">
            <pre><code class="language-javascript">const response = await fetch('https://api.notifyhub.example.com/v1/sms/send', {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+8613800138000',
    template_id: 'tpl_verify_code',
    template_params: {
      code: '123456',
      expire: '5'
    }
  })
});

const data = await response.json();
console.log(data);</code></pre>
          </div>
        </div>

        <h4>响应示例</h4>
        <pre><code class="language-json">{
  "success": true,           // bool - 请求是否成功
  "result": {
    "message_id": "msg_abc123456",  // string - 消息唯一ID
    "status": "queued",             // string - 消息状态：queued/sent/delivered/failed
    "to": "+8613800138000"          // string - 接收方手机号
  },
  "errors": []               // array - 错误信息列表
}</code></pre>
      </div>

      <h4>支持参数</h4>
      <div class="params-tabs">
        <button class="tab-button" :class="{ active: activeParamsTab === 'http-params' }" @click="setActiveParamsTab('http-params')">HTTP</button>
      </div>
      <div class="params-table params-tab-pane" :class="{ active: activeParamsTab === 'http-params' }" v-show="activeParamsTab === 'http-params'">
        <table>
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>是否必填</th>
              <th>备注</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>to</code></td>
              <td>string 或 Array&lt;string&gt;</td>
              <td>是</td>
              <td></td>
              <td>接收方手机号，支持国际格式如 +8613800138000，批量发送时传入数组，最多 1000 个</td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>短信内容，与 template_id 二选一。直接发送文本内容时使用</td>
            </tr>
            <tr>
              <td><code>template_id</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>短信模板ID，与 content 二选一。使用预定义模板时填写</td>
            </tr>
            <tr class="expandable-row" :class="{ expanded: expandedParams['template_params'] }" @click="toggleParam('template_params')">
              <td>
                <code class="expandable-param">
                  <i class="fas fa-chevron-right expand-icon" :class="{ expanded: expandedParams['template_params'] }"></i>
                  template_params
                </code>
              </td>
              <td>Record&lt;string, string&gt;</td>
              <td>否</td>
              <td>默认值 {}</td>
              <td>模板变量，当使用 template_id 时传入对应的模板参数</td>
            </tr>
            <tr class="expand-content" v-show="expandedParams['template_params']">
              <td colspan="5">
                <div class="nested-params">
                  <h5>template_params 示例</h5>
                  <table class="nested-table">
                    <thead>
                      <tr>
                        <th>参数</th>
                        <th>类型</th>
                        <th>是否必填</th>
                        <th>说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>code</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td>验证码（验证码类模板使用）</td>
                      </tr>
                      <tr>
                        <td><code>expire</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td>有效期分钟数（验证码类模板使用）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td><code>channel</code></td>
              <td>string</td>
              <td>否</td>
              <td>默认值 "default"</td>
              <td>指定短信通道，可选值："default"（自动选择）、"marketing"（营销）、"transactional"（事务型）</td>
            </tr>
            <tr>
              <td><code>callback_url</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>状态回调地址，消息状态变更时主动推送到该地址</td>
            </tr>
            <tr>
              <td><code>extra</code></td>
              <td>Record&lt;string, string&gt;</td>
              <td>否</td>
              <td>默认值 {}</td>
              <td>自定义扩展字段，会原样透传到回调通知中</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContentApi',
  props: {
    activeTab: {
      type: String,
      default: 'content-curl'
    },
    activeParamsTab: {
      type: String,
      default: 'http-params'
    },
    expandedParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['set-active-tab', 'set-active-params-tab', 'toggle-param'],
  methods: {
    setActiveTab(tab) {
      this.$emit('set-active-tab', tab);
    },
    setActiveParamsTab(tab) {
      this.$emit('set-active-params-tab', tab);
    },
    toggleParam(param) {
      this.$emit('toggle-param', param);
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/api-docs.css';
</style>
