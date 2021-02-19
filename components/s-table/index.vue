<!--
 * @Description: 默认display:flex版table
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2020-09-23 10:06:50
 * @LastEditTime: 2020-12-29 12:57:11
 * @LastEditors: 无痕
-->
<template>
  <div class="s-table" :class="[
    {'s-table-border':border},
    {'s-table-center':center}
  ]">
    <div class="s-table-header" v-if="showHeader">
      <div
        class="s-table-th"
        v-for="(column,columnIndex) of columns"
        :key="columnIndex"
        :style="{flex:getTdWidth(column)}"
        @click="thClick(column,columnIndex)"
      >
        {{column.title}}
        <div class="s-table-sort-wrap" v-if="hasSort(column)">
          <div class="sort-icon" :style="{color:column.sortBy == sortBy && sortOrder == 'asc'? sortActiveColor:sortColor}"></div>
          <div class="sort-icon" :style="{color:column.sortBy == sortBy && sortOrder == 'desc'? sortActiveColor:sortColor}"></div>
        </div>
      </div>
    </div>
    <div class="s-table-body">
      <div class="s-table-tr" :class="[getRowClassName(row,rowIndex)]" v-for="(row,rowIndex) of list" :key="rowIndex">
        <div class="s-table-td" v-for="(column,columnIndex) of columns" :key="columnIndex" :style="{flex:getTdWidth(column)}">
          <slot :row="row" :rowIndex="rowIndex" :column="column" :columnIndex="columnIndex" :parent="parent">{{row[column.key]}}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 's-table',
  props: {
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
  },
  computed: {
    parent () {
      return this.$parent.$data;
    }
  },
  methods: {
    hasSort (column) {
      return typeof column.sortBy !== 'undefined';
    },
    getTdWidth (column) {
      const w = column.width;
      if (w) {
        if (String(w).indexOf('%') > -1) {
          return '0 0 ' + w;
        } else {
          return '0 0 ' + parseInt(w) + 'rpx';
        }
      }
      return '1 0 0';
    },
    getRowClassName (row, rowIndex) {
      if (typeof this.rowClassName === 'function') {
        return this.rowClassName.call(this.$parent, row, rowIndex);
      }
      return this.rowClassName;
    },
    thClick (column, columnIndex) {
      if (this.hasSort(column)) {
        if (this.sortBy != column.sortBy) {
          this.$emit('update:sortBy', column.sortBy);
          this.$emit('update:sortOrder', 'asc');
        } else {
          if (this.sortOrder == 'asc') {
            this.$emit('update:sortOrder', 'desc');
          } else {
            this.$emit('update:sortOrder', 'asc');
          }
        }
        this.$emit('sort', column, columnIndex);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.s-table {
	background-color: white;
  .s-table-header,
  .s-table-tr {
    display: flex;
  }
  .s-table-th,
  .s-table-td {
    display: flex;
    align-items: center;
    padding: 10rpx;
    min-height: 60rpx;
    box-sizing: border-box;
  }
  &.s-table-center {
    .s-table-th,
    .s-table-td {
      text-align: center;
      justify-content: center;
    }
  }
  &.s-table-border {
    .s-table-th,
    .s-table-td {
      border: 1rpx solid #e4e7ed;
      &:not(:last-child) {
        border-right: 0;
      }
    }
    .s-table-tr .s-table-td {
      border-top: 0;
    }
  }
  .s-table-sort-wrap {
    margin-left: 0.25em;
    .sort-icon {
      width: 0;
      height: 0;
      border-right: 0.24em solid transparent;
      border-left: 0.24em solid transparent;
      &:first-child {
        border-bottom: 0.33em solid currentColor;
      }

      &:last-child {
        border-top: 0.33em solid currentColor;
        margin-top: 0.14em;
      }
    }
  }
}
</style>
