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
				console.log(e.html);
                this.hideEditor();
            },
			//富文本中添加了图片
            uploadImg: function(img, callback) {
                //上传图片逻辑,将图片链接传给回调函数
				console.log(img);
                callback(img)
            },
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定删除图片?',
					cancelText: '确定',
					confirmText: '取消',
					success: res => {
						if (res.confirm) {
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
			*zyx 2020/4/2
			* 提交表单
			*/
			formSubmit(){
				let {html,title,theme,sub_title} = this;
				if(!html ||!title ||!theme ||!sub_title){
					uni.showToast({
						title: '请将信息填写完整',
						icon: 'none',
						duration: 2000
					})
				}
				console.log(html);
				console.log(title);
				console.log(theme);
				console.log(sub_title);
				
				
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
