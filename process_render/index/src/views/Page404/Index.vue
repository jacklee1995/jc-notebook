<template>
<div class="pg404">
  <div class="tl">404</div>
  <div class="dscrp">您访问的页面不存在</div>
</div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  getCurrentInstance, 
  reactive, 
  ref 
} from 'vue';



export default defineComponent({
  name: 'Page404',
  props: {
    datas: {
      type:Object,
      default: {title:"xxxx"}
    }
  },
  setup(props){
    const { proxy } = (getCurrentInstance() as any);       // 全局变量代理
    let datas = (props as any).datas;                      // 父组件数据

  return {
    proxy,

    }
  },
  
  // components:{
  // },

  // methods:{
  // }
});
</script>

<style lang="scss" scoped>
.pg404{
  width: 100%;
  height: 100%;
  // background: url('./bg404.png') no-repeat 100% 100%;
  background-image:url('./bg404.png');
  background-repeat: no-repeat;
  background-size:100% 100%;
  color: white;
  font-weight: bolder;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .tl{
    font-size: 120px;
  }
  .dscrp{
    font-size: 30px;
  }
}
</style>