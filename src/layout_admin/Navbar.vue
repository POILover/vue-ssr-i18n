<template>
  <header class="header">
    <nav class="pc-nav">
      <ul style="margin-right:40px">
        <li v-for="item in navList" :key="item.to">
          <router-link :to="item.to">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      navList: [
        { name: "新闻资讯", to: "/admin/route_1" },
        { name: "招聘信息", to: "/admin/route_2" },
        { name: "用户留言", to: "/admin/route_3" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: rgb(18, 48, 86);
  color: white;
  height: 80px;
  z-index: 9999;
  .pc-nav {
    display: inline-block;
    font-size: 16px;
    line-height: 80px;
    margin-left: 80px;
    ul {
      list-style-type: none;
      margin: 0;
      display: inline;
      li {
        list-style: none;
        float: left;
        margin: 0;
        padding: 0;
        display: block;
        a {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.8);
          transition: color 0.15s ease;
          display: inline-block;
          margin-right: 20px;
          padding: 0 10px;
          &:hover {
            color: #22c8fa;
          }
          &.router-link-active {
            color: #22c8fa;
          }
        }
      }
    }
  }
}
</style>
