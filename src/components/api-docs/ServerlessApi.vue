<template>
  <!-- Serverless 接入 - 短信 -->
  <section id="serverless-content-api" class="docs-section">
    <h2>sms/send - 发送短信</h2>
    <p>通过 Serverless 函数调用 NotifyHub 发送短信通知。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">NotifyHub.sms.send()</span>
        <span class="path">SMS</span>
      </div>
      <p class="endpoint-desc">在 Serverless 函数中发送短信通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <pre><code class="language-javascript">addEventListener('fetch', async (event) => {
    try {
        const result = await NotifyHub.sms.send({
            to: "+8613800138000",
            template_id: "tpl_verify_code",
            template_params: { code: "123456", expire: "5" }
        });
        if (result.isOk()) {
            event.respondWith(new Response(JSON.stringify(result.data), { status: 200 }));
        } else {
            event.respondWith(new Response("发送失败", { status: 500 }));
        }
    } catch(e) {
        event.respondWith(new Response("发生异常", { status: 500 }));
    }
});</code></pre>

        <h4>响应示例</h4>
        <pre><code class="language-json">{
  "success": true,
  "result": {
    "message_id": "msg_abc123456",
    "status": "queued"
  },
  "errors": []
}</code></pre>
      </div>

      <h4>参数说明</h4>
      <div class="params-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>必需</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>to</code></td>
              <td>string</td>
              <td>是</td>
              <td>接收方手机号</td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td>string</td>
              <td>否</td>
              <td>短信内容，与 template_id 二选一</td>
            </tr>
            <tr>
              <td><code>template_id</code></td>
              <td>string</td>
              <td>否</td>
              <td>模板ID，与 content 二选一</td>
            </tr>
            <tr>
              <td><code>template_params</code></td>
              <td>Record&lt;string, string&gt;</td>
              <td>否</td>
              <td>模板变量</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Serverless 接入 - 邮件 -->
  <section id="serverless-markdown-api" class="docs-section">
    <h2>email/send - 发送邮件</h2>
    <p>通过 Serverless 函数调用 NotifyHub 发送邮件通知。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">NotifyHub.email.send()</span>
        <span class="path">Email</span>
      </div>
      <p class="endpoint-desc">在 Serverless 函数中发送邮件通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <pre><code class="language-javascript">addEventListener('fetch', async (event) => {
    try {
        const result = await NotifyHub.email.send({
            to: "user@example.com",
            subject: "您的订单已发货",
            html: "&lt;p&gt;您的订单 &lt;b&gt;#ORDER123&lt;/b&gt; 已发货。&lt;/p&gt;"
        });
        event.respondWith(new Response(JSON.stringify(result.data), { status: 200 }));
    } catch(e) {
        event.respondWith(new Response("发生异常", { status: 500 }));
    }
});</code></pre>

        <h4>响应示例</h4>
        <pre><code class="language-json">{
  "success": true,
  "result": {
    "message_id": "email_xyz789",
    "status": "queued"
  },
  "errors": []
}</code></pre>
      </div>

      <h4>参数说明</h4>
      <div class="params-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>必需</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>to</code></td>
              <td>string</td>
              <td>是</td>
              <td>收件人邮箱</td>
            </tr>
            <tr>
              <td><code>subject</code></td>
              <td>string</td>
              <td>是</td>
              <td>邮件主题</td>
            </tr>
            <tr>
              <td><code>html</code></td>
              <td>string</td>
              <td>否</td>
              <td>HTML 邮件正文，与 text 至少填写一个</td>
            </tr>
            <tr>
              <td><code>text</code></td>
              <td>string</td>
              <td>否</td>
              <td>纯文本正文，与 html 至少填写一个</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Serverless 接入 - Push -->
  <section id="serverless-screenshot-api" class="docs-section">
    <h2>push/send - 发送Push通知</h2>
    <p>通过 Serverless 函数调用 NotifyHub 发送 Push 推送通知。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">NotifyHub.push.send()</span>
        <span class="path">Push</span>
      </div>
      <p class="endpoint-desc">在 Serverless 函数中发送 Push 推送</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <pre><code class="language-javascript">addEventListener('fetch', async (event) => {
    try {
        const result = await NotifyHub.push.send({
            to: "user_id_12345",
            title: "您有一条新消息",
            body: "点击查看详情",
            data: { action: "open_message", id: "msg_001" }
        });
        event.respondWith(new Response(JSON.stringify(result.data), { status: 200 }));
    } catch(e) {
        event.respondWith(new Response("发生异常", { status: 500 }));
    }
});</code></pre>
      </div>

      <h4>参数说明</h4>
      <div class="params-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>必需</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>to</code></td>
              <td>string</td>
              <td>是</td>
              <td>目标用户ID</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>string</td>
              <td>是</td>
              <td>推送标题</td>
            </tr>
            <tr>
              <td><code>body</code></td>
              <td>string</td>
              <td>是</td>
              <td>推送正文</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td>Record&lt;string, string&gt;</td>
              <td>否</td>
              <td>自定义业务数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Serverless 接入 - 语音 -->
  <section id="serverless-pdf-api" class="docs-section">
    <h2>voice/call - 发送语音通知</h2>
    <p>通过 Serverless 函数调用 NotifyHub 发起语音电话通知。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">NotifyHub.voice.call()</span>
        <span class="path">Voice</span>
      </div>
      <p class="endpoint-desc">在 Serverless 函数中发起语音电话</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <pre><code class="language-javascript">addEventListener('fetch', async (event) => {
    try {
        const result = await NotifyHub.voice.call({
            to: "+8613800138000",
            tts_text: "您好，您的快递已到达，请尽快取件。",
            repeat: 2
        });
        event.respondWith(new Response(JSON.stringify(result.data), { status: 200 }));
    } catch(e) {
        event.respondWith(new Response("发生异常", { status: 500 }));
    }
});</code></pre>
      </div>

      <h4>参数说明</h4>
      <div class="params-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>必需</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>to</code></td>
              <td>string</td>
              <td>是</td>
              <td>接收方手机号</td>
            </tr>
            <tr>
              <td><code>tts_text</code></td>
              <td>string</td>
              <td>否</td>
              <td>TTS 文本，与 audio_url 二选一</td>
            </tr>
            <tr>
              <td><code>audio_url</code></td>
              <td>string</td>
              <td>否</td>
              <td>预录音频URL，与 tts_text 二选一</td>
            </tr>
            <tr>
              <td><code>repeat</code></td>
              <td>int</td>
              <td>否</td>
              <td>播报重复次数，默认 1，最大 5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Serverless 接入 - 批量 -->
  <section id="serverless-links-api" class="docs-section">
    <h2>batch/send - 批量多渠道发送</h2>
    <p>通过 Serverless 函数调用 NotifyHub 批量多渠道发送通知。</p>

    <div class="api-endpoint">
      <div class="endpoint-header">
        <span class="method post">NotifyHub.batch.send()</span>
        <span class="path">Batch</span>
      </div>
      <p class="endpoint-desc">在 Serverless 函数中批量多渠道发送通知</p>

      <div class="code-example">
        <h4>请求示例</h4>
        <pre><code class="language-javascript">addEventListener('fetch', async (event) => {
    try {
        const result = await NotifyHub.batch.send({
            channels: ["push", "sms"],
            fallback: true,
            push: { to: "user_id_12345", title: "安全警告", body: "检测到异常登录" },
            sms: { to: "+8613800138000", content: "您的账户检测到异常登录，请立即处理。" }
        });
        event.respondWith(new Response(JSON.stringify(result.data), { status: 200 }));
    } catch(e) {
        event.respondWith(new Response("发生异常", { status: 500 }));
    }
});</code></pre>
      </div>

      <h4>参数说明</h4>
      <div class="params-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>必需</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>channels</code></td>
              <td>Array&lt;string&gt;</td>
              <td>是</td>
              <td>目标渠道列表，按优先级排序</td>
            </tr>
            <tr>
              <td><code>fallback</code></td>
              <td>bool</td>
              <td>否</td>
              <td>是否启用降级策略</td>
            </tr>
            <tr>
              <td><code>sms/email/push/voice</code></td>
              <td>Object</td>
              <td>否</td>
              <td>各渠道发送参数（channels中包含的渠道必填）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServerlessApi',
  props: {
    expandedParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['toggle-param'],
  methods: {
    toggleParam(param) {
      this.$emit('toggle-param', param);
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/api-docs.css';
</style>
