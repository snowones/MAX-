<template name="picture">
    <view class="index-page">
		<cu-custom bgColor="bg-black" :isBack="true" v-if="type == 1">
			<block slot="backText">返回</block>
			<block slot="content">我的相册</block>
		</cu-custom>
		<view class="article-edit">
			<image 
				src="https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8A%E4%BC%A0-%E7%9B%B8%E5%86%8C.png" 
				class="article-edit-image"
				@click="addPicture"
				></image>
		</view>
        <navigator  v-for="(item,index) in photos" :key="index" :url="'../pictureDetail/many?id='+ item.id">
            <div class="test-component">
                <hm-cover-card :options="item"></hm-cover-card>
            </div>
        </navigator>
    </view>
</template>

<script>
export default {
    data () {
        return {
			type:0,//0是正常主页进入的，1是从我的页面进入
			photos:[
				// {
				// 	id:1,
				// 	entryPic:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',
				// 	title: '单色摄影',
				// 	text: '456张风景照片',
				// 	shoucang:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/shoucang_0.png',
				// 	// shoucang:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/shoucang_1.png'
				// },
			],
        }
    },
	onLoad(e) {
		console.log(e);
		console.log('我进入了onload');
		//如果e存在就说明从我的里进入的
		if(e.type){
			this.type = 1;
		}
	},
	mounted(){
		console.log('我进入了mounted');
		let data;
		if(!this.type){
			//这里是主页进入触发
			//组件加载时获取全部数据
			uni.request({
				url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectAllPicture', 
				data: {
				},
				success: (res) => {
					console.log(res.data);
					let data = res.data;
					this.processData(data);
				}
			});
		}else{
			//这里是个人中心页面进入触发
			//组件加载时获取全部数据
			let openid = uni.getStorageSync('openId');
			uni.request({
				url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectUserPicture', 
				data: {
					openid,
				},
				success: (res) => {
					console.log(res.data);
					let data = res.data;
					this.processData(data);
				}
			});
		}
	},
	methods:{
		/*
		*zyx/2020/3.31
		* 点击事件 添加相册
		*/
		addPicture(){
			uni.navigateTo({
				url:'../pictureAdd/pictureAdd'
			})
		},
		/*
		*zyx/2020/5.6
		* 处理数据
		*/
		processData(data){
			let tempArr = []; //临时数组 存放pictureDatas
			for(let i in data){
				let tempObj = {}; //临时对象存放每一个帖子的具体数据
				
				let picture = JSON.parse(data[i].contents);
				tempObj.id = data[i].id;
				tempObj.title = data[i].name;
				tempObj.entryPic = picture[0];
				tempObj.shoucang = 'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/shoucang_1.png';//shoucang_0.png
				tempObj.text = picture.length + '张照片';
				tempArr.push(tempObj);
			}
			this.photos = tempArr;
		}
	}
}
</script>

<style>
.index-page .btn {
    background: #2d8cf0;
    margin: 40upx;
    border: 4px solid #2d7acc;
}
</style>