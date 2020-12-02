<template>
  <div class="components">
    <div class="left">
      <k-tree :data="navData"
              item-class="tree-item"
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
import { defineComponent, reactive } from "vue";
import navData from "./navtree";
export default defineComponent({
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
});
</script>

<style lang="scss">
.components {
  display: flex;
  min-height: calc(100vh - 50px);
  .left {
    padding: 20px;
    width: 200px;
    min-height: 100%;
    box-shadow: 4px 4px 10px 0px #b1b1b1;
  }
  .right {
    width: calc(100% - 200px);
  }
  li[level="0"] {
    padding: 5px;
    text-align: left;
    font-weight: bold;
  }
  li[level="1"] {
    padding: 5px 15px 0;
    font-weight: 400;
  }
}
</style>