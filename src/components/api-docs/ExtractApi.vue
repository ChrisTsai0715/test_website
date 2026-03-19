<template>
  <section id="smart-notify-api" class="docs-section">
    <h2>7. smart/notify – AI 智能通知 <span class="beta-badge">内测中</span></h2>
    <p>根据用户画像和历史行为，由 AI 自动选择最佳通知渠道、时机和内容，提升通知触达率和转化率。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <div class="endpoint-header">
          <span class="method post">POST</span>
          <span class="path">/v1/smart/notify</span>
        </div>
      </div>
      <p class="endpoint-desc">AI智能选择最优渠道发送通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="example-selector" style="margin-bottom: 15px;">
          <button class="tab-button" :class="{ active: activeExample === 'prompt' }" @click="setActiveExample('prompt')" style="margin-right: 10px;">示例 1：设置通知意图</button>
          <button class="tab-button" :class="{ active: activeExample === 'response_format' }" @click="setActiveExample('response_format')">示例 2：设置用户偏好</button>
        </div>
        <div class="code-tabs">
          <button class="tab-button" :class="{ active: activeTab === 'json-curl' }" @click="setActiveTab('json-curl')">CURL</button>
          <button class="tab-button" :class="{ active: activeTab === 'json-python' }" @click="setActiveTab('json-python')">Python</button>
          <button class="tab-button" :class="{ active: activeTab === 'json-golang' }" @click="setActiveTab('json-golang')">Go</button>
          <button class="tab-button" :class="{ active: activeTab === 'json-js' }" @click="setActiveTab('json-js')">JavaScript</button>
        </div>
        <div class="code-content">
          <!-- 示例 1：设置通知意图 -->
          <div v-show="activeExample === 'prompt'">
            <div class="tab-pane" :class="{ active: activeTab === 'json-curl' }" v-show="activeTab === 'json-curl'">
              <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/smart/notify \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_id_12345",
    "intent": "订单状态变更通知：用户的订单 #ORDER123 已完成打包，即将发货",
    "priority": "normal"
  }'</code></pre>
            </div>
            <div class="tab-pane" :class="{ active: activeTab === 'json-python' }" v-show="activeTab === 'json-python'">
              <pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/smart/notify"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "user_id": "user_id_12345",
    "intent": "订单状态变更通知：用户的订单 #ORDER123 已完成打包，即将发货",
    "priority": "normal"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())</code></pre>
            </div>
            <div class="tab-pane" :class="{ active: activeTab === 'json-golang' }" v-show="activeTab === 'json-golang'">
              <pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/smart/notify"

    data := map[string]interface{}{
        "user_id":  "user_id_12345",
        "intent":   "订单状态变更通知：用户的订单 #ORDER123 已完成打包，即将发货",
        "priority": "normal",
    }

    jsonData, _ := json.Marshal(data)
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("api-token", "YOUR_API_TOKEN")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}</code></pre>
            </div>
            <div class="tab-pane" :class="{ active: activeTab === 'json-js' }" v-show="activeTab === 'json-js'">
              <pre><code class="language-javascript">const fetch = require('node-fetch');

const url = 'https://api.notifyhub.example.com/v1/smart/notify';
const options = {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_id: 'user_id_12345',
    intent: '订单状态变更通知：用户的订单 #ORDER123 已完成打包，即将发货',
    priority: 'normal'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:', err));</code></pre>
            </div>
          </div>
          <!-- 示例 2：设置用户偏好 -->
          <div v-show="activeExample === 'response_format'">
            <div class="tab-pane" :class="{ active: activeTab === 'json-curl' }" v-show="activeTab === 'json-curl'">
              <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/smart/notify \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_id_12345",
    "intent": "账户安全警告：检测到异常登录行为",
    "priority": "urgent",
    "user_preference": {
      "preferred_channels": ["push", "sms"],
      "quiet_hours": {
        "start": "22:00",
        "end": "08:00",
        "timezone": "Asia/Shanghai"
      },
      "language": "zh-CN"
    }
  }'</code></pre>
            </div>
            <div class="tab-pane" :class="{ active: activeTab === 'json-python' }" v-show="activeTab === 'json-python'">
              <pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/smart/notify"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "user_id": "user_id_12345",
    "intent": "账户安全警告：检测到异常登录行为",
    "priority": "urgent",
    "user_preference": {
        "preferred_channels": ["push", "sms"],
        "quiet_hours": {
            "start": "22:00",
            "end": "08:00",
            "timezone": "Asia/Shanghai"
        },
        "language": "zh-CN"
    }
}

