<template>
	<nav>
		<ul class="k-nav">
			<li v-for="item in data"
					:class="{'cur': clickItem == item.key}"
					:key="item.key"
					@click="mouseclick(item)"
					@mouseover="mouseover(item)"
					@mouseleave="mouseleave(item)">
				<!-- 导航链接 -->
				<router-link :to="item.path">
					<!-- 插槽 -->
					<slot v-if="$slots.default"
								:item="item"></slot>
					<span v-else>{{item.label}}</span>

					<!-- 若存在子类 -->
					<nav v-if="item.children && item.children.length>0 && hoverItem == item.key"
							 class="k-nav-item">
						<ul>
							<li v-for="child in item.children"
									:key="child.key">
								<router-link :to="child.path || '/#'">
									<!-- 插槽 -->
									<slot v-if="$slots.default"
												:item="child"></slot>
									<span v-else>{{child.label}}</span>
								</router-link>
							</li>
						</ul>
					</nav>
				</router-link>
			</li>
		</ul>
	</nav>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, PropType } from "vue";

// 在此处声明传入的数据类型
export interface KNavItem {
	key?: number | string;
	label?: string;
	path?: string;
	children?: KNavItem[];
}

export default defineComponent({
	name: "kNav",
	props: {
		data: {
			type: Array as PropType<KNavItem[]>,
			required: true,
		},
		key: { type: String, default: "id" },
		children: { type: String, default: "children" },
	},
	setup() {
		// 当前选中的导航
		let curNavItem: Ref<KNavItem | null> = ref(null);

		// 鼠标点击事件
		const mouseclickState = mouseclickEvent();

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
const mouseclickEvent = () => {
	let clickItem: Ref<KNavItem | null> = ref(null);
	const mouseclick = (item: KNavItem) => {
		clickItem.value = item;
	};
	return {
		clickItem,
		mouseclick,
	};
};

// 鼠标悬浮事件
const mouseoverEvent = () => {
	// 鼠标悬停的导航
	let hoverItem: Ref<KNavItem | null> = ref(null);

	const mouseover = (item: KNavItem) => {
		hoverItem.value = item;
	};
	const mouseleave = (item: KNavItem) => {
		hoverItem.value = null;
	};
	return {
		hoverItem,
		mouseover,
		mouseleave,
	};
};
</script>
<style lang="scss" scoped>
@import "./nav.scss";
</style> 