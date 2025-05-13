# 项目目录结构

```
nextjs-multi-template/
├── app/                      # Next.js 应用主目录
│   ├── layout.tsx           # 根布局组件
│   ├── page.tsx             # 首页
│   └── globals.css          # 全局样式
│
├── components/              # 组件目录
│   ├── previews/           # 模板预览组件
│   │   ├── MinimalTemplate.tsx    # 简约风格模板
│   │   ├── FunTemplate.tsx        # 趣味风格模板
│   │   └── ProfessionalTemplate.tsx # 专业风格模板
│   │
│   ├── ui/                 # UI 组件
│   │   ├── Avatar.tsx      # 头像组件
│   │   ├── Button.tsx      # 按钮组件
│   │   ├── Card.tsx        # 卡片组件
│   │   └── SocialLinks.tsx # 社交媒体链接组件
│   │
│   └── layout/            # 布局组件
│       ├── Header.tsx      # 页头组件
│       ├── Footer.tsx      # 页脚组件
│       └── Navigation.tsx  # 导航组件
│
├── lib/                    # 工具函数和库
│   ├── utils/             # 工具函数
│   │   ├── validation.ts  # 数据验证
│   │   ├── formatting.ts  # 数据格式化
│   │   └── image.ts       # 图片处理
│   │
│   └── hooks/             # 自定义 Hooks
│       ├── useTheme.ts    # 主题 Hook
│       └── useAnimation.ts # 动画 Hook
│
├── types/                  # TypeScript 类型定义
│   ├── index.ts           # 类型导出
│   └── user.ts            # 用户数据类型
│
├── styles/                 # 样式文件
│   ├── themes/            # 主题样式
│   │   ├── minimal.ts     # 简约主题
│   │   ├── fun.ts         # 趣味主题
│   │   └── professional.ts # 专业主题
│   │
│   └── animations/        # 动画样式
│       ├── fade.ts        # 淡入淡出
│       └── slide.ts       # 滑动效果
│
├── public/                 # 静态资源
│   ├── images/            # 图片资源
│   └── icons/             # 图标资源
│
├── docs/                   # 文档
│   ├── core-features.md   # 核心功能文档
│   └── project-structure.md # 项目结构文档
│
├── tests/                  # 测试文件
│   ├── components/        # 组件测试
│   └── utils/             # 工具函数测试
│
├── config/                 # 配置文件
│   ├── theme.ts           # 主题配置
│   └── constants.ts       # 常量配置
│
├── package.json           # 项目依赖配置
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.js     # Tailwind CSS 配置
└── README.md              # 项目说明文档
```

## 重要文件说明

### 1. 模板组件
- `components/previews/MinimalTemplate.tsx`
  - 简约风格模板实现
  - 包含基础布局和响应式设计
  - 支持所有用户数据展示

- `components/previews/FunTemplate.tsx`
  - 趣味风格模板实现
  - 包含动画和交互效果
  - 支持自定义主题

- `components/previews/ProfessionalTemplate.tsx`
  - 专业风格模板实现
  - 包含高级布局和组件
  - 支持多语言

### 2. 核心组件
- `components/ui/Avatar.tsx`
  - 头像组件
  - 支持图片和文字头像
  - 包含加载状态和错误处理

- `components/ui/SocialLinks.tsx`
  - 社交媒体链接组件
  - 支持多个平台
  - 包含图标和悬停效果

### 3. 工具函数
- `lib/utils/validation.ts`
  - 数据验证函数
  - 用户数据验证
  - 表单验证

- `lib/utils/image.ts`
  - 图片处理函数
  - 图片优化
  - 响应式图片处理

### 4. 类型定义
- `types/user.ts`
  - 用户数据类型定义
  - 包含所有用户相关接口
  - 类型验证和转换

### 5. 样式文件
- `styles/themes/minimal.ts`
  - 简约主题配置
  - 颜色方案
  - 间距和字体设置

### 6. 配置文件
- `config/theme.ts`
  - 主题配置
  - 颜色和样式变量
  - 响应式断点

### 7. 测试文件
- `tests/components/`
  - 组件测试用例
  - 渲染测试
  - 交互测试

## 开发指南

1. **组件开发**
   - 所有组件放在 `components` 目录下
   - 遵循组件命名规范
   - 包含必要的类型定义和文档

2. **样式开发**
   - 使用 Tailwind CSS
   - 主题相关样式放在 `styles/themes`
   - 动画相关样式放在 `styles/animations`

3. **工具函数开发**
   - 通用工具函数放在 `lib/utils`
   - 自定义 Hooks 放在 `lib/hooks`
   - 包含必要的测试用例

4. **类型定义**
   - 所有类型定义放在 `types` 目录
   - 导出类型到 `types/index.ts`
   - 保持类型定义的一致性

5. **测试开发**
   - 单元测试放在 `tests` 目录
   - 组件测试放在 `tests/components`
   - 工具函数测试放在 `tests/utils` 