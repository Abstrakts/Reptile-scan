<template>
  <Page :actionBarHidden="true" >
    <ScrollView>
      <StackLayout class="editProfil">
        <AbsoluteLayout width="100%">
          <FlexboxLayout justifyContent="center" width="100%">
            <Image class="user-avatar" :src="avatarSrc" stretch="aspectFill" />
          </FlexboxLayout>
          <SVGImage
            @tap="onSelectSingleTap"
            class="edit-avatar"
            src="~/assets/images/skeleton/pencil.svg"
            width="25"
            height="25"
            top="80"
            left="190"
          />
        </AbsoluteLayout>
        <StackLayout v-if="isEmpty" class="emptyTextfield">
          <Label text="Les champs prénom et nom sont obligatoires" color="red" />
        </StackLayout>
        <StackLayout>
          <Label class="input-label" text="ID" />
          <TextField class="not-editable-input" :text="user.id" :editable="false" />
          <Label class="input-label" :text="$t('profil.lastname')" />
          <TextField class="input" v-model="user.lastName" />
          <Label class="input-label" :text="$t('profil.firstname')" />
          <TextField class="input" v-model="user.firstName" />
          <Label class="input-label" :text="$t('profil.mail')" />
          <TextField class="not-editable-input" v-model="user.email" :editable="false" />
          <Label class="input-label" :text="$t('profil.phone')" />
          <TextField class="input" v-model="user.phone" />
          <Label class="input-label" :text="$t('profil.address')" />
          <TextField class="input" v-model="user.address" />
          <Label class="input-label" :text="$t('profil.siret')" />
          <TextField class="input" v-model="user.siret" />
          <StackLayout class="confirm-button" @tap="editProfil">
            <Label class="confirm-text" :text="$t('profil.edit_profil')" />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import * as imagepicker from "nativescript-imagepicker";

export default {
  data() {
    return {
      user: [],
      avatarSrc: "~/assets/images/samples/avatar.jpg",
      isEmpty: false,
      loaded: false
    };
  },
  mounted() {
    this.$axios
      .get("/api/user/me")
      .then(response => (this.user = response.data));
  },
  methods: {
    async editProfil() {
      await this.$axios.post("/api/user/me/createProfil", {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
        address: this.user.address,
        siret: this.user.siret,
        avatar: this.avatarSrc
      });
      if (this.user.firstName && this.user.lastName !== null) {
        this.$goto("app", {});
      } else {
        this.isEmpty = true;
      }
    },
    onSelectSingleTap() {
      this.isSingleMode = true;
      let context = imagepicker.create({ mode: "single " });
      this.startSelection(context);
    },
    startSelection(context) {
      context
        .authorize()
        .then(() => {
          this.avatarSrc = null;
          return context.present();
        })
        .then(selection => {
          this.avatarSrc = selection[0]._android;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~/colors.scss";
.emptyTextfield {
  text-align: center;
}
.editProfil {
  margin: 10 0 0 0;
  width: 95%;
  .input-label {
    margin: 5 0 0 0;
  }
  .user-avatar {
    height: 100;
    width: 100;
    border-radius: 60%;
  }
  .edit-avatar {
    background-color: $primary;
    padding: 6;
    border-radius: 60%;
  }
  TextField {
    border-bottom-width: 2;
    border-color: #eee;
    margin: -5 0 0 0;
  }

  TextField:focus {
    border-bottom-width: 2;
    border-color: $primary;
  }
  .input {
    color: $primary;
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
</style>