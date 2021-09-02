<template>
  <header class="header">
    <div class="app-container">
      <nav class="pc-nav">
        <ul style="margin-right:40px;padding:0">
          <li v-for="item in navList" :key="item.link">
            <router-link :to="item.link">
              {{ item.name }}
            </router-link>
            <div v-if="item.children" class="hover-item-list">
              <div class="app-container hover-item">
                <div v-for="(item1, key1) in item.children" :key="key1">
                  <span class="first-menu">
                    {{ item1.name }}
                  </span>
                  <template v-if="item1.children">
                    <div v-for="(item2, key2) in item1.children" :key="key2">
                      <template v-if="item2.children">
                        <span class="sec-menu">{{ item2.name }}</span>
                        <!-- 打开新页面，FIXME:相同路由跳转会有bug -->
                        <div
                          v-for="(item3, key3) in item2.children"
                          :key="key3"
                        >
                          <router-link
                            :to="
                              `${route_4_BaseUrl}${item1.link}/${item2.link}/${item3.link}`
                            "
                            class="third-menu"
                            >{{ item3.name }}</router-link
                          >
                        </div>
                      </template>
                      <template v-else>
                        <router-link
                          :to="`${route_4_BaseUrl}${item1.link}/${item2.link}`"
                          class="sec-menu"
                          >{{ item2.name }}</router-link
                        >
                      </template>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- <el-dropdown> -->
        <div
          @click="onToggleLang"
          style="float:right;width:26px;height:26px;border-radius:50%;border:2px solid #cccccc;line-height:26px;text-align:center;color:#cccccc;cursor:pointer"
        >
          <!-- TODO: 唯独你闪烁 -->
          {{ locale === "zh" ? "中" : "En" }}
        </div>
        <!-- </el-dropdown> -->
      </nav>
      <nav class="m-nav">
        <i @click="openNavDrawer" class="el-icon-s-operation"></i>
      </nav>
      <el-drawer
        custom-class="nav-drawer"
        :visible.sync="showDrawer"
        :show-close="false"
        size="75%"
      >
        <el-menu
          background-color="rgb(18,48,86)"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="m-nav-menu"
          :router="true"
          :unique-opened="true"
          :default-active="defaultActive"
        >
          <component
            v-for="(item1, key1) in navList"
            :key="key1 + '1'"
            :index="item1.link"
            :is="item1.children ? 'el-submenu' : 'el-menu-item'"
          >
            <template slot="title">
              {{ item1.name }}
            </template>
            <template v-if="item1.children">
              <component
                v-for="(item2, key2) in item1.children"
                :key="key2 + '2'"
                :index="`${route_4_BaseUrl}${item2.link}`"
                :is="item2.children ? 'el-submenu' : 'el-menu-item'"
              >
                <template slot="title">
                  {{ item2.name }}
                </template>
                <template v-if="item2.children">
                  <component
                    v-for="(item3, key3) in item2.children"
                    :key="key3 + '3'"
                    :index="`${route_4_BaseUrl}${item2.link}/${item3.link}`"
                    :is="item3.children ? 'el-submenu' : 'el-menu-item'"
                  >
                    <template slot="title">
                      {{ item3.name }}
                    </template>
                    <template v-if="item3.children">
                      <component
                        v-for="(item4, key4) in item3.children"
                        :key="key4 + '4'"
                        :index="
                          `${route_4_BaseUrl}${item2.link}/${item3.link}/${item4.link}`
                        "
                        :is="item4.children ? 'el-submenu' : 'el-menu-item'"
                      >
                        <template slot="title">
                          {{ item4.name }}
                        </template>
                      </component>
                    </template>
                  </component>
                </template>
              </component>
            </template>
          </component>
        </el-menu>
        <el-switch
          style="margin-left:20px"
          v-model="isZH"
          :active-value="true"
          :inactive-value="false"
          active-text="中"
          inactive-text="EN"
          @change="onToggleLang"
        >
        </el-switch>
      </el-drawer>
    </div>
  </header>
</template>
<script>
import Cookies from "js-cookie";
import { generateRoute4 } from "../pages/main/route4/index";
export default {
  name: "Navbar",
  data() {
    return {
      route_4_BaseUrl: "/route_4/",
      showDrawer: false,
      locale: this.$i18n.locale,
      navList: [
        { name: `${this.$t("route")}1`, link: "/route_1" },
        {
          name: `${this.$t("route")}2`,
          link: "/route_2",
        },
        { name: `${this.$t("route")}3`, link: "/route_3" },
        {
          name: `${this.$t("route")}4`,
          link: "/route_4",
          children: generateRoute4(this.$i18n),
        },
        { name: `${this.$t("route")}5`, link: "/route_5" },
        { name: `${this.$t("route")}6`, link: "/route_6" },
      ],
    };
  },
  computed: {
    defaultActive() {
      return this.$route.path;
    },
    isZH() {
      return this.locale === "zh";
    },
  },
  mounted() {},
  methods: {
    openNavDrawer() {
      this.showDrawer = true;
    },
    onToggleLang() {
      Cookies.set("locale", this.isZH ? "en" : "zh", {
        expires: new Date("Fri, 31 Dec 9999 23:59:59 GMT"),
      });
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: rgb(18, 48, 86);
  color: white;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 9999;
  .pc-nav {
    font-size: 16px;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
          &:hover {
            color: #22c8fa;
          }
          &.router-link-active {
            color: #22c8fa;
          }
        }
        &:hover {
          .hover-item-list {
            max-height: 1000px;
            transition: all 0.2s ease;
          }
        }
        .hover-item-list {
          max-height: 0px;
          overflow: hidden;
          position: absolute;
          width: 100%;
          left: 0;
          background-color: rgba(0, 79, 126, 0.8);
          z-index: 2;
          .hover-item {
            display: flex;
            justify-content: space-between;
            line-height: 2;
            padding: 10px 0;
            .first-menu {
              font-size: 18px;
              font-weight: 600;
            }
            .sec-menu {
              cursor: pointer;
              font-size: 15px;
            }
            .third-menu {
              cursor: pointer;
              padding-left: 20px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
  .m-nav {
    display: none;
  }
}
@media screen and (max-width: 700px) {
  .header {
    .pc-nav {
      display: none;
    }
    .m-nav {
      display: block;
      float: right;
      line-height: 80px;
      font-size: 30px;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.nav-drawer {
  header {
    display: none;
  }
  .el-drawer__body {
    font-size: 20px;
    background-color: rgb(18, 48, 86);

    // ul {
    //   list-style-type: none;
    //   margin: 0;
    //   display: inline;
    //   li {
    //     list-style: none;
    //     margin: 12px;
    //     padding: 0;
    //     display: block;
    //     a {
    //       text-decoration: none;
    //       color: rgba(255, 255, 255, 0.8);
    //       transition: color 0.15s ease;
    //       display: inline-block;
    //       &:hover {
    //         color: #fff;
    //       }
    //       &.router-link-active {
    //         color: #fff;
    //       }
    //     }
    //   }
    // }
  }
}
.m-nav-menu {
  border-right: none !important;
  .el-menu-item {
    // padding-left: 8px !important;
    margin: 0px !important;
  }
  .el-submenu__title {
    // padding-left: 4px !important;
  }
  .el-menu-item.is-active {
    color: #1890ff;
  }
}
</style>
