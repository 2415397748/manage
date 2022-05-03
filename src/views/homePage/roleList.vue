<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus"
                    @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="clearDataEvent">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
        <vxe-button @click="importDataEvent">导入数据</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table highlight-hover-row
               ref="xTable"
               height="400"
               :export-config="{}"
               :data="tableData">
      <vxe-table-column type="seq"
                        width="60"></vxe-table-column>
      <vxe-table-column field="name"
                        title="Name"></vxe-table-column>
      <vxe-table-column field="sex"
                        title="Sex"
                        :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age"
                        title="Age"
                        sortable></vxe-table-column>
      <vxe-table-column field="address"
                        title="Address"
                        show-overflow></vxe-table-column>
    </vxe-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: 'Test1',
          role: 'Develop',
          sex: '0',
          age: 28,
          address: 'test abc',
        },
        {
          id: 10002,
          name: 'Test2',
          role: 'Test',
          sex: '1',
          age: 22,
          address: 'Guangzhou',
        },
        {
          id: 10003,
          name: 'Test3',
          role: 'PM',
          sex: '1',
          age: 32,
          address: 'Shanghai',
        },
        {
          id: 10004,
          name: 'Test4',
          role: 'Designer',
          sex: '0',
          age: 23,
          address: 'test abc',
        },
        {
          id: 10005,
          name: 'Test5',
          role: 'Develop',
          sex: '0',
          age: 30,
          address: 'Shanghai',
        },
        {
          id: 10006,
          name: 'Test6',
          role: 'Designer',
          sex: '0',
          age: 21,
          address: 'test abc',
        },
        {
          id: 10007,
          name: 'Test7',
          role: 'Test',
          sex: '1',
          age: 29,
          address: 'test abc',
        },
        {
          id: 10008,
          name: 'Test8',
          role: 'Develop',
          sex: '1',
          age: 35,
          address: 'test abc',
        },
      ],
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' },
      ],
    }
  },
  methods: {
    formatterSex({ cellValue }) {
      const item = this.sexList.find((item) => item.value === cellValue)
      return item ? item.label : ''
    },
    clearDataEvent() {
      this.tableData = []
    },
    exportDataEvent() {
      this.$refs.xTable.openExport({
        // 默认勾选源
        original: true,
      })
    },
    importDataEvent() {
      this.$refs.xTable.importData()
    },
  },
}
</script>
<style scoped>
</style>