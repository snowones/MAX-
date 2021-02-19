<template name="bookKeepingDetail">
	<view>
		<!-- <swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper> -->
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 240upx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					2021-02-{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 240upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text> 2021-02-{{item.name}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/C9BA857123D84842F26CE74EBD9C5E38.jpg);"></view>
							<view class="content">
								<view class="text-grey">老肥</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										<text class="text-red  margin-right-xs"></text>
										上网
									</text> </view>
							</view>
							<view class="action">
								<view class="text-grey text-sm">50元</view>
								<!-- <view class="cu-tag round bg-grey sm">5</view> -->
							</view>
						</view>
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/366C39110D1105228F478823BB0EAD70.jpg);"></view>
							<view class="content">
								<view class="text-grey">小肥</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										<text class="text-red  margin-right-xs"></text>
										买奶茶
									</text> </view>
							</view>
							<view class="action">
								<view class="text-grey text-sm">3元</view>
							</view>
						</view>
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/366C39110D1105228F478823BB0EAD70.jpg);"></view>
							<view class="content">
								<view class="text-grey">小肥</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										<text class="text-red  margin-right-xs"></text>
										又买奶茶
									</text> </view>
							</view>
							<view class="action">
								<view class="text-grey text-sm">5元</view>
							</view>
						</view>
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/366C39110D1105228F478823BB0EAD70.jpg);"></view>
							<view class="content">
								<view class="text-grey">小肥</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										<text class="text-red  margin-right-xs"></text>
										还买奶茶
									</text> </view>
							</view>
							<view class="action">
								<view class="text-grey text-sm">13元</view>
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		mounted() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = i+1;
				list[i].id = i;
			}
			this.list = list;
			this.listCur = list[0];
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
