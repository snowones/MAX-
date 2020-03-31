<template>
	<view>
		<!-- 导航条 -->
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">文章详情</block>
		</cu-custom>
		<!-- 切换导航 -->
		<scroll-view scroll-x class="bg-black nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-camerafill"></text> 文章
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-upstagefill"></text> 评论
			</view>
		</scroll-view>
		<!-- 根据切换导航切换到 文章模块和评论模块 -->
		<!-- 文章模块 -->
		<view :class="0==TabCur?'':'.display-none'">
			<view class="cu-card case">
				<view class="shadow acticle-bg">
					<view class="image">
						<image :src="bg"  mode="widthFix"></image>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{subTitle}}</text></view>
				</view>
			</view>
		</view>
		<view auto-height v-html="html" class="html"></view>
		</view>
		<!-- 评论模块 -->
		<view :class="1==TabCur?'':'.display-none'">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<image class="image-icon" src="https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/%E6%B6%88%20%E6%81%AF.png"></image>全部评论
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in listDatas" :key="index">
					<view class="cu-avatar round lg" :style="'background-image:url('+ item.userAvatar +');'"></view>
					<view class="content">
						<view class="text-grey">{{item.userName}}</view>
						<view class="text-gray text-sm flex">
							<view >
								{{item.articleComment}}
							</view> 
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
				</view>
			</view>
			<view class="box add-comment">
				<view class="cu-bar input">
					<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
					<view class="action">
						<text class="cuIcon-roundaddfill text-grey"></text>
					</view>
					<input class="solid-bottom" maxlength="300" cursor-spacing="10"></input>
					<view class="action">
						<text class="cuIcon-emojifill text-grey"></text>
					</view>
					<button class="cu-btn bg-green shadow-blur">发送</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				id:1,//文章id
				title:'CNDOTA BEST DOTA',//标题
				theme:'LGD加油',//主题
				bg:'https://zyx-max.oss-cn-beijing.aliyuncs.com/8EF8AD9B531939ACE327C0677150AD16.jpg',
				subTitle:'那些以为走不出来的低谷和绝望 或许只是一时的乌云和阴霾。',//副标题
				html:'<p wx:nodeid="121">DA联赛今天最后一场，由EHOME对阵Ocean,第一局EHOME中上两路打出巨大优势，虽然中期送出几次小团灭，但核心德鲁伊通过漫长的发育拆掉很多外塔，全员经济领先，最后以一次漂亮的肉山团直接拿盾锁定胜局，第二局EHOME和海洋互刷了很久，最后无解肥巨魔野区1打3撑到神谕赶到完成反杀，成功击溃了海洋，恭喜EHOME获得胜利。</p><p wx:nodeid="136"><img src="http://tmp/wx919da7d945914699.o6zAJswFPQgu8VmWSC9ZwBLMzrio.e2look4J3PHj079dfc8b1801086a1257731f48c7e39d.jpg" alt="图像" wx:nodeid="138"></p><p wx:nodeid="144">EHOME在天辉，海洋在夜魇，EHOME一手人马，之后用祸乱之源克制滚滚，补推进核德鲁伊，控场凤凰和中路紫猫，海洋一手补核心小狗打肉核，最后出5号位双头龙。分路方面上路人马凤凰打滚滚，中路紫猫对影魔，下路德鲁伊祸乱之源对小狗小小双头龙。',
				listDatas:[
					{
						userName:'马东什么？',//文章作者名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						articleComment:'XGNB',//评论内容
						createTime:'2020/3/31 15.30',//评论创建时间  这里可以考虑下操作数据  换成当天具体时间 1天前 三天前
					},{
						userName:'马东什么？',//文章作者名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						articleComment:'我是一条评论',//评论内容
						createTime:'2020/3/31 15.30'
					},{
						userName:'马东什么？',//文章作者名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						articleComment:'斗鱼有幸得到你们两位卧龙凤雏',//评论内容
						createTime:'2020/3/31 15.30'
					},{
						userName:'马东什么？',//文章作者名
						userAvatar:'https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg',//用户头像地址
						articleComment:'我是一条评论',//评论内容
						createTime:'2020/3/31 15.30'
					},
					
				],
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			}
		}
	}
</script>

<style>
.cu-item{
	width: 50%;
}
/* 设置dispalynone */
.display-none{
	display: none;
}
.cu-list >.cu-item{
	width: 100%;
	min-height: 175rpx;
}
.image-icon{
	width: 50rpx;
	height: 50rpx;
}
.acticle-bg{
	margin: 20rpx;
}
.html{
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	width: 100%;
	font-size: 16px;
	line-height: 1.5;
	padding: 20rpx;
	background-color:#F8F8F8;
	margin: 10rpx;
}
.add-comment{
	position: fixed;
	bottom: 0;
	width: 100%;
}

</style>
