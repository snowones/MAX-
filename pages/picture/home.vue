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
				{
					id:1,
					entryPic:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',
					title: '单色摄影',
					text: '456张风景照片',
					shoucang:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/shoucang_0.png'
				},
				{
					id:2,
					entryPic:'/static/hm-cover-card/images/img_25361_0_1.png',
					title: '单色摄影',
					text: '456张风景照片',
					shoucang:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/shoucang_1.png'
				}
			],
        }
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