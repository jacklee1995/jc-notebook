<template>
<div class="markdown-window">
  <WindowNavTop windowName="viewer-markdown" :globalID="globalID">
      <p class="win-title">{{ filepath }}</p>
  </WindowNavTop>
  <div class="markdown_viewer" v-html="html_text" ref="markdown_viewer"></div>
</div>
</template>
  
<script lang="ts">
const { ipcRenderer } = require('electron');
const fs = require('fs')
import { defineComponent } from 'vue';
import { ref } from "vue";
import { marked } from 'marked';
import markedKatex from "marked-katex-extension";
import { setupLangHighlight } from './languageHighlight';
import { CURRENT_FILE, GLOBAL_WINDOW_ID } from '@index/enums/cache_enums';
import WindowNavTop from '@components/NavBarWindowTop/Index.vue';

marked.use(markedKatex({
  throwOnError: false
}));

export default defineComponent({
  components: { WindowNavTop },
  props: {
    initText: {
      type: String,
      default: "# 测试文档"
    }
  },
  setup() {
    let filepath = ref("") // 所编辑的文件的地址
    let _ = localStorage.getItem(CURRENT_FILE);
    if(_){
      filepath.value = _;
    }
    
    let globalID = ref(localStorage.getItem(GLOBAL_WINDOW_ID));
    localStorage.setItem(GLOBAL_WINDOW_ID, '')
    return {
      globalID,
      // text: ref(props.initText),
      html_text: ref(""),
      filepath
    };
  },
  methods: {
    readTextFile() {
      return fs.readFileSync(this.filepath).toString();
    }
  },
  mounted() {
    setupLangHighlight(marked, 'rust');
    setupLangHighlight(marked, 'c');
    setupLangHighlight(marked, 'cpp');
    setupLangHighlight(marked, 'csharp');
    setupLangHighlight(marked, 'python');
    setupLangHighlight(marked, 'java');
    setupLangHighlight(marked, 'r');
    setupLangHighlight(marked, 'go');
    setupLangHighlight(marked, 'cmd');
    setupLangHighlight(marked, 'shell');
    setupLangHighlight(marked, 'powershell');
    setupLangHighlight(marked, 'javascript');
    setupLangHighlight(marked, 'dart');
    setupLangHighlight(marked, 'sql');
    setupLangHighlight(marked, 'xml');
    setupLangHighlight(marked, 'html');
    setupLangHighlight(marked, 'css');
    setupLangHighlight(marked, 'sass');
    setupLangHighlight(marked, 'less');
    setupLangHighlight(marked, 'vue');
    setupLangHighlight(marked, 'verilog');
    this.html_text = marked.parse(this.readTextFile());
  },
});
</script>
  
<style lang="scss">
// @import url(./jcmd.scss);
@import url(./display.scss);
@import url(./scss/base16/chalk.scss);

.markdown-window {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  p.win-title {
    color: #cccccc;
  }
}

.markdown_viewer {
  padding: 12px;
  background-color: #FFFFFF;
}

a {
  color: #4EA0DA;
}

li a {
  color: #35c7c7;
}

p {
  a {
    color: #4EA0DA;
    font-weight: bold;
  }
}

pre {
  background: #F2F2F2;

}
</style>
  
<style lang="scss" scoped>
.markdown_viewer {
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
</style>