<template>
  <div>
    <!-- Changelog -->
    <section id="changelog" class="docs-section">
      <h2>Changelog</h2>

      <div id="changelog-2026-03-05" class="changelog-item">
        <h3 class="changelog-date">2026-03-18</h3>
        <h4 class="changelog-title">新增 AI 智能通知接口 /smart/notify</h4>
        <ul>
          <li>支持根据用户画像自动选择最优通知渠道和时机</li>
          <li>AI 自动生成最适合的通知文案，提升触达率</li>
          <li>支持设置通知优先级和用户免打扰时段</li>
        </ul>
      </div>

      <div id="changelog-2026-02-05" class="changelog-item">
        <h3 class="changelog-date">2026-02-10</h3>
        <h4 class="changelog-title">新增批量多渠道发送 /batch/send</h4>
        <ul>
          <li>支持在单次请求中同时指定多个通知渠道</li>
          <li>支持 fallback 降级策略，高优先级渠道送达后跳过低优先级渠道</li>
        </ul>
      </div>

      <div id="changelog-2026-01-12" class="changelog-item">
        <h3 class="changelog-date">2026-01-15</h3>
        <h4 class="changelog-title">新增鸿蒙 Push 平台支持</h4>
        <ul>
          <li>Push 接口新增 platform: "harmony" 支持华为鸿蒙设备推送</li>
          <li>批量推送单次上限从 500 提升至 1000</li>
        </ul>
      </div>

      <div id="changelog-2025-11-27" class="changelog-item">
        <h3 class="changelog-date">2025-12-01</h3>
        <h4 class="changelog-title">新增 Webhook 签名验证机制</h4>
        <ul>
          <li>回调请求新增 X-NotifyHub-Signature 签名字段，提升安全性</li>
          <li>提供多语言验签示例代码</li>
        </ul>
      </div>

      <div id="changelog-2025-11-17" class="changelog-item">
        <h3 class="changelog-date">2025-11-01</h3>
        <h4 class="changelog-title">新增语音通知接口 /voice/call</h4>
        <ul>
          <li>支持 TTS 文本转语音和预录音文件两种方式</li>
          <li>支持女声/男声切换和语速调节</li>
        </ul>
      </div>

      <div id="changelog-2025-10-29" class="changelog-item">
        <h3 class="changelog-date">2025-10-15</h3>
        <h4 class="changelog-title">新增消息模板管理接口</h4>
        <ul>
          <li>新增 <code>/template/list</code> - 查询模板列表</li>
          <li>新增 <code>/template/create</code> - 创建新模板</li>
          <li>新增 <code>/template/delete</code> - 删除模板</li>
        </ul>
      </div>

      <div id="changelog-2025-10-23" class="changelog-item">
        <h3 class="changelog-date">2025-09-20</h3>
        <h4 class="changelog-title">新增消息状态查询接口</h4>
        <ul>
          <li>新增 <code>/message/status</code> 接口，支持查询任意渠道消息的发送状态</li>
          <li>支持批量查询，单次最多 100 条</li>
        </ul>
      </div>

      <div id="changelog-2025-10-10" class="changelog-item">
        <h3 class="changelog-date">2025-08-01</h3>
        <h4 class="changelog-title">新增邮件富媒体支持</h4>
        <ul>
          <li>邮件接口支持 HTML 富文本内容</li>
          <li>支持附件、抄送（CC）和密送（BCC）</li>
        </ul>
      </div>

      <div id="changelog-2025-09-10" class="changelog-item">
        <h3 class="changelog-date">2025-06-01</h3>
        <h4 class="changelog-title">NotifyHub 平台正式上线</h4>
        <ul>
          <li>支持短信（SMS）和 App Push 两种通知渠道</li>
          <li>提供完整的 API 文档和多语言 SDK</li>
          <li>开放测试环境，欢迎接入体验</li>
        </ul>
      </div>
    </section>

    <!-- LLM resources -->
    <section id="llm-resources" class="docs-section">
      <h2>LLM resources</h2>
      <ul>
        <li><a href="llm_instruction/llm_prompt.txt" target="_blank">llms_prompt.txt</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Changelog'
}
</script>

<style scoped>
.docs-section {
  margin-bottom: 3rem;
}

.changelog-item {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-left: 4px solid #3498db;
  border-radius: 0 8px 8px 0;
  scroll-margin-top: 120px;
}

.changelog-date {
  color: #3498db;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.changelog-title {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.changelog-item ul {
  margin: 0;
  padding-left: 1.5rem;
}

.changelog-item li {
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.changelog-item code {
  background: #e9ecef;
  color: #e83e8c;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
}

.changelog-item a {
  color: #3498db;
  text-decoration: none;
  word-break: break-all;
}

.changelog-item a:hover {
  text-decoration: underline;
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
