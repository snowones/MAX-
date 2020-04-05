<template>
	<view>
		<!-- 导航条 -->
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">主题帖</block>
		</cu-custom>
		<!-- 切换导航 -->
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in data.contentImg" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],//帖子详细数据
			};
		},
		onLoad(e) {
			console.log(e)
			this.data = JSON.parse(e.data);
			console.log(this.data);
		},
		methods: {
			
		},
	}
</script>

<style>
</style>

