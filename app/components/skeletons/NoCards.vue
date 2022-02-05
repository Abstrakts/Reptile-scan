<template>
  <StackLayout class="card" v-shadow="2">
    <StackLayout class="card-container" @tap="addNewAnimal">
      <SVGImage class="no-cards-icon" src="~/assets/images/skeleton/no-cards-plus.svg" />
      <Label class="no-cards-text" :text="$t('message.no_cards_start')" />
    </StackLayout>
  </StackLayout>
</template>

<script>
import NewAnimal from "~/components/modals/actions/NewAnimal";

export default {
  components: {
    NewAnimal
  },
  methods: {
    addNewAnimal() {
      this.$showModal(NewAnimal);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";
.card {
  margin: 10;
  border-radius: 10;
  padding: 10 0 10 0;
  background-color: #fafafa;
  .card-container {
    width: 100%;
    .no-cards-icon {
      height: 60;
    }
    .no-cards-text {
      text-align: center;
      color: rgb(189, 189, 189);
    }
  }
}
</style>