response = requests.post(url, headers=headers, json=data)
print(response.json())</code></pre>
            </div>
            <div class="tab-pane" :class="{ active: activeTab === 'json-golang' }" v-show="activeTab === 'json-golang'">
              <pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/smart/notify"

    data := map[string]interface{}{
        "user_id":  "user_id_12345",
        "intent":   "账户安全警告：检测到异常登录行为",
        "priority": "urgent",
        "user_preference": map[string]interface{}{
            "preferred_channels": []string{"push", "sms"},
            "quiet_hours": map[string]string{
                "start":    "22:00",
                "end":      "08:00",
                "timezone": "Asia/Shanghai",
            },
            "language": "zh-CN",
        },
    }

    jsonData, _ := json.Marshal(data)
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("api-token", "YOUR_API_TOKEN")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}</code></pre>
            </div>
            <div class="tab-pane" :class="{ active: activeTab === 'json-js' }" v-show="activeTab === 'json-js'">
              <pre><code class="language-javascript">const fetch = require('node-fetch');

const url = 'https://api.notifyhub.example.com/v1/smart/notify';
const options = {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_id: 'user_id_12345',
    intent: '账户安全警告：检测到异常登录行为',
    priority: 'urgent',
    user_preference: {
      preferred_channels: ['push', 'sms'],
      quiet_hours: {
        start: '22:00',
        end: '08:00',
        timezone: 'Asia/Shanghai'
      },
      language: 'zh-CN'
    }
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:', err));</code></pre>
            </div>
          </div>
        </div>

        <h4>响应示例</h4>
        <pre><code class="language-json">// HTTP响应
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true,
    "result": {
        "message_id": "smart_mno678",
        "selected_channel": "push",
        "ai_reasoning": "用户最近3天活跃于App端，Push触达率最高；当前时间非免打扰时段",
        "generated_content": {
            "title": "订单即将发货",
            "body": "您的订单 #ORDER123 已打包完成，预计明日送达，请保持手机畅通。"
        },
        "status": "queued"
    },
    "errors": []
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
              <td><code>user_id</code></td>
              <td>string</td>
              <td>是</td>
              <td></td>
              <td>目标用户ID，用于 AI 读取用户画像和历史行为</td>
            </tr>
            <tr>
              <td><code>intent</code></td>
              <td>string</td>
              <td>是</td>
              <td></td>
              <td>通知意图描述，AI 根据此文本自动生成最适合的通知内容</td>
            </tr>
            <tr>
              <td><code>priority</code></td>
              <td>string</td>
              <td>否</td>
              <td>默认值 "normal"</td>
              <td>通知优先级，可选值："low"、"normal"、"high"、"urgent"。urgent 级别将忽略免打扰设置</td>
            </tr>
            <tr class="expandable-row" :class="{ expanded: expandedParams['user_preference'] }" @click="toggleParam('user_preference')">
              <td>
                <code class="expandable-param">
                  <i class="fas fa-chevron-right expand-icon" :class="{ expanded: expandedParams['user_preference'] }"></i>
                  user_preference
                </code>
              </td>
              <td>Struct</td>
              <td>否</td>
              <td></td>
              <td>用户偏好设置，覆盖 AI 自动判断</td>
            </tr>
            <tr class="expand-content" v-show="expandedParams['user_preference']">
              <td colspan="5">
                <div class="nested-params">
                  <h5>user_preference 参数说明</h5>
                  <table class="nested-table">
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
                        <td><code>preferred_channels</code></td>
                        <td>Array&lt;string&gt;</td>
                        <td>否</td>
                        <td></td>
                        <td>偏好渠道列表，按优先级排序</td>
                      </tr>
                      <tr>
                        <td><code>quiet_hours</code></td>
                        <td>struct</td>
                        <td>否</td>
                        <td></td>
                        <td>免打扰时段设置，包含 start、end、timezone 字段</td>
                      </tr>
                      <tr>
                        <td><code>language</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td>默认值 "zh-CN"</td>
                        <td>通知语言，影响 AI 内容生成</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
  name: 'ExtractApi',
  props: {
    activeParamsTab: {
      type: String,
      default: 'http-params'
    },
    expandedParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['set-active-params-tab', 'toggle-param'],
  data() {
    return {
      activeTab: 'json-curl',
      activeExample: 'prompt'
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    setActiveExample(example) {
      this.activeExample = example;
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
