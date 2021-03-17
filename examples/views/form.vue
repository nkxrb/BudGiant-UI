<template>
  <div>
    <button @click="showForm">表单弹窗</button>
    <nk-form title="弹窗标题" :visible.sync="visible" :fields="fields" :data="data" @submit="submit" @select-change="selectChange"></nk-form>
  </div>
</template>

<script>
// import Vue from 'vue'
import NkForm from '../../packages/form/NkForm'

// Vue.use(NkForm)

export default {
  components: { NkForm },
  data () {
    return {
      visible: false,
      data: {},
      fields: [
        { prop: 'switch', label: '开关', type: 'switch' },
        { prop: 'password', label: '密码', type: 'password' },
        { prop: 'idCard', label: '身份证', type: 'input', rules: ['required', 'idcard'] },
        { prop: 'remoteselect', label: '搜索选择', type: 'remoteselect', search: this.search },
        { prop: 'inputNumber', label: '数字输入', type: 'inputNumber', rules: ['required', 'pfloat'] },
        { prop: 'password', label: '密码', type: 'password' },
        { prop: 'name', label: '普通输入框+校验', type: 'input', rules: ['required'] },
        {
          prop: 'radio',
          label: '单选框',
          type: 'radio',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ]
        },
        {
          prop: 'select',
          label: '普通下拉选',
          type: 'select',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ]
        },
        { prop: 'provinceId', span: 8, label: '所属省份', type: 'select', options: this.getProvinces, clear: 'cityId,countryId' },
        { prop: 'cityId', span: 8, label: '所属城市', type: 'select', options: this.getCitys, filter: 'provinceId', clear: 'countryId' },
        { prop: 'countryId', span: 8, label: '所属区域', type: 'select', options: this.getCountys, filter: 'cityId' },
        {
          prop: 'multiselect',
          label: '多选下拉选',
          type: 'multiselect',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
            { label: '选项4', value: 4 }
          ]
        },
        {
          prop: 'seltree',
          label: '多层级下拉选',
          type: 'seltree',
          options: [
            { label: '选项1', value: 1 },
            {
              label: '选项2',
              value: 2,
              children: [
                { label: '选项2-1', value: 21 }
              ]
            }
          ]
        },
        { prop: 'address', label: '输入地址(地图会自动响应并返回经纬度)', type: 'input', span: 24 },
        { prop: 'latitude', label: '纬度(禁止编辑，数据由下面的地图中获取)', type: 'input', disabled: true },
        { prop: 'longitude', label: '经度(禁止编辑，数据由下面的地图中获取)', type: 'input', disabled: true },
        { prop: 'map', label: '地图', span: 24, type: 'map', lat: 'latitude', lng: 'longitude', address: 'address' },
        {
          prop: 'date',
          label: '日期',
          type: 'date',
          span: 12,
          rules: [
            // function (rule, value, callback) { /** 自定义校验规则**/ }
          ]
        },
        { prop: 'time', label: '时间（可指定范围）', range: '00:00:00 - 23:59:59', type: 'time', span: 12 },
        { prop: 'image', label: '上传图片', type: 'image', span: 12, limit: 1, httpRequest: this.upload, maxsize: 500, rules: ['required'] },
        { prop: 'editor', label: '富文本编辑器', type: 'editor', span: 24 }
      ]
    }
  },
  methods: {
    submit (item) {
      // 此处进行表单提交
      console.log('submit-item', item)
    },
    showForm () {
      this.data = {
        provinceId: 110000,
        multiselect: '3,2,4'
        // countyId: 0
      }
      this.visible = true
    },
    upload (file) {
      return new Promise((resolve, reject) => {
        const res = { url: '/essss.png' }
        resolve(res)
      })
    },
    selectChange (value, field, formData) {
      debugger
    },
    getProvinces () {
      return new Promise((resolve, reject) => {
        const result = this.$network.post('/dict/getProvince', {}).then(res => {
          return res.data.map(item => ({ label: item.name, value: item.id }))
        })
        resolve(result)
      })
    },
    getCitys (provinceId) {
      return new Promise((resolve, reject) => {
        const result = this.$network.post(`/dict/getCity?provinceId=${provinceId || ''}`, {}).then(res => {
          return res.data.map(item => ({ label: item.name, value: item.id }))
        })
        resolve(result)
      })
    },
    getCountys (cityId) {
      return new Promise((resolve, reject) => {
        const result = this.$network.post(`/dict/getCounty?cityId=${cityId || ''}`, {}).then(res => {
          if (res.data && res.data.length > 0) {
            return res.data.map(item => ({ label: item.name, value: item.id }))
          } else {
            return []
          }
        })
        resolve(result)
      })
    },
    search (query, cb) {
      const arr = [
        { value: '1237' },
        { value: '1236' },
        { value: '1235' },
        { value: '1234' },
        { value: '1238' }
      ]

      const res = arr.filter(item => {
        return item.value.indexOf(query) > -1
      })

      cb(res)
    }
  }
}
</script>
