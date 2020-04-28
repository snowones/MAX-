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
	var _self;
	export default {
		data() {
			return {
				data:{},//帖子详细数据
			};
		},
		onLoad(e) {
			_self = this;
			let id = e.id;
			//首先拿到帖子的详细信息
			uni.request({
			    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectDiscussById', //根据帖子id拿到帖子详细信息
			    data: {
					id
			    },
			    success: (res) => {
					//拿到帖子的详细数据
					//渲染到页面上
					let data = res.data[0];
					//临时对象存放数据
					let tempData = {};
					tempData.id = data.id;
					tempData.title = data.title;
					tempData.content = data.content;
					tempData.contentImg = JSON.parse(data.content_img);
					tempData.user_avatar = data.avatar_url;
					_self.data =  tempData;
			    }
			});
		},
		methods: {
			
		},
	}
</script>

<style>
</style>

