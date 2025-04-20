// ... 前面的代码保持不变 ...
const socialPlatformNames: Record<string, string> = {
  // 国内平台
  wechat: '微信',
  weibo: '微博',
  bilibili: '哔哩哔哩',
  zhihu: '知乎',
  douyin: '抖音',
  xiaohongshu: '小红书',
  jike: '即刻',
  douban: '豆瓣',
}

// 在渲染社交媒体链接时
{Object.entries(userData.socialLinks || {}).map(([platform, link]) => {
  if (!link) return null
  return (
    <a
      key={platform}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-900 hover:text-neutral-600 transition-colors"
    >
      {socialPlatformNames[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)}
    </a>
  )
})}