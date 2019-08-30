import Vue from 'vue'
import App from './App'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import person from './pages/personSection/home.vue'
Vue.component('person',person)

import community from './pages/community/home.vue'
Vue.component('community',community)

import data from './pages/data/home.vue'
Vue.component('data',data)

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

 



