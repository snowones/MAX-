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
		
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style='"background-image:url(" + data.user_avatar + ");"'></view>
						<view class="content flex-sub">
							<view>{{data.userName}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{data.title}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					{{data.content}}
				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> {{data.vivewNumber}}
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{data.supportNumber}}
					<text class="cuIcon-messagefill margin-lr-xs"></text> {{data.commentNumber}}
				</view>

				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg);"></view>
						<view class="content">
							<view class="text-grey">左头</view>
							<view class="text-gray text-content text-df">
								我们还行吧
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>右头：</view>
									<view class="flex-sub">那当然</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2019年8月30日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg);"></view>
						<view class="content">
							<view class="text-grey">右头</view>
							<view class="text-gray text-content text-df">
								往那边走
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>左头：</view>
									<view class="flex-sub">不！是那边</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2019年8月30日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box add-comment discuss-comment-add">
			<view class="cu-bar input">
				<view class="cu-avatar round" :style= '"background-image:url(" + user_avatar +" );"'></view>
				<view class="action">
					<text class="cuIcon-roundaddfill text-grey"></text>
				</view>
				<input class="solid-bottom" maxlength="20" cursor-spacing="10" @blur="(e) => {this.pushInfo(e)}" :value="comment"></input>
				<view class="action">
					<text class="cuIcon-emojifill text-grey"></text>
				</view>
				<button class="cu-btn bg-green shadow-blur" @click="insertComment">发送</button>
			</view>
		</view>
			
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
					tempData.userName = data.name;
					tempData.vivewNumber = data.vivew_number;
					tempData.supportNumber = data.support_number;
					tempData.commentNumber = data.comment_number;
					_self.data =  tempData;
			    }
			});
		},
		methods: {
			
		},
	}
</script>

<style>
	.cu-card>.cu-item {
		margin-bottom: 120rpx!important;
	}
	.discuss-comment-add{
		position: fixed;
		bottom:0rpx;
		width: 100%;
	}
</style>

