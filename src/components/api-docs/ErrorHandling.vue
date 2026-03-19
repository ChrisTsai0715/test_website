<template>
  <div>
    <!-- 错误处理 -->
    <section id="error-handling" class="docs-section">
      <h2>错误处理</h2>
      <p>NotifyHub API 使用标准的HTTP状态码来表示请求结果，所有响应都遵循统一的格式规范。</p>
      <div class="error-code-link-box">
        📋 详细错误码参考：<a href="https://docs.notifyhub.example.com/error-codes" target="_blank" rel="noopener noreferrer">https://docs.notifyhub.example.com/error-codes</a>
      </div>

      <!-- HTTP CODE 200 -->
      <div class="error-codes">
        <h3>1. HTTP CODE 200（请求成功）</h3>

        <div class="code-example">
          <h4>成功响应示例</h4>
<pre><code class="language-json">{
  "success": true,
  "result": {
    "message_id": "msg_abc123456",
    "status": "queued"
  },
  "errors": []
}</code></pre>
        </div>
      </div>

      <!-- HTTP CODE 400 -->
      <div class="error-codes">
        <h3>2. HTTP CODE 400（参数错误）</h3>

        <div class="code-example">
          <h4>参数错误响应示例</h4>
<pre><code class="language-json">{
  "success": false,
  "result": null,
  "errors": [
    {
      "code": 400001,
      "message": "参数 'to' 为必填项，请提供接收方手机号或邮箱地址。"
    }
  ]
}</code></pre>
        </div>
      </div>

      <!-- HTTP CODE 401 -->
      <div class="error-codes">
        <h3>3. HTTP CODE 401（认证失败）</h3>

        <div class="code-example">
          <h4>认证失败响应示例</h4>
<pre><code class="language-json">{
  "success": false,
  "result": null,
  "errors": [
    {
      "code": 401001,
      "message": "api-token 无效或已过期，请检查 Header 中的 api-token 是否正确。"
    }
  ]
}</code></pre>
        </div>
      </div>

      <!-- HTTP CODE 422 -->
      <div class="error-codes">
        <h3>4. HTTP CODE 422（发送失败）</h3>

        <div class="code-example">
          <h4>发送失败响应示例</h4>
<pre><code class="language-json">{
  "success": false,
  "result": null,
  "errors": [
    {
      "code": 422001,
      "message": "目标手机号格式不正确，请使用国际格式如 +8613800138000。"
    }
  ]
}</code></pre>
        </div>
      </div>

      <!-- HTTP CODE 429 -->
      <div class="error-codes">
        <h3>5. HTTP CODE 429（请求限流）</h3>

        <div class="code-example">
          <h4>限流响应示例</h4>
<pre><code class="language-json">{
  "success": false,
  "result": null,
  "errors": [
    {
      "code": 429001,
      "message": "请求频率超限，请稍后重试。当前限制：100次/分钟。"
    }
  ]
}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ErrorHandling'
}
</script>

<style scoped>
@import '@/assets/css/api-docs.css';

.error-code-link-box {
  margin: 16px 0;
  padding: 12px 18px;
  background: linear-gradient(135deg, #e8f4fd, #f0f7ff);
  border-left: 4px solid #1a73e8;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  color: #1a3a5c;
}

.error-code-link-box a {
  color: #1a73e8;
  text-decoration: none;
  font-weight: 600;
  word-break: break-all;
}

.error-code-link-box a:hover {
  text-decoration: underline;
}
</style>
