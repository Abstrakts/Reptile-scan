<template>
  <GridLayout columns="*, *" rows="auto, auto, auto">
    <StackLayout class="action-button" row="0" col="0" @tap="openModal(modals.MealAction) ">
      <SVGImage class="action-icon" src="~/assets/images/actions/food.svg" />
      <Label :text="$t('actions.meals')" />
    </StackLayout>
    <StackLayout class="action-button" row="0" col="1">
      <SVGImage
        class="action-icon"
        src="~/assets/images/actions/terrarium.svg"
        @tap="openModal(modals.HabitatAction)"
      />
      <Label :text="$t('actions.habitat')" />
    </StackLayout>

    <StackLayout class="action-button" row="1" col="0">
      <SVGImage
        class="action-icon"
        src="~/assets/images/actions/moult.svg"
        @tap="openModal(modals.MoultAction)"
      />
      <Label :text="$t('actions.moults')" />
    </StackLayout>
    <StackLayout class="action-button" row="1" col="1">
      <SVGImage
        class="action-icon"
        src="~/assets/images/actions/coupling.svg"
        @tap="openModal(modals.CouplingAction)"
      />
      <Label :text="$t('actions.coupling')" />
    </StackLayout>

    <StackLayout class="action-button" row="2" col="0">
      <SVGImage
        class="action-icon"
        src="~/assets/images/actions/egg.svg"
        @tap="openModal(modals.LayingAction)"
      />
      <Label :text="$t('actions.eggLaying')" />
    </StackLayout>
    <StackLayout class="action-button" row="2" col="1">
      <SVGImage
        class="action-icon"
        src="~/assets/images/actions/notes.svg"
        @tap="openModal(modals.NotesAction)"
      />
      <Label :text="$t('actions.notes')" />
    </StackLayout>
  </GridLayout>
</template>

<script>
import AddMeal from "~/components/modals/actions/AddMeal";
import AddHabitat from "~/components/modals/actions/AddHabitat";
import AddMoult from "~/components/modals/actions/AddMoult";
import AddCoupling from "~/components/modals/actions/AddCoupling";
import AddEggLaying from "~/components/modals/actions/AddEggLaying";
import AddNotes from "~/components/modals/actions/AddNotes";

export default {
  data() {
    return {
      modals: {
        MealAction: AddMeal,
        HabitatAction: AddHabitat,
        MoultAction: AddMoult,
        CouplingAction: AddCoupling,
        LayingAction: AddEggLaying,
        NotesAction: AddNotes
      },
      qrcode: this.$parent.qrcode
    };
  },
  components: {
    AddMeal,
    AddHabitat,
    AddMoult,
    AddCoupling,
    AddEggLaying,
    AddNotes
  },
  mounted() {
    
  },
  methods: {
    openModal(args) {
      this.$showModal(args);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

.action-button {
  text-align: center;
  font-weight: bold;
  color: $primary;
  .action-icon {
    height: 70;
    width: 70;
    padding: 10;
    border-radius: 10;
    background-color: #eee;
  }
}
</style>