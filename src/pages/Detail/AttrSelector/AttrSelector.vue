<template>
  <dl>
    <dt class="title">{{spuSale.saleAttrName}}</dt>
    <dd v-for="(attrValue, index) in spuSale.spuSaleAttrValueList" :key="attrValue.id" 
      @click="selectedIndex=index" 
      :class="{active: selectedIndex===index}">
      {{attrValue.saleAttrValueName}}
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'AttrSelector',
  
  props: {
    spuSale: Object
  },

  data () {
    return {
      selectedIndex: 0
    }
  }
}
</script>

<style  lang="less" scoped>
  dl {
    overflow: hidden;
    margin: 13px 0;

    dt {
      margin-right: 15px;
      float: left;
    }

    dd {
      float: left;
      margin-right: 5px;
      color: #666;
      line-height: 24px;
      padding: 2px 14px;
      border-top: 1px solid #eee;
      border-right: 1px solid #bbb;
      border-bottom: 1px solid #bbb;
      border-left: 1px solid #eee;

      &.active {
        color: green;
        border: 1px solid green;
      }
    }
  }
</style>
