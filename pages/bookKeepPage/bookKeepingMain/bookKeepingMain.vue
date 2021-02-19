<template>
	<view class="content">
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">记账本</block>
		</cu-custom>
	</view>
</template>

<script>
	var _self;
    export default {
        components: {
        },
        data() {
            return {
              
            }
        },
		onLoad() {
			_self = this;
		},
        methods: {
			
        }
    }
</script>

<style>
    view{
        box-sizing: border-box;
    }
</style>
