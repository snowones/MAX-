<template name="my">
	<view>
		<view class="bg-black bg-shadeTop myHead">
			<view class="cu-list menu-avatar" v-if="isLogin">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+ avatarUrl+');'"></view>
					<view class="content">
						<view class="text-white">{{nickName}}</view>
						<!-- 这里可以再放写别的信息 -->
						<!-- <view class="text-white text-sm flex">  
							<view class="text-cut">
								用户ID:{{openId}}
								<text class="icon-copy text-white margin-left-xs"></text>
							</view>
						</view> -->
					</view>
					<view class="action">
						<text class="icon-right text-xl"></text>
					</view>
				</view>
			</view>
			<view class="cu-list menu-avatar" v-else>
				<view class="cu-item" data-target="loginModal">
					<view class="cu-avatar round lg bg-white shadow"><text class="icon-myfill text-red"></text></view>
					<view class="content">
						<button style="border: 0px; color: #FFFFFF;" size="mini" plain="" hover-class="" open-type="getUserInfo" @getuserinfo="getuserinfo">会员登录</button>
						<view class="text-white text-sm flex">
							<view class="text-cut">
								欢迎成为MAX+大家庭的一员
							</view>
						</view>
					</view>
					<view class="action">
						<text class="icon-right text-xl"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="navHead bg-white shadow">
			<navigator url="../discussAdd/discussAdd" hover-class="none" class="flex-sub">
				<view class='text-xxl icon-zhengguifapiao text-orange'></view>
				<view class="text-sm margin-top-xs">发表帖子</view>
			</navigator>
			<navigator url="../articleAdd/articleAdd" hover-class="none" class="flex-sub solid-left">
				<view class='text-xxl icon-qianbao text-red'></view>
				<view class="text-sm margin-top-xs">发表文章</view>
			</navigator>
			<navigator url="../shopAdd/shopAdd" hover-class="none" class="flex-sub solid-left">
				<view class='text-xxl icon-qianbao text-red'></view>
				<view class="text-sm margin-top-xs">发布闲置</view>
			</navigator>
			<navigator url="../pictureAdd/pictureAdd" hover-class="none" class="flex-sub solid-left">
				<view class='text-xxl icon-qianbao text-red'></view>
				<view class="text-sm margin-top-xs">发布相册</view>
			</navigator>
		</view>
		
		
		<view class="cu-bar bg-white margin-top">
			<view class='action'><text class="icon-titles text-orange"></text>我的</view>
		</view>
		<view class="cu-list grid col-4 no-border solid-top">
			<view class="cu-item" @tap="tolist(1)">
				<view class='icon-pay text-gray'>
					<view class="cu-tag badge"></view>
				</view>
				<text>我的帖子</text>
			</view>
			<view class="cu-item" @tap="tolist(2)">
				<view class='icon-deliver text-gray'>
					<view class="cu-tag badge"></view>
				</view>
				<text>我的文章</text>
			</view>
			<view class="cu-item" @tap="tolist(3)">
				<view class='icon-send text-gray'>
					<view class="cu-tag badge"></view>
				</view>
				<text>我的闲置</text>
			</view>
			<view class="cu-item" @tap="tolist(4)">
				<view class='icon-evaluate text-gray'>
					<view class="cu-tag badge"></view>
				</view>
				<text>我的相册</text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class='action'><text class="icon-titles text-orange"></text>联系客服</view>
		</view>
		<view class="cu-bar bg-white" @click="gotoBookKeeping(item)">
			<view class='action'><text class="icon-titles text-orange"></text>记账本</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				nickName:'',//用户名称
				avatarUrl:'',//用户头像链接
				openId:'',//用户openid
			}
		},
		/*使用vue生命周期  组件渲染时拿到数据*/
		mounted(){
			//判断是否已经登录过
			let nickName = uni.getStorageSync('nickName');
			let avatarUrl = uni.getStorageSync('avatarUrl');
			if(nickName){
				this.isLogin = true;
				this.nickName = nickName;
				this.avatarUrl = avatarUrl;
			}
		},
		methods: {
			//跳转到列表页面
			tolist(nav) {
				let url;
				if(nav == 1){
					url = "../discuss/home";
				}else if(nav == 2) {
					url = "../article/home";
				}else if(nav == 3) {
					url = "../shop/home";
				}else if(nav == 4) {
					url = "../picture/home";
				}
				uni.navigateTo({
					url: url + "?type=home"
				})
			},
			/*
				zyx
				2021/2/19
				开发一个记账本模块做为日常使用
				这里先作为临时入口
			*/
			gotoBookKeeping(){
				uni.navigateTo({
					url:'../bookKeepPage/bookKeepingMain/bookKeepingMain'
				})
			},
			/**
			 * zyx
			 * 2020.4.3
			 * 用promise封装微信登录接口拿到用户openid
			 */
			getOpenId() {
				return new Promise((resolve) => {
					uni.login({
						provider: 'weixin',
						success: function(response) {
							uni.request({
								url:'http://182.92.64.245/tp5/public/index.php/index/index/getOpenid',
								method: 'GET',
								data: {
									code: response.code
								},
								success: res => {
									resolve(res.data.openid);
								},
							});
						}
					});
				})
			},
			/**
			 * zyx
			 * 2020.4.3
			 * 用promise封装储存用户信息接口  后台判断改用户是否已注册 已注册直接登录 没注册将用户数据存入数据库
			 */
			saveUserInfo(openId,nickName,avatarUrl) {
				return new Promise((resolve) => {
					uni.request({
						url:'http://182.92.64.245/tp5/public/index.php/index/index/saveUserInfo',
						method: 'GET',
						data: {
							openid: openId,//用户openid
							name: nickName,//用户微信名
							avatar_url: avatarUrl,//用户微信头像链接
						},
						success: res => {
							resolve(res);
						},
					});
				})
			},
			/*
			*zyx
			*2020/4/2
			*调用微信登录 
			* 定义为async 完成全部登录的操作 第一步登录微信 拿到openid 然后把用户信息存入数据库
			*/
			async getuserinfo(e){
				var _self = this;
				if (e.detail.errMsg == 'getUserInfo:ok') {
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					// 说明用户点击了同意
					// userInfo下面有 avatarUrl city country gender  language nickName province
					let userInfo = e.detail.userInfo; 
					try {
						uni.setStorageSync('nickName', userInfo.nickName);
						uni.setStorageSync('avatarUrl', userInfo.avatarUrl);
						_self.nickName = userInfo.nickName;
						_self.avatarUrl = userInfo.avatarUrl;
					} catch (e) {
					}
					//等待调用微信登录接口拿到openid
					let openId = await _self.getOpenId();
					uni.setStorageSync('openId', openId);
					//然后把用户信息全部存入数据库
					let savaRes = await this.saveUserInfo(openId,userInfo.nickName,userInfo.avatarUrl);
					_self.openId = openId;
					_self.isLogin = true;
					uni.hideLoading();
				}else{
					uni.showToast({
						title: '登录以后才能获取个人信息',
						duration: 2000,
						icon: 'none'
					});
				}
			}
			
		}
	}
</script>

<style>
	.myHead {
		position: relative;
		padding-bottom: 100upx;
	}

	.myHead image {
		position: absolute;
		bottom: 0;
	}

	.myHead .cu-list .cu-item::after {
		display: none;
	}

	.cu-list.menu-avatar .cu-item,
	.myHead .cu-list {
		background-color: transparent;
	}

	.navHead {
		position: relative;
		margin: -90upx 30upx 0;
		padding: 30upx 0;
		display: flex;
		text-align: center;
		border-radius: 10upx;
	}

	.cu-list.menu-avatar.card-menu>.cu-item .content {
		left: 115upx;
	}

	.cu-avatar-group .cu-avatar.sm {
		margin-left: -20upx !important;
		border: 1rpx solid #FFFFFF !important;
	}

	.myUpShop {
		background-color: #fee7b3;
		position: relative;
		padding: 30upx 300upx 30upx 30upx;
		border-radius: 10upx;
	}

	.myUpShop image {
		position: absolute;
		width: 241upx;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		height: 169upx;
	}
</style>
