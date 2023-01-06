import HomeView from "../views/Home/Index.vue";

const pageIndex = [
  { path: "/", title: "Home", icon:"home", component: HomeView },
  {
    title: "Vue 从入门到精通",
    icon:"vue", 
    children: [
      {
        path: "/列表渲染",
        title: "列表渲染",
        component: () =>
          import("@index/views/Vue从入门到项目实战/列表渲染/Index.vue"),
      },
      {
        title: "Vue 事件",
        children: [
          {
            path: "/滚动事件",
            title: "滚动事件",
            component: () =>
              import("@index/views/Vue从入门到项目实战/滚动事件/Index.vue"),
          },
          {
            path: "/键盘事件",
            title: "键盘事件",
            component: () =>
              import("@index/views/Vue从入门到项目实战/键盘事件/Index.vue"),
          },
          {
            path: "/鼠标事件",
            title: "鼠标事件",
            component: () =>
              import("@index/views/Vue从入门到项目实战/鼠标事件/Index.vue"),
          },
          {
            path: "/事件处理",
            title: "事件处理",
            component: () =>
              import("@index/views/Vue从入门到项目实战/事件处理/Index.vue"),
          },
          {
            path: "/拖拽事件的使用",
            title: "拖拽事件的使用",
            component: () =>
              import(
                "@index/views/Vue从入门到项目实战/拖拽事件的使用/Index.vue"
              ),
          },
        ],
      },
      {
        title: "Vue 指令",
        children: [
          {
            path: "/v-cloak指令",
            title: "v-cloak指令",
            component: () =>
              import("@index/views/Vue从入门到项目实战/v-cloak指令/Index.vue"),
          },
          {
            path: "/vonce和vpre指令",
            title: "v-once 和 v-pre指令",
            component: () =>
              import(
                "@index/views/Vue从入门到项目实战/v-once和v-pre指令/Index.vue"
              ),
          },
          {
            path: "/vtitle和vhtml指令",
            title: "v-title 和 v-html指令",
            component: () =>
              import(
                "@index/views/Vue从入门到项目实战/v-text和v-html指令/Index.vue"
              ),
          },
          {
            path: "/自定义指令",
            title: "自定义指令",
            component: () =>
              import("@index/views/Vue从入门到项目实战/自定义指令/Index.vue"),
          },
        ],
      },
      {
        title: "Vue 响应式",
        children: [
          {
            path: "/响应式API总结",
            title: "响应式API总结",
            component: () =>
              import("@index/views/Vue从入门到项目实战/响应式API总结/Index.vue"),
          },
          {
            path: "/响应式实现原理分析",
            title: "响应式实现原理分析",
            component: () =>
              import(
                "@index/views/Vue从入门到项目实战/响应式实现原理分析/Index.vue"
              ),
          },
        ],
      },
      {
        title: "Vue 组件",
        children: [
          {
            path: "/内置组件分析",
            title: "内置组件分析",
            component: () =>
              import("@index/views/Vue从入门到项目实战/内置组件分析/Index.vue"),
          },
          {
            path: "/动态组件和is属性",
            title: "动态组件和is属性",
            component: () =>
              import("@index/views/Vue从入门到项目实战/动态组件和is属性/Index.vue"),
          },
        ],
      },
    ],
  },
  {
    title: "react 从入门到精通",
    icon:"react",
    children: [
      { path: "/react入门",title:"react入门"},
      { path: "/react组件基础", title: "react组件基础" },
      { path: "/react组件间的通信", title: "react组件间的通信" },
      { path: "/react表示组件和容器组件", title: "react表示组件和容器组件" },
      { path: "/react路由", title: "react 路由" },
      { path: "/react中实现网络通信", title: "react 路由" },
      { path: "/react样式处理", title: "react样式处理" },
      { path: "/Redux状态管理工具", title: "Redux状态管理工具" },
      { path: "/react性能及其优化", title: "react性能及其优化" },
      { path: "/react服务端渲染", title: "react服务端渲染" },
      { path: "/react事件系统", title: "react事件系统" },
      { path: "/react表单", title: "react表单" },
      { path: "/react的自动化测试方案", title: "react的自动化测试方案" },
      { path: "/react组件间的生命周期", title: "react组件间的生命周期" },
    ],
  },
];
export default pageIndex;
