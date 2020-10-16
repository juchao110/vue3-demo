<template>
<div class="home">
	<router-link :to="{ name: 'About', params: {} }">about</router-link>
	<router-link :to="{ name: 'Index', params: {} }">index</router-link>
	<p>{{title}}</p>
	<p>count:{{count}}</p>
	<p>maxCount:{{maxCount.value}}</p>
	<p>maxCounting:{{maxCounting.value}}</p>
	<a-button type="primary" @click="countAdd" :loading="false">
		count++
	</a-button>
	-----
	<a-button type="danger" @click="countMin">
		MaxCount--
	</a-button>
	<HelloWorld @key="getKey"></HelloWorld>

	<a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
		<a-form-item label="user name">
			<a-input v-model:value="form.mobilePhone" />
		</a-form-item>
		<a-form-item label="password">
			<a-input type="password" v-model:value="form.password" />
		</a-form-item>
		<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
			<a-button type="primary" @click="onSubmit">
				Login
			</a-button>
			<a-button style="margin-left: 10px;">
				Cancel
			</a-button>
		</a-form-item>
	</a-form>
	<PieChart :style="{width:'700px',height:'400px'}" :data="dataList"></PieChart>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {
	loginIn
} from '@/api/login/index';
import md5 from 'js-md5'
import {
	reactive,
	toRefs,
	watch,
	watchEffect,
	computed,
	h,
	getCurrentInstance
} from 'vue'
import useGlobalFunction from '@/utils/useGlobalFunction'

import {
	useRoute,
	useRouter,
	useLink
} from 'vue-router'
import {
	useStore
} from 'vuex'

import PieChart from '@/components/pie-chart.vue'

export default {
	name: 'Home',
	components: {
		HelloWorld,
		PieChart
	},
	setup(props, context) {

		const router = useRouter()
		const route = toRefs(useRoute())
		const store = useStore()
		const state = useStore().state

		console.log(route.meta.value)
		console.log(router)
		console.log(useLink(), 'useLink')

		const {
			setLocal
		} = useGlobalFunction()

		const {
			ctx
		} = getCurrentInstance();

		const params = reactive({
			title: 'vue3测试标题',
			count: 0,
			maxCount: {
				value: 100
			},
			form: {
				mobilePhone: '',
				password: ''
			},
			dataList: {
				columns: ['种类', '数值'],
				rows: [{
					'种类': '衣服',
					'数值': 30
				}, {
					'种类': '食物',
					'数值': 70
				}]
			}
		});
		/****
		 *****多个数据监听
		 ****/
		// watch(
		// 	[() => params.count, () => params.maxCount],
		// 	([count, maxCount], [oldCount, oldMaxCount]) => {
		// 		console.log(oldCount, count, 'count')
		// 		console.log(oldMaxCount, maxCount, 'maxCount')
		// 	}
		// );
		/****
		 *****单个数据监听  监听变量，对象数组好像不行
		 ****/
		watch(
			() => params.count,
			(count, oldCount) => {
				console.log(oldCount, count, 'count')
			}
		);
		/****
		 *****对象数据发生变化可用computed
		 ****/
		const maxCounting = computed({
			get: () => params.maxCount,
			set: (val) => {
				params.maxCount = val
			}
		});

		const countAdd = () => {
			params.count++
		};
		const countMin = () => {
			params.maxCount.value--
		};
		const getKey = (data) => {
			console.log(data, 'data')
		};

		const onSubmit = () => {
			params.form.password = md5(params.form.password);
			loginIn(params.form).then(res => {
				setLocal('phm_userInfo', JSON.stringify(res.data.data))
				store.dispatch('setUserInfo', res.data.data)
				router.push({
					name: "Index"
				})
			})
		};
		return {
			...toRefs(params),
			maxCounting,
			countAdd,
			countMin,
			getKey,
			onSubmit
		}
	}
}
</script>
