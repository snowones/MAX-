<template>
    <view id="many-page">
		<!-- 导航条 -->
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">相册</block>
		</cu-custom>
		<!-- 切换导航 -->
        <scroll-view :id="scrollId"
                     scroll-y
                     @scroll="scroll">

            <view class="container">
                <lazy-load v-for="url of list"
                           :key="url"
                           :src="url"
                           :scroll-id="'#'+scrollId"
                           mode="widthFix"></lazy-load>
            </view>

        </scroll-view>
    </view>
</template>

<script>
import lazyLoad from '../../components/lazyLoad/index';
import lazyLoadPlugin from '../../plugins/lazyLoad/js/index'
var _self;
export default {
    data () {
        return {
            scrollId: "scroll",
            list: [
                // "x",
                // "/static/dog/1.jpg",
                // "/static/dog/2.jpg",
                // "/static/dog/3.jpg",
                // "/static/dog/4.jpg",
                // "/static/dog/5.jpg",
                // "/static/dog/6.jpg",
                // "xx",
                // "/static/cat/1.jpg",
                // "/static/cat/2.jpg",
                // "/static/cat/3.jpg",
                // "xxx",
            ]
        }
    },
	onLoad(e) {
		_self = this;
		let id = e.id;
		//首先拿到帖子的详细信息
		uni.request({
		    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectPictureById', //根据相册id拿到相册全部照片
		    data: {
				id
		    },
		    success: (res) => {
				//拿到帖子的详细数据
				//渲染到页面上
				let data = res.data[0];
				let picture = JSON.parse(data.contents);
				//临时对象存放数据 不直接去修改数据 让数据一次性渲染提高性能
				_self.list =  picture;
				//这个页面暂时有点小bug 就是因为图片是懒加载 如果只是一两张图片就不触发滑动动作 图片就不加载 
		    }
		});
		
	},
    methods: {
        scroll () {
            lazyLoadPlugin.scroll();
        }
    },
    mounted () {
        lazyLoadPlugin.init({
            id: '#scroll'
        });
    },
    components: {
        lazyLoad
    },
    destroyed () {
        lazyLoadPlugin.destroy();
    }
}
</script>

<style lang="scss">
#many-page {
    #scroll {
        background: #e8e8e8;
        height: 100vh;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: start;
    }

    /* #ifndef H5*/
    lazy-load {
        width: 50%;
    }
    /* #endif */

    .component-img-lazyload {
        box-shadow: 0 2upx 12upx rgba(0, 0, 0, 0.2);
        background: #fff;
        min-width: calc(50% - 160upx);
        min-height: 300upx;
        padding: 40upx;
        margin: 40upx;
        border-radius: 20upx;

        /* #ifdef H5*/
        /deep/ .img {
            width: 100%;
            border-radius: 14upx;
        }
        /* #endif */

        /* #ifndef H5*/
        .img {
            width: 100%;
            border-radius: 14upx;
        }
        /* #endif */
    }
}
</style>