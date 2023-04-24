import wyNav from './nav.js';
import wySidebar from './sidebar.js';

export default {
  title: "underwood's blog", //网站标题
  description: "underwood 个人博客网站", //网站描述,会生成<meta>便签
  author: "underwood", //作者
  base: '/vitepress-blog/', //根目录 如果您计划将站点部署到https://foo.github.io/bar/，那么您应该将base设置为“/bar/”
  markdown: {
    lineNumbers: true, //显示代码行数
  },
  lastUpdated: true, //以git提交的时间为更新时间
  themeConfig: {
    outline: [1, 6],
    nav: wyNav, //导航栏配置
    sidebar: wySidebar, //侧边栏配置
    author: 'underwood',
    lastUpdatedText: '上次更新时间', //最后更新时间文本
    logo: "/avatar.JPG", //导航栏左侧头像
    docFooter: { //上下篇文本
      prev: '上一篇',
      next: '下一篇'
    },
  },
};