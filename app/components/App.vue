<template>
  <Page :actionBarHidden="true" @loaded="isLogged">
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent class="sideStackLayout">
        <GridLayout rows="auto, *, auto">
          <AbsoluteLayout>
            <SVGImage
              @tap="onCloseDrawerTap"
              src="~/assets/images/menu/options.svg"
              class="option-icon"
            />
          </AbsoluteLayout>
          <FlexboxLayout class="sideTitleStackLayout" row="0">
            <Profil
              :clientID="user.id"
              :avatar="avatar"
              :email="user.email"
              :firstName="user.firstName"
              :lastName="user.lastName"
            />
          </FlexboxLayout>

          <FlexboxLayout row="2" class="endStackLayout" @tap="onLogoutTap">
            <Label :text="$t('message.logout')" />
            <SVGImage src="~/assets/images/skeleton/logout.svg" height="22" width="22" />
          </FlexboxLayout>
        </GridLayout>
      </StackLayout>
      <GridLayout ~mainContent rows="auto, *, auto">
        <Header row="0" :title="pageTitle" :openDrawer="onOpenDrawerTap" :avatar="avatar" />

        <ContentView row="1">
          <Frame id="content">
            <Home />
          </Frame>
        </ContentView>

        <Footer row="2" @notifs="getTitle" />
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Header from "./header/Header";
import Home from "~/views/Home";
import Footer from "~/components/footer/Footer";
import Profil from "~/components/profil/Profil.vue";
import { tnsOauthLogin } from "../../authServices";
import { tnsOauthLogout } from "../../authServices";
import * as ApplicationSettings from "application-settings";
import permissions from "nativescript-permissions";

export default {
  name: "App",
  data() {
    return {
      pageTitle: this.$t("title.home"),
      user: [],
      avatar: null,
    };
  },
  components: {
    Header,
    Home,
    Footer,
    Profil
  },
  methods: {
    getTitle(title) {
      this.goFullscreen();
      this.$refs.drawer.closeDrawer();
      this.$goto("profil");
    },
    onOpenDrawerTap() {
      this.$refs.drawer.showDrawer();
    },
    onCloseDrawerTap() {
      this.$refs.drawer.closeDrawer();
      this.$goto("profil");
    },
    async isLogged() {
      await this.$axios.get("/api/user/me").then(response => {
        this.user = response.data;
      });
      if (!this.user.avatar) {
        this.avatar = "~/assets/images/samples/avatar.jpg";
      } else {
        this.avatar = this.user.avatar;
      }
      /*if (!this.user.firstName && !this.user.lastName) {
        //this.$goto("profil");
        this.uncomplet = true
        console.log(this.uncomplet)
      }*/
    },
    onLogoutTap() {
      ApplicationSettings.remove("TokenId");
      tnsOauthLogout();
      setTimeout(() => {
        this.$goto("login", {});
      }, 1000);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "../colors.scss";

.sideStackLayout {
  background-color: #fff;
  .option-icon {
    margin: 10 0 0 10;
    height: 25;
    width: 25;
  }

  .sideTitleStackLayout {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20 0;

    label {
      margin-top: 10;
      color: #fff;
      font-size: 18;
    }
  }

  .sideStackLayout {
    label {
      font-size: 16;
      padding: 20 20 0;
    }
  }

  .endStackLayout {
    background-color: $primary;
    justify-content: center;

    label {
      color: #fff;
      text-transform: uppercase;
      font-size: 14;
      padding: 15;
    }
  }
}
</style>
