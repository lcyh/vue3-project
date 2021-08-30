<template>
  <header class="header clearfix">
    <div class="logo-wrap">
      <router-link class="link" to="/">
        <i class="iconfont iconbilibili"></i>
        <p class="logo-text">BI系统</p>
      </router-link>
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
        <el-menu-item index="Databoard">数据看板</el-menu-item>
        <el-menu-item index="Form">Form表单</el-menu-item>
        <el-menu-item index="Count">计数器</el-menu-item>
        <el-menu-item index="Profile">jsx个人中心</el-menu-item>
      </el-menu>
    </div>
    <div class="header-right">
      <el-dropdown class="dropdown-wrap" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-avatar" src="../../assets/images/bili.png" alt="" />
          <span class="user-name">{{ userName }}</span>
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
import { computed, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    console.log("store---header", store);
    // const activedMenu = computed(() => store.state.appModule.activedMenu);
    const selectedMenu = computed(() => {
      // const routePath = route.path;
      // let routeName = "Home";
      // if (/^\/databoard/.test(routePath)) {
      //   // 当切换到数据看板导航时请求游戏列表
      //   routeName = "Databoard";
      // } else if (/^\/form/.test(routePath)) {
      //   routeName = "Admin";
      // } else if (/^\/admin/.test(routePath)) {
      //   routeName = "Admin";
      // }
      // if (routeName !== activedMenu.value) {
      store.dispatch("appModule/setActivedMenu", route.name);
      // }
      return route.name;
    });

    const handleSelect = (key: string) => {
      // console.log("handleSelect", key);
      store.dispatch("appModule/setActivedMenu", key);
      router.push({
        name: key,
      });
    };

    const handleCommand = (key: string) => {
      console.log(key);
    };
    return {
      selectedMenu,
      handleSelect,
      handleCommand,
    };
  },
});
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
</style>
