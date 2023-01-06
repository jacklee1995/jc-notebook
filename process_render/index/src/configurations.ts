import pageIndex from "@index/router/pageconfig";
const { dialog, BrowserWindow, ipcRenderer } = require("electron")
const settings:any = {
  /**主界面HeadBar设置项 */
  headBar:{
    /**"+"号新建菜单配置项 */
    addMenu:[
      {title:"MarkDown笔记",path:"/editor/markdown"},
      {title:"Sktch笔记",path:"/editor/sketch"},
      {title:"思维导图",path:"/editor/mindmap"},
      {title:"演示文档",path:"/editor/pointshow"},
      // {title:"资源",path:""},
    ]
  },
  /**边栏设置项 */
  sideBar: {
    /**边栏卡配置 */
    cardTabs: [
      {
        title: "思维导图",
        icon: "mindmap-color",
        to: "/manager/mindmap",
        children: [
          {
            title: "新建导图",
            icon: "symbol-add-bold",
            to: "/editor/mindmap",
          },
          { 
            title: "草稿箱", 
            icon: "draft", 
            to: "/manager/mindmap/drafts" 
          },
          {
            title: "回收站",
            icon: "mindmap",
            to: "/mindmap/recycle",
          },
        ],
      },
      {
        title: "笔记簿",
        icon: "notebook-color",
        to: "/manager/markdown",
        children: [
          {
            title: "新建笔记",
            icon: "symbol-add-bold",
            action: ()=>{
              ipcRenderer.send('create-new-file', 'markdown');
            }
          },
          { 
            title: "草稿箱", 
            icon: "draft", 
            to: "/manager/markdown/drafts" 
          },
          {
            title: "回收站",
            icon: "mindmap",
            to: "/notebooks/recycle",
          },
        ],
      },
      {
        title: "手绘簿",
        icon: "drawing-color",
        to: "/manager/sketch",
        children: [
          {
            title: "新建手绘",
            icon: "symbol-add-bold",
            action: ()=>{
              ipcRenderer.send('create-new-file', 'sketch')
            }
          },
          { 
            title: "草稿箱", 
            icon: "draft", 
            to: "/manager/sketch/drafts" 
          },
          {
            title: "回收站",
            icon: "recycle",
            to: "/notebooks/recycle",
          },
        ],
      },
      {
        title: "演示稿",
        icon: "demonstrate-color",
        to: "/manager/pointshow",
        children: [
          {
            title: "新建演示",
            icon: "symbol-add-bold",
            action: ()=>{
              ipcRenderer.send('create-new-file', 'pointshow')
            }
          },
          { 
            title: "草稿箱", 
            icon: "draft", 
            to: "/manager/pointshow/drafts" 
          },
          {
            title: "回收站",
            icon: "recycle",
            to: "/notebooks/recycle",
          },
        ],
      },
      { 
        title: "标签夹", 
        icon: "folder-favorites-color", 
        to: "/collection" 
      },
      {
        title: "打开",
        icon: "folder-open",
        children:[
          {
            title: "打开文件",
            icon:"file-color",
            action: ()=>{
              ipcRenderer.send('select-file-or-path', 'open-files')
            }
          },
          {
            title: "打开目录",
            icon: "folder-open",
            action: ()=>{
              ipcRenderer.send('select-file-or-path', 'open-path')
            }
          }
        ]
      },
      { 
        title: "工具", 
        icon: "tools", 
        to: "/tools" 
      },
      { 
        title: "设置", 
        icon: "setting-fill", 
        to: "/settings" 
      },
    ],
    /**边栏手风琴菜单配置 */
    according: {
      title: "最近的资源",
      /**可以通过函数加载边栏手风琴需要展示的数据 */
      datas: pageIndex,
    },
  },

};

export default settings;
