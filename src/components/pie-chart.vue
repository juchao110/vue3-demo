<template>
<div class="" id='echart' :style="style">
	{{data}}
</div>
</template>

<script>
import {
	reactive,
	toRefs,
	isRef,
	onMounted,
	getCurrentInstance
} from 'vue'
export default {
	name: 'pie-chart',
	props: {
		data: {
			type: Array,
			default: []
		},
		style: {
			type: Object,
			default: {}
		},
		color: {
			type: Array,
			default: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
		}
	},
	setup(props, context) {
		const {
			ctx
		} = getCurrentInstance();
		const {
			data,
			style,
			color
		} = props
		const chartData = reactive({

		});
		onMounted(() => {
			console.log(data, 'data')
			drawLine()
		});
		const drawLine = () => {
			var myChart = ctx.$echarts.init(document.getElementById('echart'));
			myChart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				color: color,
				series: [{
					name: data.columns[0],
					type: 'pie',
					center: ["50%", "50%"],
					radius: [0, "60%"],
					data: data.rows.map(e => {
						return {
							value: e[data.columns[1]],
							name: e[data.columns[0]]
						}
					})
				}]
			});
		}
		return {
			...toRefs(chartData),
			drawLine
		}
	}
}
</script>

<style lang="css" scoped>
</style>
