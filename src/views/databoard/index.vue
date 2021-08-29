<template>
  <div class="board-wrapper">
    <base-report :targetUrl="reportUrl" :reportName="reportName" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import BaseReport from "@/components/BaseReport.vue";

export default defineComponent({
  components: { BaseReport },
  setup() {
    const route = useRoute();
    const activedSubmenu = computed(() => {
      const { meta } = route;
      return meta.title || "";
    });
    const reportUrl = "";
    return {
      activedSubmenu,
      reportUrl,
    };
  },
});
</script>
<style lang="scss" scoped>
.board-wrapper {
  height: 100%;
}
</style>
