import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Element Plus 样式
import 'element-plus/dist/index.css'

// 导入全局样式
import './assets/styles/main.scss'
import './assets/css/style.css'

// 导入Prism.js用于代码高亮
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
