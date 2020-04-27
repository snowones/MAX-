<template name="picture">
    <view class="index-page">
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
					entryPic:'/static/hm-cover-card/images/img_25361_0_1.png',
					title: '单色摄影',
					text: '456张风景照片',
					shoucang:'/static/hm-cover-card/images/img_25361_0_0.png'
				},
				{
					id:2,
					entryPic:'/static/hm-cover-card/images/img_25361_0_1.png',
					title: '单色摄影',
					text: '456张风景照片',
					shoucang:'/static/hm-cover-card/images/img_25361_0_0.png'
				},
				{
					id:3,
					entryPic:'/static/hm-cover-card/images/img_25361_0_1.png',
					title: '单色摄影',
					text: '456张风景照片',
					shoucang:'/static/hm-cover-card/images/img_25361_0_0.png'
				},
			]
			
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