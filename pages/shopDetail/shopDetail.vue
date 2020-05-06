<template>
	<view>
		<!-- 导航条 -->
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">商品详情</block>
		</cu-custom>
		<!--  产品图 -->
		<swiper class="screen-swiper" :indicator-dots="false" :circular="true" :autoplay="true" :interval="5000" duration="500"
		 style="height:750upx" @change="swiperChange">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class='swiper-tag'>
			<view class="cu-tag radius bg-white">{{swiperCur+1}}/{{swiperList.length}}</view>
			<view class="cu-tag round vide-tag" @tap="showModal" data-target="videoShow">
				<text class="icon-videofill margin-right-xs"></text>
				00'40"
			</view>
		</view>
		<view class="cu-modal swiper-video" :class="modalName=='videoShow'?'show':''" v-if="modalName=='videoShow'">
			<view class="cu-dialog" :style="[{top:(CustomBar + 5) +'px'}]">
				<video src="https://jdvideo.300hu.com/vodtransgzp1251412368/5285890781375613996/v.f30.mp4?dockingId=0d1f06c1-0bd9-4b9d-9da3-1531c4430af1&storageSource=3"
				 autoplay muted objectFit="contain" show-mute-btn></video>
			</view>
			<button class="cu-btn line-white round ModalClose" @tap="hideModal" :style="[{top:ModalClose +'px'}]">关闭</button>
		</view>
		<!--  商品头 -->
		<view class='flex goodsHead'>
			<view class='bg-red padding-sm flex-sub'>
				<view class='price'>
					<text class='text-price'>{{price}}</text>
					<text class='text-price text-del'>{{discount}}</text>
				</view>
				<view class="text-sm">累计已拼4567件/仅剩2467件</view>
			</view>
			<view class='bg-yellow padding-lr flex flex-direction justify-center align-center'>
				<view class='text-brown text-center padding-bottom-xs'>距离结束仅剩</view>
				<view class='time'>
					<view class="cu-tag bg-black radius">00</view>
					<text class=''>:</text>
					<view class="cu-tag bg-black radius">23</view>
					<text class=''>:</text>
					<view class="cu-tag bg-black radius">34</view>
				</view>
			</view>
		</view>
		<!--  商品简介 -->
		<view class='bg-white padding'>
			<view class='text-xl text-black text-bold text-line2cut'>
				{{detail}}
			</view>
			<view class='text-grey margin-top-sm'>{{remarks}}</view>
			<view class='padding-sm bg-orange light flex align-center radius margin-top-sm'>
				<view class="flex-sub text-sm">
					<text class="text-black"> 卖家联系方式:</text> {{contact}} <text class="text-black"></text>
				</view>
				<button class="cu-btn bg-orange sm">立即联系</button>
			</view>
		</view>

		<!--  底部操作条 -->
		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" open-type="contact">
				<image style="width: 40rpx; height: 40rpx;" src="https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/%E6%9C%8D%E5%8A%A1%E8%AF%84%E4%BB%B7-%E5%AE%A2%E6%9C%8D.png">
				<view>客服</view>
			</button>
			<view class="action">
				<image style="width: 40rpx; height: 40rpx;" src="https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/%E8%B4%AD%E7%89%A9%E8%BD%A6.png">
				<view>购物车</view>
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow" @tap="showTypeModal('addCart')">加入购物车</button>
				<button class="cu-btn bg-red round shadow" @tap="showTypeModal('submit')">立即订购</button>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				scrollTop: 0,
				ModalClose: this.CustomBar + 35 + uni.upx2px(690),
				modalName: null,
				swiperCur: 0,
				swiperList: ['https://img14.360buyimg.com/n1/s546x546_jfs/t1/17986/16/15158/138069/5cadc00eE4a1f4c49/b19abe2839f7a12b.jpg','https://img14.360buyimg.com/n1/s546x546_jfs/t1/35980/26/890/157465/5cadc00eE60333685/d0ed8e2d8bcc3a55.jpg',,'https://img14.360buyimg.com/n1/s546x546_jfs/t1/33552/24/2333/187869/5cadc00eEbea4d7aa/59bcde6c03d4d4e3.jpg','https://img14.360buyimg.com/n1/s546x546_jfs/t1/10936/5/6625/109240/5c24462fE8518daa9/199d809a2f8f24c9.jpg'],//展示图片
				TypeModal: 'type',
				price:'200',//优惠前价格
				discount:'160',//优惠后价格
				detail:'李宁男鞋跑步鞋2019年春夏季新款减震耐磨休闲鞋运动鞋 新基础黑/银色 男42(265MM) 李宁夏季运动短袖/短裤',//描述
				contact:'111',//卖家联系方式
				remarks:'hhh',//商品备注
			}
		},
		onLoad(e) {
			_self = this;
			let id = e.id;
			//首先拿到帖子的详细信息
			uni.request({
			    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectGoodsById', //根据相册id拿到相册全部照片
			    data: {
					id
			    },
			    success: (res) => {
					//拿到帖子的详细数据
					//渲染到页面上
					let data = res.data[0];
					
					let picture = JSON.parse(data.image);
					this.swiperList = picture;
					this.price = data.price;
					this.discount = data.discount;
					this.detail = data.name + ":" + data.detail;
					this.contact = data.contact;
					this.remarks = data.remarks;
			    }
			});
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			swiperChange(e) {
				this.swiperCur = e.detail.current
			},
			showTypeModal(e) {
				this.modalName = 'typeModal'
				this.TypeModal = e
			},
		}
	}
