import Vue from 'vue'
import App from './App'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

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

 



