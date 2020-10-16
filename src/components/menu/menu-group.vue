<template>
<a-sub-menu :key="item.moduleId">
	<template v-slot:title>
		<span>
			<laptop-outlined />{{item.meta.title}}</span>
	</template>
	<template v-for="c in item.children">
		<a-menu-item :key="c.moduleId" @click="handleMenu(c)" v-if="c.children.length==0">{{c.meta.title}}</a-menu-item>
		<MenuGroup :item="c" :key="c.moduleId" v-else></MenuGroup>
	</template>
</a-sub-menu>
</template>

<script>
import {
	toRefs
} from 'vue'
export default {
	name: 'MenuGroup',
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	setup(props, context) {
		const handleMenu = (c) => {
			console.log(c)
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
