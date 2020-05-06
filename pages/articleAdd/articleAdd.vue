<template>
	<view class="content">
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<!-- <block slot="content">发布文章</block> -->
		</cu-custom>
		<button  @click="formSubmit">发布文章</button>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input placeholder="文章标题" name="input"  @blur="(e) => {this.pushInfo(e,'title')}" :value="title" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">主题</view>
				<input placeholder="文章主题" name="input"  @blur="(e) => {this.pushInfo(e,'theme')}" :value="theme" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">副标题</view>
				<input placeholder="副标题" name="input"  @blur="(e) => {this.pushInfo(e,'sub_title')}" :value="sub_title" ></input>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					文章主题图片
				</view>
				<view class="action">
					{{imgList.length}}/1
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
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		</form>
		
		<view class="text-area" v-if="!showEditor">
			<view>
				<button  @tap="openEditor">编辑文章正文</button>
				<view auto-height v-html="html" class="html"></view>
			</view>
		</view>
		<meditor v-else class="editor" @cancel="hideEditor" @save="saveEditor" :html="html"
		  :imageUploader="uploadImg" :muiltImage="true"></meditor>
	</view>
</template>

<script>
    import meditor from '@/components/robin-editor/editor.vue';
	var _self;
    export default {
        components: {
            meditor
        },
        data() {
            return {
                showEditor:false,//编辑文章正文得弹窗
                html: '<b style="color:#ff0000">文章正文...</b>',//文章正文的内容
				imgList: [],
				title:'',//文章标题
				theme:'',//文章主题
				sub_title:'',//文章副标题
            }
        },
		onLoad() {
			_self = this;
		},
        methods: {
			//打卡文章正文的弹窗
            openEditor: function() { 
                this.showEditor = true
            },
			//关闭文章正文的弹窗
            hideEditor: function() {
                this.showEditor = false
            },
			//保存富文本编辑内容
            saveEditor: function(e) {
                this.html = e.html;
                this.hideEditor();
            },
			//富文本中添加了图片
            async uploadImg(img, callback) {
                //上传图片逻辑,将图片链接传给回调函数
				//上传图片的方法封装到了全局 返回值是一个promise
				let ossSrc = await global.getOssSrc(img);
				
				//unloadmsg的回调函数  把oss返回的url返回回去
				callback(ossSrc);
				//vue强制刷新
				_self.$forceUpdate();
				
            },
			/*
			*zyx 
			* 2020/4/27
			* 选择图片 然后上传oss 然后给页面进行图片预览
			*/
			async ChooseImage() {
				//选择图片的函数 封装成promise到全局 传入num一次选择图片的数量
				let img = await global.uniChooseImagePromise(1);
				//返回的事一个['xxxxxx']
				img = img[0];
				//上传图片的方法封装到了全局 返回值是一个promise
				let imgOssSrc = await global.getOssSrc(img);
				//把图片链接添加到数组里
				_self.imgList.push(imgOssSrc)
			},
			/*
			* zyx
			* 2020/4/27
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
			* 2020/4/27
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
			*zyx/2020/4/2
			*表单各处输入验证  //这里可优化  现在三处填写都没有加验证
			*/
			pushInfo(e, type){
				let _type = type;
				switch (_type){
					case "title":
						if(e.detail.value){
							this.title = e.detail.value;
						}else{
							uni.showToast({
								title: '请输入标题',
								icon: 'none',
								duration: 2000
							})
						}
						break;
					case "theme":
						if(e.detail.value){
							this.theme = e.detail.value;
						}else{
							uni.showToast({
								title: '请输入主题',
								icon: 'none',
								duration: 2000
							})
						}
						break;
					case "sub_title":
						if(e.detail.value){
							this.sub_title = e.detail.value;
						}else{
							uni.showToast({
								title: '请输入副标题',
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
			*zyx 2020/4/27
			* 提交表单
			*/
			formSubmit(){
				let {html,title,theme,sub_title,imgList} = this;
				//第一步表单验证 全部的内容必须都填
				if(!html ||!title ||!theme ||!sub_title||!imgList.length){
					uni.showToast({
						title: '请将信息填写完整',
						icon: 'none',
						duration: 2000
					})
					return 0;
				}
				//获取发布者的oepnid
				let openid = uni.getStorageSync('openId')
				//提交表单，把发布的文章内容都存入数据库
				uni.request({
				    url: 'http://182.92.64.245/tp5/public/index.php/index/index/saveArticleInfo', 
				    data: {
						openid   : openid,
						title    : title,
						theme    : theme,
						bg       : imgList[0],
						sub_title: sub_title,
						content  : html
				    },
				    success: (res) => {
				        uni.showToast({
				            title: '发布成功',
				            duration: 2000
				        });
						//发布成功后跳转回文章主页
						uni.navigateTo({
							url: '../index/index?data=article'
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
