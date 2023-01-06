<template>
<div class="setBox">
  <!--导航区-->
  <div class="nav">
    <div class="search">
      <input type="text" class="searchTerm" placeholder="搜索设置?">
      <button type="submit" class="searchButton">
        <jc-icon name="search"></jc-icon>
     </button>
   </div>
    
    <ul class="set-menu1">
      <li v-for="(item, index) in datas" :key="index" @click="pathTo(item.path)">
        <input type="radio" name="setnav-items" :id="`r${index}`" />
        <label :for="`r${index}`">
          <jc-icon :name="item.icon" ></jc-icon>
          <span>{{item.title}}</span>
        </label>
      </li>
    </ul>
  </div>
  <!--页面区-->
  <div class="contents">
    <h1>设置中心</h1>
    <routerView/>
  </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, reactive } from "vue";

export default defineComponent({
  setup(props) {
    return {
      datas:[
        { title: "系统设置", path: "/settings/system", icon: "pictures", },
        { title: "账户设置", path: "/settings/user", icon: "pictures", },
        { title: "网络设置", path: "/settings/network", icon: "pictures", },
        { title: "markdown设置", path: "/settings/markdown", icon: "pictures", },
        { title: "思维导图设置", path: "/settings/mindmap", icon: "pictures", },
      ]
    };
  },
  methods: {
    pathTo(path){
      this.$router.push(path)
      console.log('routerTo path =',path);
      
    }
  },
});
</script>

<style lang="scss" scoped>
.setBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #F3F3F3;
  .nav{
    height: 100%;
    width: 300px;
    background-color: #bad4d0;
    padding: 9px;
    .search {
      width: 100%;
      position: relative;
      display: flex;
      $search-color:#79eeae;
      margin-bottom: 12px;
      .searchTerm {
        border: 3px solid $search-color;
        border-right: none;
        padding: 5px;
        border-radius: 5px 0 0 5px;
        outline: none;
        color: #9DBFAF;
      }
      .searchTerm:focus{
        color: $search-color;
      }
      .searchButton {
        width: 40px;
        height: 36px;
        border: 1px solid $search-color;
        background: $search-color;
        text-align: center;
        color: #fff;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        font-size: 20px;
      }
    }
  
    
    ul.set-menu1{
      // width: 90%;
      // height: 100%;
      li{
        font-size: 17px;
        height: 37px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        user-select: none;
        input {
          appearance: none;
        }
        label{
          width: 90%;
          display: flex;
          flex-direction: row;
          border-radius: 6px;
          justify-content: flex-start;
          align-items: center;
          background-color: antiquewhite;
          span {
            padding-left: 9px;
          }
          &:hover{
            background-color: #EAEAEA;
          }
        }
      }
    }
  }
  .contents{
    height: 100%;
    width: 100%;
    flex-flow: 1;
    background-color: #90cc58;
  }
}


// @media screen and (max-width: 480px) {
//   .setBox {
//     display: flex;
//     flex-direction:column;
//   }
// }
</style>