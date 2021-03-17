<template>
  <el-autocomplete v-model="selectValue" :fetch-suggestions="search" :placeholder="placeholder" @select="handleSelect" style="width: 100%;"></el-autocomplete>
</template>

<script>
import { Autocomplete } from 'element-ui'
import Vue from 'vue'

Vue.use(Autocomplete)
export default {
  name: 'EasySelect',
  props: {
    placeholder: String,
    field: Object,
    value: [String, Number],
    search: { type: Function, required: true }
  },
  computed: {
    selectValue: {
      get: function () {
        return this.value ? this.value + '' : this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleSelect (item) {
      this.$emit('change', item, this.field)
    }
  }
}
</script>

<style>
</style>
