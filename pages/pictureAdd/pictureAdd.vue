<template>
	<view class="content">
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
		</cu-custom>
		<button  @click="formSubmit">上传相册</button>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">名称</view>
				<input placeholder="相册名称" name="input"  @blur="(e) => {this.pushInfo(e,'name')}" :value="name" ></input>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					照片
				</view>
				<view class="action">
					{{imgList.length}}/30
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<30">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		</form>
		
	</view>
</template>

<script>
	var _self;
    export default {
       
        data() {
            return {
				imgList: [],
				name:'',//相册名称
            }
        },
		onLoad() {
			_self = this;
		},
        methods: {
			/*
			*zyx 
			* 2020/4/28
			* 选择图片 然后上传oss 然后给页面进行图片预览
			*/
			async ChooseImage() {
				let img = await global.uniChooseImagePromise(9);
				//返回的事一个['xxxxxx']
				uni.showLoading({
					title:'正在上传'
				});
				for(let imgItem of img){
					let imgOssSrc = await global.getOssSrc(imgItem);
					//把图片链接添加到数组里
					_self.imgList.push(imgOssSrc)
				}
				uni.hideLoading();
			},
			
			/*
			* zyx
			* 2020/4/28
			* 预览图片
			*/
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			/*
			* zyx
			* 2020/4/28
			* 删除图片
			*/
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定删除图片?',
					cancelText: '确定',
					confirmText: '取消',
					success: res => {
						if (!res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			/*
			*zyx/2020/4/29
			*表单各处输入验证 
			*/
			pushInfo(e, type){
				let _type = type;
				switch (_type){
					case "name":
						if(e.detail.value){
							this.name = e.detail.value;
						}else{
							uni.showToast({
								title: '请输入名称',
								icon: 'none',
								duration: 2000
							})
						}
						break;
					default:
						break;
				}
			},
			/*
			*zyx 2020/4/28
			* 提交表单
			*/
			formSubmit(){
				let {name,imgList} = this;
				//第一步表单验证 全部的内容必须都填
				if(!name||!imgList.length){
					uni.showToast({
						title: '请将信息填写完整',
						icon: 'none',
						duration: 2000
					})
					return 0;
				}
				//获取发布者的oepnid
				let openid = uni.getStorageSync('openId')
				//提交表单，
				
				uni.request({
				    url: 'http://182.92.64.245/tp5/public/index.php/index/index/savePictureInfo', 
				    data: {
						name   	  	: name,
						contents    : JSON.stringify(imgList),
						user_openid : openid,
				    },
				    success: (res) => {
				        uni.showToast({
				            title: '发布成功',
				            duration: 2000
				        });
						//发布成功后跳转回论坛主页
						uni.navigateTo({
							url: '../index/index?data=picture'
						});
						
				    }
				});
			}
        }
    }
</script>

<style>
    view{
        box-sizing: border-box;
    }
    .html{
        width: 100%;
		font-size: 16px;
		line-height: 1.5;
		padding: 20rpx;
		background-color:#F8F8F8;
    }
    .editor{
       width: 100%;
    }
	.text-area{
		margin-top: 30rpx;
	}
	
	
</style>
