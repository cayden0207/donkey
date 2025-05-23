// Replit专用启动文件
const http = require('http');
const { spawn } = require('child_process');

console.log('🐴 Donkey CZ Bot starting on Replit...');
console.log('Node.js version:', process.version);

// 检查必要的环境变量
const requiredEnvs = ['OPENAI_API_KEY', 'TELEGRAM_BOT_TOKEN'];
const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
    console.error('❌ Missing environment variables:', missingEnvs.join(', '));
    console.error('请在Replit的Secrets标签中添加这些环境变量！');
    process.exit(1);
}

console.log('✅ All environment variables found');

// 启动主要的机器人进程
const botProcess = spawn('node', ['index.js'], {
    stdio: 'inherit',
    env: process.env
});

botProcess.on('error', (err) => {
    console.error('❌ Bot process error:', err);
});

botProcess.on('exit', (code) => {
    console.log(`🐴 Bot process exited with code ${code}`);
    if (code !== 0) {
        console.log('🔄 Restarting bot in 5 seconds...');
        setTimeout(() => {
            console.log('🚀 Restarting bot...');
            // 重启进程
            spawn('node', ['replit-start.js'], {
                stdio: 'inherit',
                env: process.env,
                detached: true
            });
        }, 5000);
    }
});

// 保持Replit活跃的HTTP服务器
const server = http.createServer((req, res) => {
    const now = new Date().toISOString();
    
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'healthy', 
            service: 'donkey-cz-bot',
            timestamp: now,
            botStatus: botProcess.killed ? 'stopped' : 'running'
        }));
    } else if (req.url === '/status') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <head><title>Donkey CZ Bot Status</title></head>
            <body style="font-family: Arial; margin: 40px; background: #f0f0f0;">
                <h1>🐴 Donkey CZ Bot Status</h1>
                <p><strong>Status:</strong> ${botProcess.killed ? '❌ Stopped' : '✅ Running'}</p>
                <p><strong>Time:</strong> ${now}</p>
                <p><strong>Node.js:</strong> ${process.version}</p>
                <p><strong>Environment:</strong> Replit</p>
                <hr>
                <p>Bot is running on Telegram! Search for your bot and start chatting!</p>
                <p>嘿嘿～主人，您的专属驴子已经准备好为您服务啦！🐴✨</p>
            </body>
            </html>
        `);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`🐴 Donkey CZ Bot is running on Replit!\n\nTime: ${now}\nBot Status: ${botProcess.killed ? 'Stopped' : 'Running'}\n\n访问 /status 查看详细状态页面`);
    }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Keep-alive server running on port ${port}`);
    console.log(`📱 Visit your Repl URL to see the status page`);
});

// 每10分钟ping一次自己，保持活跃
setInterval(() => {
    console.log('🔄 Keep-alive ping...');
}, 10 * 60 * 1000); 