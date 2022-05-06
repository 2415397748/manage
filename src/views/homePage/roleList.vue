<template>
  <div>
    <vxe-table highlight-hover-row
               ref="xTable"
               border
               resizable
               row-key
               show-overflow
               highlight-hover-row
               style="margin:0 20px"
               :export-config="{}"
               :data="tableData">
      <vxe-table-column type="seq"
                        align="center"
                        width="60"></vxe-table-column>
      <vxe-table-column field="name"
                        align="center"
                        width="100"
                        title="姓名">
      </vxe-table-column>
      <vxe-table-column field="phone"
                        width="200"
                        align="center"
                        title="联系电话"
                        sortable></vxe-table-column>
      <vxe-table-column field="describe"
                        width="400"
                        align="center"
                        title="描述"></vxe-table-column>
      <vxe-table-column field="address"
                        width="150"
                        align="center"
                        title="地址"></vxe-table-column>
      <vxe-table-column field="jurisdiction"
                        align="center"
                        title="权限"></vxe-table-column>
      <vxe-table-column title="操作"
                        align="center"
                        min-width="200"
                        show-overflow>
        <template v-slot:default="{row}">
          <a-button icon="edit"
                    type="primary"
                    @click="editEvent(row)">
            编辑</a-button>
          <a-button icon="
                    setting"
                    style="margin-left:10px;background-color: rgba(211, 210, 54, 0.5);">
            权限分配</a-button>
          <a-button icon="rest"
                    style="margin-left:10px;"
                    type="danger">
            删除</a-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-modal v-model="showEdit"
               :title="selectRow ? '编辑&保存' : '新增&保存'"
               width="800"
               min-width="600"
               min-height="300"
               :loading="submitLoading"
               resize
               destroy-on-close>
      <template v-slot>
        <vxe-form :data="formData"
                  title-align="right"
                  title-width="100"
                  @submit="submitEvent()"></vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: '张三',
          phone: 12312321355,
          describe: '所有权限都可以使用',
          address: '上海',
          jurisdiction: '超级管理员',
        },
        {
          id: 10002,
          name: '李四',
          phone: 4354353451,
          describe: '拥有权限，但是不可以管理他人权限',
          address: '重庆',
          jurisdiction: '管理员',
        },
        {
          id: 10003,
          name: '李浩瀚',
          phone: 677972312312,
          address: '广州',
          describe: '拥有所有功能的使用权限',
          jurisdiction: '运营人员',
        },
        {
          id: 10005,
          name: '李魂魂',
          phone: 3243456767867,
          address: '湖南',
          describe: '只有前端页面的权限',
          jurisdiction: '推广人员',
        },
        {
          id: 10006,
          name: '肖栗子',
          phone: 4365767879789890,
          address: '江西',
          describe: '前端页面使用权限',
          jurisdiction: '使用者',
        },
      ],
      formData: {},
      selectRow: {},
      showEdit: '',
      submitLoading: false,
    }
  },
  methods: {
    editEvent(row) {
      this.formData = {
        name: row.name,
        phone: row.phone,
        address: row.address,
        describe: row.describe,
        jurisdiction: row.jurisdiction,
      }
      this.selectRow = row
      this.showEdit = true
    },
  },
  submitEvent() {
    this.submitLoading = true
    setTimeout(() => {
      this.submitLoading = false
      this.showEdit = false
      if (this.selectRow) {
        this.$XModal.message({ message: '保存成功', status: 'success' })
        Object.assign(this.selectRow, this.formData)
      } else {
        this.$XModal.message({ message: '新增成功', status: 'success' })
        this.$refs.xTable.insert(this.formData)
      }
    }, 500)
  },
}
</script>
<style scoped>
</style>