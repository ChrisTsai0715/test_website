<template>
  <section id="voice-api" class="docs-section">
    <h2>4. voice/call - 发送语音通知</h2>
    <p>向指定手机号发起语音电话通知，支持文本转语音（TTS）和预录音文件播报。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">POST</span>
        <span class="path">/v1/voice/call</span>
      </div>
      <p class="endpoint-desc">发起语音电话通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <div class="code-tabs">
          <button class="tab-button" :class="{ active: activeTab === 'pdf-curl' }" @click="setActiveTab('pdf-curl')">CURL</button>
          <button class="tab-button" :class="{ active: activeTab === 'pdf-python' }" @click="setActiveTab('pdf-python')">Python</button>
          <button class="tab-button" :class="{ active: activeTab === 'pdf-golang' }" @click="setActiveTab('pdf-golang')">Go</button>
          <button class="tab-button" :class="{ active: activeTab === 'pdf-js' }" @click="setActiveTab('pdf-js')">JavaScript</button>
        </div>
        <div class="code-content">
          <div class="tab-pane" :class="{ active: activeTab === 'pdf-curl' }" v-show="activeTab === 'pdf-curl'">
            <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/voice/call \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+8613800138000",
    "tts_text": "您好，您的快递已到达快递柜，请在24小时内取件，柜号为A区301。",
    "repeat": 2
  }'</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'pdf-python' }" v-show="activeTab === 'pdf-python'">
            <pre><code class="language-python">import requests

url = "https://api.notifyhub.example.com/v1/voice/call"
headers = {
    "api-token": "YOUR_API_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "to": "+8613800138000",
    "tts_text": "您好，您的快递已到达快递柜，请在24小时内取件，柜号为A区301。",
    "repeat": 2
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'pdf-golang' }" v-show="activeTab === 'pdf-golang'">
            <pre><code class="language-go">package main

import (
    "bytes"
    "encoding/json"
    "io"
    "net/http"
    "os"
)

func main() {
    url := "https://api.notifyhub.example.com/v1/voice/call"

    payload := map[string]interface{}{
        "to":       "+8613800138000",
        "tts_text": "您好，您的快递已到达快递柜，请在24小时内取件，柜号为A区301。",
        "repeat":   2,
    }

    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("api-token", "YOUR_API_TOKEN")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    os.Stdout.Write(body)
}</code></pre>
          </div>
          <div class="tab-pane" :class="{ active: activeTab === 'pdf-js' }" v-show="activeTab === 'pdf-js'">
            <pre><code class="language-javascript">const response = await fetch('https://api.notifyhub.example.com/v1/voice/call', {
  method: 'POST',
  headers: {
    'api-token': 'YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+8613800138000',
    tts_text: '您好，您的快递已到达快递柜，请在24小时内取件，柜号为A区301。',
    repeat: 2
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
    "message_id": "voice_ghi012",  // string - 通话唯一ID
    "status": "calling",           // string - 通话状态：calling/answered/completed/failed
    "to": "+8613800138000"         // string - 接收方手机号
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
              <td>string</td>
              <td>是</td>
              <td></td>
              <td>接收方手机号，支持国际格式如 +8613800138000</td>
            </tr>
            <tr>
              <td><code>tts_text</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>TTS 文本转语音内容，与 audio_url 二选一</td>
            </tr>
            <tr>
              <td><code>audio_url</code></td>
              <td>string</td>
              <td>否</td>
              <td></td>
              <td>预录音频文件URL（支持 mp3/wav），与 tts_text 二选一</td>
            </tr>
            <tr>
              <td><code>repeat</code></td>
              <td>int</td>
              <td>否</td>
              <td>默认值 1</td>
              <td>语音播报重复次数，取值范围 1-5</td>
            </tr>
            <tr class="expandable-row" :class="{ expanded: expandedParams['tts_options'] }" @click="toggleParam('tts_options')">
              <td>
                <code class="expandable-param">
                  <i class="fas fa-chevron-right expand-icon" :class="{ expanded: expandedParams['tts_options'] }"></i>
                  tts_options
                </code>
              </td>
              <td>Struct{tts_options}</td>
              <td>否</td>
              <td>默认值 {}</td>
              <td>TTS 语音合成参数</td>
            </tr>
            <tr class="expand-content" v-show="expandedParams['tts_options']">
              <td colspan="5">
                <div class="nested-params">
                  <h5>tts_options 结构定义</h5>
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
                        <td><code>voice</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td>默认值 "female"</td>
                        <td>语音类型，可选值："female"（女声）、"male"（男声）</td>
                      </tr>
                      <tr>
                        <td><code>speed</code></td>
                        <td>float</td>
                        <td>否</td>
                        <td>默认值 1.0</td>
                        <td>语速倍率，取值范围 0.5-2.0</td>
                      </tr>
                      <tr>
                        <td><code>volume</code></td>
                        <td>int</td>
                        <td>否</td>
                        <td>默认值 5</td>
                        <td>音量大小，取值范围 0-10</td>
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
  name: 'PdfApi',
  props: {
    activeTab: {
      type: String,
      default: 'pdf-curl'
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
