<template name="navigation">
	<view class="navigation-bar" :style="{height:height}">
		<view class="navigation-bar-fixed" :style="{height:height}">
			<!-- 按钮 -->
			<view  class="navigation-bar-textbox" :style="{top:marginTop}">
				<!-- <view class="button-action" hover-class="button-action-active" @click="back_">
					<image src="https://zhushangimages.oss-cn-hangzhou.aliyuncs.com/back1.png" mode=""></image>
				</view> -->
				<!-- <view class="button-v-line"></view> -->
				<!-- <view  class="button-action" hover-class="button-action-active" @click="home_">
					<image src="https://zhushangimages.oss-cn-hangzhou.aliyuncs.com/home1.png" mode=""></image>
				</view> -->
			</view>
			<!-- title 标题-->  
			<view class="navigation-bar-title" :style="'margin-top:'+marginTop">{{config.title}}</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			};
		},
		computed:{
			height(){ //有用
				const {platform,statusBarHeight} = uni.getSystemInfoSync()
				let height = statusBarHeight +4 //ios 24px
				if (platform.toLowerCase() == "android" ){
					height +=4 //android 28px
				}
				// 胶囊高度 32px 下边框6px height 状态栏高度
				return height+ 38 + "px"
			},
			marginTop(){ //有用
				const {platform,statusBarHeight} = uni.getSystemInfoSync()
				let height = statusBarHeight +4
				if (platform.toLowerCase() == "android" ){
					height +=4
				}
				return height + "px"				
			}
		},
		updated() {
		},
		mounted() {
			
		},
		props:{
			config:{
				default(){
					return {
						title:"MAX+",
						path:"../../pages/main_index/main_index"
					}
				}
			}
		},
		methods:{
			back_(){
				uni.navigateBack({
					delta:1
				});
			},
			home_(){
				let config = this.config;
				uni.reLaunch({
				url: config.path
			});
			}
			
		}
	}
</script>

<style lang="scss">
	.navigation-bar{
		width: 100%;
		box-sizing: border-box;
		.navigation-bar-fixed{  
			width: 100%;
			position: fixed;
			top:0;
			box-sizing: border-box;
			z-index: 999;
			background:black;
			display: flex;
			justify-content: center;
			//title
			.navigation-bar-title{ 
				width: 280upx;
				line-height: 32px;
				height: 32px;
				color: white;
				font-size: 36upx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				text-align: center;
			}
			.navigation-bar-textbox{  
				// border: 1px solid grey;
				// border-radius: 16px;
				position: absolute;
				// height: 32px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				line-height: 32px;
				height: 32px;
				font-size: 30upx;
				width: 85px;
				left: 0px;
				// border:0.5px solid rgba(255,255,255,.3);
				box-sizing: border-box;
				overflow: hidden;
				z-index: 9;
				.button-action{ 
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.button_clear{
						line-height: 1;
						background-color: transparent;
						border: none;
						margin: 0;
						padding: 0;
				    }
					.button_clear::after{
						border:none;
					}
					image{
						width: 50upx;
						height: 50upx;
						padding: 6upx;
						box-sizing: border-box;
					}
				}
				.button-v-line{ 
					width: 0.5px;
					height: 18px;
					background-color: rgba(0,0,0,.2);
				}
			}
			.navigation-bar-capsule{
				position: absolute;
				// height: 32px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				line-height: 32px;
				height: 32px;
				font-size: 30upx;
				width: 89px;
				left: 10px;
				background-color: rgba(255,255,255,.5);
				border-radius: 16px;
				// border:0.5px solid rgba(255,255,255,.3);
				box-sizing: border-box;
				overflow: hidden;
				z-index: 9;
				.button-action{
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 60upx;
						height: 60upx;
						padding: 10upx;
						box-sizing: border-box;
					}
				}
				.button-action-active{ 
					background-color: rgba(0,0,0,.3)
					
				}
				.button-v-line{ 
					width: 0.5px;
					height: 18px;
					background-color: rgba(0,0,0,.2);
				}
			}
		}
	}

</style>

