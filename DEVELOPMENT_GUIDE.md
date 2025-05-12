# NextForge 开发指南

## 1. 项目核心结构

### 1.1 数据模型
```typescript
interface UserData {
  name: string          // 用户姓名
  email: string         // 电子邮件
  phone: string         // 电话号码
  wechat: string        // 微信号
  profession: string    // 职业
  location: string      // 位置
  bio: string          // 个人简介
  avatar: string       // 头像URL
  projects: Project[]   // 项目列表
  socialLinks: SocialLinks  // 社交媒体链接
}

interface Project {
  title: string        // 项目标题
  description: string  // 项目描述
  imageUrl: string     // 项目图片URL
  link: string         // 项目链接
}

interface SocialLinks {
  wechat?: string      // 微信
  weibo?: string       // 微博
  github?: string      // GitHub
  linkedin?: string    // LinkedIn
  twitter?: string     // Twitter
}
```

### 1.2 目录结构
```
components/
├── previews/          # 预览模板
│   ├── MinimalTemplate.tsx
│   ├── BusinessTemplate.tsx
│   ├── CreativeTemplate.tsx
│   └── FunTemplate.tsx
└── templates/         # 生成模板
    ├── minimalist/
    ├── business/
    ├── creative/
    └── fun/

lib/
└── generators/
    └── templates/     # 模板生成器
        ├── minimalist-generator.ts
        ├── business-generator.ts
        ├── creative-generator.ts
        └── fun-generator.ts
```

### 1.3 模板组件结构
每个模板必须包含以下组件：
```typescript
// template.tsx - 主模板组件
export function Template({ userData }: { userData: UserData }) {
  return (
    <div>
      <Header userData={userData} />
      <main>
        <HeroSection userData={userData} />
        <AboutSection userData={userData} />
        <WorksSection userData={userData} />
        <ContactSection userData={userData} />
      </main>
      <Footer userData={userData} />
    </div>
  )
}
```

## 2. 开发流程

### 2.1 创建新模板
1. 在 `components/previews/` 创建预览组件
2. 在 `components/templates/` 创建模板组件
3. 在 `lib/generators/templates/` 创建生成器

### 2.2 模板开发规范
1. 所有组件必须使用 TypeScript
2. 必须实现响应式设计
3. 必须处理所有数据边界情况
4. 必须实现错误处理
5. 必须支持主题切换

### 2.3 生成器开发规范
1. 必须生成完整的目录结构
2. 必须包含所有必要的组件
3. 必须生成类型定义
4. 必须生成工具函数
5. 必须生成主页面文件

## 3. 最佳实践

### 3.1 组件开发
```typescript
// 1. 使用 TypeScript 类型
interface Props {
  userData: UserData
}

// 2. 实现错误边界
export function Component({ userData }: Props) {
  if (!userData) return null
  
  // 3. 处理数据边界
  const name = userData.name || '未设置'
  
  return (
    // 4. 使用响应式类
    <div className="w-full md:w-1/2 lg:w-1/3">
      {/* 5. 添加加载状态 */}
      {isLoading ? <Loading /> : <Content />}
    </div>
  )
}
```

### 3.2 样式开发
```typescript
// 1. 使用 Tailwind CSS
// 2. 遵循响应式设计
// 3. 支持暗色模式
<div className="
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-gray-100
  p-4 md:p-6 lg:p-8
">
```

### 3.3 性能优化
1. 使用 Next.js 图片组件
2. 实现组件懒加载
3. 使用代码分割
4. 优化构建大小

## 4. 常见问题

### 4.1 数据验证
```typescript
function validateUserData(data: any): UserData {
  if (!data.name) throw new Error('姓名是必填项')
  if (!data.email) throw new Error('邮箱是必填项')
  // ... 其他验证
  return data
}
```

### 4.2 错误处理
```typescript
try {
  const userData = validateUserData(data)
  // 处理数据
} catch (error) {
  // 显示错误信息
  console.error(error)
}
```

### 4.3 主题切换
```typescript
// 使用 theme-provider
import { useTheme } from '@/components/theme-provider'

export function Component() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      切换主题
    </button>
  )
}
```

## 5. 开发工具

### 5.1 推荐 VS Code 插件
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

### 5.2 推荐浏览器插件
- React Developer Tools
- Redux DevTools
- Tailwind CSS Debug Tools

## 6. 发布流程

### 6.1 版本控制
1. 使用语义化版本
2. 保持更新日志
3. 创建发布分支

### 6.2 测试
1. 单元测试
2. 集成测试
3. 端到端测试

### 6.3 部署
1. 构建优化
2. 性能监控
3. 错误追踪 

## 7. 状态管理

### 7.1 使用 Zustand
```typescript
import create from 'zustand'

interface UserStore {
  userData: UserData | null
  setUserData: (data: UserData) => void
  resetUserData: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  resetUserData: () => set({ userData: null }),
}))
```

### 7.2 使用 Context
```typescript
const UserContext = createContext<UserData | null>(null)

export function UserProvider({ children, userData }: { children: React.ReactNode; userData: UserData }) {
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}
```

## 8. 组件复用

### 8.1 基础组件
```typescript
// components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'border border-gray-300 hover:bg-gray-50': variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
}
```

### 8.2 布局组件
```typescript
// components/layouts/Container.tsx
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
```

## 9. 性能优化

### 9.1 图片优化
```typescript
// components/ui/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function OptimizedImage({ src, alt, width, height, className }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
```

### 9.2 代码分割
```typescript
// 使用动态导入
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />,
  ssr: false,
})
```

### 9.3 缓存策略
```typescript
// lib/cache.ts
export async function getCachedData(key: string, fetcher: () => Promise<any>) {
  const cached = await caches.open('app-cache')
  const response = await cached.match(key)
  
  if (response) {
    return response.json()
  }
  
  const data = await fetcher()
  await cached.put(key, new Response(JSON.stringify(data)))
  return data
}
```

## 10. 测试策略

### 10.1 单元测试
```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### 10.2 集成测试
```typescript
// __tests__/integration/UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserForm } from '@/components/UserForm'

describe('UserForm', () => {
  it('submits form data correctly', async () => {
    const onSubmit = jest.fn()
    render(<UserForm onSubmit={onSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.click(screen.getByText('Submit'))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
      })
    })
  })
})
```

## 11. 错误处理

### 11.1 错误边界
```typescript
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-900 rounded-md">
          <h2 className="text-lg font-semibold">出错了</h2>
          <p className="mt-2">{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 11.2 API 错误处理
```typescript
// lib/api.ts
export async function fetchWithError(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const error = new Error('API 请求失败')
    error.status = response.status
    error.statusText = response.statusText
    throw error
  }
  
  return response.json()
}
```

## 12. 开发工具配置

### 12.1 ESLint 配置
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 12.2 Prettier 配置
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 12.3 TypeScript 配置
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 13. 部署检查清单

### 13.1 预部署检查
- [ ] 所有测试通过
- [ ] 代码风格检查通过
- [ ] 类型检查通过
- [ ] 构建成功
- [ ] 性能指标达标
- [ ] 错误监控配置完成
- [ ] 环境变量配置正确
- [ ] 数据库迁移完成
- [ ] 缓存策略配置完成
- [ ] CDN 配置完成

### 13.2 部署后检查
- [ ] 网站可访问
- [ ] 所有功能正常
- [ ] 性能监控正常
- [ ] 错误监控正常
- [ ] 日志记录正常
- [ ] 备份正常
- [ ] 回滚方案准备就绪 