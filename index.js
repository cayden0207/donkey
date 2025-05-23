// 简化版的Donkey CZ启动文件 - ESM版本
import { exec } from 'child_process';
import { join, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import http from 'http';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🐴 Starting Donkey CZ Bot...');
console.log('Node.js version:', process.version);
console.log('Current directory:', process.cwd());

// 检查必要的环境变量
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
    const jsFile = join(__dirname, 'dist', 'index.js');
    const mjsFile = join(__dirname, 'src', 'index.mjs');
    const tsFile = join(__dirname, 'src', 'index.ts');
    
    // 首先尝试纯JavaScript版本（最稳定）
    if (existsSync(mjsFile)) {
        console.log('🚀 Found pure JavaScript version, starting directly...');
        try {
            import(mjsFile).catch(error => {
                console.error('❌ Error running JavaScript version:', error);
                tryCompiledVersion();
            });
            return; // 如果成功，直接返回
        } catch (error) {
            console.error('❌ Error importing JavaScript version:', error);
        }
    }
    
    // 其次检查是否有构建好的JS文件
    if (existsSync(jsFile)) {
        console.log('📁 Found compiled JS file, starting bot...');
        try {
            import(jsFile).catch(error => {
                console.error('❌ Error running compiled bot:', error);
                tryTypeScriptDirect();
            });
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
                    import(jsFile).catch(error => {
                        console.error('❌ Error running compiled bot:', error);
                        tryTypeScriptDirect();
                    });
                } catch (error) {
                    console.error('❌ Error running compiled bot:', error);
                    tryTypeScriptDirect();
                }
            }
        });
    }
}

function tryCompiledVersion() {
    const jsFile = join(__dirname, 'dist', 'index.js');
    
    if (existsSync(jsFile)) {
        console.log('🔄 Trying compiled version...');
        try {
            import(jsFile).catch(error => {
                console.error('❌ Compiled version failed:', error);
                tryTypeScriptDirect();
            });
        } catch (error) {
            console.error('❌ Compiled version failed:', error);
            tryTypeScriptDirect();
        }
    } else {
        tryTypeScriptDirect();
    }
}

// 尝试直接运行TypeScript
function tryTypeScriptDirect() {
    console.log('🔄 Trying to run TypeScript directly...');
    
    // 尝试使用正确的ESM loader
    const tsCommand = 'node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts';
    
    exec(tsCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ ts-node failed, trying alternative approach:', error.message);
            tryAlternativeTypeScript();
        } else {
            console.log('✅ TypeScript executed successfully');
        }
    });
}

// 备选TypeScript执行方案
function tryAlternativeTypeScript() {
    console.log('🔄 Trying alternative TypeScript execution...');
    
    // 尝试不同的命令
    const commands = [
        'npx tsx src/index.ts',
        'node --experimental-loader ts-node/esm src/index.ts',
        'npm run ts-direct'
    ];
    
    function tryCommand(index) {
        if (index >= commands.length) {
            tryFallback();
            return;
        }
        
        const cmd = commands[index];
        console.log(`🔄 Trying command: ${cmd}`);
        
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Command failed: ${cmd}`, error.message);
                tryCommand(index + 1);
            } else {
                console.log(`✅ Command succeeded: ${cmd}`);
            }
        });
    }
    
    tryCommand(0);
}

// 备用方案
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
            console.error('🚨 All TypeScript approaches failed');
            console.error('💡 Please try manually running: node src/index.mjs');
            console.error('📋 Or check the Replit console for detailed error messages');
        }
    });
}

// 启动机器人
startBot();

// 添加基本的健康检查服务器
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