<template name="picture">
    <view class="index-page">
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
	mounted(){
		//组件加载时获取全部数据
		uni.request({
		    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectAllPicture', 
		    data: {
		    },
		    success: (res) => {
		        console.log(res.data);
				let data = res.data;
				let tempArr = []; //临时数组 存放articleDatas
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
		});
	},
	methods:{
		/*
		*zyx/2020/3.31
		* 点击事件 添加帖子
		*/
		addPicture(){
			uni.navigateTo({
				url:'../pictureAdd/pictureAdd'
			})
		},
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