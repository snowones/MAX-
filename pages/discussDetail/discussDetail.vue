<template>
	<view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://zyx-max.oss-cn-beijing.aliyuncs.com/dota'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods: {
			
		},
	}
</script>

<style>
</style>

