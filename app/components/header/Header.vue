<template>
  <FlexboxLayout class="top-bar" justifyContent="space-between">
    <Image class="avatar" :src="avatar" @tap="openDrawer" stretch="aspectFill"/>
    <Label class="pageTitle" :text="getLangState" />
    <Langs icon="~/assets/images/social_icons/light_lang.svg" margin="0 5 0 0" />
  </FlexboxLayout>
</template>

<script>
import Langs from "../skeletons/Langs";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true
    },
    avatar: String,
    openDrawer: {
      type: Function,
      required: true
    }
  },
  components: {
    Langs
  },
  methods: {
    ...mapActions({
      setLangState: "pageTitle/setLangState"
    })
  },
  computed: {
    ...mapGetters({
      getLangState: "pageTitle/getLangState"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

.top-bar {
  height: 60;
  background-color: $primary;
  padding: 5;
  .avatar {
    height: 50;
    width: 50;
    border-radius: 60%;
    margin: 0 0 0 6;
  }
  .pageTitle {
    color: #fff;
    font-size: 20;
    margin: 15 0 0 0;
  }
}
</style>