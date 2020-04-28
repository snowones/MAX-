<template name='article'>
	<view>
		<view class="article-edit">
			<image 
				src="https://zyx-max.oss-cn-beijing.aliyuncs.com/eidt.png" 
				class="article-edit-image"
				@click="addArticle"
				></image>
		</view>
		<view  v-for="(item,index) in articleDatas" :key="index">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text>{{item.title}}
				</view>
				<view class="action">
					{{item.theme}}
				</view>	
			</view>
			<view class="cu-card case" :class="isCard?'no-card':''"  @click="articleDetail(item)">
				<view class="cu-item shadow">
					<view class="image">
						<image :src="item.bg"  mode="widthFix"></image>
						<view class="cu-tag bg-blue">Ti9</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.subTitle}}</text></view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style=" 'background-image:url(' + item.userAvatar + ');'"></view>
							<view class="content flex-sub">
								<view class="text-grey"> {{item.userName}}</view>
								<view class="text-gray text-sm flex justify-between">
									十天前
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.vivewNumber}}
										<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.supportNumber}}
										<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.commentNumber}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="find-bottom">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: true,
				articleDatas:[
					// {
					// 	id:1,//文章id
					// 	title:'CNDOTA BEST DOTA',//标题
					// 	theme:'LGD加油',//主题
					// 	bg:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',
					// 	subTitle:'那些以为走不出来的低谷和绝望 或许只是一时的乌云和阴霾。',//副标题
					// 	userName:'马东什么？',//文章作者名
					// 	userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
					// 	createTime:'2020/3/30',//发表日期
					// 	vivewNumber:30,//文章观看量
					// 	supportNumber:20,//文章点赞数
					// 	commentNumber:10,//文章评论数
					// 	allData:[],//全部数据
					// },
				]
			};
		},
		mounted(){
			uni.request({
			    url: 'http://182.92.64.245/tp5/public/index.php/index/index/selectAllArticle', //仅为示例，并非真实接口地址。
			    data: {
			    },
			    success: (res) => {
			        console.log(res.data);
					let data = res.data;
					let tempArr = []; //临时数组 存放articleDatas
					for(let i in data){
						let tempObj = {}; //临时对象存放每一个文章的具体数据
						tempObj.id = data[i].id;
						tempObj.title = data[i].title;
						tempObj.theme = data[i].theme;
						tempObj.bg = data[i].bg;
						tempObj.subTitle = data[i].sub_title;
						tempObj.userName = data[i].name;
						tempObj.userAvatar = data[i].avatar_url;
						tempObj.createTime = data[i].create_time;
						tempObj.vivewNumber = data[i].vivew_number;
						tempObj.supportNumber = data[i].support_number;
						tempObj.commentNumber = data[i].comment_number;
						tempObj.allData = data[i];
						tempArr.push(tempObj);
					}
					this.articleDatas = tempArr;
			    }
			});
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			/*
			*zyx/2020/3.31
			* 点击事件 添加文章
			*/
			addArticle(){
				uni.navigateTo({
					url:'../articleAdd/articleAdd'
				})
			},
			/*
			*zyx/2020/3.31
			* 点击事件 进入文章详情
			*/
			articleDetail(item){
				//跳转文章详情时把这个帖子的id传进去
				let id = item.id;
				uni.navigateTo({
					url:'../articleDetail/articleDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
.find-bottom{
	width: 100%;
	height: 120upx;
}
.article-edit{
	position: fixed;
	bottom: 140rpx;
	right: 20rpx;
	z-index: 100;
}
.article-edit-image{
	width: 100rpx;
	height: 100rpx;
}


</style>
