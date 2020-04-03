<template>
	<view>
		<navigation></navigation>
		<discuss v-if="PageCur=='discuss'"></discuss>
		<articleSub v-if="PageCur=='article'"></articleSub>
		<shop v-if="PageCur=='shop'"></shop>
		<components v-if="PageCur=='component'"></components>
		<my  v-if="PageCur=='my'"></my>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="discuss">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/discuss' + [PageCur=='discuss'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='discuss'?'text-green':'text-gray'">论坛</view>
			</view>
			<view class="action" @click="NavChange" data-cur="article">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/article' + [PageCur == 'article'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='article'?'text-green':'text-gray'">文章</view>
			</view>
			<view class="action" @click="NavChange" data-cur="shop">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/shop' + [PageCur=='shop'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='shop'?'text-green':'text-gray'">商城</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/match' + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">学习</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/my' + [PageCur == 'my'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='my'?'text-green':'text-gray'">我</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'article'
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
