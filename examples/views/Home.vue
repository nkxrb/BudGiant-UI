<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <bud-upload-image></bud-upload-image>
    <!--<base-tab :title="'4567萨达萨达'"></base-tab>-->
    <!--<base-tool-btn :tool-btns="toolBtns"></base-tool-btn>-->
    <!--<base-form ref="demoForm" form-ref="demoForm" :dialog-visible="dialogVisible" :get-item-url="getItemUrl" :item-id="itemId" item-id-key="id" title="demoForm" :form-items="formItems" :submit-url="submitUrl" @closeBaseForm="closeBaseForm"></base-form>-->
  </div>
</template>
<script>
  // @ is an alias to /src
  import HelloWorld from '../components/HelloWorld.vue'
  import BudUploadImage from '../../packages/uploadImage/src/BudUploadImage.vue'
  // import BaseTab from '../../packages/easyform/src/BaseTab.vue'
  // import BaseToolBtn from '../../packages/easyform/src/BaseToolBtn.vue'
  // import BaseForm from '../../packages/easyform/src/BaseForm.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld, BudUploadImage
    },
    data: function () {
      return {
        itemId: null,
        dialogVisible: false,
        getItemUrl: '',
        submitUrl: '',
        toolBtns: [
          {name: '弹出表格', icon: 'el-icon-plus', clickEnvent: this.createItem}
        ],
        formItems: [
          {prop: 'orderId', label: '输入框', type: 'input'},
          {prop: 'orderNumber', label: '下拉选', type: 'select'},
          {prop: 'userPhoneNumber', label: '选择日期', type: 'daterange'},
          {prop: 'userPhoneNumber', label: '上传图片', type: 'image'}
        ]
      }
    },
    methods: {
      createItem () {
        this.itemId = null;
        this.dialogVisible = true;
      }
    }
  }
</script>
