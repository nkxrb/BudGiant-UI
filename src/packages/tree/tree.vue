<template>
	<ul class="k-tree">
		<li :class="`k-tree-item ${clickItem == item?'cur':''}`"
				:level="level"
				v-for="item in data"
				:key="item"
				@mouseover="mouseover(item)"
				@mouseleave="mouseleave(item)">
			<!-- 插槽 -->
			<span v-if="$slots.default">
				<slot :item="item"></slot>
			</span>
			<span v-else
						@click.stop="mouseclick(item)">{{item.label}}</span>

			<!-- 若存在子类 -->
			<k-tree v-if="item.expand"
							:level="level+1"
							:data="item.children"
							:key="key"
							:children="children"
							@click-item="mouseclick"></k-tree>
		</li>
	</ul>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
	Ref,
	reactive,
	SetupContext,
	EmitsOptions,
	PropType,
} from "vue";

// 在此处声明传入的数据类型
export interface KTreeItem {
	key?: number | string;
	label?: string;
	expand?: boolean;
	children?: KTreeItem[];
}

export default defineComponent({
	name: "kTree",
	props: {
		data: { type: Array as PropType<KTreeItem[]>, required: true },
		level: { type: Number, default: 0 },
		key: { type: String, default: "id" },
		children: { type: String, default: "children" },
	},
	setup(props: Object, ctx: SetupContext) {
		// 当前选中的树节点
		let curNavItem: Ref<KTreeItem | null> = ref(null);

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
});

// 鼠标点击事件
const mouseclickEvent = (props: any, ctx: SetupContext) => {
	let clickItem = reactive({});
	const mouseclick = (item: KTreeItem) => {
		// 取消上一个展开的

		item.expand;
		clickItem = item;
		ctx.emit("click-item", item);
	};
	return {
		clickItem,
		mouseclick,
	};
};

const expandAllNode = () => {};

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