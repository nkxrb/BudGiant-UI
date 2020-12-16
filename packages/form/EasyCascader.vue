<template>
  <el-cascader clearable v-model="selectValue" :options="categoryOptions" :show-all-levels="false" :props="cascaderProps" style="width: 100%;">
  </el-cascader>
</template>
<script>
import { Cascader } from 'element-ui'
import Vue from 'vue'

Vue.use(Cascader)
export default {
  name: 'EasyCascader',
  props: {
    placeholder: String,
    checkStrictly: { type: Boolean, default: true },
    emitPath: { type: Boolean, default: false },
    value: [String, Number],
    options: { type: [Array, Function], required: true }
  },
  data: function () {
    return {
      categoryOptions: []
    }
  },
  computed: {
    selectValue: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    },
    cascaderProps: function () {
      return {
        checkStrictly: this.checkStrictly,
        emitPath: this.emitPath
      }
    }
  },
  watch: {
    options: {
      handler: function (newV, oldV) {
        if (typeof newV === 'function') {
          newV().then(res => {
            this.categoryOptions = res
          })
        } else {
          this.categoryOptions = newV || []
        }
      },
      immediate: true
    }
  }
}
</script>
<style scoped></style>
