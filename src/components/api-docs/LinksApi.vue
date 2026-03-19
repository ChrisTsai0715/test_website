<template>
  <section id="batch-api" class="docs-section">
    <h2>5. batch/send - 批量多渠道发送</h2>
    <p>在一次请求中同时向多个渠道（短信、邮件、Push）发送通知，支持按优先级自动降级。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">POST</span>
        <span class="path">/v1/batch/send</span>
      </div>
      <p class="endpoint-desc">批量多渠道消息发送</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="code-tabs">
          <button
            class="tab-button"
            :class="{ active: activeTab === 'links-curl' }"
            @click="setActiveTab('links-curl')"
          >
            CURL
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'links-python' }"
            @click="setActiveTab('links-python')"
          >
            Python
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'links-golang' }"
            @click="setActiveTab('links-golang')"
          >
            Go
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'links-js' }"
            @click="setActiveTab('links-js')"
          >
            JavaScript
          </button>
        </div>
        <div class="code-content">
          <div class="tab-pane" :class="{ active: activeTab === 'links-curl' }">
<pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/batch/send \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "channels": ["sms", "push"],
    "fallback": true,
    "sms": {
      "to": "+8613800138000",
      "content": "您的账户发生异常登录，请立即处理。"
    },
    "push": {
      "to": "user_id_12345",
      "title": "安全警告",
      "body": "您的账户发生异常登录，请立即处理。"
    }
  }'</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'links-python' }">
<pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/batch/send"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "channels": ["sms", "push"],
    "fallback": True,
    "sms": {
        "to": "+8613800138000",
        "content": "您的账户发生异常登录，请立即处理。"
    },
    "push": {
        "to": "user_id_12345",
        "title": "安全警告",
        "body": "您的账户发生异常登录，请立即处理。"
    }
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'links-golang' }">
<pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/batch/send"

    payload := map[string]interface{}{
        "channels": []string{"sms", "push"},
        "fallback": true,
        "sms": map[string]interface{}{
            "to":      "+8613800138000",
            "content": "您的账户发生异常登录，请立即处理。",
        },
        "push": map[string]interface{}{
            "to":    "user_id_12345",
            "title": "安全警告",
            "body":  "您的账户发生异常登录，请立即处理。",
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
          <div class="tab-pane" :class="{ active: activeTab === 'links-js' }">
<pre><code class="language-javascript">const response = await fetch('https://api.notifyhub.example.com/v1/batch/send', {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channels: ['sms', 'push'],
    fallback: true,
    sms: {
      to: '+8613800138000',
      content: '您的账户发生异常登录，请立即处理。'
    },
    push: {
      to: 'user_id_12345',
      title: '安全警告',
      body: '您的账户发生异常登录，请立即处理。'
    }
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
    "batch_id": "batch_jkl345",  // string - 批次唯一ID
    "channel_results": [         // array - 各渠道发送结果
      {
        "channel": "push",
        "message_id": "push_def456",
        "status": "queued"
      },
      {
        "channel": "sms",
        "message_id": "msg_abc123",
        "status": "skipped",     // 已由 push 送达，sms 作为降级未触发
        "skip_reason": "higher_priority_channel_succeeded"
      }
    ]
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
              <td><code>channels</code></td>
              <td>Array&lt;string&gt;</td>
              <td>是</td>
              <td></td>
              <td>要发送的渠道列表，按优先级排序，可选值："sms"、"email"、"push"、"voice"</td>
            </tr>
            <tr>
              <td><code>fallback</code></td>
              <td>bool</td>
              <td>否</td>
              <td>默认值 false</td>
              <td>是否启用降级：true 时若高优先级渠道送达成功则跳过低优先级渠道</td>
            </tr>
            <tr>
              <td><code>sms</code></td>
              <td>Object</td>
              <td>否</td>
              <td></td>
              <td>短信发送参数，结构同 /v1/sms/send（channels 包含 "sms" 时必填）</td>
            </tr>
            <tr>
              <td><code>email</code></td>
              <td>Object</td>
              <td>否</td>
              <td></td>
              <td>邮件发送参数，结构同 /v1/email/send（channels 包含 "email" 时必填）</td>
            </tr>
            <tr>
              <td><code>push</code></td>
              <td>Object</td>
              <td>否</td>
              <td></td>
              <td>Push 发送参数，结构同 /v1/push/send（channels 包含 "push" 时必填）</td>
            </tr>
            <tr>
              <td><code>voice</code></td>
              <td>Object</td>
              <td>否</td>
              <td></td>
              <td>语音发送参数，结构同 /v1/voice/call（channels 包含 "voice" 时必填）</td>
            </tr>
            <tr>
              <td colspan="5" style="padding: 10px; background-color: #f8f9fa; font-style: italic; text-align: center;">
                其他通用参数参考 /sms/send 接口（包括 callback_url、extra）
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
  name: 'LinksApi',
  data() {
    return {
      activeTab: 'links-curl'
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/api-docs.css';
</style>
