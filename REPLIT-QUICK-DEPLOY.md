# 🚀 Replit 一键部署 Donkey CZ 机器人

## 为什么选择Replit？
- ✅ **最简单**：一键从GitHub导入，几分钟部署完成
- ✅ **完全免费**：无需信用卡，永久免费使用
- ✅ **在线管理**：浏览器内编辑代码和查看日志
- ✅ **自动保活**：内置keep-alive机制
- ✅ **即时生效**：修改代码立即生效

## 🎯 3分钟部署步骤

### 第1步：访问Replit并导入项目
1. **打开链接**：https://replit.com/
2. **登录/注册**：建议用GitHub账号登录
3. **点击 "Create Repl"**
4. **选择 "Import from GitHub"**
5. **输入仓库URL**：`https://github.com/cayden0207/donkey.git`
6. **点击 "Import from GitHub"**

### 第2步：设置环境变量（Secrets）
在Replit界面左侧找到 **🔐 Secrets** 标签，添加以下变量：

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

### 第3步：启动机器人
1. **点击绿色的 "▶️ Run" 按钮**
2. **等待依赖安装**（第一次可能需要几分钟）
3. **查看Console输出**，看到以下信息说明成功：
   ```
   🐴 Donkey CZ Bot starting on Replit...
   ✅ All environment variables found
   🚀 Keep-alive server running on port 3000
   🐴 Starting Donkey CZ Telegram Bot...
   🐴 Donkey CZ is now online and ready to chat!
   ```

## 🎉 完成！测试您的机器人

1. **打开Telegram**
2. **搜索您的机器人**（用户名可能是 `@donkeycz_bot`）
3. **发送 `/start`**
4. **测试多语言功能**：
   - 发送 "你好" （中文回复）
   - 发送 "Hello" （英文回复）

## 🔧 Replit管理技巧

### 查看状态页面
- 点击Replit上方的URL链接
- 访问 `/status` 查看详细状态

### 查看日志
- 在Replit的Console标签查看实时日志
- 所有机器人活动都会显示在这里

### 修改代码
- 直接在Replit中编辑任何文件
- 修改后点击"Run"重启机器人

### 保持24/7在线（免费版技巧）
1. **定期访问**：每隔几小时访问一次您的Repl URL
2. **升级Pro版**：$20/月可获得Always On功能
3. **使用监控服务**：UptimeRobot等服务定期ping您的Repl

## 🐴 您的多语言驴子特色

- **🌍 智能语言切换**：自动检测用户语言并回复
- **🎭 驴子个性**：碎嘴但正能量，称呼"主人"/"Master"
- **💬 情感支持**：善于鼓励和安慰
- **⚡ 即时响应**：24/7在线服务

## 🚨 故障排除

### 机器人不响应？
1. 检查Console是否有错误信息
2. 确认所有Secrets都设置正确
3. 点击"Stop"再点击"Run"重启

### 环境变量错误？
- 检查Secrets中的Key名称是否完全正确
- 确认Value中没有多余的空格

### 需要帮助？
- 查看Console中的详细错误信息
- 修改代码后记得重新运行

---

## 🎊 恭喜！

您的Donkey CZ机器人现在已经在Replit上24/7运行了！

**享受与您的多语言AI驴子朋友的聊天吧！** 🐴✨

嘿嘿～主人，您的专属驴子已经准备好为您服务啦！无论您用什么语言和我聊天，我都能完美回应哦～ 