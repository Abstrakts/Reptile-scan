<template>
  <StackLayout>
    <ExpansionPanel category="Repas" v-slot:content>
      <FlexboxLayout flexDirection="column-reverse">
        <DetailList v-for="(item, i) in meals" :key="i"
          :date="item.date"
          :quantity="item.quantity"
          :prey="item.prey"
          :weight="item.weight"
          :comment="item.comment"
        />
      </FlexboxLayout>
    </ExpansionPanel>
    <ExpansionPanel category="Habitat" v-slot:content>
      <FlexboxLayout flexDirection="column-reverse">
        <DetailList v-for="(item, i) in habitat" :key="i"
          :date="item.date"
          :comment="item.comment"
        />
      </FlexboxLayout>
    </ExpansionPanel>
    <ExpansionPanel category="Mues" v-slot:content>
      <FlexboxLayout flexDirection="column-reverse">
        <DetailList v-for="(item, i) in moults" :key="i"
          :date="item.date"
          :length="item.length"
          :comment="item.comment"
        />
      </FlexboxLayout>
    </ExpansionPanel>
    <ExpansionPanel category="Accouplements" v-slot:content>
      <FlexboxLayout flexDirection="column-reverse">
        <DetailList v-for="(item, i) in couplings" :key="i"
          :date="item.date"
          :companion="item.companion"
          :comment="item.comment"
        />
      </FlexboxLayout>
    </ExpansionPanel>
    <ExpansionPanel category="Pontes" v-slot:content>
      <FlexboxLayout flexDirection="column-reverse">
        <DetailList v-for="(item, i) in layings" :key="i"
          :date="item.date"
          :quantity="item.quantity"
          :comment="item.comment"
        />
      </FlexboxLayout>
    </ExpansionPanel>
    <ExpansionPanel category="Notes" v-slot:content>
      <FlexboxLayout flexDirection="column-reverse">
        <DetailList v-for="(item, i) in notes" :key="i"
          :date="item.date"
          :comment="item.comment"
        />
      </FlexboxLayout>
    </ExpansionPanel>
  </StackLayout>
</template>

<script>
import ExpansionPanel from "~/components/skeletons/ExpansionPanel";
import DetailList from "~/components/profil/DetailList";

export default {
  data() {
    return {
      meals: [],
      habitat: [],
      moults: [],
      couplings: [],
      layings: [],
      notes: [],
      qrcode: this.$parent.qrcode.substr(62)
    };
  },
  components: {
    ExpansionPanel,
    DetailList
  },
  methods: {},
  async mounted() {
    //let animalId = this.qrcode.substr(62)
    const requestLink = `/api/user/me/animal/${this.qrcode}`
    const meals = await this.$axios
      .get(`${requestLink}/meals`)
    this.meals = meals.data

    const habitat = await this.$axios
      .get(`${requestLink}/habitat`)
    this.habitat = habitat.data

    const moults = await this.$axios
      .get(`${requestLink}/moults`)
    this.moults = moults.data

    const couplings = await this.$axios
      .get(`${requestLink}/couplings`)
    this.couplings = couplings.data

    const layings = await this.$axios
      .get(`${requestLink}/layings`)
    this.layings = layings.data

    const notes = await this.$axios
      .get(`${requestLink}/notes`)
    this.notes = notes.data
  },
};
</script>

<style lang="scss" scoped>
</style>