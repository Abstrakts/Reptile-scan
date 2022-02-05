<template>
  <StackLayout class="card" width="300">
    <StackLayout class="card-top">
      <FlexboxLayout justifyContent="space-between">
        <Label class="card-title" text="Ajouter un animal" />
        <SVGImage
          @tap="$modal.close"
          class="card-close-icon"
          src="~/assets/images/skeleton/light-close.svg"
          height="15"
          width="15"
        />
      </FlexboxLayout>
    </StackLayout>
    <StackLayout class="card-content">
      <StackLayout class="animalAdded" v-if="animalAdded">
        <StackLayout class="checkIcon">
          <SVGImage src="~/assets/images/skeleton/check.svg" width="60" height="60" />
        </StackLayout>
        <StackLayout>
          <Label text="Animal ajouté avec succès" />
        </StackLayout>
      </StackLayout>
      <StackLayout class="animalNotAdded" v-if="animalNotAdded">
        <Label text="Il manque des informations" />
      </StackLayout>
      <StackLayout v-if="!animalAdded">
        <StackLayout>
          <AbsoluteLayout width="100%">
            <FlexboxLayout justifyContent="center" width="100%">
              <Image class="user-avatar" :src="animal.imageSrc" />
            </FlexboxLayout>
            <SVGImage
              @tap="onSelectSingleTap"
              class="edit-avatar"
              src="~/assets/images/skeleton/pencil.svg"
              width="25"
              height="25"
              top="80"
              left="170"
            />
          </AbsoluteLayout>
          <TextField class="input" hint="Nom" v-model="animal.name" />
          <TextField class="input" hint="Espèce" v-model="animal.species" />
          <TextField class="input" hint="Mutation" v-model="animal.morph" />
          <Label text="Catégorie: " />
          <DropDown
            ref="dropDownList"
            :selectedIndex="animal.category"
            :items="items"
            @selectedIndexChanged="dropDownSelectedIndexChanged"
            class="dropDown"
            row="0"
            colspan="2"
          />
          <TextField class="input" hint="Sexe" v-model="animal.sexe" />
          <GridLayout columns="250, auto" rows="50, 50" height="55">
            <TextField class="input" row="0" col="0" hint="01/01/1999" v-model="animal.birthday"/>
            <SVGImage
              class="setTime"
              src="~/assets/images/actions/clock.svg"
              row="0"
              col="1"
              @tap="setDate"
            />
          </GridLayout>
          <TextField class="input" hint="Commentaire" v-model="animal.comment" />
        </StackLayout>
      </StackLayout>
      <StackLayout v-if="!animalAdded" class="confirm-button" @tap="createNewAnimal">
        <Label class="confirm-text" text="Ajouter" />
      </StackLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { Observable } from "tns-core-modules/data/observable";
import * as imagepicker from "nativescript-imagepicker";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Label } from "tns-core-modules/ui/label";
import { mapActions } from "vuex";
import {
  SelectedIndexChangedEventData,
  ValueList
} from "nativescript-drop-down";

export default {
  data() {
    return {
      animalNotAdded: false,
      animalAdded: false,
      newDate: new Date(),
      items: ["Choisir une catégorie", "snake", "lizar", "insect", "other"],
      animal: {
        name: null,
        species: null,
        morph: null,
        comment: null,
        sexe: null,
        birthday: null,
        imageSrc: "~/assets/images/skeleton/animal.jpg",
        category: 4
      },
      isSingleMode: true
    };
  },
  methods: {
    ...mapActions({
      setAnimals: "animals/setAnimals",
      addAnimal: "animals/addAnimal"
    }),
    async createNewAnimal() {
      if (
        this.animal.name &&
        this.animal.species &&
        this.animal.morph !== null
      ) {
        await this.addAnimal(this.animal);
        this.animalAdded = true;
        this.animalNotAdded = false;
        this.$goto('app', {})
      } else {
        this.animalNotAdded = true;
        this.animalAdded = false;
      }
    },
    onSelectSingleTap() {
      this.isSingleMode = true;
      let context = imagepicker.create({ mode: "single" });
      this.startSelection(context);
    },
    startSelection(context) {
      context
        .authorize()
        .then(() => {
          this.animal.imageSrc = null;
          return context.present();
        })
        .then(selection => {
          this.animal.imageSrc = selection[0]._android;
        })
        .catch(e => {
          console.log(e);
        });
    },
    dropDownSelectedIndexChanged() {
      let index = this.$refs.dropDownList.nativeView.selectedIndex;
      this.animal.category = index;
    },
    formatDate(format) {
      let d = this.newDate.getDate();
      let m = this.newDate.getMonth() + 1;
      let y = this.newDate.getFullYear();

      let day = d.toString();
      let month = m.toString();
      let year = y.toString();

      if (day.length === 1) day = `0${day}`;
      if (month.length === 1) month = `0${month}`;

      return [day, month, year].join('/');
    },
    setDate() {
      this.animal.birthday = this.formatDate(new Date());
      console.log(this.animal.birthday)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";
.edit-avatar {
  background-color: $primary;
  padding: 6;
  border-radius: 60%;
}
.card {
  width: 300;
  .card-top {
    height: 40;
    background-color: $primary;
    padding: 5;
    .card-title {
      margin: 5 0 0 5;
      color: #fff;
    }
    .card-close-icon {
      margin: 5 5 0 0;
    }
  }
  .card-content {
    padding: 5;
    .user-avatar {
      margin: 10 0 0 0;
      border-radius: 60%;
      height: 100;
      width: 100;
      object-fit: cover;
    }
    .animalAdded {
      background-color: #def7ce;
      padding: 10;
      border-radius: 5;
      text-align: center;
      color: #4fb883;
      font-weight: bold;
      .checkIcon {
        text-align: center;
      }
    }
    .animalNotAdded {
      background-color: #ffcece;
      padding: 10;
      border-radius: 5;
      text-align: center;
      color: red;
      font-weight: bold;
    }
    .setTime {
      height: 35;
      width: 35;
      padding: 5;
      background-color: #eee;
      border-radius: 5;
    }
    .input-label {
      margin: 0 0 0 0;
    }
    .input {
      color: #8f8f8f;
      border-bottom-width: 2;
      border-color: #eee;
    }
    .not-editable-input {
      color: rgb(189, 189, 189);
    }
    .confirm-button {
      margin: 10 0 0 0;
      width: 200;
      height: 50;
      color: #fff;
      background-color: $primary;
      border-radius: 5;
      .confirm-text {
        text-align: center;
        font-weight: bold;
        font-size: 20;
        margin: 10 0 0 0;
      }
    }
    .dropDown {
      height: 40;
      padding: 10;
      font-size: 15;
      border-bottom-width: 2;
      border-color: #eee;
    }
  }
}
</style>