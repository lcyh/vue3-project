<template>
  <div class="board-wrapper">首页</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute()
    console.log('首页-路由', route)

    return {}
  }
})
</script>
<style lang="scss" scoped>
.board-wrapper {
  height: 100%;
}
</style>
