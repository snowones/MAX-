<template>
  <div class="hm-cover-card">
    <div class="box">
      <div class="body"><image class="entryPic" :src="options.entryPic" /></div>
      <div class="ft">
        <div class="wrap">
          <text class="title">{{ options.title }}</text>
          <text class="text">{{ options.text }}</text>
        </div>
        <div class="shoucangWrap">
          <image class="shoucang" :src="options.shoucang" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmCoverCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-cover-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          entryPic:
            './images/img_25361_0_1.png',
          title: '单色摄影',
          text: '456张风景照片',
          shoucang:
            './images/img_25361_0_0.png'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>
