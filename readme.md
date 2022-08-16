非常水的 Next.js 博客程序。

## 特色
 - 独立页面（如关于页）
 - 归档、链接页面
 - 不算完善的深色模式
 - 支持 Markdown 编写文章，文章内图片及链接兼容了 `next/image` 和 `next/link`
 - 文章内目录
 - 文章排版使用了 [typo.css](https://github.com/sofish/typo.css) 并做了一定修改
 - Tailwind CSS
 - Disqus 评论，但是 DisqusJS
 - Sitemap（借助插件）和 RSS（脚本生成）

## 文件结构
```
├─public
│  └─img
│      ├─pages
│      │  └─页面id
│      │         图片.png
│      └─posts
│         ├─文章id 1
│         │      图片名.png
│         ├─文章id 2
│         │      图片名1.jpg
│         │      图片名2.png           
├─scripts
│      g-rss.js
│      new-post.js
└─src
   ├─components
   ├─lib
   ├─pages 
   ├─sources
   │  ├─pages
   │  │      页面id.md
   │  │      
   │  └─posts
   │         文章id 1.md
   │         文章id 2.md
   └─styles
```

## 写文章
终端输入 `npm run new 文章id` 就会在 `src/sources/posts` 下生成一个 `文章id.md`。

摘要则是写在第一条分割线与第二条分割线之间，详情参考 GitHub 仓库里的示例文章。

如需插入图片，则在 `public/img/posts` 下新建一个名为 `文章id` 的文件夹，在里面放入图片。如放入了 `abc.png`，则文章内输入 `![alt](abc.png)`。暂时没有外链引入方式。

文章内链接如果指向站内则会自动使用 `next/link`。

新建页面则是在 `pages` 文件夹进行，其余操作类似。

## 配置
在根目录下编写 `next.config.js`，基本已经注释上了。

评论则是修改 `src/components/comment.js`，这个怎么改就参考 DisqusJS 的 [readme](https://github.com/SukkaW/DisqusJS) 吧。

## 样式
没有主题功能，都是直接写死在上面的，如果要改只能挨个改。

`src/components/layout.js` 是基本结构，包含了头部、顶栏导航和页脚。主要页面会生成在中间。  
顶栏导航和页脚则分别对应同目录下的 `nav.js` 和 `footer.js`。  
主要页面放在了 `src/pages` 这些页面都会被 `layout.js` 包裹。

修改样式则直接对文件里的 Tailwind CSS 下手即可。

## 部署
这部分建议参考 [Next.js 官方文档的部署教程](https://nextjs.org/docs/deployment)。