<template>
  <el-cascader ref="easyCascader" clearable v-model="selectValue" :options="categoryOptions" @focus="focus" :show-all-levels="false" :props="cascaderProps" style="width: 100%;"
               @change="change">
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
    field: Object,
    checkStrictly: { type: Boolean, default: false },
    emitPath: { type: Boolean, default: false },
    value: [String, Number],
    filter: [String, Number],
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
  created () {
    if (typeof this.options === 'function') {
      this.options(this.filter).then(res => {
        this.categoryOptions = res
      })
    } else {
      this.categoryOptions = this.options || []
    }
  },
  methods: {
    change (item) {
      const nodes = this.$refs.easyCascader.getCheckedNodes()
      this.$emit('change', nodes, this.field)
    },
    focus () {
      if (typeof this.options === 'function') {
        this.options(this.filter).then(res => {
          this.categoryOptions = res
        })
      } else {
        this.categoryOptions = this.options || []
      }
    }
  }
}
</script>
<style scoped></style>
