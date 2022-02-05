<template>
  <StackLayout class="card" width="300">
    <StackLayout class="card-top">
      <FlexboxLayout justifyContent="space-between">
        <Label class="card-title" text="Modifier l'animal" />
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
      <StackLayout class="added" v-if="edited">
        <StackLayout class="checkIcon">
          <SVGImage src="~/assets/images/skeleton/check.svg" width="60" height="60" />
        </StackLayout>
        <StackLayout>
          <Label text="Animal edité avec succès" />
        </StackLayout>
      </StackLayout>
      <StackLayout>
        <StackLayout v-if="!edited">
          <AbsoluteLayout width="100%">
            <FlexboxLayout justifyContent="center" width="100%">
              <Image class="user-avatar" :src="imgSrc" width="100" />
            </FlexboxLayout>
            <SVGImage
              class="edit-avatar"
              src="~/assets/images/skeleton/pencil.svg"
              width="25"
              height="25"
              top="80"
              left="170"
            />
          </AbsoluteLayout>
          <TextField class="input" hint="Nom" v-model="newInfos.name" />
          <TextField class="input" hint="Espèce" v-model="newInfos.species" />
          <TextField class="input" hint="Mutation" v-model="newInfos.morph" />
          <DropDown
            ref="dropDownList"
            :selectedIndex="animal.category"
            :items="items"
            @selectedIndexChanged="dropDownSelectedIndexChanged"
            class="dropDown"
            row="0"
            colspan="2"
          />
          <TextField class="input" hint="Sexe" v-model="newInfos.sexe" />
          <GridLayout columns="250, auto" rows="50, 50" height="55">
            <TextField
              hint="Date de naissance"
              class="input"
              v-model="newInfos.birthday"
              row="0"
              col="0"
            />
            <SVGImage class="setTime" src="~/assets/images/actions/clock.svg" row="0" col="1" />
          </GridLayout>
          <TextField class="input" hint="Description" v-model="newInfos.comment" />
        </StackLayout>
      </StackLayout>
      <StackLayout class="confirm-button" v-if="!edited" >
        <Label class="confirm-text" text="Modifier" />
      </StackLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { mapGetters } from "vuex";
import * as imagepicker from "nativescript-imagepicker";
import {
  SelectedIndexChangedEventData,
  ValueList
} from "nativescript-drop-down";

export default {
  data() {
    return {
      edited: false,
      notEdited: false,
      qrcode: "",
      animal: [],
      imgSrc: '',
      items: ["Choisir une catégorie", "snake", "lizar", "insect", "other"],
      newInfos: {
        name: null,
        species: null,
        morph: null,
        sexe: null,
        birthday: null,
        comment: null,
        picture: null,
        category: 4
      }
    };
  },
  computed: {
    ...mapGetters({
      getQrcode: "actions/getQrcode"
    })
  },
  mounted() {
    this.qrcode = this.getQrcode;
    this.$axios
      .get(`/api/user/me/animal/${this.qrcode}`)
      .then(response => (this.animal = response.data));
  },
  methods: {
    editAnimal() {
      if (
        this.newInfos.name &&
        this.newInfos.morph !== null
      ) {
        this.$axios
          .post(
            `/api/user/me/animal/${this.qrcode}/edit`,
            {
              name: this.newInfos.name,
              species: this.newInfos.species,
              morph: this.newInfos.morph,
              sexe: this.newInfos.sexe,
              birthday: this.newInfos.birthday,
              comment: this.newInfos.comment,
              category: this.newInfos.category,
              picture: this.imgSrc
            }
          )
          .then((this.edited = true)((this.notEdited = false)))
          .catch(e => console.log(e));
      } else {
        this.notEdited = true;
        this.edited = false;
      }
    },
    dropDownSelectedIndexChanged() {
      let index = this.$refs.dropDownList.nativeView.selectedIndex;
      this.newInfos.category = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";
.user-avatar {
  border-radius: 60%;
}
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
    .added {
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
    .notAdded {
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
  }
}
</style>