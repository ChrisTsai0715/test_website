<template>
  <section id="status-api" class="docs-section">
    <h2>6. message/status - 查询消息状态</h2>
    <p>根据消息ID查询消息的发送状态，支持查询短信、邮件、Push及语音的发送详情。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">POST</span>
        <span class="path">/v1/message/status</span>
      </div>
      <p class="endpoint-desc">查询消息发送状态</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="code-tabs">
          <button
            class="tab-button"
            :class="{ active: activeTab === 'snapshot-curl' }"
            @click="setActiveTab('snapshot-curl')"
          >
            CURL
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'snapshot-python' }"
            @click="setActiveTab('snapshot-python')"
          >
            Python
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'snapshot-golang' }"
            @click="setActiveTab('snapshot-golang')"
          >
            Go
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'snapshot-js' }"
            @click="setActiveTab('snapshot-js')"
          >
            JavaScript
          </button>
        </div>
        <div class="code-content">
          <div class="tab-pane" :class="{ active: activeTab === 'snapshot-curl' }">
<pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/message/status \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message_id": "msg_abc123456",
    "channel": "sms"
  }'</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'snapshot-python' }">
<pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/message/status"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "message_id": "msg_abc123456",
    "channel": "sms"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'snapshot-golang' }">
<pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/message/status"

    payload := map[string]interface{}{
        "message_id": "msg_abc123456",
        "channel":    "sms",
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
          <div class="tab-pane" :class="{ active: activeTab === 'snapshot-js' }">
<pre><code class="language-javascript">const response = await fetch('https://api.notifyhub.example.com/v1/message/status', {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message_id: 'msg_abc123456',
    channel: 'sms'
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
    "message_id": "msg_abc123456",  // string - 消息唯一ID
    "channel": "sms",               // string - 消息渠道
    "status": "delivered",          // string - 当前状态
    "to": "+8613800138000",         // string - 接收方
    "created_at": "2026-03-18T10:00:00Z",   // string - 创建时间
    "delivered_at": "2026-03-18T10:00:03Z"  // string - 送达时间
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
              <td><code>message_id</code></td>
              <td>string</td>
              <td>是</td>
              <td></td>
              <td>消息唯一ID，由发送接口返回</td>
            </tr>
            <tr>
              <td><code>channel</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>消息渠道，可选值："sms"、"email"、"push"、"voice"。不填则自动识别</td>
            </tr>
            <tr>
              <td colspan="5" style="padding: 10px; background-color: #f8f9fa; font-style: italic; text-align: center;">
                消息状态说明：queued（排队中）、sent（已发送）、delivered（已送达）、failed（发送失败）、skipped（已跳过）
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
  name: 'SnapshotApi',
  data() {
    return {
      activeTab: 'snapshot-curl',
      expandedParams: {
        screenshot_options: false,
        clip: false
      }
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    toggleExpand(param) {
      this.expandedParams[param] = !this.expandedParams[param];
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/api-docs.css';
</style>
