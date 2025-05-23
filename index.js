// 简化版的Donkey CZ启动文件
const { exec } = require('child_process');
const path = require('path');

console.log('🐴 Starting Donkey CZ Bot...');
console.log('Node.js version:', process.version);
console.log('Current directory:', process.cwd());

// 检查环境变量
const requiredEnvs = ['OPENAI_API_KEY', 'TELEGRAM_BOT_TOKEN'];
for (const env of requiredEnvs) {
    if (!process.env[env]) {
        console.error(`❌ Missing environment variable: ${env}`);
        process.exit(1);
    }
}

console.log('✅ Environment variables check passed');

// 尝试运行TypeScript版本
const tsFile = path.join(__dirname, 'src', 'index.ts');
const jsFile = path.join(__dirname, 'dist', 'index.js');

// 首先尝试构建
exec('npm run build', (error, stdout, stderr) => {
    if (error) {
        console.log('Build failed, trying to run TypeScript directly...');
        // 如果构建失败，尝试直接运行ts-node
        exec('npx ts-node --loader ts-node/esm src/index.ts', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Failed to start bot:', error);
                process.exit(1);
            }
            console.log(stdout);
            if (stderr) console.error(stderr);
        });
    } else {
        console.log('Build successful, starting bot...');
        // 构建成功，运行编译后的JS
        require(jsFile);
    }
});

// 添加基本的健康检查服务器
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy', service: 'donkey-cz-bot' }));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Donkey CZ Bot is running! 🐴');
    }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Health check server running on port ${port}`);
}); 