<template>
	<div>
		<vxe-toolbar>
			<template v-slot:buttons>
				<vxe-button icon="fa fa-plus" @click="insertEvent()"
					>新增</vxe-button
				>
			</template>
		</vxe-toolbar>
		<vxe-table
			highlight-hover-row
			ref="xTable"
			border
			resizable
			row-key
			highlight-current-row
			style="margin: 0 20px"
			:export-config="{}"
			:data="tableData"
		>
			<vxe-table-column
				type="seq"
				align="center"
				width="60"
			></vxe-table-column>
			<vxe-table-column
				field="name"
				align="center"
				width="100"
				title="姓名"
			>
			</vxe-table-column>
			<vxe-table-column
				field="phone"
				width="200"
				align="center"
				title="联系电话"
				sortable
			></vxe-table-column>
			<vxe-table-column
				field="describe"
				width="400"
				align="center"
				title="描述"
			></vxe-table-column>
			<vxe-table-column
				field="address"
				width="150"
				align="center"
				title="地址"
			></vxe-table-column>
			<vxe-table-column
				field="jurisdiction"
				align="center"
				title="权限"
			></vxe-table-column>
			<vxe-table-column
				title="操作"
				align="center"
				min-width="200"
				show-overflow
			>
				<template v-slot:default="{ row }">
					<a-button
						icon="edit"
						type="primary"
						@click="editEvent(row)"
					>
						编辑</a-button
					>
					<a-button
						icon="setting"
						style="
							margin-left: 10px;
							background-color: rgba(211, 210, 54, 0.5);
						"
					>
						权限分配</a-button
					>
					<a-button
						icon="rest"
						style="margin-left: 10px"
						type="danger"
					>
						删除</a-button
					>
				</template>
			</vxe-table-column>
		</vxe-table>
		<vxe-modal
			v-model="showEdit"
			:title="formData ? '编辑&保存' : '新增&保存'"
			width="800"
			min-width="600"
			min-height="300"
			:loading="submitLoading"
			resize
			lock-view
			:esc-closable="true"
			:show-zoom="true"
			destroy-on-close
		>
			<template v-slot>
				<vxe-form
					:data="formData"
					width="800"
					:items="formItems"
					title-align="right"
					title-width="100"
					@submit="submitEvent"
				>
				</vxe-form>
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
					sex: 23,
					describe: '所有权限都可以使用',
					address: '上海',
					jurisdiction: '超级管理员',
				},
				{
					id: 10002,
					name: '李四',
					phone: 4354353451,
					sex: 23,
					describe: '拥有权限，但是不可以管理他人权限',
					address: '重庆',
					jurisdiction: '管理员',
				},
				{
					id: 10003,
					name: '李浩瀚',
					phone: 677972312312,
					sex: 23,
					address: '广州',
					describe: '拥有所有功能的使用权限',
					jurisdiction: '运营人员',
				},
				{
					id: 10005,
					name: '李魂魂',
					phone: 3243456767867,
					sex: 23,
					address: '湖南',
					describe: '只有前端页面的权限',
					jurisdiction: '推广人员',
				},
				{
					id: 10006,
					name: '肖栗子',
					phone: 4365767879789890,
					sex: 23,
					address: '江西',
					describe: '前端页面使用权限',
					jurisdiction: '使用者',
				},
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
					field: 'describe',
					title: '描述',
					span: 12,
					itemRender: {
						name: '$input',
						props: { placeholder: '请输入描述' },
					},
				},
				{
					field: 'checkedList',
					title: '可选信息',
					span: 24,
					visibleMethod: this.visibleMethod,
					itemRender: {
						name: '$checkbox',
						options: [
							{ label: '运动、跑步', value: '1' },
							{ label: '听音乐', value: '2' },
							{ label: '泡妞', value: '3' },
							{ label: '吃美食', value: '4' },
						],
					},
				},
				{
					field: 'date3',
					title: 'Date',
					span: 12,
					itemRender: {
						name: '$input',
						props: { type: 'date', placeholder: '请选择日期' },
					},
				},
				{
					field: 'address',
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
			showEdit: false,
			submitLoading: false,
		}
	},
	methods: {
		//新增数据打开表单
		insertEvent() {
			this.formData = {
				name: '',
				phone: '',
				address: '',
				describe: '',
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
		//编辑表单处理事件
		submitEvent() {
			this.submitLoading = true
			setTimeout(() => {
				this.submitLoading = false
				this.showEdit = false
				if (this.selectRow) {
					this.$XModal.message({
						message: '保存成功',
						status: 'success',
					})
					Object.assign(this.selectRow, this.formData)
				} else {
					this.$XModal.message({
						message: '新增成功',
						status: 'success',
					})
					this.$refs.xTable.insert(this.formData)
				}
			}, 500)
		},
	},
}
</script>
<style scoped></style>
