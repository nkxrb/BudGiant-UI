<template>
  <el-dialog :visible.sync="isShow" :title="title" :width="width || '980px'" :close-on-click-modal="false" modal-append-to-body append-to-body custom-class="custon-dialog">
    <el-form ref="NkForm" :disabled="disabled" :model="formData" :label-width="labelWidth || '150px'">
      <template v-for="(field,index) in fields">
        <el-col v-bind:key="index" :span="field.span || 12" v-show="!field.hidden">
          <el-form-item :label="field.label" :prop="field.prop" :rules="transFormRule(field)">

            <!--开关-->
            <el-switch v-if="field.type==='switch'" v-model="formData[field.prop]" active-color="#13ce66" active-value="1" inactive-value="2"></el-switch>

            <!--密码输入框-->
            <template v-else-if="field.type==='password'">
              <input type="password" style="width:0;height:0;float:left;visibility:hidden" />
              <el-input show-password :disabled="field.disabled" v-model="formData[field.prop]" :maxlength="field.maxlength" show-word-limit :placeholder="field.placeholder">
              </el-input>
            </template>

            <!--数字输入框-->
            <el-input-number v-else-if="field.type==='inputNumber'" :disabled="field.disabled" v-model="formData[field.prop]" :min="field.min" :max="field.max"
                             :precision="field.precision" :placeholder="field.placeholder" style="width: 100%;" :controls="false"></el-input-number>

            <!--单选框-->
            <template v-else-if="field.type==='radio'">
              <template v-if="field.dict">
                <el-radio v-for="(dict,index) in field.dict" v-bind:key="index" v-model="formData[field.prop]" :label="dict.value">{{dict.label}}</el-radio>
              </template>
              <template v-else>
                <span style="color:red">单选框dict属性未定义</span>
              </template>
            </template>

            <!-- 时间 -->
            <template v-else-if="field.type==='time'">
              <el-time-picker style="width: 100%;" value-format="HH:mm:ss" v-model="formData[field.prop]" :picker-options="{selectableRange: field.range || '00:00:00 - 23:59:59'}"
                              placeholder="请选择时间点">
              </el-time-picker>
            </template>

            <!-- 日期 -->
            <template v-else-if="field.type==='date'">
              <el-date-picker v-model="formData[field.prop]" type="date" placeholder="选择日期"></el-date-picker>
            </template>

            <!--下拉选-->
            <template v-else-if="field.type==='select'">
              <easy-select v-model="formData[field.prop]" :options="field.options" :filter="formData[field.filter]" :placeholder="field.placeholder||'请选择'"
                           @change="selectChange(formData[field.prop], field, formData)"></easy-select>
            </template>

            <!--下拉选-->
            <template v-else-if="field.type==='multiselect'">
              <easy-select v-model="formData[field.prop]" :options="field.options" :filter="formData[field.filter]" :placeholder="field.placeholder||'请选择'" multiple
                           @change="selectChange(formData[field.prop], field, formData)"></easy-select>
            </template>

            <!--下拉选-->
            <template v-else-if="field.type==='seltree'">
              <easy-cascader v-model="formData[field.prop]" :options="field.options" :keys="field.keys" :placeholder="field.placeholder||'请选择'"></easy-cascader>
            </template>

            <!--上传图片-->
            <template v-else-if="field.type==='image'">
              <easy-upload-image v-model="formData[field.prop]" :httpRequest="field.httpRequest" :limit="field.limit" :maxsize="field.maxsize" :tips="field.tips">
              </easy-upload-image>
            </template>

            <!-- 富文本编辑器 -->
            <template v-else-if="field.type==='editor'">
              <easy-editor v-model="formData[field.prop]" :placeholder="field.placeholder"></easy-editor>
            </template>

            <!-- 地图 -->
            <template v-else-if="field.type==='map'">
              <easy-b-map :lat.sync="formData[field.lat]" :lng.sync="formData[field.lng]" :searchWord="formData[field.address]" :location="field.location" :ak="field.ak">
              </easy-b-map>
            </template>

            <!-- textArea输入框 -->
            <template v-else-if="field.type==='text'">
              <el-input type="textarea" :disabled="field.disabled" v-model="formData[field.prop]" :placeholder="field.placeholder"></el-input>
            </template>

            <!--普通输入框-->
            <el-input v-else :disabled="field.disabled" v-model="formData[field.prop]" :placeholder="field.placeholder"></el-input>
          </el-form-item>
        </el-col>
      </template>

      <div style="clear: both"></div>
      <div style="text-align: right">
        <el-button type="primary" @click="submitForm" style="margin-right: 15px;">提交</el-button>
        <el-button @click="close">取消</el-button>
      </div>

    </el-form>
  </el-dialog>
