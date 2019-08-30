<template>
	<view>
		<navigation></navigation>
		<person v-if="PageCur=='person'"></person>
		<data v-if="PageCur=='data'"></data>
		<components v-if="PageCur=='component'"></components>
		<find v-if="PageCur=='find'"></find>
		<community  v-if="PageCur=='community'"></community>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="person">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/person' + [PageCur=='person'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='person'?'text-green':'text-gray'">我</view>
			</view>
			<view class="action" @click="NavChange" data-cur="data">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/data' + [PageCur=='data'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='data'?'text-green':'text-gray'">数据</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/match' + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">赛事</view>
			</view>
			<view class="action" @click="NavChange" data-cur="find">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/find' + [PageCur == 'find'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='find'?'text-green':'text-gray'">发现</view>
			</view>
			<view class="action" @click="NavChange" data-cur="community">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/community' + [PageCur == 'community'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='community'?'text-green':'text-gray'">社区</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'person'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
