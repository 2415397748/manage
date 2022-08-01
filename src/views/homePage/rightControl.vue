<template>
  <div style="text-align: left">
    <!-- 上方搜索以及查询新增 -->
    <vxe-toolbar style="padding: 1rem 2rem;"
                 import
                 export
                 print
                 :refresh="{query:getTable}"
                 custom>
      <template v-slot:buttons>
        <el-input placeholder="表格数据搜索"
                  class="searchInput"
                  style="width: 25%"
                  v-model="searchInput"></el-input>
        <el-button icon="el-icon-search"
                   type="info"
                   class="search"
                   @click="searchForm"
                   style="position: absolute; right: calc(75% + 2.5rem)"></el-button>
        <vxe-button status="primary"
                    @click="getTable"
                    style="height: 40px;margin-left:1rem">查询数据库</vxe-button>
        <vxe-button status="danger"
                    @click="insertEvent()"
                    style="height: 40px">新增数据</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table highlight-hover-row
               ref="xTable"
               border
               resizable
               row-key
               id="xTable"
               highlight-current-row
               style="margin: 0 2rem"
               max-height="500"
               :import-config="tableImport"
               :export-config="tableExport"
               :custom-config="{storage: true}"
               :print-config="{}"
               :data="list.slice((currentPage - 1) * pageSize,currentPage * pageSize)">
      <vxe-table-column type="checkbox"
                        align="center"
                        width="50"></vxe-table-column>
      <vxe-table-column type="seq"
                        align="center"
                        title="序号"
                        width="60"></vxe-table-column>
      <vxe-table-column field="name"
                        align="center"
                        width="150"
                        :filters="[{data: {vals: [], sVal: ''}}]"
                        :filter-render="{name: 'FilterContent',props:{options:[1]}}"
                        title="姓名">
      </vxe-table-column>
      <vxe-table-column field="phone"
                        width="200"
                        align="center"
                        title="联系电话"
                        sortable>
        <template v-slot:default="{row}">
          <span>{{row.phone}}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="describe"
                        width="380"
                        align="center"
                        title="描述"></vxe-table-column>
      <vxe-table-column field="address"
                        width="150"
                        align="center"
                        title="地址"></vxe-table-column>
      <vxe-table-column field="data"
                        width="150"
                        align="center"
                        title="创建日期"></vxe-table-column>
      <vxe-table-column field="jurisdiction"
                        align="center"
                        width="150"
                        title="权限"></vxe-table-column>
      <vxe-table-column title="操作"
                        align="center"
                        fixed=right
                        width="250"
                        show-overflow>
        <template v-slot:default="{ row }">
          <a-button icon="edit"
                    type="primary"
                    @click="editEvent(row)">编辑</a-button>
          <a-button icon="rest"
                    style="margin-left: 10px"
                    type="danger"
                    @click="deleteColumns(row)">删除</a-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-pager style="margin:2rem 2rem"
               @page-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[5, 10, 20, 50, 100]"
               :page-size="pageSize"
               background
               :layouts="layouts"
               :total="tableData.length">
      <template v-slot:left
                @click="batchDelete()">
        <vxe-button size="small">
          <template #default>更多操作</template>
          <template #dropdowns>
            <vxe-button type="text"
                        @click="batchDelete()">批量修改</vxe-button>
            <vxe-button type="text">批量管理</vxe-button>
            <vxe-button type="text">批量删除</vxe-button>
          </template>
        </vxe-button>
      </template>
    </vxe-pager>
    <vxe-modal v-model="showEdit"
               :title="formData.id ? '编辑' : '新增'"
               width="800"
               min-width="600"
               min-height="300"
               :loading="submitLoading"
               resize
               lock-view
               :esc-closable="true"
               :show-zoom="true"
               destroy-on-close>
      <template v-slot>
        <vxe-form :data="formData"
                  width="800"
                  :items="formItems"
                  title-align="right"
                  title-width="100"
                  @submit="submitEvent">
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>
<script>
import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
//导出vxe-table导出XLSX第三方库
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
VXETable.use(VXETablePluginExportXLSX)

// 创建一个支持列内容的筛选
VXETable.renderer.add('FilterContent', {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter(h, renderOpts, params) {
    return [<filter-content params={params}></filter-content>]
  },
  // 重置数据方法
  filterResetMethod({ options }) {
    options.forEach((option) => {
      option.data = { vals: [], sVal: '' }
    })
  },
  // 筛选数据方法
  filterMethod({ option, row, column }) {
    const { vals } = option.data
    const cellValue = row[column.property]
    return vals.includes(cellValue)
  },
})

