## [s-ui 代码](https://gitee.com/sldt/s-ui)
## [s-ui 演示](https://sldt.gitee.io/s-ui)

# s-table

## s-table组件参数说明

``` js
{
  // 列数据配置
  columns: {
    default: () => []
  },
  // 数据
  list: {
    type: Array,
    default: () => []
  },
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: true
  },
  // 是否居中显示表格内容
  center: {
    type: Boolean,
    default: true
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: false
  },
  // 设置行class
  rowClassName: {
    type: [Function, String],
    default: ''
  },
  // 排序箭头默认颜色
  sortColor: {
    type: String,
    default: '#999999'
  },
  // 排序字段
  sortBy: {
    default: ''
  },
  // 排序方式  正序：asc 倒序：desc
  sortOrder: {
    type: String,
    default: ''
  },
  // 排序箭头选中颜色
  sortActiveColor: {
    type: String,
    default: '#22ade1'
  }
}
```

## 排序说明

``` js
sort(column, columnIndex) //触发排序时
// 需要双向绑定获取 :sort-by.sync="sortBy" :sort-order.sync="sortOrder"
```

## 使用方式

#### template
``` html
<section class="Table-Page">
  <s-table
    :border="true"
    :columns="columns"
    :list="list"
    :sort-by.sync="sortBy"
    :sort-order.sync="sortOrder"
    @sort="switchSort"
  >
    <!-- uni-app目前在小程序中，不支持在slot-scope中使用当前页面上的数据渲染，故子级注入parent为当前页面data数据 -->
    <template #default="{ row, column, rowIndex, parent }">
      <template v-if="column.key == 'index'">
        <image v-if="rowIndex < 3" class="index-img" :src="'/static/imgs/statistics/index' + (rowIndex + 1) + '.png'" />
        <template v-else>{{ rowIndex + 1 }}</template>
      </template>
      <template v-else>{{ row[column.key] }}</template>
    </template>
  </s-table>
</section>
```

#### script
``` js
import sTable from '@/s-ui/s-table';
export default {
  components: {
    sTable
  },
  data () {
    return {
      sortBy: '', // 排序字段，需在columns中指定
      sortOrder: '', // asc，desc
      columns: [ // 目前组件columns[]数组对象支持的参数
        { title: '排名', key: 'index', width: 120 },
        { title: '区名称', key: 'area_name' },
        { title: '消费金额', key: 'total', sortBy: '4', width: 150 },
        { title: '消费人次', key: 'consume_times', sortBy: '2', width: 150 },
        { title: '拉动比', key: 'pull_ratio', sortBy: '3', width: 150 }
      ],
      list: [
        { area_name: '虹口区', total: 100, amount: 11, consume_times: 21, pull_ratio: 1.25 },
        { area_name: '徐汇区', total: 110, amount: 22, consume_times: 65, pull_ratio: 1.91 },
        { area_name: '奉贤区', total: 120, amount: 33, consume_times: 54, pull_ratio: 2.86 },
        { area_name: '青浦区', total: 130, amount: 44, consume_times: 82, pull_ratio: 3.8 },
        { area_name: '嘉定区', total: 140, amount: 55, consume_times: 48, pull_ratio: 1.77 }
      ]
    };
  },
  methods: {
    switchSort (column, columnIndex) {
      // 点击排序后触发
    }
  }
};
```
#### style
``` css
.Table-Page {
  padding: 30rpx;
  ::v-deep .s-table {
    &-header {
      min-height: 72rpx;
      font-size: 24rpx;
      color: #181818;
    }
    &-tr {
      min-height: 100rpx;
      color: #000000;
      &:nth-child(1) {
        background-color: mix(#f9cb29, transparent, 10%);
      }
      &:nth-child(2) {
        background-color: mix(#bfbfbf, transparent, 10%);
      }
      &:nth-child(3) {
        background-color: mix(#834e00, transparent, 10%);
      }
    }
    .index-img {
      width: 55rpx;
      height: 48rpx;
    }
  }
}
```