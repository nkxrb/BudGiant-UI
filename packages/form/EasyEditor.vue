<template>
  <quill-editor class="easy-editor" ref="myQuillEditor" v-model="content" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)" />
</template>

<script>
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'easyEditor',
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String }
  },
  computed: {
    content: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  data () {
    return {
      editorOption: {
        placeholder: this.placeholder || '请在此输入内容...',
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ align: [] }],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme

            ['clean'] // remove formatting button
          ]
        },
        theme: 'snow'
      }
    }
  },
  components: { quillEditor },
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  }

}
</script>

<style lang="scss" scoped>
  .easy-editor {
    line-height: normal;
  }
  ::v-deep .ql-container {
    min-height: 200px;
  }
</style>
