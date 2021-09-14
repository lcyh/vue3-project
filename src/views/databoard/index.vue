<template>
  <div class="board-wrapper">
    数据看板id：{{ reportName }}-{{ reportId }}={{ reportUrl }}
    <base-report :targetUrl="reportUrl" :reportName="reportName" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import BaseReport from '@/components/BaseReport.vue'
import { handleGetCurrentMenuItem } from '@/utils/shared'

export default defineComponent({
  components: { BaseReport },
  setup() {
    const route = useRoute()
    const store = useStore()
    const databoardSubmenuList = computed(() => store.state.databoardModule.reportMenuList)

    const reportId = computed(() => {
      const { params } = route
      return params.id || ''
    })

    const currentSubMenuData = computed(() => {
      const { params } = route
      const currentItem: any = handleGetCurrentMenuItem(
        databoardSubmenuList.value,
        Number(params.id)
      )
      return currentItem
    })
    const reportName = computed(() => currentSubMenuData.value.title)
    const reportUrl = computed(() => currentSubMenuData.value.reportUrl)
    return {
      reportId,
      reportName,
      reportUrl
    }
  }
})
</script>
<style lang="scss" scoped>
.board-wrapper {
  height: 100%;
}
</style>
