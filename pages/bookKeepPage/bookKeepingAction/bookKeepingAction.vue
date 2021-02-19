<template name='bookKeepingAction'>
	<view>
		<view class="bookeeping-edit">
			<image 
				src="https://zyx-max.oss-cn-beijing.aliyuncs.com/eidt.png" 
				class="bookeeping-edit-image"
				@click="addrecord"
				></image>
		</view>
		<view class="header">
			<view class="header-content">
				<view class="content-item">
					<view class="content-item-top text-sm">
						本月消费
					</view>
					<view class="content-item-bottom text-sm">
						100元
					</view>
				</view>
				<view class="content-item">
					<view class="content-item-top text-sm">
						本周消费
					</view>
					<view class="content-item-bottom text-sm">
						100元
					</view>
				</view>
				<view class="content-item">
					<view class="content-item-top text-sm">
						本日消费
					</view>
					<view class="content-item-bottom text-sm">
						100元
					</view>
				</view>
			</view>
		</view>
		<view class="table-container">
			<s-table
				:border="true"
				:columns="columns"
				:list="list"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
				@sort="switchSort"
			>
			</s-table>
		</view>
		<view class="charts-container">
			<jp-charts 
				v-if="list.length>0" 
				:list="chartList" 
				:Y="Charts.Y" 
				:X="Charts.X" 
				:keyId="Charts.keyId" 
				:width="Charts.width" 
				:bgColor="Charts.bgColor" 
				:height="Charts.height" 
				:canClick="Charts.canClick" 
				:x_width="Charts.x_width"
				:items="chartItems" 
				:proportion="Charts.proportion" 
				:checkedColor="Charts.checkedColor" 
				:scrollLeft="100">
			</jp-charts>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortBy: '', // 排序字段，需在columns中指定
				sortOrder: '', // asc，desc
				columns: [ // 目前组件columns[]数组对象支持的参数
					{ title: '日期', key: 'date', width: 160 },
					{ title: '老肥消费', key: 'area_name',width: 150},
					{ title: '笔数', key: 'total',},
					{ title: '小肥消费', key: 'consume_times', width: 150 },
					{ title: '笔数', key: 'pull_ratio',}
				],
				list: [
					{ date:'2021-02-19', area_name: '200', total: 3,  consume_times: 21, pull_ratio: 2 },
					{ date:'2021-02-20',area_name: '100', total: 4,  consume_times: 65, pull_ratio: 3 },
					{ date:'2021-02-21',area_name: '500', total: 2,  consume_times: 54, pull_ratio: 2 },
					{ date:'2021-02-22',area_name: '100', total: 1,  consume_times: 82, pull_ratio: 1 },
					{ date:'2021-02-23',area_name: '100', total: 5,  consume_times: 48, pull_ratio: 5 }
				],
				Charts: { //y轴配置 value在list中的键 showY是否一直显示数据 size字大小 units文字后缀
					Y: {
						value: 'value',
						showY: true,
						size: 20,
						units: '元'
					},
					X: {
						value: 'keyw',
						showX: true,
						size: 20,
						units: ''
					},
					keyId: 'keyw',
					list: [],
					items: {},
					width: 750,
					height: 400,
					x_width: 100,
					proportion: 30, //宽度占比
					showZ: false, //是否显示线条
					checkedColor: '#007aff',
					canClick: true, //不可以点击
					bgColor: '#fff',
					scrollLeft: 0
				},
				chartList: [{ keyw: '01', value: 100 }, { keyw: '02', value: 120 }, { keyw: '03', value: 110 },{ keyw: '01', value: 100 }, { keyw: '02', value: 120 }, { keyw: '03', value: 110 },{ keyw: '01', value: 100 },],
				chartItems: {
					keyw: '03',
					value: 110
				}
			}
		},
		methods: {
			addrecord(){
				console.log(1);
			}
		}
	}
</script>

<style>
	.header{
		width: 100%;
		height: 140upx;
		background-color: #000000;
		position: relative;
	}
	.header-content{
		position: absolute;
		width: 80%;
		height: 110upx;
		left: 10%;
		top: 90upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.content-item{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		text-align: center;
	}
	.content-item-top{

	}
	.content-item-bottom{
		
	}
	.table-container{
		margin-top: 120upx;
	}
	.bookeeping-edit{
		position: fixed;
		bottom: 140rpx;
		right: 20rpx;
		z-index: 100;
	}
	.bookeeping-edit-image{
		width: 100rpx;
		height: 100rpx;
	}
	.charts-container{
		margin-top: 30upx;
	}
</style>
