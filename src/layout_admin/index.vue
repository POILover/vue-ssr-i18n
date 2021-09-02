<template>
  <div style="width:100%">
    <Navbar />
    <div style="margin:20px">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
export default {
  name: "Layout",
  components: { Navbar },
};
</script>
<style lang="scss" scoped></style>
