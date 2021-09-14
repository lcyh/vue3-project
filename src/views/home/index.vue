<template>
  <div class="board-wrapper">首页-{{ route.name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>
<style lang="scss" scoped>
.board-wrapper {
  height: 100%;
}
</style>
