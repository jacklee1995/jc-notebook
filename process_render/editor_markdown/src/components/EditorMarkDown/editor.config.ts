export default {
  value: '',
  language: 'markdown',
  theme: "vs",                  // 内置主题包括 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  // inDiffEditor: false,    // 此编辑器在比较编辑器中使用。
  // ariaLabel: '',          // 编辑器文本区的aria标签(当它被聚焦时)。
  // tabIndex: ,             // 编辑器的 textarea 的 `tabindex` 属性
  // 在指定列呈现垂直线。默认值为：空数组。
  rulers: [],
  // wordSeparators: ,       // 包含进行单词导航时使用的单词分隔符的字符串。默认值为： `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
  selectionClipboard: true,  // 启用Linux主剪贴板。默认值为： true。
  // 控制行号的呈现。
  // 如果是函数，渲染行号时会调用，并渲染返回值。
  // 否则，如果是真值，行号将正常呈现(相当于使用标识函数)。
  // 否则，将不会呈现行号。
  // 行号。'on' | 'off' | 'relative' | 'interval' | ((lineNumber: number) => string)
  lineNumbers: 'off',  
  // 控制光标周围可见的前导线和尾随线的最小数量。
  // 默认值为： 0。
  cursorSurroundingLines: 0,
  // 控制何时应实施 `cursorSurroundingLines`
  // 默认值为： `default`，当鼠标改变光标位置时，不执行 `cursorSurroundingLines`。
  cursorSurroundingLinesStyle: 'default',
  unusualLineTerminators: 'prompt',  // 移除不常见的行终止符，如行分隔符(LINE SEPARATOR, LS)、段落分隔符(PARAGRAPH SEPARATOR, PS)。
  selectOnLineNumbers: true,         // 点击行号时是否应选择相应的行。默认值为： true。
  lineNumbersMinChars: 5,            // 通过保留水平空间来呈现至少一定数量的数字，控制行号的宽度。默认值为： 5。
  glyphMargin: true,                 // 启用字形边距的呈现。默认值为： 在 vscode 中 true，在 monaco-editor 中 false
  lineDecorationsWidth: 10, // 为线条装饰保留的宽度 (px)。行装饰放置在行号和编辑器内容之间。可以传递浮点格式后跟“ch”的字符串。例如 1.3ch。默认值为： 10.
  // 当显示光标时，会在光标上添加一个虚拟填充(px ),将其变成一个矩形。
  // 此虚拟填充确保光标在触及视口边缘之前显示出来。
  // 默认值为： 30 (px)。
  revealHorizontalRightPadding: 30,
  roundedSelection: true, // 用圆形边框呈现编辑器选择。默认值为： true。
  // extraEditorClassName: "", // 要添加到编辑器中的类名。
  readOnly: false, // 编辑器是否应该是只读的。另请参见 `domReadOnly`。默认值为： false。
  domReadOnly: false,   // 用于输入的文本区域是否应该使用 DOM `readonly` 属性。默认值为： false。
  linkedEditing: false, //启用链接编辑。默认值为： false。
  // renameOnType: false, 已弃用，请改用 linkedEditing
  renderValidationDecorations: 'editable', // 编辑器是否应该呈现验证装饰。默认值为： editable。 'editable' | 'on' | 'off'
  scrollbar: {
    // 箭头的大小(如果显示的话)。
    // 默认值为： 11。
    // **注意**：不能使用 `updateOptions()` 更新此选项
    arrowSize: 11,
    // 呈现垂直滚动条。
    // 默认值为： 'auto'。
    // 'auto' | 'visible' | 'hidden'
    vertical: 'auto',
    // 呈现水平滚动条。
    // 默认值为： 'auto'。
    // 'auto' | 'visible' | 'hidden'
    horizontal: 'auto',
    // 滚动内容时投射水平和垂直阴影。
    // 默认值为： true。
    // **注意**：不能使用 `updateOptions()` 更新此选项
    useShadows: true,
    // 垂直滚动条左侧和右侧的渲染箭头。
    // 默认值为： false。
    // **注意**：不能使用 `updateOptions()` 更新此选项。
    verticalHasArrows: false,
    // 水平滚动条左侧和右侧的渲染箭头。
    // 默认值为： false。
    // **注意**：不能使用 `updateOptions()` 更新此选项。
    horizontalHasArrows: false,
    handleMouseWheel: true,       // 侦听鼠标滚轮事件，并通过滚动对它们做出反应。默认值为： true。
    // 总是使用鼠标滚轮事件（总是在浏览器事件上调用 preventDefault() 和 stopPropagation()）。
    // 默认值为： true。
    // **注意**：不能使用 `updateOptions()` 更新此选项。
    alwaysConsumeMouseWheel: true,
    horizontalScrollbarSize: 10,  // 垂直滚动条的高度，以像素为单位。默认值为： 10 (px)。
    verticalScrollbarSize: 10,  // 垂直滚动条的宽度，以像素为单位。默认值为： 10 (px)。
    // verticalSliderSize: 10,   // 水平滑块的宽度，以像素为单位。默认值为： `verticalScrollbarSize`。**注意**：不能使用 `updateOptions()` 更新此选项。
    // horizontalSliderSize: 10, // 水平滑块的高度，以像素为单位。默认值为： `horizontalScrollbarSize`。**注意**：不能使用 `updateOptions()` 更新此选项。
    scrollByPage: false, // 滚动装订线点击移动页面与跳转到位置。
  },
  // 控制实验选项的行为
  // experimental: {
  //   // 编辑器粘性滚动的配置选项
  //   stickyScroll:{
  //     enabled: true,
  //   }
  // },
  // 控制小地图的行为和渲染。
  minimap: {
    enabled: false,   // 启动小地图渲染，默认值为： true。
    autohide: false,  // 自动隐藏小地图
    side: 'left',    // 在编辑器中控制小地图的边。默认值为：'right'。'right' | 'left'
    size: 'proportional',       // 控制小地图渲染模式。（旧版本默认值为： 'actual'。） 'proportional' | 'fill' | 'fit'
    showSlider: 'mouseover',   // 控制小地图滑块的渲染。默认值为： 'mouseover'。
    renderCharacters: true,     // 在一行上呈现实际文本(相对于颜色块)。默认值为： true。
    maxColumn: 120, // 限制小地图的宽度，最多呈现一定数量的列。默认值为： 120。
    scale: 1, // 小地图中字体的相对大小。 默认值为： 1。
  },
  // 控制查找小部件的行为。
  find: {
    // 控制键入时光标是否应该移动以查找匹配项。
    cursorMoveOnType: true,
    // 控制我们是否在带有编辑器选择的Find小部件中植入搜索字符串。 'never' | 'always' | 'selection'
    seedSearchStringFromSelection: 'always',
    // 控制是否在编辑器中打开 在选择中查找（Find in Selection flag ） 标志。 'never' | 'always' | 'multiline'
    autoFindInSelection: 'always',
    // 控制当找不到进一步的匹配时，搜索是否自动从开始(或结尾)重新开始
    loop: true,
  },
  fixedOverflowWidgets: false,  // 将溢出窗口小部件显示为 `fixed`。默认值为： `false`.
  overviewRulerLanes: 3,         // 总览光标应呈现的垂直 lanes 数。默认值为： 3.
  overviewRulerBorder: true,    // 控制是否应在总览光标周围绘制边框。
  cursorBlinking: 'blink',      // 控制光标动画样式，可能的值有 'blink'(闪烁), 'smooth'(平滑), 'phase'(相位), 'expand'(扩展) 和 'solid'(实心)。默认值为： 'blink'。
  mouseWheelZoom: false,        // 在按住 Ctrl 键的同时使用鼠标滚轮时，在编辑器中缩放字体。默认值为： false。
  mouseStyle: 'text',// 控制鼠标指针的样式，可以是 'text' 或 'default' 或 'copy'，默认值为： 'text'。 'text' | 'default' | 'copy'
  cursorSmoothCaretAnimation: false, // 启用平滑插入符号动画。默认值为： false。
  cursorStyle: 'line', // 控制光标样式。默认值为： 'line'。'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
  // 当 cursorStyle 设置为  'line' 时，控制光标的宽度
  // cursorWidth: 3,
  fontLigatures: false,           // 启用字体连字。 默认值为： false。
  // 禁止对编辑器边距和线条图层使用 `transform: translate3d(0px, 0px, 0px)` 。
  // `transform: translate3d(0px, 0px, 0px)`的用法提示浏览器创建一个额外的层。 
  // 默认值为： false。
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,  // 禁用等宽字体的优化。默认值为： false。
  hideCursorInOverviewRuler: true,       // 光标是否应该隐藏在总览光标中。 默认值为： false。
  scrollBeyondLastColumn: 5,  // 启用滚动可以超出最后一列若干列，默认为5
  smoothScrolling: false,     // 启用编辑器动画滚动到一个位置。
  automaticLayout: true,      // 自动布局,用编辑器将安装一个间隔来检查其容器dom节点大小是否已更改。启用此功能可能会对性能产生严重影响。默认 false
  wordWrap: 'off',            // 'off' | 'on' | 'wordWrapColumn' | 'bounded' 控制编辑器的换行，默认为 "off" 表示这些行永远不会换行。"on" 表示这些行将在 viewport 宽度处换行。
  wrappingIndent: 'same',     // 控制换行的缩进。可以是: 'none', 'same', 'indent' 或 'deepIndent'。 VSCode 中默认为 'same'，而 monaco-editor 中默认为 none。
  wrappingStrategy: 'simple', // 控制要使用的包装策略。默认值为： 'simple'.
  // wordWrapBreakBeforeCharacters: "", // 配置自动换行字符。在这些字符之前将引入一个分隔符。
  // wordWrapBreakAfterCharacters: "",  // 配置自动换行字符。在这些字符之后将引入一个分隔符。
  stopRenderingLineAfter: 10000,  // 性能防护: 在x个字符后停止渲染一行，使用-1永远不停止渲染。默认值为： 10000。
  // 配置编辑器的悬停。指定的值类型为  IEditorHoverOptions { enabled?: boolean;delay?: number;sticky?: boolean;above?: boolean; }
  hover: {
    enabled: true,  // 启用悬停。默认为 true
    delay: 300,     // 显示悬停的延迟。默认为 300
    sticky: false,  // 悬停是否有粘性，可以点击并选择其内容。默认为 false。
    above: false,   // 如果可能的话，悬停是否应该显示在线的上方。默认为 false。
  },
  links: true,      // 启用检测链接并使其可点击。默认为 true
  colorDecorators: true, // 启用内嵌颜色装饰器和颜色选择器呈现。
  // 控制编辑器中注释的行为。是一个 IEditorCommentsOptions 类型
  comments: {
    insertSpace: true,      // 在行注释标记之后和块注释标记内部插入一个空格。默认为 true。
    ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为 true。
  },
  contextmenu: true,                 // 启用自定义上下文菜单，默认为 true。
  mouseWheelScrollSensitivity: 1,    // 用于鼠标滚轮滚动事件的“deltaX”和“deltaY”的乘数。默认为1。
  fastScrollSensitivity: 5,          // 按“Alt”时快速滚动多倍速度。默认值为： 5。
  scrollPredominantAxis: true,       // 启用编辑器仅滚动主轴。防止在触控板上垂直滚动时出现水平漂移。默认为 true。
  columnSelection: false,            // 启用鼠标和键的选择进行列选择。默认为 false。
  multiCursorModifier: 'alt',        // 'ctrlCmd' | 'alt'。用鼠标添加多个光标时使用的修饰符。默认值为： 'alt'。
  multiCursorMergeOverlapping: true, // 合并重叠选择。默认为 true。
  multiCursorPaste: 'spread',        // 'spread' | 'full'。配置粘贴行数等于光标数的文本时的行为。默认值为： 'spread'。
  accessibilitySupport: 'auto',      // 'auto' | 'off' | 'on' 配置编辑器的可访问性支持。默认值为： 'auto'。 最好将此设置为 'auto'。
  // accessibilityPageSize: ,// 控制编辑器中可由屏幕阅读器读出的行数。
  // 建议选项。ISuggestOptions
  suggest: {
    insertMode: 'insert',                  // 'insert' | 'replace' 接受时覆盖单词结束。
    filterGraceful: true,                  // 启用优雅匹配。默认值为： true.
    snippetsPreventQuickSuggestions: true, // 当代码段处于活动状态时，禁止快速建议。默认值为： true.
    localityBonus: true,           // 偏爱出现在光标附近的单词。
    shareSuggestSelections: true,  // 启用全局存储来记住建议。
    showIcons: true,               // 启用或禁用建议中的图标。默认值为： true。
    showStatusBar: true,           // 启用或禁用建议状态栏。
    preview: true,                 // 启用或禁用建议预览的呈现。
    previewMode: 'prefix',         // 'prefix' | 'subword' | 'subwordSmart' 配置预览模式。
    showInlineDetails: true,       // 在标签内显示详细信息。默认值为： true.
    showMethods: true,             // 显示 method-suggestions.
    showFunctions: false,          // 显示 function-suggestions.
    showConstructors: false,       // 显示 constructor-suggestions.
    showDeprecated: false,         // 显示 deprecated-suggestions.
    showFields: false,             // 显示 field-suggestions.
    showVariables: false,          // 显示 variable-suggestions.
    showClasses: false,            // 显示 class-suggestions.
    showInterfaces: false,         // 显示 interface-suggestions.
    showModules: false,            // 显示 module-suggestions.
    showProperties: false,         // 显示 property-suggestions.
    showEvents: false,             // 显示 event-suggestions.
    showUnits: false,              // 显示 unit-suggestions.
    showValues: false,             // 显示 value-suggestions.
    showConstants: false,          // 显示 constant-suggestions.
    showEnums: false,              // 显示 enum-suggestions.
    showEnumMembers: false,        // 显示 enumMember-suggestions.
    showKeywords: true,            // 显示 keyword-suggestions.
    showWords: true,               // 显示 text-suggestions.
    showColors: true,              // 显示 color-suggestions.
    showFiles: true,               // 显示 file-suggestions.
    showReferences: true,          // 显示 reference-suggestions.
    showFolders: false,            // 显示 folder-suggestions.
    showTypeParameters: true,      // 显示 typeParameter-suggestions.
    showIssues: true,              // 显示 issue-suggestions.
    showUsers: false,              // 显示 user-suggestions.
    showSnippets: true,            // 显示 snippet-suggestions.
  },
  // IInlineSuggestOptions
  inlineSuggest: {
    enabled: true,// 启用或禁用自动内联完成的呈现。
    // 如果要替换的文本是建议文本的前缀，则使用 'prefix' 仅显示重影文本。
    // 如果替换文本是建议文本的子词，则使用 'subword' 仅显示幻影文本。
    // 使用 'subwordSmart' 仅在替换文本是建议文本的子词时显示幻像文本，但子词必须在光标位置之后开始。
    mode: 'prefix', // 'prefix' | 'subword' | 'subwordSmart'， 默认为 'prefix'。
  },
  // 智能选择选项。
  smartSelect: {
    selectLeadingAndTrailingWhitespace: false, // 选择前导和尾随空白
  },
  // // 转至位置的配置选项 IGotoLocationOptions
  // gotoLocation: {
  //   multiple: 'peek',  // 'peek' | 'gotoAndPeek' | 'goto'
  //   multipleDefinitions: 'peek',  // 'peek' | 'gotoAndPeek' | 'goto'
  //   multipleTypeDefinitions: 'peek',  // 'peek' | 'gotoAndPeek' | 'goto'
  //   multipleDeclarations: 'peek',  // 'peek' | 'gotoAndPeek' | 'goto'
  //   multipleImplementations: 'peek',  // 'peek' | 'gotoAndPeek' | 'goto'
  //   multipleReferences: 'peek',  // 'peek' | 'gotoAndPeek' | 'goto'
  //   alternativeDefinitionCommand: "",
  //   alternativeTypeDefinitionCommand: "",
  //   alternativeDeclarationCommand: "",
  //   alternativeImplementationCommand: "",
  //   alternativeReferenceCommand: "",
  // },
  quickSuggestions: true,// boolean | IQuickSuggestionsOptions 启用快速建议(影子建议)。默认值为： true。
  // IEditorPaddingOptions 控制编辑器周围的间距。
  padding: {
    // number | undefined 编辑器上边缘和第一行之间的间距。
    top: undefined,
    // number | undefined 编辑器下边缘和最后一行之间的间距。
    bottom: undefined,
  },
  // 参数提示选项
  parameterHints: {
    enabled: true, // 启用参数提示。默认值为： true。
    cycle: false,  // 启用参数提示的循环。 默认值为： false。
  },
  autoClosingBrackets: 'languageDefined',  // 自动关闭括号的选项。 默认值为： 语言定义的行为。 'always' | 'languageDefined' | 'beforeWhitespace' | 'never'
  autoClosingQuotes: 'languageDefined',    // 自动结束引用的选项。 默认值为： 语言定义的行为。'always' | 'languageDefined' | 'beforeWhitespace' | 'never'
  autoClosingDelete: 'auto',               // 在引号或括号对附近按退格键的选项，即是否自动删除结束括号(包括中括号)。 'always' | 'auto' | 'never'
  autoClosingOvertype: 'always',           // 在右引号或括号上键入的选项。'always' | 'auto' | 'never'
  autoSurround: 'languageDefined',         // 自动环绕选项。 默认值为： 总是允许自动环绕。 'languageDefined' | 'quotes' | 'brackets' | 'never'
  autoIndent: 'advanced',                  // 控制当用户键入、粘贴、移动或缩进行时，编辑器是否应自动调整缩进。默认值为： advanced。'none' | 'keep' | 'brackets' | 'advanced' | 'full'
  stickyTabStops: false,                   // 使用空格缩进时模拟制表符的选择行为。 这意味着选择将坚持制表位。
  formatOnType: false,                     // 对类型启用格式。 默认值为： false。
  formatOnPaste: false,                    // 对类型启用格式。 默认值为： false。
  dragAndDrop: false,                      // 控制编辑器是否允许通过拖放来移动选择。 默认值为： false。
  suggestOnTriggerCharacters: true,        // 使建议框在触发字符上弹出。 默认值为： true。
  acceptSuggestionOnEnter: 'on',           // 接受关于输入的建议。 默认值为：'on'。
  acceptSuggestionOnCommitCharacter: true, // 接受关于提供者定义字符的建议。 默认值为： true。
  snippetSuggestions: 'top',               // 'top' | 'bottom' | 'inline' | 'none' 启用代码段建议。
  emptySelectionClipboard: false,          // 没有选择的复制将复制当前行。
  copyWithSyntaxHighlighting: true,        // 语法突出显示被复制。
  suggestSelection: 'first',               //  建议的历史模式。'first' | 'recentlyUsed' | 'recentlyUsedByPrefix'
  // suggestFontSize: 14,// 建议小部件的字体大小。 默认值为： 编辑器字体大小。 number
  // suggestLineHeight: 2, // 建议小工具的行高。 默认值为： 编辑器行高。
  tabCompletion: 'on',                     //  启用制表符结束。'on' | 'off' | 'onlySnippets'
  selectionHighlight: true,                // 启用选择突出显示。 默认值为： true。
  occurrencesHighlight: true,              // 启用语义事件突出显示。 默认值为： true。
  codeLens: true, // 显示代码 lens。默认值为： true。
  // codeLensFontFamily: ,// 代码 lens 字体 family. 默认值为： editor 字体 family.
  // codeLensFontSize: ,// 代码 lens 字体尺寸。 默认为编辑器字体大小的90%
  // 控制代码动作 lightbulb 的行为和渲染。
  lightbulb: {
    // 启用 lightbulb 代码操作。默认值为： true。
    enabled: true,
  },
  // codeActionsOnSaveTimeout: 1000, // 保存时运行代码操作超时。number
  folding: false,                           // 启用代码折叠。 默认值为： true。
  foldingStrategy: 'auto',                  // 选择折叠策略。'auto' 使用为当前文档提供的策略，'indentation'（缩进）使用基于缩进的折叠策略。默认值为： 'auto'。 'auto' | 'indentation'
  foldingHighlight: true,                   // 启用折叠区域的突出显示。 默认值为： true。
  foldingImportsByDefault: true,            // 自动折叠导入折叠区域。 默认值为： true。
  foldingMaximumRegions: 5000,              // 可折叠区域的最大数量。默认值为： 5000。
  showFoldingControls: 'mouseover',         //  控制装订线中的折叠动作是始终可见还是隐藏，除非鼠标位于装订线上方。 默认值为： 'mouseover'。'always' | 'never' | 'mouseover'
  unfoldOnClickAfterEndOfLine: false,       // 控制单击折叠线后的空白内容是否会展开该线。 默认值为： false。
  matchBrackets: 'always',                  // 启用匹配括号的高亮显示。 默认值为： 'always'。 'never' | 'near' | 'always'
  renderWhitespace: 'selection',            // 启用 whitespace 呈现。 默认值为： 'selection'。'none' | 'boundary' | 'selection' | 'trailing' | 'all'
  renderControlCharacters: true,            // 启用控制字符的呈现。 默认值为： true。
  renderLineHighlight: 'all',               // 启用当前行高亮显示的渲染。 默认值为： all。'none' | 'gutter' | 'line' | 'all' 
  renderLineHighlightOnlyWhenFocus: false,  // 控制是否仅在编辑器聚焦时才呈现当前行突出显示。 默认值为： false。
  // useTabStops: true,              // 插入和删除空白跟随制表位。
  // fontFamily: '',                 // 表示字体的 family 名称的字符串
  // fontWeight: ,                   // 字体的 weight
  // fontSize: ,                     // 字体的 size
  // lineHeight: ,                   // 行高 
  // letterSpacing: ,                // 字母间距
  // showUnused: true,               // 控制淡出未使用的变量。
  // peekWidgetDefaultFocus: 'tree', // 'tree' | 'editor' 控制默认情况下是否聚焦peek小部件中的内联编辑器。
  definitionLinkOpensInPeek: false,  // 控制定义链接是否打开peek小工具中的元素。默认值为： false。
  showDeprecated: true,              // 控制删除线 deprecated 的变量。
  // 控制内联提示的行为和呈现。
  inlayHints: {
    enabled: 'on',        // 启用内嵌提示。'on' | 'off' | 'offUnlessPressed' | 'onUnlessPressed'
    // fontSize: ,        // 内嵌提示的字体大小。默认为编辑器字体大小的 90%。
    // fontFamily: '',    // 内嵌提示的字体 family。
    padding: false,       // 启用嵌入提示周围的填充。默认值为： false。
  },
  // useShadowDOM: false, // 控制编辑器是否应该使用阴影DOM。
  // 控制编辑器参考线的行为。
  guides: {
    bracketPairs: false,              // 启用括号对参考线的渲染。默认值为： false。 boolean | 'active';
    bracketPairsHorizontal: 'active', // 启用垂直括号对参考线的呈现。默认值为： 'active'.
    highlightActiveBracketPair: true, // 启用活动括号对的高亮显示。默认值为： true。
    indentation: true,                // 启用缩进参考线的呈现。默认值为： true。
    highlightActiveIndentation: true,  // 启用活动缩进参考线的突出显示。 默认值为： true。boolean | 'always'
  },
  // 控制unicode突出显示功能的行为(默认情况下，不明确和不可见的字符会突出显示)。
  // unicodeHighlight: {
  //   nonBasicASCII: true,                // 控制是否突出显示所有非基本ASCII字符。只有U+0020和U+007E之间的字符、制表符、换行符和回车符被视为基本ASCII。 boolean | InUntrustedWorkspace
  //   invisibleCharacters: true,          // 控制是否突出显示仅保留空格或完全没有宽度的字符。boolean
  //   ambiguousCharacters: true,          // 控制是否突出显示可能与基本ASCII字符混淆的字符，但当前用户区域设置中常见的字符除外。boolean
  //   includeComments: true,              // 控制注释中的字符是否也应进行unicode突出显示。 boolean | InUntrustedWorkspace
  //   includeStrings: true,               // 控制字符串中的字符是否也应进行unicode突出显示。boolean | InUntrustedWorkspace
  //   allowedCharacters: {xxx:true},      // 定义未突出显示的允许字符。Record<string, true>
  //   allowedLocales: {'_os':true},       // 在允许的语言环境中常见的Unicode字符不会突出显示。 Record<string | '_os' | '_vscode', true>
  // },
  // 配置括号对着色(默认情况下禁用)。
  bracketPairColorization: {
    enabled: true,                             // 启用或禁用括号对着色。
    independentColorPoolPerBracketType: true,  // 每个支架类型使用独立的颜色池。
  },
  // ★★ 控件从外部源放入编辑器。启用时，会显示放置位置的预览，并触发“onDropIntoEditor”事件。
  dropIntoEditor: {
    enabled: true,      // 启用拖放到编辑器。默认值为： true。
  },

  quickSuggestionsDelay: 10,    // 快速建议显示延迟(毫秒)。默认值为： 10 (ms)
  scrollBeyondLastLine: false,  // 设置编辑器是否可以滚动到最后一行之后
  
  // dimension: {width:100,height:100},  // 指定编辑器的尺寸，包括宽度和高度，是以px为单位的数字
}