</template>
<script>
import { Dialog, Form, FormItem, Input, InputNumber, Switch, Button, DatePicker } from 'element-ui'
import Vue from 'vue'
import * as $validate from './validate.js'
import EasyUploadImage from './EasyUploadImage'
import EasyEditor from './EasyEditor'
import EasySelect from './EasySelect'
import EasyCascader from './EasyCascader'
import EasyBMap from './EasyBMap'

Vue.use(Dialog).use(Form).use(FormItem).use(Input).use(InputNumber).use(Switch).use(Button).use(DatePicker)

export default {
  name: 'NkForm',
  components: { EasyUploadImage, EasyEditor, EasySelect, EasyCascader, EasyBMap },
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String },
    width: { type: [String, Number] },
    labelWidth: { type: [String, Number] },
    data: { type: Object },
    fields: { type: Array, required: true },
    filter: { type: Boolean },
    disabled: { type: Boolean }
  },
  computed: {
    isShow: {
      get: function () {
        return this.visible
      },
      set: function (val) {
        this.close(val)
      }
    },
    isAdd: function () {
      return !this.data || JSON.stringify(this.data) === '{}'
    }
  },
  data: function () {
    return {
      formData: {}
    }
  },
  methods: {
    // 下拉选框值发生变化时触发
    selectChange (value, field, formData) {
      if (field.clear) {
        const arr = field.clear.split(',')
        arr.forEach(item => {
          this.$set(this.formData, item, '')
        })
      }

      this.$emit('select-change', {
        value: value,
        field: field,
        formData: formData
      })
    },
    // 关闭弹窗
    close () {
      this.$emit('update:visible', false)
    },
    // 提交表单数据
    submitForm () {
      debugger
      // 若用户并未进行操作，直接返回，不做任何操作
      if (JSON.stringify(this.formData) === JSON.stringify(this.data)) {
        this.close()
        return
      }

      let params = {}
      // 若需要过滤配置，则过滤未修改过的属性
      if (this.filter) {
        for (const k in this.formData) {
          if (this.formData[k] !== this.data[k]) {
            params[k] = this.formData[k]
          }
        }
        // 如果是update操作，ID必传, 约定ID为fields的第一个元素
        params[this.fields[0].prop] = this.data[this.fields[0].prop]
      } else {
        params = this.formData
      }

      // 校验表单数据
      this.$refs.NkForm.validate(valid => {
        if (valid) {
          this.$emit('submit', params)
        } else {
          this.$message.warning('信息验证不通过，请正确填写！')
        }
      })
    },
    // 转换表单规则
    transFormRule (field) {
      const newRuleArr = []
      if (field && field.rules) {
        for (let i = 0; i < field.rules.length; i++) {
          const triggerType = field.type === 'select' ? 'change' : 'blur'

          if (typeof field.rules[i] === 'object') {
            newRuleArr.push(field.rules[i])
          } else if (typeof field.rules[i] === 'function') {
            newRuleArr.push({ validator: field.rules[i], trigger: triggerType })
          } else if (typeof field.rules[i] === 'string') {
            switch (field.rules[i]) {
              case 'required':
                newRuleArr.push({ required: true, message: '不能为空', trigger: triggerType })
                break
              case 'telephone':
                newRuleArr.push({ validator: $validate.checkMobile, trigger: triggerType })
                break
              case 'phone':
                newRuleArr.push({ validator: $validate.checkPhone, trigger: triggerType })
                break
              case 'email':
                newRuleArr.push({ validator: $validate.checkEmail, trigger: triggerType })
                break
              default:
                break
            }
          }
        }
      }

      return newRuleArr
    }
  },
  watch: {
    data: {
      handler: function (newV) {
        if (newV) {
          this.formData = Object.assign({}, newV)
        } else {
          this.formData = {}
        }
      }
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
