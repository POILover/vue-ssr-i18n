<template>
  <div style="width:100%">
    <Navbar />
    <div style="margin-top:80px">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
export default {
  name: "Layout",
  components: { Navbar },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped></style>
