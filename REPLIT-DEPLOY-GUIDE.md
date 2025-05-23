# 🌟 Replit 部署指南 - 最简单的方式！

## 为什么选择Replit？
- ✅ **超级简单**：几乎零配置
- ✅ **完全免费**：基础版永久免费
- ✅ **在线编辑**：支持在线修改代码
- ✅ **自动运行**：Keep-alive功能保持24/7在线
- ✅ **即时部署**：几秒钟就能部署完成

## 🚀 超简单部署步骤

### 第1步：访问Replit
1. 打开：https://replit.com/
2. 点击 **"Sign up"** 注册（推荐用GitHub登录）

### 第2步：导入GitHub项目
1. 登录后，点击 **"Create Repl"**
2. 选择 **"Import from GitHub"**
3. 输入您的仓库URL：`https://github.com/cayden0207/donkey.git`
4. 点击 **"Import from GitHub"**

### 第3步：配置环境变量（Secrets）
在Replit项目页面：
1. 点击左侧工具栏的 **"Secrets"** (🔐图标)
2. 添加以下环境变量：

```
Key: OPENAI_API_KEY
Value: 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

Key: TELEGRAM_BOT_TOKEN
Value: 7738321110:AAEBvNa7w6_MZmhZaqLgucnq55SFmP98ssw

Key: MODEL_PROVIDER
Value: openai

Key: SMALL_MODEL
Value: gpt-4o-mini

Key: CHARACTER_PATH
Value: ./donkey-cz-character.json
```

### 第4步：运行项目
1. 点击绿色的 **"Run"** 按钮 ▶️
2. Replit会自动安装依赖并启动机器人
3. 在Console中查看启动日志

### 第5步：启用Always On（可选）
1. 在项目页面找到 **"Always On"** 设置
2. 升级到付费版本可启用24/7运行
3. 免费版可能需要定期访问来保持活跃

## 🔧 Replit特殊配置

Replit会自动检测Node.js项目，但您也可以创建 `.replit` 文件：

```toml
modules = ["nodejs-18"]

[nix]
channel = "stable-22_11"

[[ports]]
localPort = 3000
externalPort = 80

[languages.javascript]
pattern = "**/{*.js,*.jsx,*.ts,*.tsx}"
syntax = "javascript"

[deployment]
deploymentTarget = "cloudrun"
run = "npm start"
```

## 🎯 优势对比

| 特性 | Replit | Render | Railway |
|------|--------|--------|---------|
| 部署难度 | 🌟 最简单 | ✅ 简单 | ✅ 简单 |
| 免费套餐 | ✅ 永久免费 | ✅ 无需信用卡 | ✅ 需要信用卡 |
| 在线编辑 | ✅ | ❌ | ❌ |
| 配置复杂度 | 🌟 最低 | ✅ 中等 | ✅ 中等 |

## 🔍 验证部署

成功启动后，Console应该显示：
```
🐴 Starting Donkey CZ Telegram Bot...
🐴 Character loaded: Donkey CZ
🐴 Donkey CZ is now online and ready to chat!
```

## 💡 免费版Keep-Alive技巧

Replit免费版会在不活跃时休眠，解决方案：

1. **定期访问**：每隔几小时访问一次您的Repl
2. **使用监控服务**：用UptimeRobot等服务定期ping您的Repl
3. **升级付费版**：$20/月可获得Always On功能

## 🎉 完成！

恭喜！您的Donkey CZ现在运行在Replit上了！

**Replit的优势：**
- 🌟 部署最简单，几分钟搞定
- 💻 可以在线修改代码
- 🔄 自动同步到GitHub
- 📱 手机也能管理

现在就去测试您的多语言驴子吧！🐴✨
