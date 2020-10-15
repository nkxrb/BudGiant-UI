<template>
  <ul class="k-tree">
    <li class="k-tree-item"
        v-for="item in data"
        :class="{'cur': clickItem == item[key]}"
        :key="item[key]"
        @click.stop="mouseclick(item)"
        @mouseover="mouseover(item[key])"
        @mouseleave="mouseleave(item[key])">
      <!-- 插槽 -->
      <slot v-if="$slots.default"
            :item="item"></slot>
      <span v-else>{{item.name}}</span>

      <!-- 若存在子类 -->
      <k-tree v-if="item.children && item.children.length>0 && clickItem == item[key]"
              :data="item.children"
              :key="key"
              :children="children"
              @click-item="mouseclick"></k-tree>
    </li>
  </ul>
</template>
<script lang="ts">
import { ref, Ref, SetupContext, EmitsOptions } from "vue";

export default {
  name: "kTree",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    key: { type: String, default: "id" },
    children: { type: String, default: "children" },
  },
  setup(props: Object, ctx: SetupContext) {
    // 当前选中的树节点
    let curNavItem: Ref<any> = ref("");

    // 鼠标点击事件
    const mouseclickState = mouseclickEvent(props, ctx);

    // 鼠标悬浮事件
    const mouseoverState = mouseoverEvent();

    return {
      curNavItem,
      ...mouseclickState,
      ...mouseoverState,
    };
  },
};

// 鼠标点击事件
const mouseclickEvent = (props: any, ctx: SetupContext) => {
  let clickItem: Ref<any> = ref("");
  const mouseclick = (item: any) => {
    clickItem.value = item[props.key];
    ctx.emit("click-item", item);
    // e.stopPropagation();
  };
  return {
    clickItem,
    mouseclick,
  };
};

// 鼠标悬浮事件
const mouseoverEvent = () => {
  // 鼠标悬停的导航
  let hoverItem: Ref<any> = ref("");

  const mouseover = (itemId: any) => {
    hoverItem.value = itemId;
  };
  const mouseleave = (itemId: any) => {
    hoverItem.value = "";
  };
  return {
    hoverItem,
    mouseover,
    mouseleave,
  };
};
</script>
<style lang="scss" scoped>
.k-tree-item span {
  cursor: pointer;
}
</style> 