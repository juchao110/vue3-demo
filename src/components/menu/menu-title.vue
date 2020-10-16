<template>
<a-menu-item :key="item.moduleId" @click="handleMenu(item)">
	<PieChartOutlined />
	<span>{{item.meta.title}}</span>
</a-menu-item>
</template>

<script>
import {
	toRefs
} from 'vue'
export default {
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	setup(props, context) {
		const handleMenu = (c) => {
			context.emit('route', c)
		};
		return {
			...toRefs(props),
			handleMenu
		}
	}
}
</script>

<style lang="css" scoped>
</style>
