import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory , } from 'vue-router';
import pageIndex from "./pageconfig";


let routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/Index.vue"),
    children: [
      // 文章管理视图路由
      {
        path: "/manager",
        name: "manager",
        component: () => import("../views/notebook/Index.vue"),
        children: [
          // Markdown 管理视图
          {
            path: "markdown",
            name: "markdownManager",
            component: () => import("../views/notebook/ManagerViewMarkdown.vue"),
            meta: { view: "sketch" },
            children: [
              // 新建文章：跳转 MarkDown 编辑器
              {
                path: "editor",
                redirect: "/editor/markdown",
              },
              // 草稿箱
              {
                path: "drafts",
                name: "drafts",
                meta: { view: "markdown" }, // 路由传参标识草稿类型
                component: () => import("../views/notebook/Drfts.vue"),
              },
              // 回收站
              {
                path: "recycle",
                name: "recycle",
                meta: { view: "markdown" }, // 路由传参标识回收站类型
                component: () => import("../views/notebook/Recycle.vue"),
              },
            ]
          },
          // Sketch 管理视图
          {
            path: "sketch",
            name: "sketchManager",
            component: () => import("../views/notebook/ManagerViewSketch.vue"),
            children: [
              // 新建文章：跳转 sketch 编辑器
              {
                path: "editor",
                redirect: "/editor/sketch",
              },
              // 草稿箱
              {
                path: "drafts",
                name: "drafts",
                meta: { view: "sketch" }, // 路由传参标识草稿类型
                component: () => import("../views/notebook/Drfts.vue"),
              },
              // 回收站
              {
                path: "recycle",
                name: "recycle",
                meta: { view: "sketch" }, // 路由传参标识回收站类型
                component: () => import("../views/notebook/Recycle.vue"),
              },
            ]
          },
          // Maindmap 管理视图
          {
            path: "mindmap",
            name: "mindmapManager",
            component: () => import("../views/notebook/ManagerViewMindmap.vue"),
            children: [
              // 新建文章：跳转 sketch 编辑器
              {
                path: "editor",
                redirect: "/editor/mindmap",
              },
              // 草稿箱
              {
                path: "drafts",
                name: "drafts",
                meta: { view: "sketch" }, // 路由传参标识草稿类型
                component: () => import("../views/notebook/Drfts.vue"),
              },
              // 回收站
              {
                path: "recycle",
                name: "recycle",
                meta: { view: "sketch" }, // 路由传参标识回收站类型
                component: () => import("../views/notebook/Recycle.vue"),
              },
            ]
          },
          // Pointshow 管理视图
          {
            path: "pointshow",
            name: "pointshowManager",
            component: () => import("../views/notebook/ManagerViewPointShow.vue"),
            children: [
              // 新建文章：跳转 sketch 编辑器
              {
                path: "editor",
                redirect: "/editor/pointshow",
              },
              // 草稿箱
              {
                path: "drafts",
                name: "drafts",
                meta: { view: "sketch" }, // 路由传参标识草稿类型
                component: () => import("../views/notebook/Drfts.vue"),
              },
              // 回收站
              {
                path: "recycle",
                name: "recycle",
                meta: { view: "sketch" }, // 路由传参标识回收站类型
                component: () => import("../views/notebook/Recycle.vue"),
              },
            ]
          },
        ]
      },
      // 权限管理路由
      {
        path: "/auth",
        name: "auth",
        component: () => import("../views/user/Index.vue"),
        children: [
          {
            path: "address_book",
            name: "address_book",
            component: () => import("../views/user/AddressBook.vue")
          }
        ]
      },
      // 视频会议应用路由
      {
        path: "/meeting",
        name: "meeting",
        component: () => import("../views/metting/Index.vue")
      },
      // 收藏室
      {
        path: "/collection",
        name: "collection",
        component: () => import("../views/Collections/Index.vue")
      },
      // 电子邮件
      {
        path: "/email",
        name: "email",
        component: () => import("../views/Emails/Index.vue")
      },

      // 设置
      {
        path: "/settings",
        component: () => import("../views/settings/Index.vue"),
        children: [
          // 设置主页
          // {
          //   path:"",
          //   name:"settings",

          // },
          // 系统设置
          {
            path: "system",
            name: "system",
            component: () => import("../views/settings/SetSystem.vue")
          },
          // 用户 设置
          {
            path: "user",
            name: "user",
            component: () => import("../views/settings/SetUser.vue")
          },
          // 网络 设置
          {
            path: "network",
            name: "network",
            component: () => import("../views/settings/SetNetwork.vue")
          },
          // markdown 设置
          {
            path: "markdown",
            name: "markdown",
            component: () => import("../views/settings/SetMarkdown.vue")
          },
          // mindmap 设置
          {
            path: "mindmap",
            name: "mindmap",
            component: () => import("../views/settings/SetMindmap.vue")
          }
        ]
      }
    ]
  }
]

pageIndex.forEach((elem1:any) => {
  if (elem1.path && elem1.component) {
    if (elem1.name) {
      routes.push({ path: elem1.path, name: elem1.name, component: elem1.component })
    }
    else {
      routes.push({ path: elem1.path, component: elem1.component })
    }
  }
  if (elem1.children) {
    elem1.children.forEach((elem2: { path: any; component: any; name: any; children: any[] }) => {
      if (elem2.path && elem2.component) {
        if (elem2.name) {
          routes.push({ path: elem2.path, name: elem2.name, component: elem2.component })
        }
        else {
          routes.push({ path: elem2.path, component: elem2.component })
        }
      }
      if (elem2.children) {
        elem2.children.forEach((elem3) => {
          if (elem3.path && elem3.component) {
            if (elem3.name) {
              routes.push({ path: elem3.path, name: elem3.name, component: elem3.component })
            }
            else {
              routes.push({ path: elem3.path, component: elem3.component })
            }
          }
        })
      }
    })
  }
})

routes.push({
  path: "/:pathMatch(.*)*", // /:pathMatch(.*)* 或 /:catchAll(.*)
  name: "Page404",
  component: () => import("../views/Page404/Index.vue")
})

const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  // history: createWebHashHistory (),
  routes: routes
})


function setupRouter(app: App<Element>) {
  app.use(router);
}

export {
  router,
  setupRouter
}