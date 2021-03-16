<template>
  <div style="line-height: 12px;text-align: left;">
    <el-upload :file-list="fileList" :http-request="httpRequest" :on-success="uploadSuccess" :auto-upload="autoUpload" :list-type="type" :limit="limit" :action="'/upload'"
               :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :on-exceed="exceed" with-credentials>
      <i v-if="type==='picture-card'" class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" modal-append-to-body append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div slot="tip" class="el-upload__tip" v-if="isError" style="line-height: 2px;color: red">{{errorMsg}}</div>
    <div slot="tip" class="el-upload__tip" style="line-height: 10px;color: #a9a9a9"><span v-if="tips">{{tips}}</span><span>图片大小不超过{{maxsize}}KB</span></div>
  </div>
</template>
<script>
export default {
  name: 'EasyUploadImage',
  props: {
    value: { type: String },
    httpRequest: { type: Function },
    autoUpload: { type: Boolean, default: true },
    type: { type: String, default: 'picture-card' },
    limit: { type: Number, default: 1 },
    tips: { type: String },
    maxsize: { type: Number, default: 500 }
  },
  data: function () {
    return {
      isError: false,
      errorMsg: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    urlArr: {
      get: function () {
        return this.value ? this.value.split(';') : []
      },
      set: function (val) {
        this.$emit('input', val.join(';'))
        this.$emit('change', val.join(';'))
      }
    },
    fileList: {
      get: function () {
        if (this.value) {
          return this.value.split(';').map(item => ({
            url: item
          }))
        }
        return []
      }
    }
  },
  methods: {
    exceed () { // 文件超出个数限制时的钩子
      this.isError = true
      this.errorMsg = '最多可上传' + this.limit + '张图片!'
      this.$children[0].$children[1].$el.style.display = 'none'
    },
    handleRemove (file, fileList) {
      this.urlArr = fileList.map(item => item.url)
    },
    uploadSuccess (res, file, fileList) {
      // 将url替换成服务器对应的地址
      if (res && res.url) {
        file.url = res.url
      }
      this.urlArr = fileList.map(item => item.url)
    },
    beforeAvatarUpload (file) {
      const isImage = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
      const isLtMaxSize = file.size / 1024 < this.maxsize
      if (!isImage) {
        this.isError = true
        this.errorMsg = '只能上传jpg/jpeg/png文件'
        return false
      }
      if (!isLtMaxSize) {
        this.isError = true
        this.errorMsg = '上传文件大小不能超过' + this.maxsize + 'KB'
        return false
      }
      this.isError = false
      return (isImage) && isLtMaxSize
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  watch: {
    urlArr: {
      handler: function (newV) {
        // 判断是否达到限制个数
        this.$nextTick(() => {
          if (newV && newV.length >= this.limit) {
            this.$children[0].$children[1].$el.style.display = 'none'
          } else {
            this.$children[0].$children[1].$el.style.display = 'block'
          }
        })
      },
      immediate: true
    }
  }
}
</script>
<style>
  .el-upload-list--picture-card .el-upload-list__item {
    width: 75px;
    height: 75px;
  }

  .el-upload--picture-card {
    width: 75px;
    height: 75px;
    line-height: 86px;
    border-radius: 16px;
  }
</style>
