<template>
	<view>
		<navigation></navigation>
		<discuss v-if="PageCur=='discuss'"></discuss>
		<articleSub v-if="PageCur=='article'"></articleSub>
		<shop v-if="PageCur=='shop'"></shop>
		<picture v-if="PageCur=='picture'"></picture>
		<my v-if="PageCur=='my'"></my>
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
				<view :class="PageCur=='shop'?'text-green':'text-gray'">闲置</view>
			</view>
			<view class="action" @click="NavChange" data-cur="picture">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/match' + '.png'"></image>
				</view>
				<view :class="PageCur=='picture'?'text-green':'text-gray'">相册</view>
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
				PageCur: 'discuss'
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
