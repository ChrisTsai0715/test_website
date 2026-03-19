<template>
  <section id="template-api" class="docs-section">
    <h2>8. template - 消息模板管理</h2>
    <p>创建、查询和管理消息模板，统一维护各渠道的通知内容。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">POST</span>
        <span class="path">/v1/template/list</span>
      </div>
      <p class="endpoint-desc">获取消息模板列表</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="code-tabs">
          <button
            class="tab-button"
            :class="{ active: activeTab === 'serp-curl' }"
            @click="setActiveTab('serp-curl')"
          >
            CURL
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'serp-python' }"
            @click="setActiveTab('serp-python')"
          >
            Python
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'serp-golang' }"
            @click="setActiveTab('serp-golang')"
          >
            Go
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'serp-js' }"
            @click="setActiveTab('serp-js')"
          >
            JavaScript
          </button>
        </div>
        <div class="code-content">
          <div class="tab-pane" :class="{ active: activeTab === 'serp-curl' }">
<pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/template/list \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "sms",
    "page": 1,
    "page_size": 20
  }'</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'serp-python' }">
<pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/template/list"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "channel": "sms",
    "page": 1,
    "page_size": 20
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'serp-golang' }">
<pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/template/list"

    payload := map[string]interface{}{
        "channel":   "sms",
        "page":      1,
        "page_size": 20,
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
          <div class="tab-pane" :class="{ active: activeTab === 'serp-js' }">
<pre><code class="language-javascript">const response = await fetch('https://api.notifyhub.example.com/v1/template/list', {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channel: 'sms',
    page: 1,
    page_size: 20
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
    "total": 2,
    "page": 1,
    "page_size": 20,
    "items": [
      {
        "template_id": "tpl_verify_code",
        "channel": "sms",
        "name": "验证码模板",
        "content": "您的验证码是：${code}，${expire}分钟内有效。请勿泄露给他人。",
        "params": ["code", "expire"],
        "status": "approved",
        "created_at": "2026-01-01T00:00:00Z"
      },
      {
        "template_id": "tpl_order_shipped",
        "channel": "sms",
        "name": "订单发货通知",
        "content": "您的订单${order_id}已发货，快递单号${tracking_no}，预计${eta}到达。",
        "params": ["order_id", "tracking_no", "eta"],
        "status": "approved",
        "created_at": "2026-01-05T00:00:00Z"
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
              <td><code>channel</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>按渠道筛选，可选值："sms"、"email"、"push"、"voice"。不填则返回全部</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>按状态筛选，可选值："pending"（审核中）、"approved"（已通过）、"rejected"（已拒绝）</td>
            </tr>
            <tr>
              <td><code>keyword</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>按模板名称或ID关键词搜索</td>
            </tr>
            <tr>
              <td><code>page</code></td>
              <td>int</td>
              <td>否</td>
              <td>默认值 1</td>
              <td>页码，从 1 开始</td>
            </tr>
            <tr>
              <td><code>page_size</code></td>
              <td>int</td>
              <td>否</td>
              <td>默认值 20</td>
              <td>每页数量，最大值 100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SerpApi',
  data() {
    return {
      activeTab: 'serp-curl'
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.$emit('tab-changed', tab);
    }
  }
}
</script>
