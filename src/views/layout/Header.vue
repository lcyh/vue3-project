<template>
  <header class="header">
    <div class="logo-wrap">
      <router-link class="link" to="/">
        <i class="iconfont iconbilibili"></i>
        <p class="logo-text">BI系统</p>
      </router-link>
    </div>
    <div class="game-select">
      <el-select
        :model-value="selectedGame.gameBaseId"
        @change="onChangeGame"
        popper-class="select-dropdown"
        class="select-wrap"
        placeholder="请选择游戏"
        filterable
      >
        <el-option
          v-for="item in gameList"
          :key="item.gameBaseId"
          :label="item.gameBaseName"
          :value="item.gameBaseId"
        >
          <img
            class="select-icon"
            :src="item.icon"
            :alt="item.gameBaseName"
            onerror="../../assets/images/bili.png"
          />
          <span class="select-label">{{ item.gameBaseName }}</span>
        </el-option>
      </el-select>
    </div>
    <div class="header-menus">
      <el-menu
        mode="horizontal"
        :default-active="selectedMenu"
        background-color="#437BEE"
        text-color="#bfcbd9"
        active-text-color="#fff"
        @select="handleSelect"
      >
        <el-menu-item index="Home">首页</el-menu-item>
        <el-menu-item v-for="item in menuList" :index="item.name" :key="item.name">
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="header-right">
      <el-dropdown class="dropdown-wrap" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-avatar" src="../../assets/images/bili.png" alt="" />
          <span class="user-name">{{ userInfo.userName }}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getGameList } from '@/api/modules/databoard'

const menuList = [
  // { name: "Home", path: "/home", title: "首页" },
  { name: 'Databoard', path: '/databoard', title: '数据看板' },
  { name: 'Form', path: '/form', title: 'Form表单' },
  { name: 'Count', path: '/count', title: '计数器' },
  { name: 'Profile', path: '/profile', title: 'jsx个人中心' }
]
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    // const route = useRoute()
    const isClickMenu = ref(false)
    const reactiveData: any = reactive({
      selectedGame: {},
      gameList: [],
      route: useRoute()
    })
    const userInfo = computed(() => store.state.appModule.userInfo)
    // const activedMenu = computed(() => store.state.appModule.activedMenu);
    onMounted(async () => {
      const res = await getGameList()
      reactiveData.gameList = res.data
      reactiveData.selectedGame = { ...reactiveData.gameList[0] }
    })
    const handleSetReportList = () => {
      store
        .dispatch('databoardModule/setReportList', reactiveData.selectedGame.gameBaseId)
        .then((res: any) => {
          // 默认展示第一个有权限的看板菜单
          let databoardFirstMenuId = res[0]?.id
          if (res && res[0] && res[0].children) {
            databoardFirstMenuId = res[0]?.children[0]?.id || res[0]?.id
          }
          router.push(`/databoard/detail${databoardFirstMenuId ? `/${databoardFirstMenuId}` : ''}`)
        })
    }
    const selectedMenu = computed(() => {
      const { route } = reactiveData
      const currentRoutePath = route.path
      if (/^\/databoard/.test(currentRoutePath)) {
        // 当切换到数据看板导航时请求数据看板列表
        if (!isClickMenu.value && reactiveData?.selectedGame?.gameBaseId) {
          // 防止点击 数据看板菜单时请求两次接口
          handleSetReportList()
        }
      }
      return route.name
    })

    const onChangeGame = (gameId: number) => {
      isClickMenu.value = true
      const currentGame = reactiveData.gameList.find((item: any) => item.gameBaseId === gameId)
      reactiveData.selectedGame = currentGame
      store.commit('databoardModule/SET_SELECTED_GAME', currentGame)
      handleSetReportList()
    }
    const handleSelect = (key: string) => {
      isClickMenu.value = true
      // 设置当前选中的一级菜单menu
      store.commit('appModule/SET_ACTIVED_MENU', key)
      if (key === 'Databoard') {
        // 切换到数据看板页时，请求获取 数据看板报表菜单列表数据
        handleSetReportList()
      } else {
        router.push({
          name: key
        })
      }
    }
    const handleCommand = (key: string) => {
      const { route } = reactiveData
      if (key === 'logout') {
        store.dispatch('appModule/setLogout')
        router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
          console.warn(err)
        })
      }
    }
    return {
      selectedMenu,
      handleSelect,
      handleCommand,
      menuList,
      onChangeGame,
      userInfo,
      ...toRefs(reactiveData)
    }
  }
})
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  height: 60px;
  line-height: 40px;
  background-color: $header-bg-color;
  z-index: 1;
  .logo-wrap {
    float: left;
    padding: 10px;
    width: 200px;
    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $fc-dark;
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
    }
    .iconbilibili {
      font-size: 28px;
      font-weight: 300;
      color: $logo-color;
    }
    .logo-text {
      position: relative;
      padding-left: 10px;
      color: $fc-light;
    }
  }
  .game-select {
    float: left;
    margin-top: 10px;
  }
  .header-menus {
    float: left;
    ::v-deep(.el-menu--horizontal) {
      border-bottom: none;
      .el-menu-item {
        font-size: 16px;
        height: 60px;
        line-height: 60px;
        font-weight: bold;
        &.is-active {
          border-bottom-width: 3px;
        }
      }
    }
  }
  .header-right {
    float: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px;
    width: 200px;
    .dropdown-wrap {
      color: $fc-light;
      cursor: pointer;
      vertical-align: middle;
    }
    .user-avatar {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      border-radius: 50%;
    }
    .user-name {
      padding: 0 5px;
    }
    .dropdown-img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      vertical-align: middle;
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
