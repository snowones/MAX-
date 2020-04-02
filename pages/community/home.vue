<template name="community">
	<view>
		<view class="bg-black bg-shadeTop myHead">
			<view class="cu-list menu-avatar" v-if="isLogin">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+ avatarUrl+');'"></view>
					<view class="content">
						<view class="text-white">{{nickName}}</view>
						<view class="text-white text-sm flex">
							<view class="text-cut">
								{{openId}}
								<text class="icon-copy text-white margin-left-xs"></text>
							</view>
						</view>
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
			<navigator url="/pages/sign/sign" hover-class="none" class="flex-sub">
				<view class='text-xxl icon-zhengguifapiao text-orange'></view>
				<view class="text-sm margin-top-xs">签到</view>
			</navigator>
			<navigator url="/pages/wallet/wallet" hover-class="none" class="flex-sub solid-left">
				<view class='text-xxl icon-qianbao text-red'></view>
				<view class="text-sm margin-top-xs">钱包</view>
			</navigator>
			<navigator url="/pages/footprint/footprint" hover-class="none" class="flex-sub solid-left">
				<view class='text-xxl icon-footprint text-mauve'></view>
				<view class="text-sm margin-top-xs">足迹</view>
			</navigator>
		</view>
		
		
		<view class="cu-bar bg-white margin-top" @tap="toOrder()">
			<view class='action'><text class="icon-titles text-orange"></text>我的订单</view>
			<view class='action'>
				<view class='text-gray text-sm'>
					查看全部
					<text class='icon-right'></text>
				</view>
			</view>
		</view>
		<view class="cu-list grid col-5 no-border solid-top">
			<view class="cu-item" @tap="toOrder(1)">
				<view class='icon-pay text-gray'>
					<view class="cu-tag badge" v-if="order.unpaid!=0">{{order.unpaid}}</view>
				</view>
				<text>待付款</text>
			</view>
			<view class="cu-item" @tap="toOrder(2)">
				<view class='icon-deliver text-gray'>
					<view class="cu-tag badge" v-if="order.unship!=0">{{order.unship}}</view>
				</view>
				<text>待发货</text>
			</view>
			<view class="cu-item" @tap="toOrder(3)">
				<view class='icon-send text-gray'>
					<view class="cu-tag badge" v-if="order.unrecv!=0">{{order.unrecv}}</view>
				</view>
				<text>待收货</text>
			</view>
			<view class="cu-item" @tap="toOrder(4)">
				<view class='icon-evaluate text-gray'>
					<view class="cu-tag badge" v-if="order.uncomment!=0">{{order.uncomment}}</view>
				</view>
				<text>待评价</text>
			</view>
			<view class="cu-item" @tap="toRefund(5)">
				<view class='icon-refund text-gray'></view>
				<text>退款/售后</text>
			</view>
		</view>


		
		<view class="cu-bar bg-white margin-top">
			<view class='action'><text class="icon-titles text-orange"></text>我的服务</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				modalName: null,
				order:[],
				nickName:'',//用户名称
				avatarUrl:'',//用户头像链接
				openId:'',//用户openid
			}
		},
		methods: {
			toOrder(nav) {
				uni.navigateTo({
					url: '/pages/order/list?nav=' + nav,
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			/*
			*zyx
			*2020/4/2
			*调用微信登录 
			*/
			getuserinfo(e){
				var _self = this;
				if (e.detail.errMsg == 'getUserInfo:ok') {
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					// 说明用户点击了同意
					let userInfo = e.detail.userInfo; // userInfo下面有 avatarUrl city country gender  language nickName province
					try {
						uni.setStorageSync('nickName', userInfo.nickName);
						uni.setStorageSync('avatarUrl', userInfo.avatarUrl);
						this.nickName = userInfo.nickName;
						this.avatarUrl = userInfo.avatarUrl;
						console.log(this.nickName);
						console.log(this.avatarUrl);
					} catch (e) {
						console.log(e);
					}
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
									console.log(res);
									_self.openId = res.data.openid;
									_self.isLogin = true;
									uni.hideLoading();
								},
							});
						}
					});
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
