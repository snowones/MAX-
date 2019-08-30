<template name='find'>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text>CNDOTA BEST DOTA
			</view>
			<view class="action">
				LGD加油
			</view>	
		</view>
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://zyx-max.oss-cn-beijing.aliyuncs.com/8EF8AD9B531939ACE327C0677150AD16.jpg"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">Ti9</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">那些以为走不出来的低谷和绝望 或许只是一时的乌云和阴霾。</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://zyx-max.oss-cn-beijing.aliyuncs.com/myhead.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey"> 马东什么？</view>
							<view class="text-gray text-sm flex justify-between">
								十天前
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
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

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 官方公告
			</view>
			<view class="action">
			</view>
		</view>
		<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut">LGD加油 再见光头</view></view>
				<view class="content">
					<image src="https://zyx-max.oss-cn-beijing.aliyuncs.com/8F338B2BDC49BC604FF902944F143689.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content"> 357于2017年1月正式加入LGD电子竞技俱乐部DOTA2分部，执教两年多以来带领队伍获得了2018年长沙Major冠军、2018年震中杯冠军、2018年DOTA2国际邀请赛亚军、2019年DOTA2国际邀请赛季军等成绩。</view>
						<view>
							<view class="cu-tag bg-red light sm round">LGD</view>
							<view class="cu-tag bg-green light sm round">357</view>
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
				isCard: true
			};
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

<style>
.find-bottom{
	width: 100%;
	height: 120upx;
}
</style>
