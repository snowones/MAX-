<template name='discuss'>
	<view>
		<view class="article-edit">
			<image 
				src="https://zyx-max.oss-cn-beijing.aliyuncs.com/eidt.png" 
				class="article-edit-image"
				@click="addArticle"
				></image>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 论坛
			</view>
			<view class="action">
			</view>
		</view>
		
		<view class="cu-card dynamic no-card" v-for="(item,index) in discussDatas" :key="index" @click="discussDetail">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url('+item.userAvatar+');'"></view>
						<view class="content flex-sub">
							<view>{{item.userName}}</view>
							<view class="text-sm flex justify-between">
								{{item.title}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					{{item.content}}
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square" >
					<view class="bg-img"  v-for="sub in item.contentImg" :key="subIndex">
						<image :src=sub mode="aspectFill"></image>
					</view>
				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30
				</view>
			</view>
		</view>

		
		
		<view class="find-bottom">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				discussDatas:[
					{
						title:'讨论下ti9',//帖子标题
						content:'lgd真是菜阿，不服来辩',//帖子内容 
						contentImg:['https://zyx-max.oss-cn-beijing.aliyuncs.com/TI1.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI2.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI3.jpg'],//帖子图片
						userName:'马东什么？',//帖子发起哲名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						createTime:'2020/3/30',//发表日期
						vivewNumber:30,//文章观看量
						supportNumber:20,//文章点赞数
						commentNumber:10,//文章评论数
					},
					{
						title:'在家呆傻了，什么时候开学阿',//帖子标题
						content:'有没有河南高校得兄弟自己学校通知开学时间了得，参考一下',//帖子内容 
						contentImg:['https://zyx-max.oss-cn-beijing.aliyuncs.com/TI4.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI5.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI6.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI7.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI8.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI0.jpg'],//帖子图片
						userName:'马东什么？',//帖子发起哲名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						createTime:'2020/3/30',//发表日期
						vivewNumber:5000,//文章观看量
						supportNumber:111,//文章点赞数
						commentNumber:300,//文章评论数
					},
				]
			};
		},
		mounted(){
		
		},
		methods: {
			/*
			*zyx/2020/3.31
			* 点击事件 添加帖子
			*/
			addArticle(){
				uni.navigateTo({
					url:'../articleAdd/articleAdd'
				})
			},
			/*
			*zyx/2020/3.31
			* 点击事件 进入帖子详情
			*/
			discussDetail(){
				uni.navigateTo({
					url:'../discussDetail/discussDetail'
				})
			}
		}
	}
</script>

<style>
.find-bottom{
	width: 100%;
	height: 120upx;
}
.article-edit{
	position: fixed;
	bottom: 140rpx;
	right: 20rpx;
	z-index: 100;
}
.article-edit-image{
	width: 100rpx;
	height: 100rpx;
}
.text-sm{
	font-weight: bold;
}

</style>
