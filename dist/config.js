// 代理服务器配置
const CONFIG = {
    // 代理服务器地址配置
    PROXY_SERVER: {
        // 远程代理服务器配置
        REMOTE_HOST: 'api.notifyhub.example.com',  // 远程代理服务器域名
        REMOTE_PORT: '443',            // HTTPS 端口
        USE_HTTPS: true,               // 使用 HTTPS

        // 是否使用远程代理服务器
        USE_REMOTE: false,  // 使用本地代理（本地代理会转发到 NotifyHub API）

        // 获取代理服务器地址
        getHost() {
            // 如果启用远程代理，返回远程主机地址
            if (this.USE_REMOTE) {
                return this.REMOTE_HOST;
            }
            // 否则使用当前页面的主机名
            return window.location.hostname || 'localhost';
        },

        // 获取代理服务器端口
        getPort() {
            // 如果使用远程代理，返回远程端口
            if (this.USE_REMOTE) {
                return this.REMOTE_PORT;
            }

            // 检测是否在开发环境（通过端口号判断）
            const currentPort = window.location.port;
            const isDev = currentPort === '5173' || currentPort === '3000' || currentPort === '8080';

            // 开发环境使用8081端口
            // 生产环境使用443端口（HTTPS）
            return isDev ? '8081' : '443';
        },

        // 生成完整的代理服务器URL
        getBaseUrl() {
            const host = this.getHost();
            const port = this.getPort();

            // 远程代理服务器
            if (this.USE_REMOTE) {
                const protocol = this.USE_HTTPS ? 'https' : 'http';
                // HTTPS 默认端口 443 可以省略
                if (protocol === 'https' && port === '443') {
                    return `https://${host}`;
                }
                // HTTP 默认端口 80 可以省略
                if (protocol === 'http' && port === '80') {
                    return `http://${host}`;
                }
                return `${protocol}://${host}:${port}`;
            }

            // 本地开发环境
            const protocol = window.location.protocol;

            if (host === 'localhost' || host === '127.0.0.1') {
                return port === '8081' ? `http://localhost:${port}` : `${protocol}//localhost:${port}`;
            }

            // 生产环境
            // HTTPS默认端口443可以省略
            if (protocol === 'https:' && port === '443') {
                return `${protocol}//${host}`;
            }
            // HTTP默认端口80可以省略
            if (protocol === 'http:' && port === '80') {
                return `${protocol}//${host}`;
            }

            return `${protocol}//${host}:${port}`;
        },

        // 获取API代理URL
        getApiUrl() {
            return `${this.getBaseUrl()}/api/`;
        }
    },

    // 目标API服务器配置
    TARGET_API: {
        HOST: 'api.notifyhub.example.com',
        PORT: '443',

        getBaseUrl() {
            return `https://${this.HOST}`;
        }
    }
};

// 导出配置（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// 全局配置对象
window.CONFIG = CONFIG;
