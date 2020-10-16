<template>
<a-layout id="components-layout-demo-top-side-2">
	<a-layout-header class="header">
		<div class="logo" />
		<a-menu theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys1" :style="{ lineHeight: '64px' }">
			<a-menu-item key="1">
				nav 1
			</a-menu-item>
			<a-menu-item key="2">
				nav 2
			</a-menu-item>
			<a-menu-item key="3">
				nav 3
			</a-menu-item>
		</a-menu>
	</a-layout-header>
	<a-layout>
		<a-layout-sider width="200" style="background: #fff;text-align:left;height:calc(100vh - 64px);overflow-y:scroll">
			<a-spin :spinning="state.common.menuSpin">
				<div class="" v-if="menuList.length!=0">
					<a-menu mode="inline" v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" :style="{ height: '100%', borderRight: 0 }">
						<template v-for="m in menuList[0].children">
							<MenuTitle :item="m" @route="receive" v-if="m.children.length==0">
							</MenuTitle>
							<MenuGroup :key="m.moduleId" @route="receive" :item="m" v-else></MenuGroup>
						</template>
					</a-menu>
				</div>
			</a-spin>
		</a-layout-sider>
		<a-layout style="padding: 0 24px 24px">
			<a-spin :spinning="state.common.contentSpin">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>Home</a-breadcrumb-item>
					<a-breadcrumb-item>List</a-breadcrumb-item>
					<a-breadcrumb-item>App</a-breadcrumb-item>
				</a-breadcrumb>
				<a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
					<a-button type="primary" @click="goHome">HOME</a-button>
					<p>{{state.common.count}}
						<a-button @click="count">count++</a-button>
					</p>
				</a-layout-content>
			</a-spin>
		</a-layout>
	</a-layout>
</a-layout>
</template>
<script>
import {
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined
} from '@ant-design/icons-vue';
import {
	queryUserAccessPHMModules
} from '@/api/login/index';
import useGlobalFunction from '@/utils/useGlobalFunction'
import {
	reactive,
	toRefs,
	onMounted,
	watch,
	watchEffect,
	computed
} from 'vue';
import {
	useRoute,
	useRouter
} from "vue-router";
import {
	useStore
} from 'vuex';
import MenuTitle from '@/components/menu/menu-title.vue'
import MenuGroup from '@/components/menu/menu-group.vue'

function doTree(data, id) {
	if (data.length < 1) return []
	const parent = checkChild(data, id)
	return parent
};

function checkChild(data, pid) {
	let arr = [];
	data.forEach((e, index) => {
		if (e.parentId == pid) {
			e.children = checkChild(data, e.moduleId);
			arr.push(e);
		}
	})
	return _.sortBy(arr, 'sortNo');
};
export default {
	components: {
		UserOutlined,
		LaptopOutlined,
		NotificationOutlined,
		MenuTitle,
		MenuGroup
	},
	setup(props, context) {
		const store = useStore()
		const state = useStore().state
		const router = useRouter()
		console.log(state.common.userInfo)
		const {
			setLocal
		} = useGlobalFunction()
		const data = reactive({
			selectedKeys1: ['2'],
			selectedKeys2: ['1'],
			collapsed: false,
			openKeys: ['sub1'],
			menuList: []
		})

		onMounted(() => {
			queryUserAccessPHMModules({
				projectId: 67
			}).then(res => {
				console.log(res)
				data.menuList = doTree(res.data.data, 0);
				console.log(data.menuList[0].children, 'list')
				// this.$store.dispatch("generateRoutes", res.data.data);
			});
		})
		const chooseMenu = (m) => {
			const {
				meta,
				component
			} = m
			console.log(meta.title)
			console.log(component)
		};
		const goHome = () => {
			console.log('home')
			router.push({
				name: 'Home'
			})
		};
		const count = () => {
			// store.dispatch('common/addCount')
			store.commit('common/ADDCOUNT')
		};
		const receive = (url) => {
			console.log(url)
			// router.push({
			// 	name: url.moduleName
			// })
		};
		return {
			...toRefs(data),
			chooseMenu,
			goHome,
			state,
			count,
			receive
		}
	}
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
	width: 120px;
	height: 31px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px 28px 16px 0;
	float: left;
}
</style>
