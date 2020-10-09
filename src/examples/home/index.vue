<template>
  <div class="home">
    <!-- logo -->
    <div class="logo">
      <h1>KVIEW</h1>
      <p>一款适用于学习的前端组件库</p>
      <p></p>
    </div>

    <!-- start -->
    <div class="start">
      <k-button type="primary"
                href="/components"
                round>
        <icon-k class="btn-icon"></icon-k>
        <span>开始学习</span>
      </k-button>
      <k-button type="default"
                href="https://gitee.com/nkxrb/KView-UI"
                round>
        <icon-gitee class="btn-icon"></icon-gitee>
        <span>GITEE</span>
      </k-button>
      <k-button type="default"
                href="https://github.com/nkxrb/KView-UI"
                round>
        <icon-github class="btn-icon"></icon-github>
        <span>GITHUB</span>
      </k-button>
    </div>
  </div>
</template>

<script>
import { IconK, IconGitee, IconGithub } from '@packages/icon'
export default {
  components: { IconK, IconGitee, IconGithub }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  font-size: 16px;
  .logo {
    text-align: center;
    padding: 90px 0;
    max-height: 600px;

    h1 {
      font-size: 45px;
      color: #00b0bf;
    }
  }
  .color-logo {
    color: #37cbd4;
  }

  .feature {
    font-size: 30px;
    margin: 25px;
  }
  .start {
    display: flex;
    justify-content: center;
    a {
      width: 116px;
    }
    a + a {
      margin-left: 12px;
    }
    .btn-icon {
      height: 24px;
      margin-right: 6px;
    }
  }
}
</style>