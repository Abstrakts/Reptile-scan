<template>
  <Page :actionBarHidden="true">
    <ScrollView>
      <StackLayout class="card">
        <AbsoluteLayout>
          <Image class="animal-picture" :src="picture" stretch="aspectFill" @tap="clicked" />
          <StackLayout class="animal-edit" top="175" left="280">
            <SVGImage
              @tap="printCard"
              src="~/assets/images/skeleton/print.svg"
              height="25"
              width="25"
            />
          </StackLayout>
        </AbsoluteLayout>
        <FlexboxLayout id="printCard" class="toPrintCard">
          <StackLayout>
            <Image :src="qrcode" height="100" width="100" />
          </StackLayout>
          <StackLayout class="animal_informations">
            <FlexboxLayout>
              <Label class="title" text="Nom: " />
              <Label :text="name" />
            </FlexboxLayout>
            <FlexboxLayout>
              <Label class="title" text="Espèce: " />
              <Label :text="species" />
            </FlexboxLayout>
            <FlexboxLayout>
              <Label class="title" text="Mutation: " />
              <Label :text="morph" />
            </FlexboxLayout>
            <FlexboxLayout>
              <Label class="title" text="Sexe: " />
              <Label :text="sexe" />
            </FlexboxLayout>
            <FlexboxLayout>
              <Label class="title" text="Né(e) le: " />
              <Label :text="birthday" />
            </FlexboxLayout>
          </StackLayout>
        </FlexboxLayout>

        <Tabs
          v-show="!click"
          :qrcode="qrcode"
          :animalId="id"
          :animalName="name"
          :animalSpecies="species"
          :animalMorph="morph"
          :animalSexe="sexe"
          :animalBirthday="birthday"
          :animalComment="comment"
        />
        <StackLayout class="printSheet">
          <Label text="Imprimer la fiche" />
        </StackLayout>
        <StackLayout class="deleteAnimal" @tap="deleteAnimal">
          <Label text="Supprimer l'animal" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Tabs from "~/components/profil/Tabs";
import EditAnimal from "~/components/modals/actions/EditAnimal";
import { Printer } from "nativescript-printer";
import { viewMatchesModuleContext } from 'tns-core-modules/ui/frame/frame';

export default {
  data() {
    return {
      click: false,
      qrcode: ""
    };
  },
  props: [
    "id",
    "name",
    "birthday",
    "species",
    "morph",
    "sexe",
    "comment",
    "picture"
  ],
  created() {
    this.qrcode =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      this.id;
  },
  mounted() {},
  methods: {
    editAnimal() {
      this.$showModal(EditAnimal);
    },
    clicked() {
      this.click = true;
    },
    goToPrint() {
      this.$goto("toprintcard", {
        props: {
          id: this.qrcode,
          name: this.name,
          species: this.species,
          morph: this.morph,
          sexe: this.sexe,
          birthday: this.birthday
        },
        frame: "content"
      });
    },
    deleteAnimal() {
      confirm({
        title: `Supprimer ${this.name}`,
        message: `Si vous supprimez cet animal, il n'apparaitra plus dans votre liste.`,
        okButtonText: "Supprimer",
        cancelButtonText: "Retour"
      }).then(result => {
        this.$axios
          .post(`/api/user/me/animal/${this.id}/remove`)
          .then(this.$goto("home"));
      });
    },
    printCard(args) {
      let printer = new Printer();
      printer.printScreen({
        view: args.object.page.getViewById("printCard"),        
      })
    }
  },
  components: {
    Tabs
  }
};
</script>

<style lang="scss" scoped >
@import "~/colors.scss";
.card {
  width: 95%;
  .animal-picture {
    border-radius: 10;
    background-size: cover;
    width: 95%;
    height: 200;
    margin: 10 0 0 8;
  }
  .animal-edit {
    background-color: $primary;
    padding: 10;
    border-radius: 60%;
  }
  .deleteAnimal {
    background-color: #ff6b66;
    height: 40;
    width: 90%;
    color: #fff;
    padding: 10;
    text-align: center;
    border-radius: 5;
  }
  .printSheet {
    background-color: $primary;
    height: 40;
    width: 90%;
    color: #fff;
    padding: 10;
    text-align: center;
    border-radius: 5;
    margin: 0 0 5 0;
  }
}
.animal_informations {
  margin: 0 0 0 10;
  .title {
    color: $primary;
    font-weight: bold;
  }
}
.toPrintCard {
  border-width: 2;
  border-color: $primary;
  padding: 5;
  width: 600%;
  margin: 10 0 0 0;
}
</style>