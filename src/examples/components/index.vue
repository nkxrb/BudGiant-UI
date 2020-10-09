<template>
  <div class="components">
    <div class="left">
      <k-nav-tree :data="navData"></k-nav-tree>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navData from './navtree.json'
export default {
  name: 'components',
  setup () {

    return {
      navData
    }
  }
}
</script>

<style lang="scss" scoped>
.components {
  display: flex;
  min-height: calc(100vh - 50px);
  .left {
    padding: 20px;
    width: 200px;
    min-height: 100%;
  }
  .right {
    width: calc(100% - 200px);
  }
}
</style>