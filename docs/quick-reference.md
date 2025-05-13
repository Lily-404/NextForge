# 快速参考指南

## 核心文件
```
components/previews/          # 模板
├── MinimalTemplate.tsx      # 简约模板
├── FunTemplate.tsx          # 趣味模板
└── ProfessionalTemplate.tsx # 专业模板

components/ui/               # 基础组件
├── Avatar.tsx              # 头像
├── Button.tsx              # 按钮
├── Card.tsx                # 卡片
└── SocialLinks.tsx         # 社交链接

lib/                        # 工具和生成器
├── utils.ts                # 通用工具函数
└── generators/             # 项目生成器
    ├── config-generators.ts # 配置生成
    └── templates/          # 模板文件

types/user.ts               # 用户数据类型
```

## 关键类型
```typescript
interface UserData {
  name: string;
  profession: string;
  avatar: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  wechat: string;
  socialLinks: {
    wechat: string;
    weibo: string;
    bilibili: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
  projects: Array<{
    title: string;
    description: string;
    imageUrl: string;
    link: string;
  }>;
}
```

## 开发规范
1. 组件: `components/` 目录
2. 样式: Tailwind CSS
3. 类型: `types/` 目录
4. 工具: `lib/utils/` 目录
5. 测试: `tests/` 目录

## 模板特性
- Minimal: 简约风格，响应式
- Fun: 动画效果，主题定制
- Professional: 多语言，高级布局

## 项目生成
- `lib/generators/`: 处理项目生成逻辑
- `config-generators.ts`: 生成配置文件
- `templates/`: 包含项目模板文件 