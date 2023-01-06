<template>

<router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>

<router-view v-else></router-view>




</template>

