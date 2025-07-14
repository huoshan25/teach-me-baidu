# 帮伸手党百度 - Teach Me Baidu

一个幽默的"教学"网站，通过动画演示教用户如何使用百度搜索。

## 🎯 功能特性

- **链接生成器** - 在首页输入搜索内容，生成教学链接
- **动画教学** - 模拟鼠标操作，演示百度搜索流程
- **响应式设计** - 支持桌面端和移动端
- **分享功能** - 一键复制教学链接，分享给需要的朋友

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📖 使用方法

### 1. 生成教学链接
- 访问首页 `/`
- 输入要搜索的内容（如："如何煮鸡蛋"）
- 点击"生成教学链接"
- 复制生成的链接

### 2. 分享教学链接
- 将链接发送给需要学习百度搜索的朋友
- 朋友点击链接后会看到动画教学演示
- 演示结束后自动跳转到真实的百度搜索结果

## 🛠️ 技术栈

- **框架**: Next.js 15 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **包管理**: pnpm

## 📁 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页 - 链接生成器
│   └── teach/
│       └── page.tsx      # 教学页面 - 动画演示
├── components/
│   ├── AnimatedCursor.tsx    # 动画鼠标组件
│   ├── BaiduInterface.tsx    # 百度界面模拟
│   ├── StepIndicator.tsx     # 步骤提示组件
│   └── TypingAnimation.tsx   # 打字动画组件
├── hooks/
│   ├── useAnimationSequence.ts  # 动画序列控制
│   └── useUrlParams.ts          # URL参数解析
└── utils/
    ├── animations.ts     # 动画配置
    └── constants.ts      # 常量定义
```

## 🎨 自定义配置

### 修改动画时长
编辑 `src/utils/constants.ts` 中的 `ANIMATION_STEPS` 配置：

```typescript
export const ANIMATION_STEPS = [
  { name: 'showCursor', duration: 1000 },    // 显示鼠标
  { name: 'moveToInput', duration: 2000 },   // 移动到输入框
  { name: 'clickInput', duration: 500 },     // 点击输入框
  { name: 'typeText', duration: 2000 },      // 输入文字
  { name: 'moveToButton', duration: 1500 },  // 移动到按钮
  { name: 'clickButton', duration: 500 },    // 点击按钮
  { name: 'redirect', duration: 1000 }       // 跳转
];
```

### 修改动画效果
编辑 `src/utils/animations.ts` 中的动画变体配置。

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
