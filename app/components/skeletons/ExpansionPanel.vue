<template>
  <StackLayout class="card" width="100%">
    <StackLayout @tap="expand" class="card-top">
      <FlexboxLayout justifyContent="space-between">
        <Label class="title" :text="category" />
        <SVGImage class="icon" :src="'~/assets/images/skeleton/' + icon" />
      </FlexboxLayout>
    </StackLayout>
    <StackLayout v-if="opened" class="card-content">
      <template>
        <ScrollView>
          <slot name="content"></slot>
        </ScrollView>
      </template>
    </StackLayout>
  </StackLayout>
</template>

<script>
import DetailList from "~/components/profil/DetailList";

export default {
  data() {
    return {
      opened: false,
      icon: "plus.svg"
    };
  },
  methods: {
    expand() {
      this.opened = !this.opened;
      if (this.opened) {
        this.icon = "minimize.svg";
      } else {
        this.icon = "plus.svg";
      }
    }
  },
  components: {
    DetailList
  },
  props: {
    category: String,
    test: String
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

.card {
  margin: 10 0 0 0;
  width: 100%;
  .card-top {
    background-color: $primary;
    width: 100%;
    height: 25;
    padding: 2 5 2 5;
    border-bottom-width: 3px;
    border-bottom-color: #eee;
    .title {
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
    }
    .icon {
      height: 15;
      width: 15;
    }
  }
  .card-content {
    width: 100%;
    background-color: #eee;
    max-height: 200;
  }
  .list-view {
    width: 100%;
    height: 20;
    background-color: #eee;
  }
}
</style>