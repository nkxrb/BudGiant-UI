<template>
  <el-form ref="kForm" :disabled="disabled" :model="formData" label-width="150px">
    <template v-for="(formProp,index) in formProps">
      <el-col v-bind:key="index" :span="formProp.span || 12">
        <el-form-item :label="formProp.label" :prop="formProp.prop" :rules="transFormRule(formProp)">

          <!--开关-->
          <el-switch v-if="formProp.type==='switch'" v-model="formData[formProp.prop]" active-color="#13ce66" active-value="1" inactive-value="2"></el-switch>

          <!--密码输入框-->
          <template v-else-if="formProp.type==='password'">
            <input type="password" style="width:0;height:0;float:left;visibility:hidden" />
            <el-input show-password :disabled="formProp.disabled" v-model="formData[formProp.prop]" :maxlength="formProp.maxlength" show-word-limit
                      :placeholder="formProp.placeholder"></el-input>
          </template>

          <!--数字输入框-->
          <el-input-number v-else-if="formProp.type==='inputNumber'" :disabled="formProp.disabled" v-model="formData[formProp.prop]" :min="formProp.min" :max="formProp.max"
                           :precision="formProp.precision" :placeholder="formProp.placeholder" style="width: 100%;" :controls="false"></el-input-number>

          <!--单选框-->
          <template v-else-if="formProp.type==='radio'">
            <template v-if="formProp.dict">
              <el-radio v-for="(dict,index) in formProp.dict" v-bind:key="index" v-model="formData[formProp.prop]" :label="dict.value">{{dict.label}}</el-radio>
            </template>
            <template v-else>
              <span style="color:red">单选框dict属性未定义</span>
            </template>
          </template>

          <!-- 时间 -->
          <template v-else-if="formProp.type==='time'">
            <el-time-picker style="width: 100%;" v-model="formData[formProp.prop]" :picker-options="{selectableRange: formProp.range || '00:00:00 - 23:59:59'}"
                            placeholder="请选择时间点">
            </el-time-picker>
          </template>

          <!-- 日期 -->
          <template v-else-if="formProp.type==='date'">
            <el-date-picker v-model="formData[formProp.prop]" type="date" placeholder="选择日期"></el-date-picker>
          </template>

          <!--下拉选-->
          <template v-else-if="formProp.type==='select'">
            <el-select v-model="formData[formProp.prop]" clearable :placeholder="formProp.placeholder||'请选择'" style="width: 100%;">
              <el-option v-for="dict in formProp.dicts" :key="dict.value" :label="dict.label" :value="dict.value+''"></el-option>
            </el-select>
          </template>

          <!--上传图片-->
          <template v-else-if="formProp.type==='image'">
            <easy-upload-image :imgListStr="formData[formProp.prop]" :limit="formProp.limit" @valueChanged="valueChanged($event,formProp)" :tips="''">
            </easy-upload-image>
          </template>

          <!-- 富文本编辑器 -->
          <template v-else-if="formProp.type==='editor'">
            <easy-editor v-model="formData[formProp.prop]" :placeholder="formProp.placeholder"></easy-editor>
          </template>

          <!-- textArea输入框 -->
          <template v-else-if="formProp.type==='text'">
            <el-input type="textarea" :disabled="formProp.disabled" v-model="formData[formProp.prop]" :placeholder="formProp.placeholder"></el-input>
          </template>

          <!--普通输入框-->
          <el-input v-else :disabled="formProp.disabled" v-model="formData[formProp.prop]" :placeholder="formProp.placeholder"></el-input>
        </el-form-item>
      </el-col>
    </template>

    <div style="clear: both"></div>
    <div style="text-align: right">
      <el-button type="primary" @click="submitForm">提交</el-button>
    </div>

  </el-form>
</template>
<script>
import { Form, FormItem, Input, InputNumber, Switch, Button, Option, Select, DatePicker } from 'element-ui'
import Vue from 'vue'
import EasyUploadImage from './EasyUploadImage'
import EasyEditor from './EasyEditor'

Vue.use(Form).use(FormItem).use(Input).use(InputNumber).use(Switch).use(Button).use(Option).use(Select).use(DatePicker)

export default {
  name: 'NkForm',
  components: { EasyUploadImage, EasyEditor },
  props: {
    title: { type: String },
    data: { type: Object },
    formProps: { type: Array, required: true },
    disabled: { type: Boolean }
  },
  computed: {
    isAdd: function () {
      return !this.data || JSON.stringify(this.data) === '{}'
    }
  },
  data: function () {
    return {
      formData: JSON.parse(JSON.stringify(this.data || '{}')),
      dicts: {},
      options: [],
      subData: {}
    }
  },
  methods: {
    valueChanged ($event, formProp, e) {
      this.$set(this.formData, formProp.prop, $event)
      if (formProp.changed) {
        formProp.changed($event)
      }
    },
    // 多个属性更改
    propsChanged ($event, formProp) {
      if (formProp.props) {
        for (let i = 0; i < formProp.props.length; i++) {
          if ($event && $event[i]) {
            this.$set(this.formData, formProp.props[i], $event[i])
          } else {
            this.$set(this.formData, formProp.props[i], '')
          }
        }
      }
    },
    // 提交表单数据
    submitForm () {
      // 若用户并未进行操作，直接返回，不做任何操作
      if (JSON.stringify(this.formData) === JSON.stringify(this.data)) {
        this.close()
        return
      }

      const params = {}
      // 过滤未修改过的属性
      for (const k in this.formData) {
        if (this.formData[k] !== this.data[k]) {
          params[k] = this.formData[k]
        }
      }

      // 如果是update操作，ID必传, 约定ID为formProps的第一个元素
      params[this.formProps[0].prop] = this.data[this.formProps[0].prop]

      // 校验表单数据
      this.$refs.kForm.validate(valid => {
        if (valid) {
          this.$emit('submit', params)
        } else {
          this.$message.warning('信息验证不通过，请正确填写！')
        }
      })
    },
    // 转换表单规则
    transFormRule (formProp) {
      const newRuleArr = []
      if (formProp && formProp.rules) {
        for (let i = 0; i < formProp.rules.length; i++) {
          if (typeof formProp.rules[i] === 'object') {
            newRuleArr.push(formProp.rules[i])
          } else if (typeof formProp.rules[i] === 'function') {
            newRuleArr.push({ validator: formProp.rules[i], trigger: 'blur' })
          } else if (typeof formProp.rules[i] === 'string') {
            switch (formProp.rules[i]) {
              case 'required':
                newRuleArr.push({ required: true, message: '不能为空', trigger: 'blur' })
                break
              case 'telephone':
                newRuleArr.push({ validator: this.$validate.checkMobile, trigger: 'blur' })
                break
              case 'phone':
                newRuleArr.push({ validator: this.$validate.checkPhone, trigger: 'blur' })
                break
              case 'email':
                newRuleArr.push({ validator: this.$validate.checkEmail, trigger: 'blur' })
                break
              default:
                break
            }
          }
        }
      }

      return newRuleArr
    }
  }
}
</script>
<style>
  .el-input-number .el-input__inner {
    text-align: left;
  }

  .el-input.is-disabled .el-input__inner {
    color: #888888;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    height: 500px;
  }

  .custon-dialog {
    border-radius: 10px;
  }
</style>
