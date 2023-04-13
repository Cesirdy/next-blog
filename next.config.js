const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  i18n: {
    locales: ["zh-CN"],
    defaultLocale: "zh-CN",
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['你的域名', 'gravatar.loli.net'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    name: '名称', //名称
    description: '简介', //简介
    keywords: '关键词, 关键词2, 博客', //关键词
    nav: [{ //顶部导航菜单
      id:'about', //页面id 此处id会设置 http://域名/pages/about 的链接
      title:'关于', //显示的文字
    },{
      id:'links',
      title:'链接',
    },{
      id:'archives',
      title:'归档',
    }],
    links: [{ //友链
        name: "名称",
        url: "https://github.com/Cesirdy/next-blog",
        img: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        text: "示例"
      }],
  }
})