<template>
  <div>
    <!-- <div style="padding-top:10px">
      <span>请求Token,再请求选品列表,即可获取商品列表</span>
    </div> -->
    <!-- 头部请求数据按钮 -->
    <div style="padding-top:10px">
      <vxe-button @click="postToken()"
                  v-if="!token">请求Token</vxe-button>
      <vxe-button @click="postClient()"
                  v-else-if="token && (List.length < 1)">获取所有选品列表</vxe-button>
    </div>
    <!-- 筛选数据按钮 -->
    <div style="padding-top:10px"
         v-if="List.length>=1">
      <vxe-button @click="discount(0,1)">一折</vxe-button>
      <vxe-button @click="discount(1,2)">两折</vxe-button>
      <vxe-button @click="discount(2,3)">三折</vxe-button>
      <vxe-button @click="discount(3,4)">四折</vxe-button>
      <vxe-button @click="discount(4,5)">五折</vxe-button>
      <vxe-button status="primary"
                  @click="derived()">导出商品列表</vxe-button>
    </div>
    <!-- 数据列表展示 -->
    <div v-for="item in tableForm"
         style="padding-top:10px"
         :key="item.id">
      <div class="picture">
        <img :src="item.skuImageUrl"
             alt="无图片">
        <div>{{item.productName}}</div>
        <div>价格:{{item.price}}</div>
        <div>最小折扣:{{(item.marketPrice/item.price).toFixed(2)}}</div>
        <div>净含量:{{item.specName}}</div>
      </div>
    </div>
    <!-- 导出弹出层 -->
    <vxe-modal v-model="showEdit"
               :loading="submitLoading"
               title="打印"
               width="800"
               min-width="600"
               min-height="300"
               resize
               lock-view
               :esc-closable="true"
               :show-zoom="true"
               destroy-on-close>
      <vxe-toolbar>
        <template v-slot:buttons>
          <vxe-button @click="exportDataEvent">高级导出</vxe-button>
          <vxe-button @click="openExportEvent">excel导出</vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-table :data="tableForm"
                 highlight-hover-row
                 ref="xTable"
                 border
                 resizable
                 row-key
                 id="xTable"
                 highlight-current-row
                 height="500"
                 :import-config="tableImport"
                 :export-config="tableExport">
        <vxe-table-column type="seq"
                          title="序号"
                          width="100"></vxe-table-column>
        <vxe-table-column title="商品ID"
                          field="productId">
          <template v-slot:default="{row}">
            {{row.productId}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="商品编码"
                          width="100"
                          field="productCode">
          <template v-slot:default="{row}">
            {{row.productCode}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="skuId"
                          width="100"
                          field="productName">
          <template v-slot:default="{row}">
            {{row.productName}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="规格名称"
                          width="100"
                          field="specName">
          <template v-slot:default="{row}">
            {{row.specName}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="sku编码"
                          width="100"
                          field="skuCode">
          <template v-slot:default="{row}">
            {{row.skuCode}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="sku单位"
                          width="100"
                          field="skuUnit">
          <template v-slot:default="{row}">
            {{row.skuUnit}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="库存数量"
                          width="100"
                          field="stockNum">
          <template v-slot:default="{row}">
            {{row.stockNum}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="供货价"
                          width="100"
                          field="price">
          <template v-slot:default="{row}">
            {{row.price}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="京东价/市场零售价"
                          width="100"
                          field="marketPrice">
          <template v-slot:default="{row}">
            {{row.marketPrice}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="产品类型（1：实物商品 2：虚拟商品）"
                          width="100"
                          field="productType">
          <template v-slot:default="{row}">
            {{row.productType}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="品牌名称"
                          width="100"
                          field="brandName">
          <template v-slot:default="{row}">
            {{row.brandName}}
          </template>
        </vxe-table-column>
        <vxe-table-column title="上架状态（1：上架）"
                          width="100"
                          field="marketStatus">
          <template v-slot:default="{row}">
            {{row.marketStatus}}
          </template>
        </vxe-table-column>
      </vxe-table>
    </vxe-modal>
  </div>
</template>
<script>
import VXETable from 'vxe-table'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import * as XLSX from 'xlsx'
import _ from 'lodash'

VXETable.use(VXETablePluginExportXLSX)
export default {
  data() {
    return {
      postSize: '1',
      postPage: '1',
      List: [],
      tableFormTitle: ['名称', '商品编号', '价格', '净含量', '库存量'],
      token: '',
      tableForm: [],
      showEdit: false,
      submitLoading: false,
      tableImport: {
        // 自定义类型
        types: ['xlsx'],
      },
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
      },
    }
  },
  methods: {
    //请求token数据
    postToken() {
      this.$axios
        .post('http://api1.super-gift.com.cn:9999/v1/token/getToken', {
          appKey: 'K2022060713561748',
          appSecret: 'test123456',
          clientId: '1534051483543187457',
        })
        .then((res) => {
          this.token = res.data.data.token
          VXETable.modal.message({
            content: '请求token成功',
            status: 'success',
          })
        })
        .catch((err) => {
          VXETable.modal.message({
            content: '请求token失败',
            status: 'warning',
          })
        })
    },
    //请求数据
    postClient() {
      //   const axios = this.$axios.create({
      //     headers: { accessToken: this.token },
      //   })
      this.$axios.defaults.headers['accessToken'] = this.token
      this.$axios
        .post('http://api1.super-gift.com.cn:9999/mall/product/getSkuList', {
          //   size: this.postSize, //页个数，默认为50
          //   page: this.postPage, //页码，从1开始
          size: this.postSize, //页个数，默认为50
          page: this.postPage, //页码，从1开始
        })
        .then((res) => {
          if (this.postSize == '1') {
            this.postSize = res.data.data.total
          } else {
            this.List = [...this.List, ...res.data.data.list]
            this.tableForm = [...this.tableForm, ...res.data.data.list]
            this.postPage++
          }
          if (res.data.data.list.length > 0) this.postClient()
        })
        .catch((err) => {
          console.log(err, 'err')
        })
    },
    //选择折扣
    discount(v1, v2) {
      this.tableForm = this.List.filter((item) => {
        return (
          item.marketPrice / item.price > v1 &&
          item.marketPrice / item.price <= v2
        )
      })
    },
    //导出
    derived() {
      this.showEdit = true
    },
    //高级导出
    exportDataEvent() {
      function checkNumber(theObj) {
        var reg = /^[0-9]+.?[0-9]*$/
        if (reg.test(theObj)) {
          return true
        }
        return false
      }
      let from = _.cloneDeep(this.tableForm)
      //之前字符串过大会转成另外的格式，需要点击才能看到全部数字
      //所以给纯数字字符串加个符号或者空格解决
      //   from.some((item) => {
      //     for (let key in item) {
      //       if (checkNumber(item[key])) {
      //         item[key] = "/" + item[key]
      //       } else {
      //         console.log(item[key])
      //       }
      //     }
      //   })
      this.$refs.xTable.openExport({
        data: from,
      })
    },
    exportSelectEvent() {
      this.$refs.xTable1.exportData({
        data: this.$refs.xTable.getCheckboxRecords(),
      })
      this.showEdit = false
    },
    //excel导出
    openExportEvent() {
      let i = 1
      let arr = [['序号', '名称', '商品编号', '价格', '净含量', '库存量']]
      this.tableForm.forEach((item) => {
        const o = [
          i,
          item.productName,
          item.skuCode,
          item.price,
          item.specName,
          item.stockNum,
        ]
        i += 1
        arr.push(o)
      })
      var _data = [
        ['id', 'name', 'value'],

        [1, 'sheetjs', 7262],

        [2, 'js-xlsx', 6969],
      ]
      const ws = XLSX.utils.aoa_to_sheet(arr)

      /* generate workbook and add the worksheet */
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'xls')

      /* save to file */
      XLSX.writeFile(wb, 'SheetJS.xlsx')
    },
  },
}
</script>
<style>
.picture {
  float: left;
  width: 50%;
}
</style>
