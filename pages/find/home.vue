<template name='find'>
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
			<view class="cu-card case" :class="isCard?'no-card':''"  @click="articleDetail">
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
		
		
		
		<view class="cu-bar bg-white solid-bottom" :class="isCard?'margin-top':''">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 上海Ti9
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg);"></view>
						<view class="content flex-sub">
							<view>马东什么？</view>
							<view class="text-gray text-sm flex justify-between">
								2019年8月29日
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					每一个不曾起舞的一天都是对生命的辜负
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" v-for="(item,index) in isCard?9:1" :key="index">
					 <image :src="'https://zyx-max.oss-cn-beijing.aliyuncs.com/TI'+index+ '.jpg'" mode="aspectFill"></image>
					</view>
				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30
				</view>

				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg);"></view>
						<view class="content">
							<view class="text-grey">左头</view>
							<view class="text-gray text-content text-df">
								我们还行吧
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>右头：</view>
									<view class="flex-sub">那当然</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2019年8月30日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg);"></view>
						<view class="content">
							<view class="text-grey">右头</view>
							<view class="text-gray text-content text-df">
								往那边走
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>左头：</view>
									<view class="flex-sub">不！是那边</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2019年8月30日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
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
					{
						id:1,//文章id
						title:'CNDOTA BEST DOTA',//标题
						theme:'LGD加油',//主题
						bg:'https://zyx-max.oss-cn-beijing.aliyuncs.com/8EF8AD9B531939ACE327C0677150AD16.jpg',
						subTitle:'那些以为走不出来的低谷和绝望 或许只是一时的乌云和阴霾。',//副标题
						userName:'马东什么？',//文章作者名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						createTime:'2020/3/30',//发表日期
						vivewNumber:30,//文章观看量
						supportNumber:20,//文章点赞数
						commentNumber:10,//文章评论数
					},
					{
						id:1,//文章id
						title:'CNDOTA BEST DOTA',//标题
						theme:'LGD加油',//主题
						bg:'https://zyx-max.oss-cn-beijing.aliyuncs.com/8EF8AD9B531939ACE327C0677150AD16.jpg',
						subTitle:'那些以为走不出来的低谷和绝望 或许只是一时的乌云和阴霾。',//副标题
						userName:'马东什么？',//文章作者名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						createTime:'2020/3/30',//发表日期
						vivewNumber:30,//文章观看量
						supportNumber:20,//文章点赞数
						commentNumber:10,//文章评论数
					},
					{
						id:1,//文章id
						title:'CNDOTA BEST DOTA',//标题
						theme:'LGD加油',//主题
						bg:'https://zyx-max.oss-cn-beijing.aliyuncs.com/8EF8AD9B531939ACE327C0677150AD16.jpg',
						subTitle:'那些以为走不出来的低谷和绝望 或许只是一时的乌云和阴霾。',//副标题
						userName:'马东什么？',//文章作者名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						createTime:'2020/3/30',//发表日期
						vivewNumber:30,//文章观看量
						supportNumber:20,//文章点赞数
						commentNumber:10,//文章评论数
					},
				]
			};
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
			articleDetail(){
				uni.navigateTo({
					url:'../articleDetail/articleDetail'
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
