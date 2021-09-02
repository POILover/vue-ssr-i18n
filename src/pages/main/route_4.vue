<template>
  <div>
    <div v-html="route4Template"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  asyncData({ store, route, i18n }) {
    const pathMatch = route.params.pathMatch;
    return store.dispatch("SET_ROUTE4_CONTENT", { pathMatch, i18n });
  },
  computed: {
    ...mapState(["route4Template"]),
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}

table.myTable {
  margin: 0 auto;
}

ol.content-list {
  padding: 20px;
}

.product-detail-container {
  margin-top: 14px;
  background-color: white;
  padding-bottom: 30px;
  overflow: hidden; //overflow hidden 防止上下两个div margin合并
  .title-container {
    background-color: #eee;
    overflow: hidden;

    h2.title {
      font-size: 38px;
      color: #004e81;
    }

    p.describe {
      font-size: 20px;
      line-height: 26px;
      font-weight: 400;
      color: #50565b;
    }
  }

  .content-container {
    h3.content-title {
      font-size: 24px;
      color: #004e81;
      margin: 40px 0;

      &:before {
        display: inline-block;
        width: 16px;
        height: 24px;
        vertical-align: bottom;
        background: #ccc;
        margin-right: 10px;
        content: "";
      }
    }

    p.content-para {
      font-size: 20px;
      line-height: 26px;
      font-weight: 400;
      color: #50565b;
    }

    .content-img-container {
      width: 100%;

      img {
        width: 100%;
        margin-bottom: 10px;
      }

      .content-img-title {
        text-align: center;
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
    .content-img-title {
      text-align: center;
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
