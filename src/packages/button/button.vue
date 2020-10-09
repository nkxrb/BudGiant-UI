<template>
  <a v-if="href"
     :class="classes"
     :href="href">
    <i v-if="icon"
       :class="`k-icon ${icon}`"></i>
    <slot v-if="$slots.default"></slot>
  </a>
  <button v-else
          :class="classes">
    <i v-if="icon"
       :class="`k-icon ${icon}`"></i>
    <slot v-if="$slots.default"></slot>
  </button>
</template>
<script>
export default {
  name: "KButton",
  props: {
    type: { type: String, default: "default" },
    href: { type: String },
    icon: { type: String },
    status: { type: String },
    circle: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    radius: { type: Boolean, default: false },
  },
  setup (props, { attrs, emit, slots }) {
    // 选择性绑定class
    const classes = {
      [`k-button-${props.type}`]: props.type,
      [`k-button-${props.status}`]: props.status,
      ['circle']: props.circle,
      ['round']: props.round,
      ['radius']: props.radius,
    };

    return { props, classes };
  },
};
</script>
<style lang="scss">
@import "./button.scss";
</style>