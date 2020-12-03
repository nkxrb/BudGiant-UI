<template>
  <div style="line-height: 12px;text-align: left;">
    <el-upload :auto-upload="autoUpload" :action="url" :headers="headers" :list-type="type" :limit="limit" :file-list="fileList" :on-success="uploadSuccess"
               :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :on-exceed="exceed">
      <i v-if="type==='picture-card'" class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" modal-append-to-body append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div slot="tip" class="el-upload__tip" v-if="isError" style="line-height: 2px;color: red">{{errorMsg}}</div>
    <div slot="tip" class="el-upload__tip" style="line-height: 10px;color: #a9a9a9"><span v-if="tips">{{tips}}</span><span>不超过{{maxsize}}KB</span></div>
  </div>
</template>
<script>
import { Dialog, Upload } from 'element-ui'
import Vue from 'vue'

Vue.use(Upload).use(Dialog)
export default {
  name: 'EasyUploadImage',
  props: {
    imgListStr: { type: String },
    autoUpload: { type: Boolean, default: true },
    url: { type: String, default: '/file/uploadImage' },
    type: { type: String, default: 'picture-card' },
    limit: { type: Number, default: 1 },
    tips: { type: String },
    maxsize: { type: Number, default: 100 }
  },
  data: function () {
    return {
      updateItems: {},
      fileUrlArr: [],
      isError: false,
      errorMsg: '',
      headers: { token: localStorage.getItem('123') },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    fileList: function () {
      if (this.imgListStr) {
        const newImgArr = []
        const imgArr = this.imgListStr.split(',')
        for (let i = 0; i < imgArr.length; i++) {
          const imgUrl = imgArr[i]
          if (imgUrl) {
            const img = { url: imgUrl }
            newImgArr.push(img)
          }
        }
        return newImgArr
      } else {
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
      let removeUrl = file.url
      if (file.response && file.response.rows && file.response.rows[0]) {
        removeUrl = file.response.rows[0].url
      }
      if (this.fileUrlArr.indexOf(removeUrl) > -1) {
        this.fileUrlArr.splice(this.fileUrlArr.indexOf(removeUrl), 1)
        this.$emit('valueChanged', this.fileUrlArr.join(','))
      }
    },
    uploadSuccess (res, file, fileList) {
      if (res.rows && res.rows[0]) {
        this.fileUrlArr.push(res.rows[0].url)
        this.$emit('valueChanged', this.fileUrlArr.join(','))
      } else {
        this.$message.warning(res.msg)
      }
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
    imgListStr: function (newV, oldV) {
      if (newV) {
        this.fileUrlArr = newV.split(',')
      } else {
        this.fileUrlArr = []
      }
      if (newV && newV.split(',').length === this.limit) {
        this.$children[0].$children[1].$el.style.display = 'none'
      } else {
        this.$children[0].$children[1].$el.style.display = 'inline-block'
      }
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
