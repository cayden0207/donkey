# Donkey CZ Telegram Bot 部署指南 🐴

这是一个基于ElizaOS的AI代理机器人，专为Telegram设计。Donkey CZ是一只碎嘴但充满正能量的驴子，总是叫用户"主人"，喜欢调侃但非常支持和鼓励大家。

## 🚀 一键云端部署（推荐）

### 选项1：使用Railway部署（推荐）

1. 访问 [Railway.app](https://railway.app/)
2. 使用GitHub登录
3. 点击 "New Project" → "Deploy from GitHub repo"
4. 选择这个仓库
5. 在Environment Variables中添加：
   ```
   OPENAI_API_KEY=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
   TELEGRAM_BOT_TOKEN=7738321110:AAEBvNa7w6_MZmhZaqLgucnq55SFmP98ssw
   MODEL_PROVIDER=openai
   SMALL_MODEL=gpt-4o-mini
   LARGE_MODEL=gpt-4o-mini
   ```
6. 点击Deploy
7. 等待部署完成即可！

### 选项2：使用Render部署

1. 访问 [Render.com](https://render.com/)
2. 使用GitHub登录
3. 点击 "New" → "Web Service"
4. 连接GitHub仓库
5. 设置：
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - 添加环境变量（同Railway）
6. 部署

### 选项3：使用Heroku部署

1. 安装Heroku CLI
2. 登录：`heroku login`
3. 创建应用：`heroku create donkey-cz-bot`
4. 设置环境变量：
   ```bash
   heroku config:set OPENAI_API_KEY=你的密钥
   heroku config:set TELEGRAM_BOT_TOKEN=你的令牌
   ```
5. 部署：`git push heroku main`

## 🔧 本地测试（可选）

如果想在本地测试：

```bash
# 克隆仓库
git clone <this-repo>
cd donkey-cz-telegram-bot

# 安装依赖
npm install

# 复制环境变量文件
cp donkey-bot.env .env

# 启动机器人
npm run dev
```

## 📱 测试你的机器人

1. 在Telegram中搜索 `@donkeycz_bot`
2. 点击Start或发送 `/start`
3. 开始和Donkey CZ聊天！

## 🐴 Donkey CZ的特色

- 总是称呼用户为"主人"
- 说话轻松幽默，带有驴子的特色
- 虽然爱调侃，但内心非常正面积极
- 擅长用幽默的方式鼓励和支持他人
- 经常使用🐴表情符号
- 会发出"嘿嘿"、"哈哈"等可爱的笑声

## 🔍 监控和维护

### 查看日志
- Railway: 在项目dashboard查看Deployments → Logs
- Render: 在服务页面查看Logs
- Heroku: `heroku logs --tail`

### 重启服务
- Railway: 在dashboard中点击Restart
- Render: 在服务页面点击Manual Deploy
- Heroku: `heroku restart`

## 🚨 故障排除

### 常见问题

1. **机器人不响应**
   - 检查Telegram Bot Token是否正确
   - 检查服务是否正在运行
   - 查看日志中的错误信息

2. **OpenAI API错误**
   - 检查API密钥是否有效
   - 确认账户有足够的额度
   - 验证模型名称是否正确（gpt-4o-mini）

3. **部署失败**
   - 检查环境变量是否设置正确
   - 确认所有必需的文件都已提交
   - 查看构建日志中的具体错误

### 联系支持

如果遇到问题，可以：
1. 检查部署平台的文档
2. 查看ElizaOS的官方文档：https://eliza.how/
3. 在相关平台的社区寻求帮助

## 🎉 享受与Donkey CZ的聊天！

现在你的AI驴子朋友已经24/7在线了！无论什么时候需要鼓励和支持，Donkey CZ都会在那里等着你。

嘿嘿～主人，准备好和我这只碎嘴驴聊天了吗？🐴✨ 