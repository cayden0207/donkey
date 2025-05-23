import { AgentRuntime, elizaLogger } from "@elizaos/core";
import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";
import TelegramClientInterface from "@elizaos/client-telegram";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// 加载环境变量
dotenv.config();

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

    // 创建运行时
    const runtime = new AgentRuntime({
      databaseAdapter: undefined, // 使用内存存储，生产环境建议使用数据库
      token: process.env.OPENAI_API_KEY!,
      serverUrl: process.env.MODEL_ENDPOINT || "https://api.openai.com/v1",
      modelProvider: (process.env.MODEL_PROVIDER || "openai") as any,
      actions: [],
      evaluators: [],
      providers: [],
      plugins: [
        bootstrapPlugin
      ],
      character: characterData,
    });

    elizaLogger.log("🐴 Donkey CZ AgentRuntime initialized successfully!");
    
    // 尝试标准的Telegram客户端初始化
    try {
      elizaLogger.log("🐴 Connecting to Telegram bot @donkeycz_bot...");
      elizaLogger.log("🐴 Telegram Bot Token configured:", process.env.TELEGRAM_BOT_TOKEN ? "✅ Yes" : "❌ No");
      
      // TODO: 正确的Telegram客户端初始化方式仍需研究
      // const telegramClient = TelegramClientInterface(runtime, process.env.TELEGRAM_BOT_TOKEN!);
      
      elizaLogger.log("🐴 ⚠️ Telegram client initialization temporarily skipped");
      elizaLogger.log("🐴 💡 Core AI system is ready, Telegram integration pending");
      
    } catch (telegramError) {
      elizaLogger.error("🐴 ❌ Telegram connection failed:", telegramError);
      elizaLogger.log("🐴 💡 Core AI system is still running, but Telegram integration failed");
    }
    
    elizaLogger.log(`🐴 Character: ${characterData.name}`);
    elizaLogger.log(`🐴 Bot Username: @${characterData.username || 'donkeycz_bot'}`);
    
    // 保持进程运行
    process.on('SIGINT', () => {
      elizaLogger.log("🐴 Donkey CZ is shutting down... Goodbye, 主人们!");
      process.exit(0);
    });

    // 保持进程活跃
    elizaLogger.log("🐴 Bot is running... Ready to chat with 主人们!");

  } catch (error) {
    elizaLogger.error("🐴 Failed to start Donkey CZ Bot:", error);
    process.exit(1);
  }
}

// 启动机器人
startDonkeyCZBot().catch((error) => {
  elizaLogger.error("🐴 Unexpected error:", error);
  process.exit(1);
}); 