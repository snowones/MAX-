/*
 * @Description: 图片懒加载、预加载 v1.3.2
 * @Author: pocky
 * @Email 2460392754@qq.com
 * @Date: 2019-06-12 18:47:15
 * @LastEditTime: 2019-10-25 20:24:27
 * @instruction: https://www.yuque.com/pocky/aaeyux/my9eft
 * @github: https://github.com/2460392754/uniapp-tools/tree/master/lazyLoad
 * @dcloud https://ext.dcloud.net.cn/plugin?id=495
 */

import LazyLoad from './core/index';

// 单例
if (!global.$lazyLoad) {
    global.$lazyLoad = new LazyLoad();
}

export default global.$lazyLoad;
