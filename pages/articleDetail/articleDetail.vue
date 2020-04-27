<template>
	<view>
		<!-- 导航条 -->
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">文章详情</block>
		</cu-custom>
		<!-- 切换导航 -->
		<scroll-view scroll-x class="bg-black nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-camerafill"></text> 文章
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-upstagefill"></text> 评论
			</view>
		</scroll-view>
		<!-- 根据切换导航切换到 文章模块和评论模块 -->
		<!-- 文章模块 -->
		<view :class="0==TabCur?'':'.display-none'">
			<view class="cu-card case">
				<view class="shadow acticle-bg">
					<view class="image">
						<image :src="bg"  mode="widthFix"></image>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{subTitle}}</text></view>
				</view>
			</view>
		</view>
		<view auto-height v-html="html" class="html"></view>
		</view>
		<!-- 评论模块 -->
		<view :class="1==TabCur?'':'.display-none'">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<image class="image-icon" src="https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/%E6%B6%88%20%E6%81%AF.png"></image>全部评论
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in listDatas" :key="index">
					<view class="cu-avatar round lg" :style="'background-image:url('+ item.userAvatar +');'"></view>
					<view class="content">
						<view class="text-grey">{{item.userName}}</view>
						<view class="text-gray text-sm flex">
							<view >
								{{item.articleComment}}
							</view> 
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
				</view>
			</view>
			<view class="box add-comment">
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
		
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				TabCur: 0,
				id:'',//文章id
				title:'',//标题
				theme:'',//主题
				bg:'',
				subTitle:'',//副标题
				html:'',
				user_avatar:'',
				listDatas:[
					{
						userName:'马东什么？',//评论人名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						articleComment:'XGNB',//评论内容
						createTime:'2020/3/31 15.30',//评论创建时间  这里可以考虑下操作数据  换成当天具体时间 1天前 三天前
					},
				],
			};
		},
		onLoad(e) {
			_self = this;
			let id = e.id;
			uni.request({
			    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectArticleById', //仅为示例，并非真实接口地址。
			    data: {
					id
			    },
			    success: (res) => {
					//拿到全部文章的详细数据
					//渲染到页面上
					let data = res.data[0];
					_self.id = data.id;
					_self.title = data.title;
					_self.theme = data.theme;
					_self.bg = data.bg;
					_self.subTitle = data.sub_title;
					_self.html = data.content;
					_self.user_avatar = data.avatar_url;
					console.log(data);
			    }
			});
		},
		methods: {
			//切换详情和评论的导航
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			/*
			*zyx
			*2020/4/27
			*输入评论 
			*/
			pushInfo(e){
				this.comment = e.detail.value;
				console.log(this.comment);
			},
			/*
			*zyx
			*2020/4/27
			*点击发表评论
			*/
			insertComment(){
				console.log('点击了发送');
				//如果评论内容为空不能发表
				console.log(_self.comment);
				if(!_self.comment){
					uni.showToast({
						title: '评论不能为空',
						icon: 'none',
						duration: 2000
					})
					return 0;
				}
				//拿到发表的评论的openid
				let openid = uni.getStorageSync('openId');
				/*
				*zyx
				*2020/4/27
				*发表评论接口
				*/
				uni.request({
				    url: 'http://182.92.64.245/tp5/public/index.php/index/index/insertArticleComment',
				    data: {
						article_id:_self.id,//文章的id
						user_openid:openid,//发表评论的人的openid
						content:_self.comment,//发表的评论的内容
				    },
				    success: (res) => {
					
				    }
				});
				
			}
		}
	}
</script>

<style>
.cu-item{
	width: 50%;
}
/* 设置dispalynone */
.display-none{
	display: none;
}
.cu-list >.cu-item{
	width: 100%;
	min-height: 175rpx;
}
.image-icon{
	width: 50rpx;
	height: 50rpx;
}
.acticle-bg{
	margin: 20rpx;
}
.html{
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	width: 100%;
	font-size: 16px;
	line-height: 1.5;
	padding: 20rpx;
	background-color:#F8F8F8;
	margin: 10rpx;
}
.add-comment{
	position: fixed;
	bottom: 0;
	width: 100%;
}

</style>
