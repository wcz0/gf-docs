export default {
  lang: "zh-CN",
  title: "GoFrame",
  description: "Documentation of GoFrame Framework",
  // base: '/gf-docs/',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico'}]
  ],
  themeConfig: {
    nextPageText: '下一页',
    lastUpdatedText: '上次更新',
    outlineTitle: '本页目录',
    // logo: '/logo.png',
    editLink: {
      pattern: "https://github.com/wcz0/gf-docs/edit/main/docs/:path",
      text: "在GitHub上编辑这个页面",
    },
    // algolia: {
    //   appId: '',
    //   apiKey: '',
    //   indexName: 'gf-docs',
    // },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present wcz0",
    },
    nav: nav(),
    sidebar: {
      "/guide/": sidebarGuide(),
      "/about/join": sidebarAboutJoin(),
      "/about/support": sidebarAboutSupport(),
      "/other/design": sidebarOtherDesign(),
      "/other/learning": sidebarOtherLearning(),
      "/other/question": sidebarOtherQuestion(),
    },
    socialLinks: [{ icon: "github", link: "https://github.com/gogf/gf" }],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },
};

function nav() {
  return [
    { 
      text: "文档(wip)",
      link: "/guide/introduction/introduce", 
      activeMatch: "/guide/"
    },
    {
      text: "关于(wip)",
      items: [
        { text: "加入我们", link: "/about/join" },
        { text: "支持我们", link: "/about/support" },
      ],
      activeMatch: "/about/",
    },
    {
      text: "其他(wip)",
      items: [
        { text: "框架学习资料", link: "/other/learning" },
        { text: "技术分享交流", link: "/other/share" },
        { text: "框架设计", link: "/other/design" },
        { text: "常见问题", link: "/other/question" },
      ],
      activeMatch: "/other/",
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "前言",
      items: [
        { text: "项目介绍", link: "/guide/introduction/introduce" },
        { text: "版本计划", link: "/guide/introduction/project" },
        { text: "如何从v1升级到v2", link: "/guide/introduction/upgrade" },
        { text: "版本更新记录", link: "/guide/introduction//record" },
      ],
    },
    {
      text: "快速开始",
      items: [
        { text: "安装", link: "/guide/getting-start/install" },
        { text: "开发工具", link: "/guide/getting-start/gf-tool" },
        { text: "目录结构", link: "/guide/getting-start/structure" },
        { text: "配置", link: "/guide/getting-start/configure" },
        { text: "部署", link: "/guide/getting-start/deploy" },
      ],
    },
    {
      text: "核心概念",
      items: [
        { text: "生命周期", link: "/guide/core/lifecycle" },
        { text: "数据结构", link: "/guide/core/structure" },
        { text: "类型转换", link: "/guide/core/type-transform" },
        { text: "系统相关", link: "/guide/core/system" },
      ],
    },
    {
      text: "基础功能",
      items: [
        { text: "路由", link: "/guide/basics/route" },
        { text: "API文档", link: "/guide/basics/api-docs" },
        { text: "中间件", link: "/guide/basics/middleware" },
        { text: "请求", link: "/guide/basics/request" },
        { text: "表单验证", link: "/guide/basics/validation" },
        { text: "响应", link: "/guide/basics/response" },
        { text: "Cookie", link: "/guide/basics/cookie" },
        { text: "Session", link: "/guide/basics/session" },
        { text: "异常处理", link: "/guide/basics/exception" },
        { text: "错误处理", link: "/guide/basics/error" },
        { text: "数据库ORM", link: "/guide/basics/orm" },
        { text: "分页管理", link: "/guide/basics/pagination" },
        { text: "模板引擎", link: "/guide/basics/template" },
        { text: "缓存", link: "/guide/basics/cache" },
        { text: "Redis", link: "/guide/basics/redis" },
        { text: "I18N", link: "/guide/basics/i18n" },
        { text: "资源管理", link: "/guide/basics/resource" },
        { text: "日志", link: "/guide/basics/log" },
      ],
    },
    {
      text: "深入了解",
      items: [
        { text: "HTTP 客户端", link: "/guide/deep/http-client"},
        { text: "任务定时器", link: "/guide/deep/cron" },
        { text: "命令行", link: "/guide/deep/command" },
        { text: "链路跟踪", link: "/guide/deep/periodic" },
      ],
    },
    {
      text: "测试",
      items: [
        { text: "单元测试", link: "/guide/testing/test" },
        { text: "功能调试", link: "/guide/testing/debug" },
      ],
    },
    {
      text: "其他",
      items: [
        { text: "实用工具", link: "/guide/other/tools" },
        { text: "编码解码", link: "/guide/other/encode" },
        { text: "加密解密", link: "/guide/other/encrypt" },
        { text: "文本处理", link: "/guide/other/string" },
      ],
    },
    {
      text: "网络服务",
      items: [
        { text: "TCP组件", link: "/guide/web-service/tcp" },
        { text: "UDP组件", link: "/guide/web-service/udp" },
        { text: "WebSocket", link: "/guide/web-service/websocket" },
      ],
    },
    {
      text: "相关拓展包",
      items: [{ text: "gtoken", link: "/guide/packages/gtoken" }],
    },
  ];
}

function sidebarAboutJoin() {
  return [
    {
      text: "加入我们",
      items: [
        { text: "参与贡献", link: "/about/contribute" },
        { text: "社区投稿", link: "/about/community-contribute" },
        { text: "社区招募", link: "/about/recruitment" },
      ],
    },
    
  ];
}

function sidebarAboutSupport(){
  return [
    {
      text: "支持我们",
      items: [{ text: "来杯咖啡", link: "/about/support" }],
    },
  ]
}


function sidebarOtherLearning() {
  return [
    {
      text: "框架学习资料",
      items: [
        { text: "官方教程", link: "/other/" },
        { text: "社区教程", link: "/other/" },
        { text: "Golang资源", link: "/other/go-resource" },
        { text: "格式化打印占位符", link: "/other/fmt" },
      ],
    },
    
  ];
}

function sidebarOtherShare(){
  return [
    {
      text: "技术分享交流",
      items: [
        { text: "Q群", link: "/other/" },
      ],
    },
  ]
}

function sidebarOtherDesign(){
  return [
    {
      text: "框架设计",
      items: [
        { text: "模块化设计", link: "/other/design/" },
        { text: "统一框架设计", link: "/other/design/" },
        { text: "工程开发设计", link: "/other/design/" },
        { text: "微服务相关设计", link: "/other/design/" },
        { text: "全链路跟踪设计", link: "/other/design/" },
        { text: "全错误堆栈设计", link: "/other/design/" },
        { text: "接口化与泛型设计", link: "/other/design/" },
        { text: "隐式与显式设计", link: "/other/design/" },
        { text: "Context相关设计", link: "/other/design/" },
      ],
    },
  ]
}

function sidebarOtherQuestion(){
  return [
    {
      text: "常见问题",
      items: [],
    },
  ]
}