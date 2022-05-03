<template>
  <el-main>
    <!-- 上方搜索以及查询新增 -->
    <el-row style="text-align: left">
      <el-input placeholder="表格数据搜索"
                class="searchIput"
                v-model="searchIput"></el-input>
      <el-button icon="el-icon-search"
                 type="info"
                 class="search"
                 @click="searchForm()"></el-button>
      <el-button type="primary"
                 @click="getTable">查询</el-button>
      <el-button type="danger"
                 @click="addingList">新增</el-button>
    </el-row>
    <!-- table表格 -->
    <el-table :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
              border
              :rules="rules"
              ref="listData"
              highlight-current-row
              @select="handleSelection"
              max-height="500">
      <el-table-column type="selection"
                       width="50"></el-table-column>
      <el-table-column :label="tables[0]"
                       center
                       type="index"
                       header-align="center"
                       width="100"></el-table-column>
      <el-table-column :label="tables[1]"
                       width="180"
                       sortable
                       header-align="center"
                       :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                       prop="name">
        <template slot-scope="label">
          <span style="margin-left: 10px">{{ label.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tables[2]"
                       width="250"
                       sortable
                       header-align="center"
                       prop="phone">
        <template slot-scope="label">
          <span style="margin-left: 10px">{{ label.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tables[3]"
                       width="400"
                       sortable
                       header-align="center"
                       prop="address">
        <template slot-scope="label">
          <span style="margin-left: 10px">{{ label.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tables[4] "
                       width="150"
                       header-align="center"
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
        </template>
      </el-table-column>
      <el-table-column :label="tables[5]"
                       width="200"
                       sortable
                       header-align="center"
                       prop="time">
        <template slot-scope="label">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ label.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       header-align="center"
                       min-width="250px">
        <template slot-scope="label">
          <el-button size="mini"
                     @click="handleEdit(label.$index, label.row)"
                     :loading="loading">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(label.$index, label.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align='center'
                   style="padding:20px 30px 0 0;text-align: right;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5,10,20,50,100]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length">
    </el-pagination>
    <!-- 编辑时打开的表格 -->
    <el-drawer title="信息编辑 !"
               :before-close="handleClose"
               :visible.sync="dialog"
               direction="rtl"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="form"
                 :rules="rules"
                 ref="editForm"
                 style="padding-top:0">
          <el-form-item :label="tables[i]"
                        :prop="Object.keys(form)[i]"
                        :label-width="formLabelWidth"
                        v-for="(item, index,i) in form"
                        v-if=" index !='state' && index !='id' && index !='time'">
            <el-input v-model="
                        form[index]"
                      @keydown.enter.native="submitForm(form)">
            </el-input>
          </el-form-item>
          <el-form-item label="日期"
                        prop="time"
                        style="margin-left:30px;text-align: left">
            <el-date-picker v-model="form['time']"
                            type="datetime"
                            value-format="yyyy/MM/dd HH:hh:mm"
                            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary"
                     @click="submitForm(form)"
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
    //编辑信息验证规则
    // 姓名自定义验证规则
    let verificationName = (rule, value, callback) => {
      // rule 对应使用bargainMoney自定义验证的 对象
      // value 对应使用bargainMoney自定义验证的 数值
      // callback 回调函数
      const verificationName = /^[\u4e00-\u9fa5]{2,4}$/
      // 要求：两到四位的名字
      if (value === null || value.trim() === '') {
        callback(new Error('不能为空'))
        return false
      } else if (!verificationName.test(value)) {
        callback(new Error('姓名长度错误'))
        return false
      } else {
        callback()
        return true
      }
    }
    // 手机号自定义验证规则
    let verificationPhone = (rule, value, callback) => {
      // rule 对应使用bargainMoney自定义验证的 对象
      // value 对应使用bargainMoney自定义验证的 数值
      // callback 回调函数
      const verificationPhone = /^[0-9]{11}$/
      // 要求：两到四位的名字
      if (value === null || value.trim() === '') {
        callback(new Error('不能为空'))
        return false
      } else if (!verificationPhone.test(value)) {
        callback(new Error('号码长度错误'))
        return false
      } else {
        callback()
        return true
      }
    }
    return {
      tableData: [
        {
          id: 1,
          name: '王小虎',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1511 弄',
          state: true,
          time: '2022/5/2 16:53:01',
        },
        {
          id: 2,
          name: '张三',
          phone: '17610141526',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/5/2 16:45:01',
        },
        {
          id: 3,
          name: '李四',
          phone: '17610145478',
          address: '上海市普陀区金沙江路 1515 弄',
          state: true,
          time: '2022/5/2 18:53:01',
        },
        {
          id: 4,
          name: '王五',
          phone: '151457584787',
          address: '上海市普陀区金沙江路 1516 弄',
          state: false,
          time: '2022/5/1 16:23:15',
        },
        {
          id: 5,
          name: '林坤',
          phone: '13145714782',
          address: '南昌市华建区小姑路 120 栋',
          state: false,
          time: '2022/4/2 12:23:31',
        },
        {
          id: 6,
          name: '张三封',
          phone: '14569853742',
          address: '南昌市华建区小姑路 151 栋',
          state: false,
          time: '2022/3/13 12:23:01',
        },
        {
          id: 7,
          name: '李静',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/2/2 12:14:01',
        },
        {
          id: 1,
          name: '王小虎',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1511 弄',
          state: true,
          time: '2022/5/2 16:53:01',
        },
        {
          id: 2,
          name: '张三',
          phone: '17610141526',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/5/2 16:45:01',
        },
        {
          id: 3,
          name: '李四',
          phone: '17610145478',
          address: '上海市普陀区金沙江路 1515 弄',
          state: true,
          time: '2022/5/2 18:53:01',
        },
        {
          id: 4,
          name: '王五',
          phone: '151457584787',
          address: '上海市普陀区金沙江路 1516 弄',
          state: false,
          time: '2022/5/1 16:23:15',
        },
        {
          id: 5,
          name: '林坤',
          phone: '13145714782',
          address: '南昌市华建区小姑路 120 栋',
          state: false,
          time: '2022/4/2 12:23:31',
        },
        {
          id: 6,
          name: '张三封',
          phone: '14569853742',
          address: '南昌市华建区小姑路 151 栋',
          state: false,
          time: '2022/3/13 12:23:01',
        },
        {
          id: 7,
          name: '李静',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/2/2 12:14:01',
        },
        {
          id: 1,
          name: '王小虎',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1511 弄',
          state: true,
          time: '2022/5/2 16:53:01',
        },
        {
          id: 2,
          name: '张三',
          phone: '17610141526',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/5/2 16:45:01',
        },
        {
          id: 3,
          name: '李四',
          phone: '17610145478',
          address: '上海市普陀区金沙江路 1515 弄',
          state: true,
          time: '2022/5/2 18:53:01',
        },
        {
          id: 4,
          name: '王五',
          phone: '151457584787',
          address: '上海市普陀区金沙江路 1516 弄',
          state: false,
          time: '2022/5/1 16:23:15',
        },
        {
          id: 5,
          name: '林坤',
          phone: '13145714782',
          address: '南昌市华建区小姑路 120 栋',
          state: false,
          time: '2022/4/2 12:23:31',
        },
        {
          id: 6,
          name: '张三封',
          phone: '14569853742',
          address: '南昌市华建区小姑路 151 栋',
          state: false,
          time: '2022/3/13 12:23:01',
        },
        {
          id: 7,
          name: '李静',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/2/2 12:14:01',
        },
        {
          id: 1,
          name: '王小虎',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1511 弄',
          state: true,
          time: '2022/5/2 16:53:01',
        },
        {
          id: 2,
          name: '张三',
          phone: '17610141526',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/5/2 16:45:01',
        },
        {
          id: 3,
          name: '李四',
          phone: '17610145478',
          address: '上海市普陀区金沙江路 1515 弄',
          state: true,
          time: '2022/5/2 18:53:01',
        },
        {
          id: 4,
          name: '王五',
          phone: '151457584787',
          address: '上海市普陀区金沙江路 1516 弄',
          state: false,
          time: '2022/5/1 16:23:15',
        },
        {
          id: 5,
          name: '林坤',
          phone: '13145714782',
          address: '南昌市华建区小姑路 120 栋',
          state: false,
          time: '2022/4/2 12:23:31',
        },
        {
          id: 6,
          name: '张三封',
          phone: '14569853742',
          address: '南昌市华建区小姑路 151 栋',
          state: false,
          time: '2022/3/13 12:23:01',
        },
        {
          id: 7,
          name: '李静',
          phone: '17610141452',
          address: '上海市普陀区金沙江路 1518 弄',
          state: true,
          time: '2022/2/2 12:14:01',
        },
      ],
      currentPage: 1,
      pageSize: 10,
      form: {}, //保存编辑的列数据
      tables: ['序号', '姓名', '手机号', '地址', '在线状态', '日期'],
      searchIput: '',
      searchData: '',
      dialog: false,
      loading: false,
      formLabelWidth: '80px',
      timer: null,
      rules: {
        name: [
          {
            validator: verificationName,
            required: true,
            trigger: 'blur',
          },
        ],
        phone: [
          {
            validator: verificationPhone,
            required: true,
            trigger: 'blur',
          },
        ],
        time: [
          {
            message: '日期是必须的',
            required: true,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    //查询数据
    getTable() {
      this.searchData = ''
    },
    //增加数据
    addingList() {
      const date = new Date()
      const currentTime = date.toLocaleString()
      this.tableData.unshift({
        id: this.tableData.length + 1,
        name: '',
        address: '',
        phone: '',
        state: true,
        time: currentTime,
      })
    },
    //删除表格列
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    },
    //表格列数据编辑
    handleEdit(index, row) {
      this.dialog = true
      //直接引用
      //this.form = row;
      //深拷贝
      this.form = Object.assign({}, row)
    },
    //点击提交编辑数据
    submitForm(form) {
      //   console.log(this.rules.name)
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //关闭抽屉和提交表单
          this.$refs.drawer.closeDrawer()
        } else {
          this.$message({
            message: '编辑失败,请检查是否有误',
            type: 'warning',
            duration: 2000,
            showClose: true,
            center: true,
          })
        }
      })
    },
    //关闭抽屉和提交表单时执行的方法
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
          this.tableData.forEach((item, index) => {
            if (item.id == this.form.id) {
              this.$set(this.tableData, index, this.form)
            }
          })
          this.$message({
            message: '编辑成功',
            type: 'success',
            duration: 2000,
            showClose: true,
            center: true,
          })
        })
        .catch((_) => {})
    },
    //编辑退出
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    //列选择
    handleSelection(selection, row) {
      //   console.log(row)
      //   console.log(selection)
    },
    //列表搜索
    searchForm() {
      this.searchData = this.searchIput
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
  computed: {
    //计算属性,表格全局搜索
    list() {
      const filterName = this.searchData.trim().toLowerCase()
      const searchProps = ['name', 'time', 'address', 'phone']
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

.el-table__body-wrapper::-webkit-scrollbar {
  width: 0;
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