export default {
  name: 'roleList',
  data() {
    return {
      searchInput: '',
      tableData: [
        {
          id: 10001,
          name: '张三',
          phone: 12312321355,
          sex: 23,
          describe: '所有权限都可以使用',
          address: '上海',
          data: '2021/10/21',
          jurisdiction: '超级管理员',
        },
        {
          id: 10002,
          name: '李四',
          phone: 4354353451,
          sex: 23,
          describe: '拥有权限，但是不可以管理他人权限',
          address: '重庆',
          data: '2021/1/21',
          jurisdiction: '管理员',
        },
        {
          id: 10003,
          name: '李浩瀚',
          phone: 677972312312,
          sex: 23,
          address: '广州',
          describe: '拥有所有功能的使用权限',
          data: '2018/2/21',
          jurisdiction: '运营人员',
        },
        {
          id: 10002,
          name: '李四',
          phone: 4354353451,
          sex: 23,
          describe: '拥有权限，但是不可以管理他人权限',
          address: '重庆',
          data: '2021/1/21',
          jurisdiction: '管理员',
        },
        {
          id: 10003,
          name: '李浩瀚',
          phone: 677972312312,
          sex: 23,
          address: '广州',
          describe: '拥有所有功能的使用权限',
          data: '2018/2/21',
          jurisdiction: '运营人员',
        },
        {
          id: 10005,
          name: '李魂魂',
          phone: 3243456767867,
          sex: 23,
          address: '湖南',
          describe: '只有前端页面的权限',
          data: '2022/4/21',
          jurisdiction: '推广人员',
        },
        {
          id: 10002,
          name: '李四',
          phone: 4354353451,
          sex: 23,
          describe: '拥有权限，但是不可以管理他人权限',
          address: '重庆',
          data: '2021/1/21',
          jurisdiction: '管理员',
        },
        {
          id: 10003,
          name: '李浩瀚',
          phone: 677972312312,
          sex: 23,
          address: '广州',
          describe: '拥有所有功能的使用权限',
          data: '2018/2/21',
          jurisdiction: '运营人员',
        },
        {
          id: 10006,
          name: '肖栗子',
          phone: 4365767879789890,
          sex: 23,
          address: '江西',
          describe: '前端页面使用权限',
          data: '2021/2/11',
          jurisdiction: '使用者',
        },
        {
          id: 10001,
          name: '张三',
          phone: 12312321355,
          sex: 23,
          describe: '所有权限都可以使用',
          address: '上海',
          data: '2021/10/21',
          jurisdiction: '超级管理员',
        },
        {
          id: 10002,
          name: '李四',
          phone: 4354353451,
          sex: 23,
          describe: '拥有权限，但是不可以管理他人权限',
          address: '重庆',
          data: '2021/1/21',
          jurisdiction: '管理员',
        },
        {
          id: 10003,
          name: '李浩瀚',
          phone: 677972312312,
          sex: 23,
          address: '广州',
          describe: '拥有所有功能的使用权限',
          data: '2018/2/21',
          jurisdiction: '运营人员',
        },
        {
          id: 10002,
          name: '李四',
          phone: 4354353451,
          sex: 23,
          describe: '拥有权限，但是不可以管理他人权限',
          address: '重庆',
          data: '2021/1/21',
          jurisdiction: '管理员',
        },
        {
          id: 10003,
          name: '李浩瀚',
          phone: 677972312312,
          sex: 23,
          address: '广州',
          describe: '拥有所有功能的使用权限',
          data: '2018/2/21',
          jurisdiction: '运营人员',
        },
        {
          id: 10005,
          name: '李魂魂',
          phone: 3243456767867,
          sex: 23,
          address: '湖南',
          describe: '只有前端页面的权限',
          data: '2022/4/21',
          jurisdiction: '推广人员',
        },
        {
          id: 10006,
          name: '肖栗子',
          phone: 4365767879789890,
          sex: 23,
          address: '江西',
          describe: '前端页面使用权限',
          data: '2021/2/11',
          jurisdiction: '使用者',
        },
        {
          id: 10001,
          name: '张三',
          phone: 12312321355,
          sex: 23,
          describe: '所有权限都可以使用',
          address: '上海',
          data: '2021/10/21',
          jurisdiction: '超级管理员',
        },
        {
          id: 10002,
          name: '李四',
          phone: 4354353451,
          sex: 23,
          describe: '拥有权限，但是不可以管理他人权限',
          address: '重庆',
          data: '2021/1/21',
          jurisdiction: '管理员',
        },
        {
          id: 10003,
          name: '李浩瀚',
          phone: 677972312312,
          sex: 23,
          address: '广州',
          describe: '拥有所有功能的使用权限',
          data: '2018/2/21',
          jurisdiction: '运营人员',
        },
        {
          id: 10005,
          name: '李魂魂',
          phone: 3243456767867,
          sex: 23,
          address: '湖南',
          describe: '只有前端页面的权限',
          data: '2022/4/21',
          jurisdiction: '推广人员',
        },
        {
          id: 10006,
          name: '肖栗子',
          phone: 4365767879789890,
          sex: 23,
          address: '江西',
          describe: '前端页面使用权限',
          data: '2021/2/11',
          jurisdiction: '使用者',
        },
      ],
      tableImport: {
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
      },
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
      },
      currentPage: 1,
      pageSize: 10,
      layouts: [
        'PrevJump',
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'NextJump',
        'Sizes',
        'FullJump',
        'Total',
      ],
      formData: {},
      formItems: [
        {
          title: '基本信息',
          span: 24,
          titleAlign: 'left',
          titleWidth: 200,
          titlePrefix: { icon: 'vxe-icon--edit-outline' },
        },
        {
          field: 'name',
          title: '姓名',
          span: 12,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入名称' },
          },
        },
        {
          field: 'phone',
          title: '联系电话',
          span: 12,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入电话' },
          },
        },
        {
          field: 'sex',
          title: '年龄',
          span: 12,
          itemRender: {
            name: '$input',
            props: { type: 'number', placeholder: '请输入年龄' },
          },
        },
        {
          field: 'address',
          title: '地址',
          span: 12,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入描述' },
          },
        },
        {
          field: 'jurisdiction',
          title: '权限',
          span: 12,
          itemRender: {
            name: '$select',
            props: {
              placeholder: '分配权限',
              options: [
                { label: '超级管理员', value: '超级管理员' },
                { label: '管理员', value: '管理员' },
                { label: '运营人员', value: '运营人员' },
                { label: '推广人员', value: '推广人员' },
                { label: '使用者', value: '使用者' },
              ],
            },
          },
        },
        {
          field: 'data',
          title: '日期',
          span: 12,
          itemRender: {
            name: '$input',
            props: {
              type: 'date',
              placeholder: '请选择日期',
              dateConfig: {
                labelFormat: 'yyyy/MM/dd',
                valueFormat: 'yyyy/MM/dd',
              },
            },
          },
        },
        {
          field: 'describe',
          title: '描述',
          span: 24,
          titleSuffix: {
            message: '提示信息！！',
            icon: 'fa fa-question-circle',
          },
          itemRender: {
            name: '$textarea',
            props: {
              autosize: { minRows: 2, maxRows: 4 },
              placeholder: '请输入地址',
            },
          },
        },
        {
          align: 'center',
          span: 24,
          titleAlign: 'left',
          itemRender: {
            name: '$buttons',
            children: [
              {
                props: {
                  type: 'submit',
                  content: '提交',
                  status: 'primary',
                },
              },
              { props: { type: 'reset', content: '重置' } },
            ],
          },
        },
      ],
      selectRow: {},
      searchData: '',
      showEdit: false,
      submitLoading: false,
    }
  },
  methods: {
    //新增数据打开表单
    insertEvent() {
      const date = new Date()
      const currentTime = date.toLocaleDateString()
      this.formData = {
        name: '',
        phone: '',
        address: '',
        describe: '',
        data: currentTime,
        jurisdiction: '',
      }
      this.selectRow = null
      this.showEdit = true
    },
    //编辑数据打开表单
    editEvent(row) {
      //用keys来存储row的所有键值
      // const keys = Object.keys(row)
      this.formData = Object.assign({}, row)
      this.selectRow = row
      this.showEdit = true
    },
    //编辑表单提交事件
    submitEvent() {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          Object.assign(this.selectRow, this.formData)
          VXETable.modal.message({
            message: '编辑成功',
            status: 'success',
          })
        } else {
          this.tableData.unshift(this.formData)
          VXETable.modal.message({
            message: '新增成功',
            status: 'success',
          })
        }
      }, 500)
    },
    //列表搜索
    searchForm() {
      this.searchData = this.searchInput
    },
    //查询数据
    getTable() {
      this.searchData = ''
    },
    //删除表格列
    deleteColumns(row) {
      this.$XModal.message({
        message: '删除成功',
        status: 'success',
      })
      this.$refs.xTable.remove(row)
    },
    //当前页改变时触发 跳转其他页
    //每页条数改变时触发 选择一页显示多少行
    handleCurrentChange({ currentPage, pageSize }) {
      this.pageSize = pageSize
      this.currentPage = currentPage
    },
    //批量删除
    batchDelete() {
      let getCheckboxRecords = this.$refs.xTable.getCheckboxRecords()
    },
  },
  computed: {
    //计算属性,表格全局搜索
    list() {
      const filterName = this.searchData.trim().toLowerCase()
      if (filterName) {
        const searchProps = [
          'name',
          'time',
          'address',
          'phone',
          'sex',
          'describe',
          'data',
        ]
        const rest = this.tableData.filter((item) =>
          searchProps.some(
            (key) =>
              XEUtils.toValueString(item[key])
                .toLowerCase()
                .indexOf(filterName) > -1
          )
        )
        return rest
      }
      return this.tableData
    },
  },
  switch() {},
}
</script>
<style scoped lang="scss">
* {
  // position: relative
}
</style>
