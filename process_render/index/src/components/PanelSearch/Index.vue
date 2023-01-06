<template>
  <div class="search-panel" v-show="openSearch">
    <div class="search-board">
      <div class="input-wrapper">
        <input placeholder="请输入要查找的内容" />
        <!-- <img src="/images/close.png" @click.stop="closeSearchBoard"> -->
        <jc-icon name="window-close" @click.stop="closeSearchBoard"></jc-icon>
      </div>
      <!-- <ul>
        <li v-for="(item, index) in datas.items" :key="index">
          <input v-if="item.checked" type="radio" :name="datas.name" v-model="datas.name" :id="'radiotab_' + index" :value="item.value" checked>
          <input v-else type="radio" :name="datas.name" v-model="datas.name" :id="'radiotab_' + index" :value="item.value" >
          <label :for="'radiotab_' + index">{{ item.label }}</label>
        </li>
      </ul>
      <hr>
      {{ datas.name }} -->
      <RatioTabs :datas="datas" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, reactive } from "vue";
import RatioTabs from "../../components/RadioTabs/Index.vue";

export default defineComponent({
  components: { RatioTabs },
  setup() {
    let openSearch = ref(false)
    return {
      openSearch,
      datas: reactive({
        name: "searchItems",
        items: [
          { label: "综 合", value: "综合", checked: true},
          { label: "笔 记", value: "笔记" },
          { label: "文 库", value: "文库" },
          { label: "题 库", value: "题库" },
          { label: "消 息", value: "消息" },
          { label: "联系人", value: "联系人" },
          { label: "功 能", value: "功能" },
        ]
      }) as any
    }
  },
  methods: {
    openSearchBoard() {
      let bd = document.getElementsByTagName("body")[0];
      bd.style.filter = "grayscale(1);";
      this.openSearch = true;
    },
    closeSearchBoard() {
      this.openSearch = false;
    }
  },
});
</script>

<style lang="scss">
.search-panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.search-board {
  position: absolute;
  top: 20px;
  width: 90%;
  height: 95%;
  background-color: #f4f5f8;
  box-shadow: 2px 2px 13px 5px #acacac;
  border-radius: 9px;

  .input-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 29px;

    input {
      width: 830px;
      height: 40px;
      border-radius: 19px;
      border: #e0e1e6 2px solid;
      padding-top: 4px;
      padding-left: 46px;
      font-size: 16px;
      background-color: #ffffff;
      // background-image: url('/images/searcher.png');
      // background-size: 24px;
      // background-position: 9px 7px;
      // background-repeat: no-repeat;
    }

    span {
      $size:24px;
      position: relative;
      width: $size;
      height: $size;
      left: -36px;
      top: 8px;
      
      border-radius: 3px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #e4e4e4;
        
      }
    }
  }

  ul {
    height: 30px;
    display: block;
    margin: 0;

    li {
      display: inline;
      padding-top: 2px;
      padding-bottom: 2px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: #439bff;
        background-color: #e0f6ff;
      }

      $input-width: 90px;

      input[type="radio"] {
        width: $input-width;
        height: 30px;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        position: absolute;
      }

      input[type="radio"]:checked {
        color: #0e4eff;
        border-bottom: #0e4eff solid 3px;
      }

      label {
        display: inline-block;
        width: $input-width;
        vertical-align: middle;
        color: #292929;
        cursor: pointer;
        user-select: none;
        text-align: center;
      }
    }
  }
}
</style>