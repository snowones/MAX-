<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">记账本</block>
		</cu-custom>
		<bookKeepingAction v-if="PageCur=='bookKeepingAction'"></bookKeepingAction>
		<bookKeepingDetail v-if="PageCur=='bookKeepingDetail'"></bookKeepingDetail>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="bookKeepingAction">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/match' + '.png'"></image>
				</view>
				<view :class="PageCur=='bookKeepingAction'?'text-green':'text-gray'">主页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="bookKeepingDetail">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/my' + [PageCur == 'my'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='bookKeepingDetail'?'text-green':'text-gray'">详情</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'bookKeepingAction'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		},
		onLoad(e) {
			//添加页面添加成功后跳转到对应主页，这时跳转不能直接跳转到相应页面 需要跳到主页由主页进行分发
			if(e.data){
				this.PageCur = e.data;
			}
		}
	}
</script>

<style>

</style>
