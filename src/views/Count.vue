<template>
  <div class="count-page">
    <div class="page-title">
      <i class="iconfont iconicon_collapse"></i>
      Vuex Test Page
    </div>
    <p>store Root(这是根store的值): {{ text }}</p>
    <p>store doubleCount(这是count-store的值): {{ count }}</p>
    <el-button type="primary" @click="double">double</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Count',
  setup() {
    const store = useStore()
    console.log('count', store)
    const reactiveData = reactive({
      text: computed(() => store.state.text),
      count: computed(() => store.state.countModule.count)
    })

    const double = () => {
      store.commit('countModule/DOUBLE_COUNT')
    }

    return {
      ...toRefs(reactiveData),
      double
    }
  }
})
</script>

<style scoped lang="scss">
.count-page {
  .page-title {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
