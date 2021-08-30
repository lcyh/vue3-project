<template>
  <div class="board-wrapper">
    <aside class="aside-wrapper">
      <el-menu
        class="menu-vertical"
        background-color="#fff"
        text-color="#101010"
        active-text-color="#437BEE"
        :default-active="activedSubmenu"
        :collapse-transition="false"
        :collapse="collapsed"
        @select="onSelectMenu"
      >
        <template v-for="item in submenuList">
          <el-submenu
            v-if="item.children && item.children.length"
            :index="item.name || item.title"
            :key="item.name || item.title"
          >
            <template v-slot:title>
              <i
                :class="[
                  'iconfont',
                  'sub-menu-icon',
                  menuIcons[item.title] ? menuIcons[item.title] : item.icon,
                ]"
              >
              </i>
              <span class="sub-title">{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="el in item.children"
              :key="el.name"
              :index="el.name"
              class="menu-item"
              v-show="!(el.meta && el.meta.hideFlag)"
            >
              <!-- <i :class="['iconfont', el.icon]"></i> -->
              <template #title>{{ el.title }}</template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            class="menu-item"
            v-else
            :key="item.name"
            :index="item.name"
          >
            <i :class="['iconfont', item.icon]"></i>
            <template class="nav-text" #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="nav-foot">
        <div @click="toggleCollapse">
          <i
            :class="[
              'iconfont',
              collapsed ? 'iconicon_expand' : 'iconicon_collapse',
            ]"
          ></i>
        </div>
      </div>
    </aside>
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
