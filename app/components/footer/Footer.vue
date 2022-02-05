<template>
  <StackLayout class="footer">
    <FlexboxLayout flexDirection="row" justifyContent="space-around" alignItems="center">
      <StackLayout @tap="goToPage('home')">
        <SVGImage src="~/assets/images/menu/home.svg" height="30" width="30" />
      </StackLayout>
      <StackLayout @tap="search" >
        <SVGImage src="~/assets/images/menu/search.svg" height="30" width="30" />
      </StackLayout>
      <StackLayout  @tap="addNewAnimal">
        <SVGImage class="add-button" src="~/assets/images/menu/add.svg" />
      </StackLayout>
      <StackLayout @tap="goToPage('scanner')">
        <SVGImage src="~/assets/images/menu/qrcode.svg" height="30" width="30" />
      </StackLayout>
      <StackLayout @tap="goToPage('notifications')">
        <SVGImage src="~/assets/images/menu/notifications.svg" height="30" width="30" />
      </StackLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import { mapActions } from "vuex";
import NewAnimal from '~/components/modals/actions/NewAnimal'

export default {
  name: "Footer",
  data() {
    return {};
  },
  props: {},
  components: {
    NewAnimal
  },
  methods: {
    ...mapActions({
      setLangState: "pageTitle/setLangState",
      setbar: "search/setBarState"
    }),
    search() {
      this.setbar(true);
    },
    goToPage(title) {
      this.setLangState(this.$t(`title.${title}`))
      this.$goto(title);
    },
    addNewAnimal() {
      this.$showModal(NewAnimal)
    }
  },
  mounted() {
    setTimeout(() => {}, 1000);
  }
};
</script>

<style scoped lang="scss">
@import "~/colors.scss";
.add-button {
  background-color: $primary;
  height: 50;
  width: 50;
  border-radius: 60%;
  padding: 10;
}
.footer {
  padding: 10 0 10 0;
  background-color: #fcfcfc;
}
</style>
