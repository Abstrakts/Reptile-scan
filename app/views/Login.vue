<template>
  <Page :actionBarHidden="true" @navigatingTo="onLoginSuccess" @loaded="managePermissions">
    <GridLayout rows="auto, auto, 100, *">
      <StackLayout row="0">
        <StackLayout margin="10 0 0 0">
          <Langs v-if="!loading" icon="~/assets/images/social_icons/dark_lang.svg" />
        </StackLayout>
        <Image class="logo" src="~/assets/images/logo.png" />
      </StackLayout>

      <StackLayout row="1">
        <Label
          v-if="!loading"
          class="login-title"
          textWrap="true"
          :text="$t('message.login') + ' / ' + $t('message.register')"
        />

        <StackLayout v-if="!loading" @tap="onLoginTap" class="google-button" margin="20 0 0 0">
          <SVGImage class="google-icon" src="~/assets/images/social_icons/google_icon.svg" />
          <label class="google-btn-title" :text="$t('message.google_connect')" />
        </StackLayout>

        <StackLayout v-if="!loading" class="fb-button" margin="20 0 0 0">
          <SVGImage class="fb-icon" src="~/assets/images/social_icons/fb_icon.svg" />
          <label class="fb-btn-title" :text="$t('message.facebook_connect')" />
        </StackLayout>
        <ActivityIndicator busy="true" v-if="loading" margin="100 0 0 0" />
      </StackLayout>

      <StackLayout class="alert" v-if="error" row="3">
        <Label text="Un problème est survenu, veuillez recommencer" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import Langs from "../components/skeletons/Langs";
import { tnsOauthLogin } from "../../authServices";
import * as ApplicationSettings from "application-settings";
import { mapGetters, mapActions } from "vuex";
import * as imagepicker from "nativescript-imagepicker";

export default {
  name: "App",
  data() {
    return {
      idToken: "",
      loading: false,
      user: [],
      error: false
    };
  },
  components: {
    Langs
  },
  mounted() {},
  computed: {
    ...mapGetters({
      getIdToken: "isLogged/getIdToken"
    })
  },
  methods: {
    ...mapActions({
      setIdToken: "isLogged/setIdToken"
    }),
    managePermissions() {
      /*let context = imagepicker.create({
        mode: "single"
      });
      context.authorize();*/
    },
    onLoginTap() {
      const result = tnsOauthLogin("google");
      this.setIdToken(result);
      //console.log(result)
    },
    onLoginSuccess() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        if (
          this.getIdToken !== "" ||
          this.getIdToken === ApplicationSettings.getString("currentToken")
        ) {
          this.loading = true;
          this.$axios({
            method: "post",
            url: "/api/google",
            data: JSON.stringify({
              id_token: this.getIdToken,
              platform: "android"
            }),
            config: {
              headers: {
                "Content-Type": "application/json"
              }
            }
          })
            .then(response => {
              if (response.status === 200) {
                setTimeout(() => {
                  this.$goto("app", {});
                }, 1000);
              }
            })
            .catch(err => {
              //console.log(err);
              this.loading = false;
              this.error = true;
            });
        }
      }, 2000);
    }
  }
};
</script>

<style scoped lang="scss">
.logo {
  margin-top: 100;
  width: 120;
}

.login-title {
  text-align: center;
  margin: 80 0 0 0;
}

.google-button {
  background-color: rgb(241, 241, 241);
  height: 50;
  width: 70%;
  padding: 10;
  border-radius: 5;
  text-align: center;
  .google-icon {
    height: 50;
    width: 50;
    margin: 0 0 0 -155;
  }
  .google-btn-title {
    margin: -25 0 0 45;
  }
}

.fb-button {
  background-color: #3b5998;
  height: 50;
  width: 70%;
  padding: 10;
  border-radius: 5;
  text-align: center;
  .fb-icon {
    height: 50;
    width: 50;
    margin: 0 0 0 -170;
  }
  .fb-btn-title {
    margin: -25 0 0 45;
    color: #fff;
  }
}
.alert {
  background-color: #ffcece;
  padding: 10;
  height: 40;
  border-radius: 5;
  text-align: center;
  color: red;
  font-weight: bold;
  width: 95%;
}
</style>
