<template>
  <div>
    <!-- MCP 接入概述 -->
    <section id="mcp-reader-overview" class="docs-section">
      <h2>Webhook 接入 - 概述</h2>
      <p class="section-intro">
        NotifyHub 支持通过 Webhook 方式接入，当消息状态发生变更（送达、失败、已读等）时，系统将主动向您配置的地址推送回调通知，方便您实时掌握消息状态。
      </p>
    </section>

    <!-- Webhook - 快速接入 -->
    <section id="mcp-reader-quickstart" class="docs-section">
      <h2>Webhook 接入 - 快速配置</h2>
      <p>在发送接口中通过 <code>callback_url</code> 参数指定回调地址：</p>

      <div class="code-example">
        <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/sms/send \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+8613800138000",
    "content": "您的验证码是：123456",
    "callback_url": "https://your-server.example.com/notify/callback"
  }'</code></pre>
      </div>

      <p>状态变更时，NotifyHub 将向您的地址发送如下格式的 POST 请求：</p>
      <div class="code-example">
        <pre><code class="language-json">{
  "message_id": "msg_abc123456",
  "channel": "sms",
  "status": "delivered",
  "to": "+8613800138000",
  "timestamp": "2026-03-18T10:00:03Z",
  "extra": {}
}</code></pre>
      </div>
    </section>

    <!-- Webhook - 验签 -->
    <section id="mcp-reader-cursor" class="docs-section">
      <h2>Webhook 接入 - 签名验证</h2>
      <p>为确保回调请求来自 NotifyHub，每次回调请求的 Header 中会携带 <code>X-NotifyHub-Signature</code> 签名字段。</p>

      <div class="code-example">
        <h4>Python 验签示例</h4>
        <pre><code class="language-python">import hmac
import hashlib

def verify_signature(payload: str, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)

# 在您的 Webhook 处理器中
payload = request.get_data(as_text=True)
signature = request.headers.get('X-NotifyHub-Signature', '')
is_valid = verify_signature(payload, signature, 'YOUR_WEBHOOK_SECRET')</code></pre>
      </div>
    </section>

    <!-- SDK 接入 -->
    <section id="mcp-browser-overview" class="docs-section">
      <h2>SDK 接入 - 概述</h2>
      <p class="section-intro">
        NotifyHub 提供多语言官方 SDK，封装了鉴权、重试、错误处理等通用逻辑，让您更快速地集成消息通知功能。
      </p>
    </section>

    <!-- SDK - 快速接入 -->
    <section id="mcp-browser-quickstart" class="docs-section">
      <h2>SDK 接入 - 安装</h2>

      <p>通过包管理器安装 SDK：</p>
      <div class="code-example">
        <h4>Python</h4>
        <pre><code class="language-bash">pip install notifyhub-sdk</code></pre>
      </div>
      <div class="code-example">
        <h4>Node.js</h4>
        <pre><code class="language-bash">npm install @notifyhub/sdk</code></pre>
      </div>
      <div class="code-example">
        <h4>Go</h4>
        <pre><code class="language-bash">go get github.com/notifyhub/notifyhub-go</code></pre>
      </div>
    </section>

    <!-- SDK - 使用示例 -->
    <section id="mcp-browser-cursor" class="docs-section">
      <h2>SDK 接入 - 使用示例</h2>

      <h3>Python 示例</h3>
      <div class="code-example">
        <pre><code class="language-python">from notifyhub import NotifyHubClient

client = NotifyHubClient(api_token="YOUR_API_TOKEN")

# 发送短信
result = client.sms.send(
    to="+8613800138000",
    template_id="tpl_verify_code",
    template_params={"code": "123456", "expire": "5"}
)
print(result.message_id)

# 发送邮件
result = client.email.send(
    to="user@example.com",
    subject="您的订单已发货",
    html="&lt;p&gt;您的订单已发货，请注意查收。&lt;/p&gt;"
)
print(result.message_id)</code></pre>
      </div>

      <h3>Node.js 示例</h3>
      <div class="code-example">
        <pre><code class="language-javascript">const { NotifyHubClient } = require('@notifyhub/sdk');

const client = new NotifyHubClient({ apiToken: 'YOUR_API_TOKEN' });

// 发送短信
const result = await client.sms.send({
  to: '+8613800138000',
  templateId: 'tpl_verify_code',
  templateParams: { code: '123456', expire: '5' }
});
console.log(result.messageId);

// 发送 Push
const pushResult = await client.push.send({
  to: 'user_id_12345',
  title: '您有一条新消息',
  body: '点击查看详情'
});
console.log(pushResult.messageId);</code></pre>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'McpDocs'
}
</script>

<style scoped>
.docs-section {
  margin-bottom: 3rem;
}

.docs-section h3 {
  font-size: 1.3rem;
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.section-intro {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.code-example {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.code-example h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.code-example pre {
  margin: 0;
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-example code {
  background: none;
  color: inherit;
  padding: 0;
  font-size: inherit;
}

h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
}

p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>
