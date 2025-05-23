import { AgentRuntime, elizaLogger } from "@elizaos/core";
import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import * as http from "http";
import * as url from "url";
import * as net from "net";

// 加载环境变量
dotenv.config();

let globalRuntime = null;
let telegramClient = null;

// 检查端口是否可用
function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    server.on('error', () => {
      resolve(false);
    });
  });
}

// 查找可用端口
async function findAvailablePort(startPort = 3000) {
  let port = startPort;
  while (port < startPort + 100) {
    if (await checkPort(port)) {
      return port;
    }
    port++;
  }
  throw new Error('No available port found');
}

async function initializeTelegramBot() {
  if (!globalRuntime) {
    throw new Error("Runtime not initialized");
  }

  try {
    elizaLogger.log("🐴 🔌 Initializing Telegram bot...");
    
    // 尝试动态导入Telegram客户端
    const telegramModule = await import("@elizaos/client-telegram");
    elizaLogger.log("🐴 📦 Telegram module loaded:", Object.keys(telegramModule));
    
    // 尝试不同的导出名称
    const TelegramClient = telegramModule.default || 
                          telegramModule.TelegramClientInterface || 
                          telegramModule.TelegramClient ||
                          telegramModule;
    
    elizaLogger.log("🐴 🔧 Creating Telegram client with:", typeof TelegramClient);
    
    if (typeof TelegramClient === 'function') {
      telegramClient = new TelegramClient(globalRuntime, process.env.TELEGRAM_BOT_TOKEN);
      
      if (telegramClient.start) {
        await telegramClient.start();
        elizaLogger.log("🐴 ✅ Telegram client started successfully!");
        return { success: true, message: "Telegram bot initialized successfully!" };
      } else {
        elizaLogger.log("🐴 ⚠️ Telegram client created but no start method found");
        return { success: true, message: "Telegram client created (no start method)" };
      }
    } else {
      elizaLogger.error("🐴 ❌ TelegramClient is not a constructor function");
      return { success: false, message: "TelegramClient is not constructible" };
    }
    
  } catch (error) {
    elizaLogger.error("🐴 ❌ Telegram initialization failed:", error);
    return { success: false, message: error.message || String(error) };
  }
}

