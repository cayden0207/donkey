# 🚂 Railway 部署 Donkey CZ 机器人详细指南

## 📋 准备工作

在开始部署前，确保您有以下信息：
- ✅ OpenAI API密钥：`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`
- ✅ Telegram Bot Token：`7738321110:AAEBvNa7w6_MZmhZaqLgucnq55SFmP98ssw`
- ✅ GitHub仓库：`https://github.com/cayden0207/donkey.git`

## 🚀 一步步部署指南

### 第1步：访问Railway

1. 打开浏览器，访问：https://railway.app/
2. 点击右上角的 **"Start for Free"** 或 **"Log in"**

### 第2步：GitHub登录

1. 选择 **"Sign in with GitHub"**
2. 如果还没有GitHub账号，先去 github.com 注册
3. 授权Railway访问您的GitHub账号

### 第3步：创建新项目

1. 在Railway仪表板中，点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 搜索并选择您的仓库：`cayden0207/donkey`
4. 点击 **"Deploy"**

### 第4步：配置环境变量

项目创建后，您需要添加环境变量：

1. 在项目页面，点击您的服务（通常显示为服务名）
2. 切换到 **"Variables"** 标签
3. 点击 **"New Variable"** 按钮
4. 逐一添加以下环境变量：

```
变量名：OPENAI_API_KEY
值：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

变量名：TELEGRAM_BOT_TOKEN
值：7738321110:AAEBvNa7w6_MZmhZaqLgucnq55SFmP98ssw

变量名：MODEL_PROVIDER
值：openai

变量名：SMALL_MODEL
值：gpt-4o-mini

变量名：LARGE_MODEL
值：gpt-4o-mini

变量名：EMBEDDING_MODEL
值：text-embedding-ada-002

变量名：CHARACTER_PATH
值：./donkey-cz-character.json

变量名：LOG_LEVEL
值：info

变量名：PORT
值：3000
```

### 第5步：等待部署完成

1. 添加完所有环境变量后，Railway会自动重新部署
2. 在 **"Deployments"** 标签中，您可以看到部署进度
3. 等待状态变为 **"SUCCESS"** ✅

### 第6步：检查部署状态

1. 在 **"Logs"** 标签中查看日志
2. 如果一切正常，您应该看到类似这样的日志：
   ```
   🐴 Starting Donkey CZ Telegram Bot...
   🐴 Character loaded: Donkey CZ
   🐴 Donkey CZ is now online and ready to chat!
   🐴 Telegram Bot Username: @donkeycz_bot
   ```

## 🔧 特殊功能配置

### 多语言支持 🌍

您的Donkey CZ已经配置为根据用户的语言自动回复：
- 用户说中文 → 驴子用中文回复
- 用户说英文 → 驴子用英文回复
- 支持其他语言！

### 驴子的个性特点 🐴

- 总是称呼用户为"主人"（中文）或"Master"（英文）
- 碎嘴但充满正能量
- 使用🐴表情符号
- 幽默调侃但非常支持鼓励

## 📱 测试您的机器人

1. 打开Telegram
2. 搜索 `@donkeycz_bot`（您机器人的用户名）
3. 点击 **"Start"** 或发送 `/start`
4. 开始聊天！

### 测试多语言功能

尝试用不同语言和驴子聊天：

**中文测试：**
```
你好
我今天心情不好
谢谢你的鼓励
```

**英文测试：**
```
Hello
I'm feeling down today
Thank you for the encouragement
```

## 🔍 监控和维护

### 查看日志
1. 在Railway项目页面，点击您的服务
2. 切换到 **"Logs"** 标签
3. 实时查看机器人运行状态

### 重启服务
如果需要重启：
1. 在 **"Settings"** 标签中
2. 点击 **"Restart"** 按钮

### 更新代码
当您更新GitHub仓库时，Railway会自动重新部署！

## 🚨 故障排除

### 常见问题

**1. 机器人不响应**
- 检查Logs中是否有错误信息
- 确认Telegram Bot Token正确
- 验证环境变量设置

**2. API错误**
- 检查OpenAI API密钥是否有效
- 确认账户有足够额度

**3. 部署失败**
- 检查所有环境变量是否设置正确
- 查看Build Logs中的具体错误信息

### 获取帮助

如果遇到问题：
1. 检查Railway文档：https://docs.railway.app/
2. 查看项目的GitHub Issues
3. 在Telegram中测试机器人响应

## 🎉 完成！

恭喜您！现在您的Donkey CZ机器人已经24/7在线运行了！

**您的机器人特色：**
- ✅ 24/7在线运行
- ✅ 多语言智能回复
- ✅ 碎嘴但正能量的驴子个性
- ✅ 自动适应用户语言
- ✅ 云端部署，无需本地维护

嘿嘿～主人，您的专属驴子已经准备好为您服务啦！🐴✨

---

## 💡 高级技巧

### 自定义机器人
如果想修改驴子的性格或回复风格：
1. 编辑 `donkey-cz-character.json` 文件
2. 提交到GitHub
3. Railway会自动重新部署

### 成本优化
Railway提供免费额度，但建议监控使用情况：
- 查看 **"Usage"** 标签了解资源消耗
- 根据需要升级到付费计划

现在就去和您的AI驴子朋友聊天吧！🐴 