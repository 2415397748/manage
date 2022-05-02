<template>
  <el-main>
    <el-row style="text-align: left">
      <el-input placeholder="表格数据搜索"
                class="searchIput"
                v-model="searchIput"></el-input>
      <el-button icon="el-icon-search"
                 type="info"
                 class="search"
                 @click="searchForm()"></el-button>
      <el-button type="primary"
                 icon="el-icon-circle-plus">搜索</el-button>
      <el-button type="danger"
                 icon="el-icon-circle-plus">删除</el-button>
      <el-dropdown trigger="click">
        <el-button type="primary"
                   icon="el-icon-circle-plus">新增信息</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,key) in addedData">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
    <el-table :data="list"
              style="width: 100%"
              border
              ref="listData"
              @select="handleSelection"
              max-height="500">
      <el-table-column type="selection"></el-table-column>
      <el-table-column :label="tables[0]"
                       center
                       type="index"
                       width="100"></el-table-column>
      <el-table-column :label="tables[1]"
                       width="180"
                       sortable
                       :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                       prop="date">
        <template slot-scope="label">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ label.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tables[2]"
                       width="180"
                       sortable
                       prop="name">
        <template slot-scope="label">
          <span style="margin-left: 10px">{{ label.row.name }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="tables[3]"
                       width="400"
                       sortable
                       prop="address">
        <template slot-scope="label">
          <span style="margin-left: 10px">{{ label.row.address }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="tables[4]"
                       width="250"
                       sortable
                       prop="phone">
        <template slot-scope="label">
          <span style="margin-left: 10px">{{ label.row.phone }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="tables[5] "
                       width="150"
                       sortableprop="state">
        <template slot-scope="label">
          <el-switch style="display: block"
                     v-model="label.row.state"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     disabled
                     active-text="true"
                     inactive-text="false">
          </el-switch>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       min-width="200px">
        <template slot-scope="label">
          <el-button size="mini"
                     @click="handleEdit(label.$index, label.row)"
                     :loading="loading">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(label.$index, label.row)">删除</el-button>
        </template>
        <el-button size="mini"
                   type="primary"
                   icon="el-icon-location"></el-button>
      </el-table-column>

    </el-table>
    <el-drawer title="信息编辑 !"
               :before-close="handleClose"
               :visible.sync="dialog"
               direction="rtl"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="from">
          <el-form-item :label="tables[i]"
                        :label-width="formLabelWidth"
                        v-for="(item, index,i) in from"
                        v-if=" index !='state' && index !='date' && index !='id'">
            <el-input v-model="from[index]"></el-input>
            <!-- {{item}} -->
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary"
                     @click="$refs.drawer.closeDrawer()"
                     :loading="loading">
            {{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </el-main>
</template>

<script>
export default {
  name: 'userslist',
  data() {
    return {
      from: {
        id: '',
        date: '',
        name: '',
        address: '',
        phone: '',
        state: '',
      },
      tables: ['序号', '日期', '姓名', '地址', '电话', '在线状态'],
      tableData: [
        {
          id: '1',
          date: '2022-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1511 弄',
          phone: '17610141452',
          state: true,
        },
        {
          id: '2',
          date: '2022-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄',
          phone: '17610141526',
          state: true,
        },
        {
          id: '3',
          date: '2022-05-04',
          name: '李四',
          address: '上海市普陀区金沙江路 1515 弄',
          phone: '17610145478',
          state: true,
        },
        {
          id: '4',
          date: '2022-05-05',
          name: '王五',
          address: '上海市普陀区金沙江路 1516 弄',
          phone: '151457584787',
          state: false,
        },
        {
          id: '5',
          date: '2022-05-04',
          name: '林坤',
          address: '南昌市华建区小姑路 120 栋',
          phone: '13145714782',
          state: false,
        },
        {
          id: '6',
          date: '2022-05-04',
          name: '张三封',
          address: '南昌市华建区小姑路 151 栋',
          phone: '14569853742',
          state: false,
        },
        {
          id: '7',
          date: '2022-05-04',
          name: '李静',
          address: '上海市普陀区金沙江路 1518 弄',
          phone: '17610141452',
          state: true,
        },
      ],
      addedData: ['增加数据1', '增加数据2', '增加数据3'],
      searchIput: '',
      searchData: '',
      dialog: false,
      loading: false,
      formLabelWidth: '80px',
      timer: null,
    }
  },
  methods: {
    //删除表格列
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    },
    //表格列数据编辑
    handleEdit(index, row) {
      //console.log(row);
      this.dialog = true
      //直接引用
      //this.from = row;
      //深拷贝
      this.from = Object.assign({}, row)
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then((_) => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 1000)
          this.tableData[this.from.id - 1] = this.from
        })
        .catch((_) => {})
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    handleSelection(selection, row) {
      //   console.log(row)
      //   console.log(selection)
    },
    searchForm() {
      this.searchData = this.searchIput
    },
  },
  computed: {
    //计算属性,表格全局搜索
    list() {
      const filterName = this.searchData.trim().toLowerCase()
      let table = this.$refs.listData
      const filterRE = new RegExp(filterName, 'gi')
      const searchProps = ['name', 'date', 'address', 'phone']
      let rest = this.tableData
      rest = []
      this.tableData.forEach((item) => {
        searchProps.some((val) => {
          if (item[val].indexOf(filterName) > -1) {
            return rest.push(item)
          }
        })
      })
      return rest
    },
  },
}
</script>

<style>
.searchIput {
  width: 20%;
  /* 上右下左 */
  padding: 0 1.25rem 0.625rem 1.25rem;
}
.search {
  position: absolute;
  /* calc简单计算像素 */
  right: calc(80% - 1.25rem);
}

tr {
  color: #000000;
}
.el-table th {
  font-size: 1rem;
  color: #409eff;
}

.el-table th i {
  /* background-color: #000000;
		display: inline-block;
		font-size: 1.25rem; */
}
</style>
