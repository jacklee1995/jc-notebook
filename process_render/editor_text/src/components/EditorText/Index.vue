<template>
  <div class="text-window">
    <WindowNavTop windowName="editor-markdown">
      <template v-slot:left>
        <ul class="top-ctrl">
          <li><jc-icon name="save"></jc-icon></li>
          <li><jc-icon name="action-undo"></jc-icon></li>
          <li><jc-icon name="action-restore"></jc-icon></li>
        </ul>
      </template>
      <template v-slot:title>
        <p class="win-title">{{ basename }}</p>
      </template>
    </WindowNavTop>
    <div class="editor" ref="container"></div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ref, reactive } from "vue";
import * as monaco from "monaco-editor";
import WindowNavTop from '../NavBarWindowTop/Index.vue';
// import { CURRENT_FILE } from '../../constants/cache_enums';
const { ipcRenderer } = require('electron');
import { setupOpenFileIpc } from './path_ipc';
const fs = require('fs');
const path = require('path');
declare type lineNumType = 'on' | 'off' | 'relative' | 'interval' | ((lineNumber: number) => string);

export default defineComponent({
  components: { WindowNavTop },
  props: {
    path: {
      type: String,
      default: 'new'
    },
    init_value: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    let filepath = ref(props.path); 
    return {
      editor: reactive({}) as monaco.editor.ICodeEditor,
      init_value: props.init_value,
      filepath,
      basename: ref(''),
      value: ref(props.init_value),
      useMinimap: ref(true),
      useLineNumbers: ref('off'),

    };
  },
  methods: {
    /**重置编辑器文本 */
    setValue(value: string): void {
      this.editor.setValue(value);
    },
    // 读取文件
    readFile(filepath: string) {
      return fs.readFileSync(filepath).toString();
    },
    // 模型内容更改事件的回调
    onChangeContent() {
      // let str = this.editor.getValue();
    },
    getMarkdownContent() {
      return this.editor.getValue();
    },

    /**编辑器的保存事件 */
    saveValue(event: monaco.IKeyboardEvent) {
      // event.preventDefault();
    },


    // 切换行号的显示和隐藏
    toggleLineNumBar() {
      if (this.useLineNumbers === "off") {
        this.useLineNumbers = "on"
      } else {
        this.useLineNumbers = "off"
      }
      console.log(this.useLineNumbers);
    },
    /**新建 Text */
    newTextFile() {
      ipcRenderer.send('create-new-file', 'text')
    },

    /**打开本地文件 */
    openFile() {
      ipcRenderer.send('select-file-or-path', 'open-files')
    }
  },
  mounted() {

    if (this.filepath !== 'new' && this.filepath !== '') {
      console.log("filepath =", this.filepath);
      this.init_value = this.readFile(this.filepath)
    } else {
      console.log('filepath ======',this.filepath);
      
      setupOpenFileIpc()
        .then(
          (_path: string) => {
            this.filepath = _path;
            this.basename = path.basename(_path)
            this.setValue(this.readFile(_path))
          }
        )
    }
    
    console.log('*************** this.filepath =',this.filepath);
    
    monaco.editor.create(this.$refs.container as HTMLElement, {
      value: this.value,
      language: 'text',
      theme: "vs",                  // 内置主题包括 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
      automaticLayout: true,        // 自动布局,用编辑器将安装一个间隔来检查其容器dom节点大小是否已更改。启用此功能可能会对性能产生严重影响。默认 false
      selectionClipboard: true,     // 启用Linux主剪贴板。默认值为： true
      lineNumbers: this.useLineNumbers as lineNumType,
      cursorSurroundingLines: 0,
      minimap: {
        enabled: this.useMinimap,   // 启动小地图渲染，默认值为： true。
        autohide: false,            // 自动隐藏小地图
        side: 'left',               // 在编辑器中控制小地图的边。默认值为：'right'。'right' | 'left'
        size: 'proportional',       // 控制小地图渲染模式。（旧版本默认值为： 'actual'。） 'proportional' | 'fill' | 'fit'
        showSlider: 'mouseover',    // 控制小地图滑块的渲染。默认值为： 'mouseover'。
        renderCharacters: true,     // 在一行上呈现实际文本(相对于颜色块)。默认值为： true。
        maxColumn: 120,             // 限制小地图的宽度，最多呈现一定数量的列。默认值为： 120。
        scale: 1,                   // 小地图中字体的相对大小。 默认值为： 1。
      },
      copyWithSyntaxHighlighting: true, // 允许高亮控制
      wordWrap: 'on',  // 'off' | 'on' | 'wordWrapColumn' | 'bounded' 控制编辑器的换行，默认为 "off" 表示这些行永远不会换行。"on" 表示这些行将在 viewport 宽度处换行。
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
      // 配置编辑器的悬停。指定的值类型为  IEditorHoverOptions { enabled?: boolean;delay?: number;sticky?: boolean;above?: boolean; }
      hover: {
        enabled: true,  // 启用悬停。默认为 true
        delay: 300,     // 显示悬停的延迟。默认为 300
        sticky: false,  // 悬停是否有粘性，可以点击并选择其内容。默认为 false。
        above: false,   // 如果可能的话，悬停是否应该显示在线的上方。默认为 false。
      },
      links: true,      // 启用检测链接并使其可点击。默认为 true
      // 控制编辑器中注释的行为。是一个 IEditorCommentsOptions 类型
      comments: {
        insertSpace: true,      // 在行注释标记之后和块注释标记内部插入一个空格。默认为 true。
        ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为 true。
      },
      contextmenu: true,                 // 启用自定义上下文菜单，默认为 true。

      // IInlineSuggestOptions
      inlineSuggest: {
        enabled: true,// 启用或禁用自动内联完成的呈现。
        // 如果要替换的文本是建议文本的前缀，则使用 'prefix' 仅显示重影文本。
        // 如果替换文本是建议文本的子词，则使用 'subword' 仅显示幻影文本。
        // 使用 'subwordSmart' 仅在替换文本是建议文本的子词时显示幻像文本，但子词必须在光标位置之后开始。
        mode: 'prefix', // 'prefix' | 'subword' | 'subwordSmart'， 默认为 'prefix'。
      },

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
      // 控制编辑器参考线的行为。
      guides: {
        bracketPairs: false,                    // 启用括号对参考线的渲染。默认值为： false。 boolean | 'active';
        bracketPairsHorizontal: 'active',       // 启用垂直括号对参考线的呈现。默认值为： 'active'.
        highlightActiveBracketPair: true,       // 启用活动括号对的高亮显示。默认值为： true。
        indentation: true,                      // 启用缩进参考线的呈现。默认值为： true。
        highlightActiveIndentation: true,       // 启用活动缩进参考线的突出显示。 默认值为： true。boolean | 'always'
      },
      // 配置括号对着色(默认情况下禁用)。
      bracketPairColorization: {
        enabled: true,                             // 启用或禁用括号对着色。
        independentColorPoolPerBracketType: true,  // 每个支架类型使用独立的颜色池。
      },
      // ★★ 控件从外部源放入编辑器。启用时，会显示放置位置的预览，并触发“onDropIntoEditor”事件。
      dropIntoEditor: {
        enabled: true,      // 启用拖放到编辑器。默认值为： true。
      },
    });




    // 获取创建的唯一一个编辑器实例
    this.editor = monaco.editor.getEditors()[0];
    // 定义内容改变事件回调
    this.editor.onDidChangeModelContent(this.onChangeContent);

    // 定义编辑器的按键事件 (listener: (e: T) => any, thisArg?: any): IDisposable;
    this.editor.onKeyDown(this.saveValue)

  },
});
</script>
  
<style lang="scss" scoped>
.text-window {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
ul.top-ctrl{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  li {
    list-style: none;
    span {
      -webkit-app-region: no-drag;
      color: #ffffff;
      padding: 0 6px 0 3px;
      cursor: pointer;

    }

    &:hover {
      background-color: #0a1a46;
    }
  }
}
  .win-title {
    color: #dbdbdb;
    // 文字溢出自动省略号
    width: 360px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
}

.editor {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>