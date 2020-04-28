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
					<view class="cu-item" v-for="(item,index) in commendDatas" :key="index">
						<view class="cu-avatar round" :style='"background-image:url(" + item.user_avatar + " );"'></view>
						<view class="content">
							<view class="text-grey">{{item.user_name}}</view>
							<view class="text-gray text-content text-df">
								{{item.content}}
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>陌生人：</view>
									<view class="flex-sub">你说的没错</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">{{item.create_time}}</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
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
				<view class="cu-avatar round" :style= '"background-image:url(" + avatarUrl +" );"'></view>
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
				data:{},//帖子详细数据 具体数据看onload
				commendDatas:[
					{
						id:1,
						user_avatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像连接
						user_name:'马东什么',//用户姓名
						content:'我们还行吧',//评论内容
						create_time:'2019年8月30日',//评论时间
					}
				],
				avatarUrl:'',//当前用户的头像
			};
		},
		onLoad(e) {
			_self = this;
			//评论框内用到这个头像了
			_self.avatarUrl = uni.getStorageSync('avatarUrl');
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
					//临时对象存放数据 不直接去修改数据 让数据一次性渲染提高性能
					let tempData = {};
					tempData.id = data.id;//id
					tempData.title = data.title;//标题
					tempData.content = data.content;//内容
					tempData.contentImg = JSON.parse(data.content_img);//内容图片
					tempData.user_avatar = data.avatar_url;//用户头像连接
					tempData.userName = data.name;//用户姓名
					tempData.vivewNumber = data.vivew_number;//观看数量
					tempData.supportNumber = data.support_number;//点赞数量
					tempData.commentNumber = data.comment_number;//评论数量
					_self.data =  tempData;
			    }
			});
			
			//然后拿到帖子的全部评论
			uni.request({
			    url: 'http://182.92.64.245/tp5/public/index.php/index/index/getDiscussCommentById', //根据文章id拿到文章的全部评论
			    data: {
					id
			    },
			    success: (res) => {
					//拿到全部评论内容
					//渲染到页面上
					console.log(res);
					//评论不为空
					if(res.data.length){
						//创建一个数组存放全部评论
						let tempArr = [];
						for(let data of res.data){
							//创建一个临时对象用来放评论内容
							let tempObj = {};
							tempObj.id = data.id;
							tempObj.user_avatar = data.avatar_url;
							tempObj.user_name = data.name;
							tempObj.content = data.content;
							tempObj.create_time = data.create_time;
							//不直接push进页面数据中 让页面一次渲染完毕
							tempArr.push(tempObj);
						}
						_self.commendDatas = tempArr;
					}
					
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

