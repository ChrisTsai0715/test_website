<template>
  <section id="push-api" class="docs-section">
    <h2>3. push/send - 发送Push通知</h2>
    <p>向指定设备或用户发送 App Push 推送通知，支持 iOS、Android 及鸿蒙平台。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">POST</span>
        <span class="path">/v1/push/send</span>
      </div>
      <p class="endpoint-desc">发送App Push推送通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="code-tabs">
          <button class="tab-button" :class="{ active: activeTab === 'screenshot-curl' }" @click="setActiveTab('screenshot-curl')">CURL</button>
          <button class="tab-button" :class="{ active: activeTab === 'screenshot-python' }" @click="setActiveTab('screenshot-python')">Python</button>
          <button class="tab-button" :class="{ active: activeTab === 'screenshot-golang' }" @click="setActiveTab('screenshot-golang')">Go</button>
          <button class="tab-button" :class="{ active: activeTab === 'screenshot-js' }" @click="setActiveTab('screenshot-js')">JavaScript</button>
        </div>
        <div class="code-content">
          <div class="tab-pane" :class="{ active: activeTab === 'screenshot-curl' }" v-show="activeTab === 'screenshot-curl'">
            <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/push/send \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user_id_12345",
    "title": "您有一条新消息",
    "body": "张三 向您发来了一条消息，点击查看。",
    "platform": "all",
    "data": {
      "action": "open_chat",
      "chat_id": "chat_001"
    }
  }'</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'screenshot-python' }" v-show="activeTab === 'screenshot-python'">
            <pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/push/send"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "to": "user_id_12345",
    "title": "您有一条新消息",
    "body": "张三 向您发来了一条消息，点击查看。",
    "platform": "all",
    "data": {
        "action": "open_chat",
        "chat_id": "chat_001"
    }
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'screenshot-golang' }" v-show="activeTab === 'screenshot-golang'">
            <pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "io"
    "net/http"
    "fmt"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/push/send"

    payload := map[string]interface{}{
        "to":       "user_id_12345",
        "title":    "您有一条新消息",
        "body":     "张三 向您发来了一条消息，点击查看。",
        "platform": "all",
        "data": map[string]string{
            "action":  "open_chat",
            "chat_id": "chat_001",
        },
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("api-token", "YOUR_API_TOKEN")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'screenshot-js' }" v-show="activeTab === 'screenshot-js'">
            <pre><code class="language-javascript">const response = await fetch('https://api.notifyhub.example.com/v1/push/send', {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'user_id_12345',
    title: '您有一条新消息',
    body: '张三 向您发来了一条消息，点击查看。',
    platform: 'all',
    data: {
      action: 'open_chat',
      chat_id: 'chat_001'
    }
  })
});

const result = await response.json();
console.log(result);</code></pre>
          </div>
        </div>

        <h4>响应示例</h4>
        <pre><code class="language-json">{
  "success": true,
  "result": {
    "message_id": "push_def456",  // string - 推送唯一ID
    "status": "queued",           // string - 推送状态
    "platform_results": {         // object - 各平台推送结果
      "ios": { "accepted": 1 },
      "android": { "accepted": 1 }
    }
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
              <td>目标用户ID或设备Token，支持批量，最多 1000 个</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>string</td>
              <td>是</td>
              <td></td>
              <td>推送标题</td>
            </tr>
            <tr>
              <td><code>body</code></td>
              <td>string</td>
              <td>是</td>
              <td></td>
              <td>推送正文内容</td>
            </tr>
            <tr>
              <td><code>platform</code></td>
              <td>string</td>
              <td>否</td>
              <td>默认值 "all"</td>
              <td>目标平台，可选值："all"、"ios"、"android"、"harmony"</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td>Record&lt;string, string&gt;</td>
              <td>否</td>
              <td>默认值 {}</td>
              <td>自定义业务数据，随推送一起下发到客户端</td>
            </tr>
            <tr class="expandable-row" :class="{ expanded: expandedParams['push_options'] }" @click="toggleParam('push_options')">
              <td>
                <code class="expandable-param">
                  <i class="fas fa-chevron-right expand-icon" :class="{ expanded: expandedParams['push_options'] }"></i>
                  push_options
                </code>
              </td>
              <td>Struct{push_options}</td>
              <td>否</td>
              <td>默认值 {}</td>
              <td>推送样式参数</td>
            </tr>
            <tr class="expand-content" v-show="expandedParams['push_options']">
              <td colspan="5">
                <div class="nested-params">
                  <h5>push_options 结构定义</h5>
                  <table class="nested-table">
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
                        <td><code>badge</code></td>
                        <td>int</td>
                        <td>否</td>
                        <td></td>
                        <td>iOS 角标数字</td>
                      </tr>
                      <tr>
                        <td><code>sound</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td>默认值 "default"</td>
                        <td>通知声音，"default" 为系统默认声音，"none" 为静音</td>
                      </tr>
                      <tr>
                        <td><code>icon</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td></td>
                        <td>Android 通知图标名称</td>
                      </tr>
                      <tr>
                        <td><code>image</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td></td>
                        <td>富媒体推送图片URL</td>
                      </tr>
                      <tr>
                        <td><code>ttl</code></td>
                        <td>int</td>
                        <td>否</td>
                        <td>默认值 86400</td>
                        <td>消息存活时长，单位秒，超时未送达则丢弃</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
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
  name: 'ScreenshotApi',
  props: {
    activeTab: {
      type: String,
      default: 'screenshot-curl'
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
