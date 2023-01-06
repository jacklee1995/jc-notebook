<template>
<div 
  class="markdown_viewer"
  v-html="html_text" 
  ref="markdown_viewer"
></div>
  

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from "vue";
import { marked } from 'marked';
import markedKatex from "marked-katex-extension";


import { setupLangHighlight } from './languageHighlight';




marked.use(markedKatex( {
  throwOnError: false
}));


export default defineComponent({
  components: {},
  props: {
    initText:{
      type:  String,
      default : "# 标题"
    }
  },
  setup(props) {
    return {
      text:ref(props.initText),
      html_text:ref("")
    };
  },
  mounted() {
    setupLangHighlight(marked,'rust');
    setupLangHighlight(marked,'c');
    setupLangHighlight(marked,'cpp');
    setupLangHighlight(marked,'csharp');
    setupLangHighlight(marked,'python');
    setupLangHighlight(marked,'java');
    setupLangHighlight(marked,'r');
    setupLangHighlight(marked,'go');
    setupLangHighlight(marked,'cmd');
    setupLangHighlight(marked,'shell');
    setupLangHighlight(marked,'powershell');
    setupLangHighlight(marked,'javascript');
    setupLangHighlight(marked,'dart');
    setupLangHighlight(marked,'sql');
    setupLangHighlight(marked,'xml');
    setupLangHighlight(marked,'html');
    setupLangHighlight(marked,'css');
    setupLangHighlight(marked,'sass');
    setupLangHighlight(marked,'less');
    setupLangHighlight(marked,'vue');
    setupLangHighlight(marked,'verilog');
    this.text = (this.$parent as any).getMarkdownContent();
    this.html_text = marked.parse(this.text);
    
    (this.$refs.markdown_viewer as HTMLElement).addEventListener("scroll",this.onViewerScroll);
  },
  
  methods: {
    // 编辑器更改事件后，在阅读器端的动作函数
    contentChanged(str:string){
      this.html_text = marked.parse(str)
    },

    // 获取编辑器的高度
    getTotalHeight(){
      return (this.$refs.markdown_viewer as HTMLElement).scrollHeight;
    },

    onViewerScroll(){
      // 如果是由编辑器滚动引发滚动则先禁用自身的滚动回调动作
      if(!(this.$parent as any).starttingScrollFromEditor){

        (this.$parent as any).starttingScrollFromViewer = true;
        
        let markdown_viewer = this.$refs.markdown_viewer as HTMLElement;
        let height = this.getTotalHeight();
        let top_init = markdown_viewer.getBoundingClientRect().top;

        let first_top = (markdown_viewer.firstElementChild as HTMLElement).getBoundingClientRect().top

        let rate = Math.abs(top_init-first_top) / height;
        
        (this.$parent as any).setEditorScroll(rate);
        // console.log("--------------------");
      }
      
    },

    // 用于同步阅读器页面到指定比例
    setViewerScroll(rate:number){
      // console.log("rate =",rate);
      // console.log("height =",this.getTotalHeight());
      // console.log("scrollHeight =",this.getTotalHeight()* rate);
      
      // 先完成由编辑器引起的回调动作：即滚动 Viewer
      (this.$refs.markdown_viewer as HTMLElement).scrollTop =  this.getTotalHeight()* rate;
      (this.$refs.markdown_viewer as HTMLElement).addEventListener("scroll",this.onViewerScroll);
      // 取消Viewer的回调动作禁用
      (this.$parent as any).starttingScrollFromEditor = false;
    },
    // beforeDestroy(){
    //   window.removeEventListener('scroll',this.onViewerScroll);
    // }
  },
});
</script>

<style lang="scss">
// @import url(./jcmd.scss);
@import url(./display.scss);
@import url(./scss/base16/chalk.scss);
.markdown_viewer{
  padding: 12px;
  background-color: #FFFFFF;
}
a{
  color: #4EA0DA;
}
li a{
  color: #35c7c7;
}

p {
  a{
    color: #4EA0DA;
    font-weight: bold;
  }
}

pre {
  background: #F2F2F2;

}



</style>

<style lang="scss" scoped>
.markdown_viewer{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
</style>