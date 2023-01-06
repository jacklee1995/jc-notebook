<template>
  <ul>
    <li v-for="(item, index) in datas.items" :key="index">
      <input v-if="item.checked" type="radio" :name="datas.name" v-model="datas.name" :id="`radiotab_${index}`"
        :value="item.value" checked>
      <input v-else type="radio" :name="datas.name" v-model="datas.name" :id="`radiotab_${index}`" :value="item.value">
      <label :for="`radiotab_${index}`">{{ item.label }}</label>
    </li>
  </ul>
  <hr>
  {{ datas.name }}
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    datas: {
      default: {
        name: "searchItems",
        items: [
          { label: "测试", value: "测试", checked: true },
        ]
      }
    }
  },
  setup(props) {
    let datas = props.datas;
    datas.name = (datas.items[0] as {label:string, value:string, checked?:boolean}).value;
    return {
      datas: datas
    };
  },
  methods: {

  },
});
</script>

<style lang="scss" scoped>
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
</style>