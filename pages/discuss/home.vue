<template name='discuss'>
	<view>
		<view class="article-edit">
			<image 
				src="https://zyx-max.oss-cn-beijing.aliyuncs.com/eidt.png" 
				class="article-edit-image"
				@click="addDiscuss"
				></image>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 论坛
			</view>
			<view class="action">
			</view>
		</view>
		
		<view class="cu-card dynamic no-card" v-for="(item,index) in discussDatas" :key="index" @click="discussDetail(item.id)">
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
					<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.vivewNumber}}
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.supportNumber}}
					<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.commentNumber}}
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
					// {
					// 	id:1,//帖子id
					// 	title:'讨论下ti9',//帖子标题
					// 	content:'lgd真是菜阿，不服来辩',//帖子内容 
					// 	contentImg:['https://zyx-max.oss-cn-beijing.aliyuncs.com/TI1.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI2.jpg','https://zyx-max.oss-cn-beijing.aliyuncs.com/TI3.jpg'],//帖子图片
					// 	userName:'马东什么？',//帖子发起哲名
					// 	userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
					// 	createTime:'2020/3/30',//发表日期
					// 	vivewNumber:30,//文章观看量
					// 	supportNumber:20,//文章点赞数
					// 	commentNumber:10,//文章评论数
					// }
				]
			};
		},
		mounted(){
			//组件加载时获取全部数据
			uni.request({
			    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectAllDiscuss', 
			    data: {
			    },
			    success: (res) => {
			        console.log(res.data);
					let data = res.data;
					let tempArr = []; //临时数组 存放articleDatas
					for(let i in data){
						let tempObj = {}; //临时对象存放每一个帖子的具体数据
						tempObj.id = data[i].id;
						tempObj.title = data[i].title;
						tempObj.content = data[i].content;
						tempObj.contentImg = JSON.parse(data[i].content_img);
						tempObj.userName = data[i].name;
						tempObj.userAvatar = data[i].avatar_url;
						tempObj.createTime = data[i].create_time;
						tempObj.vivewNumber = data[i].vivew_number;
						tempObj.supportNumber = data[i].support_number;
						tempObj.commentNumber = data[i].comment_number;
						tempObj.allData = data[i];
						tempArr.push(tempObj);
					}
					this.discussDatas = tempArr;
			    }
			});
		},
		methods: {
			/*
			*zyx/2020/3.31
			* 点击事件 添加帖子
			*/
			addDiscuss(){
				uni.navigateTo({
					url:'../discussAdd/discussAdd'
				})
			},
			/*
			*zyx/2020/3.31
			* 点击事件 进入帖子详情
			* 同时把帖子的id
			*/
			discussDetail(id){
				uni.navigateTo({
					url:'../discussDetail/discussDetail?id=' + id
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