</script>

<style>
	.cu-modal.swiper-video {
		background: rgba(0, 0, 0, 0.85);
	}

	.cu-modal.swiper-video .cu-dialog {
		width: 690upx;
		height: 690upx;
		position: fixed;
		padding: 5upx;
		left: 30upx;
		background: #000;
		border-radius: 10upx;
	}

	.cu-modal.swiper-video video {
		width: 680upx;
		height: 680upx;
	}

	.ModalClose {
		position: fixed;
		z-index: 1026;
		color: #FFFFFF;
		left: 0;
		right: 0;
		width: 160upx;
		margin: auto;

	}

	.swiper-tag {
		position: relative;
		height: 0;
	}

	.swiper-tag .cu-tag.bg-white {
		position: absolute;
		z-index: 100;
		bottom: 15px;
		right: 15px;
	}

	.swiper-tag .cu-tag.vide-tag {
		position: absolute;
		z-index: 100;
		bottom: 15px;
		right: 0;
		left: 0;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.6);
		width: 130upx;
		color: #FFFFFF;
	}

	.goodsHead .price text:first-child {
		font-size: 52upx;
		font-weight: bold;
		margin-right: 10upx;
		display: inline-block;
	}

	.goodsHead .time .cu-tag {
		font-size: 12px;
		padding: 0px 10upx;
		border-radius: 3px;
		margin: 0 2px;
		height: 36upx;
	}

	.goodsHead .bg-red {
		position: relative;
	}

	.cu-bar.foot {
		z-index: 1000;
	}

	.goods-content image {
		max-width: 100%;
		display: block;
		min-height: 100px;
		background-color: #FFFFFF;
	}

	.typeBox .cu-dialog {
		padding-top: 80upx;
		background-color: transparent;
	}

	.typeBox .modal-close {
		right: 10px;
		border-radius: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		background: #333;
		position: absolute;
		color: #fff;
		top: 0upx;
	}

	.typeBox .modal-bd {
		text-align: left;
		background: #fff;
	}

	.typeBox .modal-message {
		padding: 50upx 30upx;
	}

	.typeBox .modal-option {
		background: #fff;
		display: flex;
		text-align: center;
		border-top: 1upx solid #eee;
		align-items: center;
	}

	.typeBox .modal-option-btn {
		flex: 1;
		line-height: 100upx;
	}

	.typeBox .modal-option-btn+.modal-option-btn {
		border-left: 1upx solid #eee;
	}

	.typeBox .cu-modal.bottom-modal::before {
		vertical-align: bottom;
	}

	.typeBox .cu-modal.bottom-modal .modal-dialog {
		width: 100%;
		border-radius: 0;
	}

	.typeBox .cu-modal.bottom-modal {
		margin-bottom: -500px;
	}

	.typeBox .cu-modal.bottom-modal.cur {
		margin-bottom: 0;
	}

	.typeBox .modal-bd {
		padding: 20upx 20upx 0;
	}

	.type-goods {
		display: flex;
		padding-bottom: 15px;
	}

	.type-goods .flex-sub {
		padding-left: 10px;
		padding-top: 10px;
	}

	.type-goods image {
		width: 120px;
		height: 120px;
		margin-top: -40px;
		border-radius: 3px;
		border: 2px solid #fff;
	}
</style>
