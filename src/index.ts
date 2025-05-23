import { AgentRuntime, elizaLogger } from "@elizaos/core";
import TelegramClient from "@elizaos/client-telegram";
import { bootstrapPlugin } from "@elizaos/plugin-bootstrap";
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

    // 创建 Telegram 客户端 - 暂时注释掉以解决类型问题
    // const telegramClient = new TelegramClient(runtime, process.env.TELEGRAM_BOT_TOKEN!);

    // elizaLogger.log("🐴 Donkey CZ is now online and ready to chat!");
    // elizaLogger.log(`🐴 Telegram Bot Username: @${characterData.username || 'donkeycz_bot'}`);
    
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
startDonkeyCZBot().catch((error) => {
  elizaLogger.error("🐴 Unexpected error:", error);
  process.exit(1);
}); 