<template>
  <div id="app-container">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/form">Form</router-link> |
    <router-link to="/count">Count</router-link> -->
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<style lang="scss">
@import './assets/iconfont/iconfont.css';
@import './assets/styles/common.scss';

#app-container {
  width: 100%;
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
