<template>
  <aside class="aside-wrapper" v-show="showNavSide">
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
                menuIcons[item.title] ? menuIcons[item.title] : item.icon
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
        <el-menu-item class="menu-item" v-else :key="item.name" :index="item.name">
          <i :class="['iconfont', item.icon]"></i>
          <template class="nav-text" #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="nav-foot">
      <div @click="toggleCollapse">
        <i :class="['iconfont', collapsed ? 'iconicon_expand' : 'iconicon_collapse']"></i>
      </div>
    </div>
  </aside>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const menuIcons: { [key: string]: string } = {
  运营: 'iconlinechart',
  研发: 'iconpiechart',
  流量: 'iconadduser',
  专题: 'iconspecial'
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const collapsed = ref(false)
    const activedSubmenu = computed(() => {
      const routeName = route.name
      return routeName
    })
    const toggleCollapse = () => {
      collapsed.value = !collapsed.value
    }
    return {
      activedSubmenu,
      collapsed,
      toggleCollapse,
      menuIcons
    }
  }
})
</script>
<style lang="scss" scoped>
.aside-wrapper {
  flex-shrink: 0;
  overflow: hidden;
  .nav-aside {
    position: relative;
    height: 100%;
    width: 200px;
    padding-bottom: 40px;
    transition: width 0.2s ease-in-out;
    &.collapse {
      width: 64px;
      .menu-vertical .iconfont {
        font-size: 22px;
      }
      .game-text {
        font-size: 16px;
        .game-logo {
          width: 40px;
          height: 40px;
          border-radius: 5px;
          background-color: $fc-default;
          border: 1px $bg-info solid;
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .select-wrap {
      width: 100%;
      height: 50px;
      padding: 5px 0;
      background-color: $aside-bg-color;
      ::v-deep(.el-input__inner) {
        .el-input__inner {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: $fc-default;
          padding-left: 40px;
          background-color: $aside-bg-color;
          border: none;
        }
        .game-icon {
          width: 30px;
          height: 30px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px $bg-info solid;
          background-color: $fc-default;
          vertical-align: middle;
        }
      }
    }
    .game-text {
      height: 50px;
      padding: 5px;
      line-height: 40px;
      color: $fc-light;
      font-weight: bold;
      background-color: $aside-foot-hover;
      text-align: center;
    }
  }
  .menu-vertical {
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
    border-right: none;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    ::v-deep(.el-submenu__title) {
      .el-submenu__title {
        background-color: $aside-first-menu !important;
        color: #101010 !important;
        font-size: 16px;
      }
    }
    .sub-menu-icon {
      color: $color-theme;
    }
    .iconoperation {
      font-size: 20px !important;
    }
    .menu-item:hover {
      background-color: $bg-white !important;
    }
    .menu-item.is-active {
      background-color: $aside-second-menu !important;
    }
    .nav-text {
      font-size: 15px;
    }
    .iconfont {
      display: inline-block;
      line-height: 1;
      margin-right: 5px;
      width: 24px;
      font-size: 18px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .nav-foot {
    width: 100%;
    height: 40px;
    text-align: right;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid $aside-border-color;
    background-color: $aside-bg-color;
    .iconfont {
      text-align: center;
      width: 64px;
      height: 40px;
      padding: 3px 10px;
      color: $fc-collapse;
      cursor: pointer;
      font-size: 22px;
      vertical-align: middle;
      display: inline-block;
      &:hover {
        background-color: $aside-foot-hover;
      }
    }
  }
}
.select-dropdown {
  .el-select-dropdown__item {
    height: 42px;
    line-height: 42px;
    padding: 3px 10px;
  }
  .select-icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 3px;
    vertical-align: middle;
    background-color: $placeholder;
  }
  .select-label {
    display: inline-block;
    padding-left: 10px;
    vertical-align: middle;
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
