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
        <el-menu-item
          v-for="item in menuList"
          :index="item.name"
          :key="item.name"
        >
          {{ item.title }}
        </el-menu-item>
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const menuList = [
  // { name: "Home", path: "/home", title: "首页" },
  { name: "Databoard", path: "/databoard", title: "数据看板" },
  { name: "Form", path: "/form", title: "Form表单" },
  { name: "Count", path: "/count", title: "计数器" },
  { name: "Profile", path: "/profile", title: "jsx个人中心" },
];
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    // const activedMenu = computed(() => store.state.appModule.activedMenu);
    const selectedMenu = computed(() => {
      const route = useRoute();
      const currentRoutePath = route.path;
      if (/^\/databoard/.test(currentRoutePath)) {
        // 当切换到数据看板导航时请求数据看板列表
        store.dispatch("databoardModule/setReportList", { gameBaseId: 1 });
      }
      // else if (/^\/form/.test(routePath)) {
      //   routeName = "Admin";
      // } else if (/^\/admin/.test(routePath)) {
      //   routeName = "Admin";
      // }
      store.commit("appModule/SET_ACTIVED_MENU", route.name);
      return route.name;
    });

    const handleSelect = (key: string) => {
      // 设置当前选中的一级菜单menu
      store.commit("appModule/SET_ACTIVED_MENU", key);
      if (key === "Databoard") {
        // 切换到数据看板页时，请求获取 数据看板报表菜单列表数据
        store
          .dispatch("databoardModule/setReportList", { gameBaseId: 1 })
          .then((res: any) => {
            // 默认展示第一个有权限的看板菜单
            const databoardFirstMenuId = res[0]?.id;
            console.log("databoardFirstMenuId", databoardFirstMenuId);
            router.push(
              `/databoard${
                databoardFirstMenuId ? `/${databoardFirstMenuId}` : ""
              }`
            );
          });
      } else {
        router.push({
          name: key,
        });
      }
    };

    const handleCommand = (key: string) => {
      console.log(key);
    };
    return {
      selectedMenu,
      handleSelect,
      handleCommand,
      menuList,
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
