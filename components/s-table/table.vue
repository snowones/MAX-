<!--
 * @Description: display:table版
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2020-09-03 11:18:53
 * @LastEditTime: 2020-12-29 12:50:56
 * @LastEditors: 无痕
-->
<template>
  <div class="s-table" :class="[
    {'s-table-border':border},
    {'s-table-center':center}
  ]">
    <div class="s-table-colgroup">
      <div
        class="s-table-col"
        v-for="(column,columnIndex) of columns"
        :key="columnIndex"
        :style="{width:getColWidth(column.width)}"
      ></div>
    </div>
    <div class="s-table-header" v-if="showHeader">
      <div class="s-table-th" v-for="(column,columnIndex) of columns" :key="columnIndex" @click="thClick(column,columnIndex)">
        <div class="s-table-cell">
          <span>{{column.title}}</span>
          <div class="s-table-sort-wrap" v-if="hasSort(column)">
            <div class="sort-icon" :style="{color:column.sortBy == sortBy && sortOrder == 'asc'? sortActiveColor:sortColor}"></div>
            <div class="sort-icon" :style="{color:column.sortBy == sortBy && sortOrder == 'desc'? sortActiveColor:sortColor}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-table-body">
      <div class="s-table-tr" :class="[getRowClassName(row,rowIndex)]" v-for="(row,rowIndex) of list" :key="rowIndex">
        <div class="s-table-td" v-for="(column,columnIndex) of columns" :key="columnIndex">
          <div class="s-table-cell">
            <slot :row="row" :rowIndex="rowIndex" :column="column" :columnIndex="columnIndex" :parent="parent">{{row[column.key]}}</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 's-table',
  props: {
    columns: {
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: [Function, String],
      default: ''
    },
    sortColor: {
      type: String,
      default: '#999999'
    },
    sortBy: {
      default: ''
    },
    sortOrder: {
      type: String,
      default: ''
    },
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
    getColWidth (w) {
      if (w) {
        if (String(w).indexOf('%') > -1) {
          return w;
        } else {
          return parseInt(w) + 'rpx';
        }
      }
      return 'auto';
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
  width: 100%;
  display: table;
  &-colgroup {
    display: table-column-group;
  }
  &-col {
    display: table-column;
  }
  &-header {
    display: table-header-group;
  }
  &-body {
    display: table-row-group;
  }
  &-tr {
    display: table-row;
  }
  &-cell {
    width: 100%;
    white-space: normal;
    word-break: break-all;
  }
  &-th,
  &-td {
    display: table-cell;
    padding: 10rpx;
    height: 60rpx;
    vertical-align: middle;
  }
  &-center &-th,
  &-td {
    text-align: center;
  }
  &-border &-th,
  &-td {
    border: 1rpx solid #e4e7ed;
    &:not(:last-child) {
      border-right: 0;
    }
  }
  &-border &-tr &-td {
    border-top: 0;
  }
  &-sort-wrap {
    display: inline-flex;
    flex-direction: column;
    vertical-align: middle;
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
