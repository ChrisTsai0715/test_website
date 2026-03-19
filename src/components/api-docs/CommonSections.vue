<template>
  <div>
    <!-- 快速开始 -->
    <section id="quick-start" class="docs-section">
      <h2>快速开始</h2>
      <p>NotifyHub 提供统一的消息通知接口，支持短信、邮件、Push推送、语音等多种通知渠道。本快速开始指南将以<a href="#sms-api"><strong>短信API</strong></a>为例，引导您快速上手。</p>
      <h3>准备工作</h3>
      <ol>
        <p>1. 获取<strong>api-token</strong>：请点击右上方<strong>联系我们</strong>按钮，联系接口人获取。使用时将 <code>YOUR_API_TOKEN</code> 替换为您的实际 Token。</p>
        <p>2. 安装<strong>cURL工具</strong>：确保您的系统已安装curl命令行工具。</p>
      </ol>
      <h3>步骤1：发送请求</h3>
      <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/sms/send \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+8613800138000",
    "content": "您的验证码是：123456，5分钟内有效。"
}'</code></pre>
      <h3>步骤2：处理响应</h3>
      <h4>成功响应示例</h4>
      <pre><code class="language-json">{
  "success": true,
  "result": {
    "message_id": "msg_abc123456",
    "status": "queued"
  },
  "errors": []
}</code></pre>
      <p><strong>常见错误请参考<a href="#error-handling">错误处理</a>章节。</strong></p>
    </section>

    <!-- 身份认证 -->
    <section id="authentication" class="docs-section">
      <h2>身份认证</h2>
      <p>NotifyHub API 使用 api-token 进行身份认证。您需要在每个请求的 Header 中包含 api-token。</p>

      <div class="code-example">
        <h4>认证示例</h4>
        <pre><code class="language-bash">curl -X POST https://api.notifyhub.example.com/v1/sms/send \
  -H "api-token: YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "+8613800138000", "content": "您的验证码是：123456"}'</code></pre>
      </div>

      <div class="auth-notes">
        <h4>注意事项</h4>
        <ul>
          <li>请妥善保管您的 api-token，不要在公开场合泄露</li>
          <li>如果 api-token 泄露，请及时联系我们更换</li>
          <li>所有 API 请求必须使用 HTTPS 协议</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CommonSections'
}
</script>

<style scoped>
@import '@/assets/css/api-docs.css';
</style>
