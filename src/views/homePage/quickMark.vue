<template>
  <div>
    <a-form :layout="formLayout"
            style="text-align: center;padding:20px 10%">
      <!-- <a-form-item label="表单布局"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-radio-group default-value="horizontal"
                       @change="handleFormLayoutChange">
          <a-radio-button value="horizontal">
            居中
          </a-radio-button>
          <a-radio-button value="vertical">
            垂直
          </a-radio-button>
          <a-radio-button value="inline">
            行内
          </a-radio-button>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item label="店铺名称"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input placeholder="请输入店铺名称" />
      </a-form-item>
      <a-form-item label="店铺描述"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input placeholder="请输入店铺描述" />
      </a-form-item>
      <a-divider />
      <a-form-item :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  :file-list="fileList"
                  @preview="handlePreview"
                  @change="handleChange">
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible"
                 :footer="null"
                 @cancel="handleCancel">
          <img alt="example"
               style="width: 100%"
               :src="previewImage" />
        </a-modal>
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  data() {
    return {
      formLayout: 'horizontal',
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {}
    },
  },
  methods: {
    //改变布局方法
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
  },
}
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

div >>> .ant-form .ant-upload-list-item-info::before {
  left: 0;
}
</style>