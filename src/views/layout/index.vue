<template>
  <div class="container-fulled">
    <Header />
    <section class="body">
      <NavSide />
      <main class="wrapper">
        <transition name="slide">
          <router-view />
        </transition>
      </main>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./Header.vue";
import NavSide from "./NavSide.vue";

export default defineComponent({
  name: "layout",
  components: { Header, NavSide },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // beforeRouteEnter(to, from, next) {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // beforeRouteUpdate(to, from, next) {},
  setup() {
    // return {};
  },
});
</script>
<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
.container-fulled {
  display: flex;
  flex-direction: column;
  background-color: $bg-light;
  min-width: 1420px;
  height: 100%;
  .body {
    position: relative;
    width: 100%;
    flex: auto;
    overflow: hidden;
    display: flex;
    .wrapper {
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
