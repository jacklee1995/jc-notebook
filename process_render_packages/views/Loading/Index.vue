<template>
  <div class="loading">
    <div class="loading-icon">
      <jc-icon name="reflesh-color"></jc-icon>
    </div>
    <font>精彩即将开始!</font>
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
}

#app {
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.loading {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .loading-icon {
    animation: rotateLoading 3s infinite;
    border-radius: 50% !important;
    span {
      font-size: 269px;
    }
  }

  font {
    color: rgb(232, 248, 8);
    font-size: 30px;
    font-weight: bolder;
  }
}

@keyframes rotateLoading {
  100% {
    transform: rotate(2880deg);
  }
}
</style>