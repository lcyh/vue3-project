<template>
  <div class="wrapper-fulled">
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChildView",
  components: {},
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.3s ease-in;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
.wrapper-fulled {
  height: 100%;
}
</style>
