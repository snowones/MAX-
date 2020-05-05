<template name="shop">
	<view>
		<view class="article-edit">
			<image 
				src="https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/%E5%8F%91%E5%B8%83%E5%95%86%E5%93%81.png" 
				class="article-edit-image"
				@click="addShop"
				></image>
		</view>
		<block>
			<scroll-view scroll-x class="topicBox">
				<view v-for="(item,index) in topicList" :key="index" :class="'bg-' + item.color" class="cu-item shadow">
					<view class="text-bold text-line2cut">
						#{{item.title}}#
					</view>
					<view class="text-xs">
						<num :num="item.num"></num> 人在参与
					</view>
					<image :src="item.imgUrl" mode="aspectFill"></image>
				</view>
				<view class="cu-item shadow bg-red">
					<view class="text-sm">更多话题</view>
					<view class="text-center icon-roundrightfill text-xl margin-top-xs"></view>
					<image src="https://image.weilanwl.com/qhShop/topicbg.png" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view class="findCard">
				<view class="cu-card goods col-goods" v-for="(card,id) in list" :key="id">
					<view class="cu-item shadow topic-item" style="background-color: #F37B1D; color: #FFFFFF;">
						<view class="text-center padding-tb-lg">
							<view>#618必囤好物清单#</view>
							<view class="text-xs margin-top-xs">发布推荐 得奖品</view>
						</view>
						<view class="flex justify-between align-center padding-bottom-sm padding-right-sm">
							<view class="cu-avatar-group">
								<view class="cu-avatar round sm" v-for="(item,index) in 4" :key="index" :style="[{ backgroundImage:'url(' + 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf' + ')' }]"></view>
							</view>
							<view class="text-xs">
								<text>50</text> 人参加
							</view>
						</view>
						<image src="https://image.weilanwl.com/qhShop/topicbg.png" mode="aspectFill"></image>
					</view>
					<view class="cu-item shadow bg-white" v-for="(item,index) in card" :key="index" @tap="toDetail(item.id)">
						<image :src="item.imgUrl" mode="widthFix"></image>
						<view class="content">
							<view class="title">
								<view class="text-line2cut">{{item.title}}</view>
							</view>
							<view class="flex justify-between align-center margin-top-xs">
								<view class="flex align-center">
									<view class="cu-avatar sm round" :style="[{backgroundImage:'url(' + item.avatar + ')'}]"></view>
									<view class="text-cut text-sm flex-sub">{{item.name}}</view>
								</view>
								<view class="padding-left-xs text-right flex align-centers">
									<text class="cuIcon-appreciatefill margin-lr-xs"></text>
									<view class="text-gray text-sm margin-left-xs">{{item.favor}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-load margin-bottom loading" ></view>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoad: true,
				topicList: [{
					title: '好物撩一撩',
					num: 12312,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'blue'
				}, {
					title: '618必囤好物清单',
					num: 3421,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'red'
				}, {
					title: '好物撩一撩',
					num: 12312,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'pink'
				}, {
					title: '618必囤好物清单',
					num: 3421,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'green'
				}, ],
				list: [
					// [{
					// 	title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
					// 	imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: false,
					// 	favor: 333
					// }, {
					// 	title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
					// 	imgUrl: 'https://hbimg.huabanimg.com/a93f35df96eb6fd176313decd3c27ade7b71c7c378630-l6CXXd_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: true,
					// 	favor: 333
					// }, {
					// 	title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
					// 	imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: true,
					// 	favor: 333
					// }, {
					// 	title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
					// 	imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: true,
					// 	favor: 333
					// }],
					// [{
					// 	title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
					// 	imgUrl: 'https://hbimg.huabanimg.com/1e2595586608f1729cefa00a5e4c72fcbf903ed7c8e6-7IxJF0_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: false,
					// 	favor: 333
					// }, {
					// 	title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
					// 	imgUrl: 'https://hbimg.huabanimg.com/a93f35df96eb6fd176313decd3c27ade7b71c7c378630-l6CXXd_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: true,
					// 	favor: 333
					// }, {
					// 	title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
					// 	imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: true,
					// 	favor: 333
					// }, {
					// 	title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
					// 	imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
					// 	avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
					// 	name: '盒子芥末',
					// 	isFavor: true,
					// 	favor: 333
					// }]
				]
			}
		},
		mounted(){
			//组件加载时获取全部数据
			uni.request({
			    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectAllGoods', 
			    data: {
			    },
			    success: (res) => {
			        console.log(res.data);
					//这里渲染比较特殊 需要把数据分成两份渲染 一排一排渲染
					let data = res.data;
					let length = data.length/2;
					let tempListArr = []; //临时数组 存放list
					//两排数据
					let listData1 = [];
					let listData2 = [];
					data.map((item,index)=>{
						let tempObj = {}; //临时对象存放每一个帖子的具体数据
						//数据处理
						console.log(item.image);
						let picture = JSON.parse(item.image);
						console.log(picture);
						tempObj.id = item.id;
						tempObj.title = item.detail;
						tempObj.imgUrl = picture[0];
						tempObj.avatar = item.avatar_url;
						tempObj.name = item.name;
						tempObj.isFavor = true;
						tempObj.favor = 100;
						
						console.log(length)
						if(index<length){
							//前一半放第一个数组里
							listData1.push(tempObj);
						}else{
							//后一半放后面那个数组里
							listData2.push(tempObj);
						}
					})
					tempListArr[0] = listData1;
					tempListArr[1] = listData2;
					console.log(tempListArr);
					this.list = tempListArr;
			    },
			});
		},
		methods: {
			addShop() {
				uni.navigateTo({
					url: '../shopAdd/shopAdd'
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '../shopDetail/shopDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
	/* 第一排小导航的样式 */
	.topicBox {
		padding: 10rpx 10rpx 0;
		white-space: nowrap;
	}
	.topicBox .cu-item {
		display: inline-block;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		margin: 10rpx;
		padding: 20rpx;
		width: 200rpx;
		height: 130rpx;
		white-space: normal;
		vertical-align: middle;
	}
	.topicBox .cu-item .text-bold {
		height: 2.4em;
		font-size: 26rpx;
		line-height: 1.2em;
		overflow: hidden;
	}
	.topicBox .cu-item view {
		position: relative;
		z-index: 1;
	}
	.text-xs {
		font-size: 20rpx;
	}
	.topicBox .cu-item image, .topic-item image {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		top: 0;
		left: 0;
		z-index: 0;
	}
	
	/* 两列商品的总体样式 */
	.findCard {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding: 0 10rpx;
	}


	.findCard .cu-card {
		flex: 1;
	}
	
	.cu-card.goods {
		display: block;
	}
	
	.cu-card {
		overflow: hidden;
	}
	
	/* 618好物清单标题卡片的样式 */
	.findCard .cu-card.goods .cu-item {
		margin: 20rpx 10rpx !important;
	}
	.cu-card.goods.col-goods>.cu-item {
		padding: 0rpx;
		display: block;
		border: 0px;
	}
	.cu-card.goods>.cu-item {
		position: relative;
	}
	
	
	/* 商品展示样式 */
	

	.findCard .cu-card.goods .cu-item {
		margin: 20rpx 10rpx !important;

	}
	.cu-card.goods.col-goods>.cu-item {
		padding: 0rpx;
		display: block;
		border: 0px;

	}
	.cu-card.goods>.cu-item+.cu-item {
		border-top: 1rpx solid #EEEEEE;

	}
	.cu-card.goods.col-goods>.cu-item>image {
		width: 100%;
		height: 340rpx;
		border-bottom-left-radius: 0rpx;
		border-bottom-right-radius: 0rpx;
		display: block;
	
	}
	.cu-card.goods>.cu-item>image {
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
		border-radius: 6rpx;
	
	}

	.findCard .cu-card.goods.col-goods>.cu-item .content .title {
		font-size: 24rpx;
		font-weight: 300;

	}
	.findCard .cu-card.goods.col-goods>.cu-item .content {
		padding: 10rpx;
	
	}
	.cu-card.goods.no-card>.cu-item .title, .cu-card.goods.col-goods>.cu-item .title {
		height: 3em;
		overflow: hidden;

	}
	.cu-card.goods>.cu-item .title {
		font-size: 30rpx;
		font-weight: 900;
		color: #333333;
		line-height: 1.4;
		height: 1.4em;
		overflow: hidden;
	}






	



	








	
</style>

