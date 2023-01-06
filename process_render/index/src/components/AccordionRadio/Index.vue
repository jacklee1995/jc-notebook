<template>
<transition>
  <ul class="accordion-content1">
    <li class="accordion-content1-li" v-for="(item1, index1) in datas" :key="index1">
      <jc-icon :name="item1.icon" ></jc-icon>
      <div>
        <input type="radio" name="accordion_1" :id="`accordion_${index1}`" v-if="item1.path" :value="item1.path"
          v-model="content1" @click="pageTo(item1.path)">
        <input type="radio" name="accordion_1" :id="`accordion_${index1}`" v-else :value="`${index1}`"
          v-model="content1">
        <label :for="`accordion_${index1}`">{{ item1.title }}</label>
        <ul v-if="!item1.path" class="accordion-content2">
          <li v-for="(item2, index2) in item1.children" :key="index2">
            <input type="radio" name="accordion_2" :id="`according_${index1}_${index2}`" v-if="item2.path"
              :value="item2.path" v-model="content2" @click="pageTo(item2.path)">
            <input type="radio" name="accordion_2" :id="`according_${index1}_${index2}`" v-else
              :value="`${index1}-${index2}`" v-model="content2">
            <label :for="`according_${index1}_${index2}`">{{ item2.title }}</label>
            <ul v-if="!item2.path">
              <li v-for="(item3, index3) in item2.children" :key="index3" @click="pageTo(item3.path)">
                <input type="radio" name="accordion_3" :id="`according_${index1}_${index2}_${index3}`"
                  v-if="item3.path" :value="item3.path" v-model="content3">
                <input type="radio" name="accordion_3" :id="`according_${index1}_${index2}_${index3}`"
                  v-else :value="`${index1}-${index2}-${index3}`" v-model="content3">
                <label :for="`according_${index1}_${index2}_${index3}`">{{ item3.title }}</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</transition>
</template>
  
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  components: {},
  props:{
    datas:{
      default:[
        {
          title: "一级目录1", icon:"jcicon-home",  children: [
            {
              title: "二级目录1-1", path: "#1-1", children: [
                { title: "三级目录1-1-1", path: "#1-1-1" },
                { title: "三级目录1-1-2", path: "#1-1-2" },
                { title: "三级目录1-1-3", path: "#1-1-3" },
              ]
            },
            {
              title: "二级目录1-2", children: [
                { title: "三级目录1-2-1", path: "#1-2-1" },
                { title: "三级目录1-2-2", path: "#1-2-2" },
                { title: "三级目录1-2-3", path: "#1-2-3" },
              ]
            },
          ]
        },
        {
          title: "一级目录2", children: [
            {
              title: "二级目录2-1", path: "#2-1", children: [
                { title: "三级目录2-1-1", path: "#2-1-1" },
                { title: "三级目录2-1-2", path: "#2-1-2" },
                { title: "三级目录2-1-3", path: "#2-1-3" },
              ]
            },
            {
              title: "二级目录2-2", children: [
                { title: "三级目录2-2-1", path: "#2-2-1" },
                { title: "三级目录2-2-2", path: "#2-2-2" },
                { title: "三级目录2-2-3", path: "#2-2-3" },
              ]
            }
          ]
        },
        { title: "一级目录3", path: "#3" },
      ]
    }
  },
  setup(props) {
    return {
      content1: ref(null),
      content2: ref(null),
      content3: ref(null),
      datas: reactive(props.datas)
    }
  },
  methods: {
    pageTo(url: string) {
      this.$router.push(url);
    }
  },
})

</script>
  
<style lang="scss" scoped>
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 20px;
}
li {
  display: list-item;
  list-style: none;
  list-style-type: none;
  text-align: -webkit-match-parent;
}


// .v-enter-active {
//   animation: donghua var(--time);
// }

// .v-leave-active {
//   animation: donghua var(--time) reverse;
// }

// @keyframes donghua {
//   from {
//     transform: translateY(var(--hight));
//     opacity: 0;
//   }
//   to {
//     transform: translateY(0px);
//     opacity: 1;
//   }
// }

ul.accordion-content1 {
  padding: 0;
  margin: 0;
  li.accordion-content1-li {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    span {
      cursor: pointer;
      padding: 10px;
      color: #e6dada;
    }
    label{
      cursor: pointer;
      font-size:19px;
    }
  }
}

input {
  appearance: none;
  cursor: pointer;
  user-select: none;
  width: 190px;
  height: 30px;
  padding: 0;
  margin: 0;

  &:checked {
    background-color: #3f6597;

    &~ul li {
      display: block;
    }
  }

  &:hover {
    background-color: #304e8b;
  }

  &~ul li {
    display: none;
  }
}

label {
  user-select: none;
  color: #e6dada;
  position: absolute;
  left: 0;
}

ul.accordion-content2 {
  transition: all .3s linear;
  background-color: #14365e;
  input {
    &:checked {
      background-color: #457cc4;

      &~ul li {
        display: block;
      }
    }

    &:hover {
      background-color: #304e8b;
    }

    &~ul li {
      display: none;
    }
  }
}

.v-enter-active {
  animation: donghua var(--time);
}

.v-leave-active {
  animation: donghua var(--time) reverse;
}

@keyframes donghua {
  from {
    transform: translateY(var(--hight));
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>