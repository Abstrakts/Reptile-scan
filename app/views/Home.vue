<template>
  <Page :actionBarHidden="true" @loaded="isLogged">
    <ScrollView>
      <StackLayout @swipe="search">
        <StackLayout>
          <SearchBar
            v-if="barState"
            color="#000"
            backgroundColor="#F7F7F7"
            textFieldHintColor="whitesmoke"
            textFieldBackgroundColor="#FFF"
          />
          <FlexboxLayout row="2" class="profil-animals-infos" justifyContent="space-between">
            <FlexboxLayout class="animal-count">
              <Label class="animal-count-number" :text="animalsCategory.isLizard" />
              <SVGImage class="animal-count-icon" src="~/assets/images/skeleton/lizard.svg" />
            </FlexboxLayout>
            <FlexboxLayout class="animal-count">
              <Label class="animal-count-number" :text="animalsCategory.isSnake" />
              <SVGImage class="animal-count-icon" src="~/assets/images/skeleton/snake.svg" />
            </FlexboxLayout>
            <FlexboxLayout class="animal-count">
              <Label class="animal-count-number" :text="animalsCategory.isInsect" />
              <SVGImage class="animal-count-icon" src="~/assets/images/skeleton/spider.svg" />
            </FlexboxLayout>
            <FlexboxLayout class="animal-count">
              <Label class="animal-count-number" :text="animalsCategory.isOther" />
              <SVGImage class="animal-count-icon" src="~/assets/images/skeleton/insect.svg" />
            </FlexboxLayout>
          </FlexboxLayout>

          <StackLayout class="alert" v-if="!profilCompleted">
            <FlexboxLayout justifyContent="space-between">
              <StackLayout @tap="$goto('profil')">
                <Label text="Completer mon profil" />
              </StackLayout>
              <StackLayout>
                <SVGImage
                  @tap="profilCompleted = true"
                  src="~/assets/images/skeleton/pencil.svg"
                  stretch="none"
                  height="15"
                  width="15"
                />
              </StackLayout>
            </FlexboxLayout>
          </StackLayout>

          <FlexboxLayout flexDirection="column-reverse">
            <FlexboxLayout v-for="(item, i) in animals" :key="i">
              <Cards
                @displayAnimal="displayAnimal(i)"
                :picture="item.picture"
                :name="item.name"
                :species="item.species"
                :morph="item.morph"
                :comment="item.comment"
              />
            </FlexboxLayout>
          </FlexboxLayout>
          <StackLayout v-if="animals.length < 1">
            <NoCards />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Cards from "~/components/skeletons/Cards";
import NoCards from "~/components/skeletons/NoCards";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      title: this.$t("title.home"),
      animals: [],
      age: null,
      user: [],
      animalsCategory: {
        isSnake: 0,
        isLizard: 0,
        isInsect: 0,
        isOther: 0
      },
      profilCompleted: true
    };
  },
  components: {
    Cards,
    NoCards
  },
  methods: {
    ...mapActions({
      setLangState: "pageTitle/setLangState",
      setbar: "search/setBarState",
      setAnimals: "animals/setAnimals"
    }),
    search() {
      this.setbar(false);
    },
    async isLogged() {
      await this.$axios.get("/api/user/me").then(response => {
        this.user = response.data;
      });
      setTimeout(() => {
        for (let value of this.animals) {
          if (value.category === 1) {
            this.animalsCategory.isSnake++;
          } else if (value.category === 2) {
            this.animalsCategory.isLizard++;
          } else if (value.category === 3) {
            this.animalsCategory.isInsect++;
          } else if (value.category === 4) {
            this.animalsCategory.isOther++;
          } else if (value.category === null) {
            this.animalsCategory.isOther++;
          }
        }
        if (!this.user.firstName && !this.user.lastName) {
          this.profilCompleted = false;
        }
      }, 1000);
    },
    displayAnimal(i) {
      let animal = this.animals[i];
      this.$goto("animalProfil", {
        props: {
          id: animal.qrcode,
          name: animal.name,
          birthday: animal.birthday,
          species: animal.species,
          morph: animal.morph,
          sexe: animal.sexe,
          comment: animal.comment,
          picture: animal.picture
        },
        frame: "content"
      });
    }
  },
  created() {
    this.setLangState(this.title);
  },
  async mounted() {
    await this.setAnimals();
    this.animals = this.getAnimals;
  },
  computed: {
    ...mapGetters({
      barState: "search/getBarState",
      getAnimals: "animals/getAnimals"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

TabStrip {
  background-color: $primary;
}

.profil-animals-infos {
  width: 95%;
  margin: 10 0 0 0;
  .animal-count {
    background-color: #fafafa;
    border-radius: 5;
    padding: 5;
    .animal-count-icon {
      height: 20;
      width: 20;
    }
    .animal-count-number {
      color: $primary;
      margin: 0 10 0 0;
    }
  }
}

.alert {
  background-color: #ffcece;
  padding: 10;
  border-radius: 5;
  text-align: center;
  color: red;
  font-weight: bold;
  width: 95%;
  margin-top: 5;
}
</style>