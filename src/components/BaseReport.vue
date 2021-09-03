<!--
 * @Descripttion: 嵌入报表展示组件
-->
<template>
  <div class="container">
    <iframe
      v-show="url"
      class="iframe"
      :src="url"
      ref="iframe"
      name="superset"
      scrolling="auto"
      frameborder="0"
    >
    </iframe>
    <p v-show="!url">暂无数据看板数据</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    reportName: {
      type: String,
      default: ''
    },
    reportUrl: {
      type: String,
      default: ''
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, context) {
    const url = computed(() => props.reportUrl)
    console.log('base-report-url', url)

    return {
      url: url.value
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #f8f9fb;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  .iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
