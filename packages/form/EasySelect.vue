<template>
  <el-select v-model="selectValue" @focus="focus" @change="change" clearable :placeholder="placeholder||'请选择'" style="width: 100%;">
    <el-option v-for="item in dictArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
import { Option, Select } from 'element-ui'
import Vue from 'vue'

Vue.use(Option).use(Select)
export default {
  name: 'EasySelect',
  props: {
    placeholder: String,
    value: [String, Number],
    filter: [String, Number],
    options: { type: [Array, Function], required: true }
  },
  data: function () {
    return {
      dictArr: []
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
    }
  },
  created () {
    if (typeof this.options === 'function') {
      this.options(this.filter).then(res => {
        this.dictArr = res
      })
    } else {
      this.dictArr = this.options || []
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val)
    },
    focus () {
      if (typeof this.options === 'function') {
        this.options(this.filter).then(res => {
          this.dictArr = res
        })
      } else {
        this.dictArr = this.options || []
      }
    }
  }
}
</script>
