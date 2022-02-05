<template>
  <StackLayout class="tabs">
    <FlexboxLayout justifyContent="space-between">
      <StackLayout @tap="tabsIndex = false" class="tab-buttons">
        <Label text="Fiche de suivi" />
      </StackLayout>
      <StackLayout @tap="tabsIndex = true" class="tab-buttons">
        <Label text="Actions" />
      </StackLayout>
    </FlexboxLayout>

    <StackLayout v-if="!tabsIndex" class="tabs-cards">
      

      <StackLayout>
        <AnimalSheet />
      </StackLayout>
    </StackLayout>

    <StackLayout v-if="tabsIndex" class="tabs-cards">
      <FlexboxLayout>
        <StackLayout>
          <AnimalActions />
        </StackLayout>
      </FlexboxLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import AnimalSheet from "~/components/profil/animalSheet";
import AnimalActions from "~/components/profil/animalActions";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tabsIndex: false,
      qrcode: this.qrcode
    };
  },
  components: {
    AnimalSheet,
    AnimalActions
  },
  methods: {
    ...mapActions({
      setQrcode: "actions/setQrcode"
    })
  },
  computed: {},
  props: {
    qrcode: String,
    animalId: String,
    animalName: String,
    animalSpecies: String,
    animalMorph: String,
    animalSexe: String,
    animalBirthday: String
  },
  mounted() {
    let animalId = this.qrcode.substr(62);
    this.setQrcode(animalId);
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

.tabs {
  .tab-buttons {
    background-color: $primary;
    width: 100%;
    text-align: center;
    padding: 10;
    color: #fff;
    margin: 10;
    border-radius: 5;
    &.active {
      background-color: #337c57;
    }
  }
  .tabs-cards {
    width: 95%;
    padding: 10;
    background-color: #fafafa;
  }
}
</style>