async function startDonkeyCZBot() {
  try {
    elizaLogger.log("🐴 Starting Donkey CZ Telegram Bot...");

    // 加载角色配置
    const characterPath = process.env.CHARACTER_PATH || "./donkey-cz-character.json";
    
    if (!fs.existsSync(characterPath)) {
      throw new Error(`Character file not found: ${characterPath}`);
    }

    const characterData = JSON.parse(fs.readFileSync(characterPath, "utf8"));

    elizaLogger.log("🐴 Character loaded:", characterData.name);

    // 验证必需的环境变量
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is required");
    }

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error("TELEGRAM_BOT_TOKEN is required");
    }

    elizaLogger.log("🐴 Creating AgentRuntime...");

    // 创建运行时
    globalRuntime = new AgentRuntime({
      databaseAdapter: undefined, // 使用内存存储，生产环境建议使用数据库
      token: process.env.OPENAI_API_KEY,
      serverUrl: process.env.MODEL_ENDPOINT || "https://api.openai.com/v1",
      modelProvider: (process.env.MODEL_PROVIDER || "openai"),
      actions: [],
      evaluators: [],
      providers: [],
      plugins: [
        bootstrapPlugin
      ],
      character: characterData,
    });

    // 添加延迟确保ElizaOS完全初始化
    await new Promise(resolve => setTimeout(resolve, 2000));

    elizaLogger.log("🐴 ✅ Donkey CZ AgentRuntime initialized successfully!");
    elizaLogger.log("🐴 🎯 Core AI system is ready!");
    
    // 查找可用端口
    const requestedPort = parseInt(process.env.PORT) || 3000;
    const availablePort = await findAvailablePort(requestedPort);
    
    elizaLogger.log(`🐴 🔍 Requested port: ${requestedPort}, Available port: ${availablePort}`);
    
    // 创建HTTP服务器用于手动触发Telegram初始化
    const server = http.createServer(async (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      
      // 设置CORS头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      if (parsedUrl.pathname === '/api/telegram-bot' && req.method === 'GET') {
        try {
          const result = await initializeTelegramBot();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: error.message || String(error) }));
        }
      } else if (parsedUrl.pathname === '/api/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'running',
          runtime: globalRuntime ? 'initialized' : 'not initialized',
          telegram: telegramClient ? 'connected' : 'not connected',
          character: characterData.name,
          port: availablePort,
          timestamp: new Date().toISOString()
        }));
      } else if (parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
          <head><title>🐴 Donkey CZ Bot Control Panel</title></head>
          <body style="font-family: Arial; margin: 40px; background: #f0f0f0;">
            <h1>🐴 Donkey CZ Bot Control Panel</h1>
            <p><strong>Status:</strong> Core system running</p>
            <p><strong>Character:</strong> ${characterData.name}</p>
            <p><strong>Runtime:</strong> ${globalRuntime ? '✅ Initialized' : '❌ Not initialized'}</p>
            <p><strong>Telegram:</strong> ${telegramClient ? '✅ Connected' : '⚠️ Not connected'}</p>
            <p><strong>Port:</strong> ${availablePort}</p>
            <hr>
            <button onclick="initBot()" style="padding: 10px 20px; font-size: 16px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
              🚀 Initialize Telegram Bot
            </button>
            <button onclick="checkStatus()" style="padding: 10px 20px; font-size: 16px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
              📊 Check Status
            </button>
            <div id="result" style="margin-top: 20px; padding: 10px; background: white; border-radius: 5px;"></div>
            
            <script>
              async function initBot() {
                const result = document.getElementById('result');
                result.innerHTML = '🔄 Initializing Telegram bot...';
                
                try {
                  const response = await fetch('/api/telegram-bot');
                  const data = await response.json();
                  
                  if (data.success) {
                    result.innerHTML = '✅ ' + data.message;
                    result.style.background = '#d4edda';
                  } else {
                    result.innerHTML = '❌ ' + data.message;
                    result.style.background = '#f8d7da';
                  }
                } catch (error) {
                  result.innerHTML = '❌ Error: ' + error.message;
                  result.style.background = '#f8d7da';
                }
              }
              
              async function checkStatus() {
                const result = document.getElementById('result');
                
                try {
                  const response = await fetch('/api/status');
                  const data = await response.json();
                  result.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                  result.style.background = '#d1ecf1';
                } catch (error) {
                  result.innerHTML = '❌ Error: ' + error.message;
                  result.style.background = '#f8d7da';
                }
              }
            </script>
          </body>
          </html>
        `);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
    });

    server.listen(availablePort, () => {
      elizaLogger.log(`🐴 🌐 HTTP server running on port ${availablePort}`);
      elizaLogger.log(`🐴 🎛️ Control panel: http://localhost:${availablePort}`);
      elizaLogger.log(`🐴 🤖 Telegram init endpoint: http://localhost:${availablePort}/api/telegram-bot`);
    });

    elizaLogger.log(`🐴 📝 Character: ${characterData.name}`);
    elizaLogger.log(`🐴 🤖 Bot Username: @${characterData.username || 'donkeycz_bot'}`);
    elizaLogger.log("🐴 ⭐ Status: Core system operational!");
    elizaLogger.log("🐴 💡 Visit the control panel to initialize Telegram bot manually");
    
    // 保持进程运行
    process.on('SIGINT', () => {
      elizaLogger.log("🐴 Donkey CZ is shutting down... Goodbye, 主人们!");
      process.exit(0);
    });

  } catch (error) {
    elizaLogger.error("🐴 Failed to start Donkey CZ Bot:", error);
    process.exit(1);
  }
}

// 启动机器人
elizaLogger.log("🐴 ⚡ Starting initialization...");
startDonkeyCZBot().catch((error) => {
  elizaLogger.error("🐴 Unexpected error:", error);
  process.exit(1);
}); 