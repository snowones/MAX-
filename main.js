import Vue from 'vue'
import App from './App'


//论坛组件
import discuss from './pages/discuss/home.vue'
Vue.component('discuss',discuss)

//不能起名为article 命名冲突  文章组件
import article from './pages/article/home.vue'
Vue.component('articleSub',article)
//个人中心组件
import my from './pages/my/home.vue'
Vue.component('my',my)
//商城组件
import shop from './pages/shop/home.vue'
Vue.component('shop',shop)
//图库组件
import picture from './pages/picture/home.vue'
Vue.component('picture',picture)

//引入图库卡片组件
import componentUpperCamelCase from './components/hm-cover-card/index.vue';
Vue.component('hm-cover-card',componentUpperCamelCase)


import navigation from './pages/common/nav.vue'
Vue.component('navigation',navigation)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



