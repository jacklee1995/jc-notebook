
export const winparams = {
    width: 1239,
    height: 766,
    resizable: true,
    minWidth: 966,
    minHeight: 696,
    transparent: false,  //透明
    // backgroundColor: "#ffffff",
    opacity: 1,
    hasShadow: true,
    movable: true,    // 可移动
    minimizable: true,
    maximizable: true,
    closable: true,
    focusable: true,
    alwaysOnTop: false,
    fullscreen: false,
    fullscreenable: true,
    fullscreenWindowTitle: false,
    simpleFullscreen: false,
    skipTaskbar: false,
    kiosk: false,
    title: "MarkDown Editoe",
    titleBarStyle: 'default',
    icon: "../public/favicon_256x256.ico",
    show: true,
    paintWhenInitiallyHidden: true,
    frame: false,  // Specify `false` to create a frameless window. Default is `true`.
    parent: null,
    modal: false,
    acceptFirstMouse: false,
    disableAutoHideCursor: false,
    autoHideMenuBar: false,
    enableLargerThanScreen: false,
    darkTheme: false,
    type: undefined,
    visualEffectState: undefined,

    trafficLightPosition: undefined,
    roundedCorners: true,

    thickFrame: true,
    vibrancy: undefined,
    zoomToPageWidth: false,
    tabbingIdentifier: undefined,
    webPreferences: {

      // 是否启用DevTools。
      // 如果设置为`false`, 则不能使用 `BrowserWindow.webContents.openDevTools()` 打开DevTools。
      // 默认值为 `true`。
      devTools: true,

      // 是否启用node集成。
      // 默认值为`false`。
      nodeIntegration: true,

      // web workers中是否启用了节点集成。
      // 默认值为 `false`。
      // 关于这一点的更多信息可以在多线程中找到。
      nodeIntegrationInWorker: false,

      // 在子框架(如 iframes 和子窗口)中启用 Node.js 支持的实验选项。
      // 你所有的预加载将为每个iframe加载，你可以使用 `process.isMainFrame` 来确定你是否在主框架中。
      nodeIntegrationInSubFrames: undefined,
      
      // 是否在单独的JavaScript上下文中运行电子API和指定的`preload`脚本。默认为`true`。
      // `preload`脚本在其中运行的上下文将只能访问它自己专用的`document`和`window`全局变量，以及它自己的一组JavaScript内置变量(`Array`, `Object`, `JSON`, 等)。)，
      // 这些对于加载的内容都是不可见的。
      // 当加载可能不可信的远程内容时，应使用此选项，以确保加载的内容不会篡改`preload`脚本和正在使用的任何电子API。
      // 这个选项使用了 Chrome 内容脚本使用的相同技术。您可以在开发工具中访问该上下文，方法是在控制台选项卡顶部的组合框中选择'Electron Isolated Context'条目。
      contextIsolation: false,

      // 指定将在页面中运行其他脚本之前加载的脚本。
      // 无论 Node 集成是打开还是关闭，该脚本都将始终可以访问 NodeAPI。该值应该是脚本的绝对文件路径。
      // 当 Node 集成关闭时，预加载脚本可以将 Node 全局符号重新引入全局范围。
      // preload: path.join(__dirname, 'preloads'),
      // 如果设置，这将沙盒与窗口关联的渲染器，使其与Chromium操作系统级沙盒兼容，并禁用Node.js引擎。
      // 这与 `nodeIntegration` 选项不同，预加载脚本可用的API更加有限。
      sandbox: undefined,

      // 设置页面使用的session。
      // 除了直接传递session对象，您还可以选择使用 `partition` 选项，它接受一个分区字符串。
      // 当同时提供 `session` 和 `session` 时， `session` 将是首选。
      // 默认为默认的session。
      session: undefined,

      // 根据会话的分区字符串设置页面使用的会话。
      // 如果 `partition`以 `persist:` 开头，页面将使用应用程序中所有具有相同 `partition` 的页面可用的持久会话。
      // 如果没有 `persist:` 前缀，页面将使用内存会话。
      // 通过分配相同的 `partition`，多个页面可以共享相同的会话。
      // 默认为默认的session。
      partition: undefined,

      // 页面的默认缩放因子 `3.0` 表示 `300%`。
      // 默认值为 `1.0`。
      zoomFactor: undefined,

      // 启用JavaScript支持。
      // 默认值为 `true`。
      javascript: true,

      // 当 `false` 时，它将禁用同源策略(通常由人们使用测试网站)，
      // 并且如果用户没有设置此选项，则将`allowRunningInsecureContent`  设置为`true`。
      // 默认值为 `true`。
      webSecurity: true,

      // 允许 https 页面运行来自 http URLs 的JavaScript、CSS 或插件。
      // 默认值为 `false`。
      allowRunningInsecureContent: false,

      // 启用图像支持。
      // 默认值为 `true`。
      images: true,

      // 指定如何运行图像动画(如gif)。
      // 'animate' | 'animateOnce' | 'noAnimation'
      imageAnimationPolicy: 'animate',

      // 使TextArea元素可调整大小。 
      // 默认值为 `true`。
      textAreasAreResizable: true,

      // 启用WebGL支持。
      // 默认值为 `true`。
      webgl: true,

      // 是否应该启用插件。
      // 默认值为 `false`。
      plugins: true,

      // 启用Chromium的实验功能。 
      // 默认值为 `false`。
      experimentalFeatures: false,

      //在macOS上启用滚动反弹(橡皮带)效果。
      // 默认值为 `false`。
      scrollBounce: false,

      // 以 `,` 分隔的功能字符串列表，如 `CSSVariables,KeyboardEventKey` 以启用。
      // 可以在 RuntimeEnabledFeatures.json5 文件中找到支持的功能字符串的完整列表。
      enableBlinkFeatures: undefined,

      // 由 `,` 分隔的功能字符串列表，如要禁用的 `CSSVariables,KeyboardEventKey`。
      disableBlinkFeatures: undefined,

      // 设置 font-family 的默认字体。
      defaultFontFamily: undefined,

      // 默认值为：`16`。
      defaultFontSize: 16,

      // 默认值为：`13`.
      defaultMonospaceFontSize: 13,

      // 默认值为：`0`.
      minimumFontSize: 0,

      // 默认值为：`ISO-8859-1`。
      defaultEncoding: `ISO-8859-1`,

      // 当页面成为背景时是否限制动画和计时器。
      // 这也会影响页面可见性API。
      // 默认值为：`true`。
      backgroundThrottling: true,

      // 是否为浏览器窗口启用屏幕外呈现。
      // 默认值为 `false`。
      // 更多细节请参见屏幕外渲染教程。
      offscreen: false,


      // 是否启用 `<webview>` 标签。默认为 `false`。
      // **注意:** 为 `<webview>` 配置的 `preload` 脚本在执行时将启用 node 集成，因此您应该确保 remote/untrusted 内容无法使用可能恶意的 `preload` 脚本创建 `<webview>` 标签。
      // 您可以使用 webContents 上的 `will-attach-webview` 事件来删除 `preload` 脚本，并验证或更改 `<webview>` 的初始设置。
      webviewTag: undefined,
      // 将在此应用程序的渲染器进程中追加到 `process.argv` 的字符串列表。
      // 对于将少量数据传递给渲染器进程预加载脚本非常有用。
      additionalArguments: undefined,
      // 是否启用浏览器风格的连续对话保护。
      // 默认值为 `false`。
      safeDialogs: false,
      // 触发连续对话保护时显示的消息。
      // 如果没有定义，将使用默认消息，请注意，当前默认消息是英文的，没有本地化。
      safeDialogsMessage: undefined,
      // 是否完全禁用对话框。
      // 覆盖 `safeDialogs`。
      // 默认值为 `false`。
      disableDialogs: false,
      // 将文件或链接拖放到页面上是否会导致导航。
      // 默认值为 `false`。
      navigateOnDragDrop: false,
      // 应用于窗口内容的自动播放策略，
      // 可以是 'no-user-gesture-required' | 'user-gesture-required' | 'document-user-activation-required'
      // 默认值为：`no-user-gesture-required`。
      autoplayPolicy: 'no-user-gesture-required',
      // 进入HTML全屏时是否阻止窗口调整大小。
      // 默认值为 `false`。
      disableHtmlFullscreenWindowResize: false,
      // 仅提供给辅助工具(如屏幕阅读器)的可选标题字符串。
      // 用户无法直接看到该字符串。
      accessibleTitle: "",
      // 是否启用内置拼写检查器。
      // 默认值为 `true`。
      spellcheck: true,
      // 是否启用WebSQL api。
      // 默认值为 `true`。
      enableWebSQL: false,
      // 强制执行blink使用的v8代码缓存策略。
      // 可接受的值有 'none' | 'code' | 'bypassHeatCheck' | 'bypassHeatCheckAndEagerCompile'
      v8CacheOptions: undefined,
      // 是否启用首选尺寸模式。
      // 首选大小是包含文档布局所需的最小大小，不需要滚动。
      // 启用此选项将导致在首选大小更改时在 `WebContents` 上发出 `preferred-size-changed` 事件。
      enablePreferredSizeMode: false,
    },
    titleBarOverlay: false,
  }