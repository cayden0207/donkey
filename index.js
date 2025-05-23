// 简化版的Donkey CZ启动文件
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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

// 启动机器人的函数
function startBot() {
    const jsFile = path.join(__dirname, 'dist', 'index.js');
    const tsFile = path.join(__dirname, 'src', 'index.ts');
    
    // 首先检查是否有构建好的JS文件
    if (fs.existsSync(jsFile)) {
        console.log('📁 Found compiled JS file, starting bot...');
        try {
            require(jsFile);
        } catch (error) {
            console.error('❌ Error running compiled bot:', error);
            tryTypeScriptDirect();
        }
    } else {
        // 尝试构建
        console.log('🔨 Building TypeScript...');
        exec('npm run build', (error, stdout, stderr) => {
            if (error) {
                console.log('Build failed, trying TypeScript directly...');
                tryTypeScriptDirect();
            } else {
                console.log('✅ Build successful, starting bot...');
                try {
                    require(jsFile);
                } catch (error) {
                    console.error('❌ Error running compiled bot:', error);
                    tryTypeScriptDirect();
                }
            }
        });
    }
}

// 尝试直接运行TypeScript
function tryTypeScriptDirect() {
    console.log('🔄 Trying to run TypeScript directly...');
    
    // 尝试简单的ts-node命令（不使用--loader选项）
    exec('npx ts-node src/index.ts', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ ts-node failed, trying alternative approach:', error.message);
            // 最后的备用方案
            tryFallback();
        } else {
            console.log('✅ TypeScript started successfully');
            console.log(stdout);
            if (stderr) console.error(stderr);
        }
    });
}

// 备用方案：创建一个简单的JS包装器
function tryFallback() {
    console.log('🆘 Using fallback approach...');
    
    // 检查是否已安装依赖
    exec('npm list @elizaos/core', (error, stdout, stderr) => {
        if (error) {
            console.log('📦 Installing dependencies...');
            exec('npm install', (error, stdout, stderr) => {
                if (error) {
                    console.error('❌ Failed to install dependencies:', error);
                    process.exit(1);
                }
                console.log('✅ Dependencies installed');
                startBot();
            });
        } else {
            console.log('✅ Dependencies already installed');
            // 使用require钩子加载TypeScript
            try {
                require('ts-node/register');
                require('./src/index.ts');
            } catch (error) {
                console.error('❌ Final fallback failed:', error);
                console.error('请检查您的TypeScript配置和依赖安装');
                process.exit(1);
            }
        }
    });
}

// 启动机器人
startBot();

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