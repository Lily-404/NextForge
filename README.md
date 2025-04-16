# NextForge

个人落地页快速生成（填写信息->生成next.js项目->直接打包部署)

## 特性

- 🚀 基于 Next.js 15.2.4 构建
- 💅 使用 Tailwind CSS 构建样式
- 🎨 基于 Radix UI 的精美组件
- 🌙 支持暗色模式（next-themes）
- 📱 响应式设计

## 环境要求

- Node.js 18+
- pnpm（推荐）或 npm

## 快速开始

1. 克隆仓库：

```bash
git clone [仓库地址]
cd nextjs-multi-template
```

2. 安装依赖：

```bash
pnpm install
# 或
npm install
```

3. 运行开发服务器：

```bash
pnpm dev
# 或
npm run dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
├── app/                # Next.js 应用目录
├── components/         # 可复用的 UI 组件
├── hooks/             # 自定义 React hooks
├── lib/               # 工具函数和配置
├── public/            # 静态资源
├── styles/            # 全局样式和 Tailwind 配置
├── types/             # TypeScript 类型定义
└── data/              # 数据文件和模拟数据
```

## 可用脚本

- `pnpm dev` - 运行开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行 ESLint 代码检查

## 主要依赖

- Next.js - React 框架
- Radix UI - 无头 UI 组件库
- Tailwind CSS - 实用优先的 CSS 框架
- React Hook Form - 表单处理
- Zod - 模式验证
- Recharts - 图表库
- Lucide React - 图标库

## 贡献

欢迎提交 Pull Request 来贡献代码！

## 许可证

本项目基于 MIT 许可证开源 - 查看 LICENSE 文件了解详情。
