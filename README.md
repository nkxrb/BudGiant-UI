# nkxrb-vue

#### 介绍
追求极简操作，用数据编写页面，减少人为失误操作，组件化，一次编写，多处使用

#### 软件架构
基于element-ui进行二次封装，专为后台管理系统打造的一款快速开发组件，更容易的列表、更简单的表单

#### 安装教程

1.  npm install nkxrb-vue  

#### 使用说明  

```html
简单表格弹窗demo演示

<template>
  <nk-form title="弹窗标题" :visible.sync="visible" :fields="fields" :data="data" @submit="submit"></nk-form>
</template>

<script>
export default {
  data(){
    return{
      fields: [
        { prop: 'switch', label: '开关', type: 'switch' },
        { prop: 'password', label: '密码', type: 'password' },
        { prop: 'inputNumber', label: '数字输入', type: 'inputNumber' },
        { prop: 'password', label: '密码', type: 'password' },
        { prop: 'name', label: '普通输入框+校验', type: 'input', rules: ['required','email','telephone'] },
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
        {
          prop: 'seltree',
          label: '多层级下拉选',
          type: 'seltree',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ]
        },
        { prop: 'address', label: '输入地址(地图会自动响应并返回经纬度)', type: 'input', span: 24 },
        { prop: 'latitude', label: '纬度(禁止编辑，数据由下面的地图中获取)', type: 'input', disabled: true },
        { prop: 'longitude', label: '经度(禁止编辑，数据由下面的地图中获取)', type: 'input', disabled: true },
        { prop: 'map', label: '地图', span: 24, type: 'map', lat: 'latitude', lng: 'longitude', address: 'address' },
        { prop: 'date', label: '日期', type: 'date', span: 12, 
            rules: [
              'required', 
              function(rule, value, callback){/**自定义校验规则**/}
            ] 
        },
        { prop: 'time', label: '时间（可指定范围）', range: '00:00:00 - 23:59:59', type: 'time', span: 12 },
        { prop: 'image', label: '上传图片', type: 'image', span: 12, limit:1,httpRequest:function(){/**自定义上传图片请求*/}, maxsize: 500},
        { prop: 'editor', label: '富文本编辑器', type: 'editor', span: 24 }
      ],
    }
  }
}
</script>



```

