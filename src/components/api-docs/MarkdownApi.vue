<template>
  <section id="email-api" class="docs-section">
    <h2>2. email/send - 发送邮件</h2>
    <p>向指定邮箱地址发送邮件通知，支持 HTML 富文本和纯文本格式。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">POST</span>
        <span class="path">/v1/email/send</span>
      </div>
      <p class="endpoint-desc">发送邮件通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="code-tabs">
          <button class="tab-button" :class="{ active: activeTab === 'markdown-curl' }" @click="setActiveTab('markdown-curl')">CURL</button>
          <button class="tab-button" :class="{ active: activeTab === 'markdown-python' }" @click="setActiveTab('markdown-python')">Python</button>
          <button class="tab-button" :class="{ active: activeTab === 'markdown-golang' }" @click="setActiveTab('markdown-golang')">Go</button>
          <button class="tab-button" :class="{ active: activeTab === 'markdown-js' }" @click="setActiveTab('markdown-js')">JavaScript</button>
        </div>
        <div class="code-content">
          <div class="tab-pane" :class="{ active: activeTab === 'markdown-curl' }" v-show="activeTab === 'markdown-curl'">
            <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/email/send \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "您的订单已发货",
    "html": "&lt;h1&gt;您好&lt;/h1&gt;&lt;p&gt;您的订单 &lt;b&gt;#ORDER123&lt;/b&gt; 已于今日发货，请注意查收。&lt;/p&gt;",
    "from_name": "NotifyHub 通知"
  }'</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'markdown-python' }" v-show="activeTab === 'markdown-python'">
            <pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/email/send"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "to": "user@example.com",
    "subject": "您的订单已发货",
    "html": "&lt;h1&gt;您好&lt;/h1&gt;&lt;p&gt;您的订单 &lt;b&gt;#ORDER123&lt;/b&gt; 已于今日发货，请注意查收。&lt;/p&gt;",
    "from_name": "NotifyHub 通知"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'markdown-golang' }" v-show="activeTab === 'markdown-golang'">
            <pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/email/send"

    payload := map[string]interface{}{
        "to":        "user@example.com",
        "subject":   "您的订单已发货",
        "html":      "&lt;h1&gt;您好&lt;/h1&gt;&lt;p&gt;您的订单已发货&lt;/p&gt;",
        "from_name": "NotifyHub 通知",
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
          <div class="tab-pane" :class="{ active: activeTab === 'markdown-js' }" v-show="activeTab === 'markdown-js'">
            <pre><code class="language-javascript">const response = await fetch('https://api.notifyhub.example.com/v1/email/send', {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: '您的订单已发货',
    html: '&lt;h1&gt;您好&lt;/h1&gt;&lt;p&gt;您的订单已发货&lt;/p&gt;',
    from_name: 'NotifyHub 通知'
  })
});

const data = await response.json();
console.log(data);</code></pre>
          </div>
        </div>

        <h4>响应示例</h4>
        <pre><code class="language-json">{
  "success": true,
  "result": {
    "message_id": "email_xyz789",  // string - 邮件唯一ID
    "status": "queued",            // string - 发送状态
    "to": "user@example.com"       // string - 接收方邮箱
  },
  "errors": []
}</code></pre>
      </div>

      <h4>支持参数</h4>
      <div class="params-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
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
              <td>收件人邮箱地址，支持批量发送，最多 100 个</td>
            </tr>
            <tr>
              <td><code>subject</code></td>
              <td>string</td>
              <td>是</td>
              <td></td>
              <td>邮件主题</td>
            </tr>
            <tr>
              <td><code>html</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>HTML 格式邮件正文，与 text 至少填写一个</td>
            </tr>
            <tr>
              <td><code>text</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>纯文本格式邮件正文，与 html 至少填写一个</td>
            </tr>
            <tr>
              <td><code>from_name</code></td>
              <td>string</td>
              <td>否</td>
              <td>默认值 "NotifyHub"</td>
              <td>发件人显示名称</td>
            </tr>
            <tr>
              <td><code>reply_to</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>回复邮箱地址</td>
            </tr>
            <tr>
              <td><code>cc</code></td>
              <td>Array&lt;string&gt;</td>
              <td>否</td>
              <td>默认值 []</td>
              <td>抄送邮箱列表</td>
            </tr>
            <tr>
              <td><code>bcc</code></td>
              <td>Array&lt;string&gt;</td>
              <td>否</td>
              <td>默认值 []</td>
              <td>密送邮箱列表</td>
            </tr>
            <tr>
              <td><code>callback_url</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>状态回调地址</td>
            </tr>
            <tr>
              <td colspan="5" style="padding: 10px; background-color: #f8f9fa; font-style: italic; text-align: center;">
                其他通用参数参考 /sms/send 接口（包括 extra、channel）
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MarkdownApi',
  props: {
    activeTab: {
      type: String,
      default: 'markdown-curl'
    },
    expandedParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['set-active-tab', 'toggle-param'],
  methods: {
    setActiveTab(tab) {
      this.$emit('set-active-tab', tab);
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
