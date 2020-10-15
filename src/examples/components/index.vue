<template>
  <div class="components">
    <div class="left">
      <k-tree :data="navData"
              @click-item="clickItemFn">
      </k-tree>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
declare interface NavTreeItem {
  path: string;
}

import router from "../router";
import { reactive } from "vue";
import navData from "./navtree";
export default {
  name: "components",
  setup() {
    // 当前选中的树节点

    const clickItemFn = (item: NavTreeItem) => {
      console.log("clickItem", item);
      router.push({ path: item.path });
    };

    return {
      navData,
      clickItemFn,
    };
  },
};
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