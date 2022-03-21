<template>
	<div class="home">
		<el-container style="height: 100%; border: 1px solid #eee">
			<el-aside width="300px" style="background-color: rgb(238, 241, 246)"  draggable>
				<el-menu><img src="../img/logo.png" style="font-size: 1.25rem;"></el-menu>
				<!-- default-openeds默认展开 -->
				<el-menu :default-openeds="[]">
		 		<el-submenu index="1">
						<template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
						<el-menu-item-group>
							<el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
		 		<el-submenu index="2">
						<template slot="title"><i class="el-icon-setting"></i>权限管理</template>
						<el-menu-item-group>
							<el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
							<el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
						<el-menu-item-group>
							<el-menu-item index="3-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
							<el-menu-item index="3-2"><i class="el-icon-menu"></i>分类管理</el-menu-item>
							<el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
						<el-menu-item-group>
							<el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-s-platform"></i>数据统计</template>
						<el-menu-item-group>
			 			<el-menu-item index="5-1"><i class="el-icon-menu"></i>数据列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header class="toubu" style="text-align: right; background-color: #b3c0d1;">
					<el-dropdown>
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item><el-button type="text" @click="handleLogout">退出登录</el-button></el-dropdown-item>
						</el-dropdown-menu>
		 		</el-dropdown>
				</el-header>
				<el-main>
					<template>
						<el-table :data="tableData" style="width: 100%" border max-height="500" prop="date">
							 <el-table-column label="序号" type="index" width="100">
							     </el-table-column>
							<el-table-column label="日期" width="180" sortable>
								<template slot-scope="label">
									<i class="el-icon-time"></i>
									<span style="margin-left: 10px">{{ label.row.date }}</span>
								</template>
							</el-table-column>
							<el-table-column label="姓名" width="180" sortable>
								<template slot-scope="label">
									<span style="margin-left: 10px">{{ label.row.name }}</span>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="地址" width="400" sortable>
								<template slot-scope="label">
									<span style="margin-left: 10px">{{ label.row.address }}</span>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="在线状态" width="280" sortable>
								<template slot-scope="label">
									<el-switch
									  style="display: block"
									  v-model="label.row.state"
									  active-color="#13ce66"
									  inactive-color="#ff4949">
									</el-switch>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="电话" width="280" sortable>
								<template slot-scope="label">
									<span style="margin-left: 10px">{{ label.row.phone }}</span>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="操作" fixed="right" min-width="200px">
								<template slot-scope="label">
									<el-button size="mini" @click="handleEdit(label.$index, label.row)">编辑</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(tableData.splice(label.$index,1))">
										删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	export default {
		data() {
			// const item = {
			//   date: '2016-05-02',
			//   name: '王小虎',
			//   address: '上海市普陀区金沙江路 1518 弄'
			// };
			return {
				// tableData: Array(20).fill(item)
				tableData: [{
						date: '2022-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '17610141452',
						state: true,
					},
					{
						date: '2022-05-03',
						name: '张三',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '17610141452',
						state: true,
					},
					{
						date: '2022-05-04',
						name: '李四',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '17610141452',
						state: true,
					},
					{
					 date: '2022-05-05',
						name: '王五',
					 address: '上海市普陀区金沙江路 1518 弄',
						phone: '17610141452',
						state: false,
					},{
						date: '2022-05-04',
						name: '李四',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '17610141452',
						state: false,
					},
					{
						date: '2022-05-04',
						name: '李四',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '17610141452',
						state: false,
					},
					{
						date: '2022-05-04',
						name: '李四',
						address: '上海市普陀区金沙江路 1518 弄',
						phone: '17610141452',
						state: true,
					},
				]
			}

		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleLogout () {
				this.$store.dispatch('logout')
				this.$router.go(0)
			}
		}
	}
</script>
<style>
	html,
	body {
		box-sizing: border-box;
	}

	body {
		min-width: 800px;
		overflow-y: hidden;
		overflow-x: auto;
		/*max-width:100%;*/
	}

	.home {
		/* 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。怪异盒子 */
		width: 100%;
		height: 100%;
	}

	.el-header {
		height: 60px;
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
	
	.el-header i {
		line-height: 60px;
		font-size: 30px;
	}
	

	.el-aside {
		background-color: #333;
	}

	.el-footer,
	.el-header {
		color: #333;
		line-height: 60px;
	}

</style>
