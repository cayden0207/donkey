# 🎨 Render.com 部署 Donkey CZ 机器人指南

## 为什么选择Render？
- ✅ **完全免费**的套餐（有限制但足够个人使用）
- ✅ **自动部署**：连接GitHub自动更新
- ✅ **简单易用**：界面友好，配置简单
- ✅ **24/7运行**：支持长期运行的应用
- ✅ **无需信用卡**：免费套餐不需要绑卡

## 🚀 快速部署步骤

### 第1步：访问Render
1. 打开浏览器，访问：https://render.com/
2. 点击右上角 **"Get Started for Free"**

### 第2步：注册登录
1. 选择 **"GitHub"** 登录（推荐）
2. 或者用邮箱注册新账号
3. 授权Render访问您的GitHub

### 第3步：创建新服务
1. 在Render仪表板，点击 **"New +"**
2. 选择 **"Web Service"**
3. 选择 **"Build and deploy from a Git repository"**
4. 点击 **"Next"**

### 第4步：连接GitHub仓库
1. 找到并选择您的仓库：`cayden0207/donkey`
2. 点击 **"Connect"**

### 第5步：配置服务设置
填写以下配置：

```
Name: donkey-cz-bot
Region: Oregon (US West) 或任选
Branch: main
Root Directory: (留空)
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### 第6步：添加环境变量
在 **"Environment Variables"** 部分，点击 **"Add Environment Variable"**，添加：

```
OPENAI_API_KEY=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

TELEGRAM_BOT_TOKEN=7738321110:AAEBvNa7w6_MZmhZaqLgucnq55SFmP98ssw

MODEL_PROVIDER=openai

SMALL_MODEL=gpt-4o-mini

LARGE_MODEL=gpt-4o-mini

CHARACTER_PATH=./donkey-cz-character.json

PORT=10000
```

### 第7步：选择套餐
1. 选择 **"Free"** 套餐
2. 点击 **"Create Web Service"**

### 第8步：等待部署
- Render会自动构建和部署
- 在 **"Logs"** 中查看进度
- 部署成功后状态显示为 **"Live"** 🟢

## 🔍 验证部署

在Logs中您应该看到：
```
🐴 Starting Donkey CZ Telegram Bot...
🐴 Character loaded: Donkey CZ
🐴 Donkey CZ is now online and ready to chat!
```

## 📊 Render免费套餐限制

- **内存**：512MB RAM
- **CPU**：0.1 CPU
- **睡眠机制**：15分钟无活动后自动休眠
- **月使用时间**：750小时（约31天）
- **自动唤醒**：收到请求时自动唤醒

> 💡 **提示**：虽然有睡眠机制，但Telegram机器人会保持活跃，基本不会休眠

## 🎯 优势对比

| 特性 | Render | Railway | Vercel |
|------|--------|---------|--------|
| 免费套餐 | ✅ 无需信用卡 | ✅ 需要信用卡 | ❌ 不适合长期运行 |
| 长期运行 | ✅ | ✅ | ❌ |
| 自动部署 | ✅ | ✅ | ✅ |
| 配置简单 | ✅ | ✅ | ❌ 需要修改代码 |

## 🔧 管理和监控

### 查看日志
- 在服务页面点击 **"Logs"** 标签
- 实时查看机器人运行状态

### 重新部署
- 在服务页面点击 **"Manual Deploy"**
- 或者推送到GitHub自动触发

### 修改设置
- 在 **"Settings"** 中修改环境变量
- 修改后自动重新部署

现在就去试试Render吧！部署完成后您的驴子就24/7在线啦！🐴✨ 