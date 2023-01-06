<template>
  <!--使用左侧手风琴菜单-->
  <div v-if="use == 'accroding'" class="according-container">
    <h2>{{ datas.according.title }}</h2>
    <hr>
    <!-- <According :datas="datas.according.datas" /> -->
    <div class="latest">
      <ul v-if="latestSources.length!==0" class="list-latest">
        <li v-for="(item, index) in latestSources" :key="index">{{item.title}}</li>
      </ul>
      <p v-else class="latest-empty">看起来没有打开过任何资源哦，快去使用吧！</p>
    </div>
  </div>

  <!--使用左侧卡片导航栏-->
  <div v-else-if="use == 'side-tabs'" class="side-tabs">
    <!--商标-->
    <div class="logo">
      <jc-icon name="jcstudio"></jc-icon>
    </div>
    <!--卡片集-->
    <div class="cards">
      <div v-for="(item, index) in datas.cardTabs" :key="index"
        :class="['card', { 'card-active': index == curruntIndex }]" @click.stop="routerByIndex(index)"
        @mouseover="showMoreList(index)">
        <jc-icon :name="item.icon"></jc-icon>
        <p>{{ item.title }}</p>
        <ul :ref="`menu_${index}`" @mouseleave="hideMoreList(index)" v-if="item.children" class="menu-more-list">
          <li v-for="(itemC, indexC) in item.children" :key="indexC" @click.stop="routerToOrAction(itemC)">
            <jc-icon :name="itemC.icon"></jc-icon>
            <p>{{ itemC.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import According from "../../components/AccordionRadio/Index.vue";

declare type SIDEBAR_CARD_DATATYPE_BASE = { title: string, icon: string, to?: string }
declare type SIDEBAR_CARD_DATATYPE = SIDEBAR_CARD_DATATYPE_BASE | { title: string, icon: string, to?: string, children: SIDEBAR_CARD_DATATYPE_BASE[] }

export default defineComponent({
  // components: { According, },
  props: ["datas"],
  setup(props) {

    function initCardDatas(cardTabs: SIDEBAR_CARD_DATATYPE[]) {
      let res: SIDEBAR_CARD_DATATYPE[] = [];
      if (cardTabs.length > 6) {
        res = res.concat(cardTabs.slice(0, 6));
        res.push(
          { title: "更多", icon: "symbol-more", children: cardTabs.slice(6,) }
        )
      } else {
        res = res.concat(cardTabs);
      }
      return res;
    }

    return {
      datas: {
        according: props.datas.according,
        cardTabs: initCardDatas(props.datas.cardTabs)
      },
      openedTabs: [] as number[],
      use: ref("side-tabs"),
      curruntIndex: ref(0),
      latestSources: ref([
        {title:'TITLE1', type: 'file-md'},
        {title:'TITLE2', type: 'file-md'},
      ])
    };
  },
  methods: {
    /**切换SideBar类型 */
    toggle() {
      if (this.use == "accroding") {
        this.use = "side-tabs"
      }
      else if (this.use == "side-tabs") {
        this.use = "accroding"
      } else {
        this.use = "side-tabs"
      }
    },
    routerByIndex(index: number) {
      this.curruntIndex = index;
      // 跳转路由
      if(this.datas.cardTabs[index].to){
        console.log('this.datas.cardTabs[index].to =',this.datas.cardTabs[index].to);
        this.$router.push(this.datas.cardTabs[index].to);
      }
      // 执行动作
      else if(this.datas.cardTabs[index].action){
        this.datas.cardTabs[index].action()
      }
      
    },
    /** 跳转到给定路由 */
    routerToOrAction(item: any) {
      console.log(item);
      
      // 指定的未跳转路由
      if (item.to) {
        this.$router.push(item.to)
      }
      // 指定的时动作
      else if(item.action){
        console.log("action =",item.action);
        item.action()
      }
    },
    /** 显示更多选项卡 */
    showMoreList(index: number) {
      // 先关闭已经打开的其它子菜单
      this.openedTabs.forEach((index) => {
        this.hideMoreList(index)
      })
      this.openedTabs = [];
      let refName = `menu_${index}`;
      let vDom: null | HTMLElement = this.$refs[refName] as any;
      if (vDom) {
        if (vDom instanceof Array) {
          vDom = vDom[0]
          if (vDom) {
            vDom.style.display = "flex";
          }
        }
      }
      this.openedTabs.push(index);
    },
    /** 关闭更多选项卡 */
    hideMoreList(index: number) {
      let refName = `menu_${index}`;
      let vDom: null | HTMLElement = this.$refs[refName] as any;
      if (vDom) {
        if (vDom instanceof Array) {
          vDom = vDom[0];
          if (vDom) {
            vDom.style.display = "none";
          }
        }
      }

    }
  },
});
</script>

<style lang="scss" scoped>
.according-container {
  padding: 0;
  margin: 0;
  -webkit-app-region: drag;
  h2 {
    user-select: none;
    padding: 9px;
    color: #909493;
  }

  .latest{
    -webkit-app-region: no-drag;
    ul.list-latest{
      margin: 9px;
      li{
        list-style: none;
        padding: 3px;
        color: #038eff;
        user-select: none;
        cursor: pointer;
        &:hover{
          background-color: #3c4b74;
        }
      }
    }
    p.latest-empty{
      margin: 13px;
      color: #F8F9FA;
    }
  }

  
}

.side-tabs {
  width: 60px;
  $logo-size: 24px;
  .logo {
    width: $logo-size;
    height: $logo-size;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 39px;
    margin: 16px auto 12px auto;
    // border-radius: 50%;
    color: #74f164;
    background-color: #fada4e;
  }

  .cards {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    $active-color: #1b2233;

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      color: rgb(236, 236, 236);
      width: 52px;
      height: 56px;
      border-radius: 6px;
      margin-bottom: 3px;

      p {
        white-space: nowrap;
        font-size: 9px;
      }

      &:hover {
        background-color: $active-color;
      }
    }

    .card-active {
      background-color: $active-color;
    }

    .card-active-more {
      background-color: $active-color;
    }

    ul.menu-more-list {
      display: none;
      position: absolute;
      width: 150px;
      top: 0px;
      left: 62px;
      background-color: #F8F9FA;
      z-index: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 6px 0 6px 0;
      border: 1px solid rgb(172, 172, 172);
      border-radius: 6px;

      li {
        width: 100%;
        list-style: none;
        white-space: nowrap;
        padding: 6px;
        user-select: none;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        cursor: pointer;

        p {
          padding-left: 12px;
          text-align: center;
        }

        span {
          padding-left: 12px;
          display: flex;
          flex-direction: row;
          justify-items: center;
          align-items: center;
        }

        &:hover {
          background-color: #e0e0e0;
        }
      }

      color: #363636;
    }

  }
}

</style>