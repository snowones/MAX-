<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">记账</block>
		</cu-custom>
		<button class="margin-bottom" @click="saveBookKeeping">保存账目</button>
		<form>
			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">消费用途</view>
				<input placeholder="攒钱买房" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">消费金额</view>
				<input placeholder="攒钱买房" name="input"></input>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '2018-12-25',
			}
		},
		methods: {
			saveBookKeeping(){
				
			}
		}
	}
</script>

<style>
	.margin-bottom{
		margin-bottom: 20upx;
	}
</style>
