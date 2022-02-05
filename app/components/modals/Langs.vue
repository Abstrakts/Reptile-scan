<template>
  <StackLayout class="card">
    <StackLayout class="card-top">
      <FlexboxLayout justifyContent="space-between">
        <Label class="card-title" :text="$t('modal.title')" />
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
      <FlexboxLayout flexDirection="column">
        <StackLayout class="card-icon">
          <SVGImage src="~/assets/images/skeleton/translate.svg" height="100" />
        </StackLayout>

        <StackLayout class="langs-description" padding="5">
          <Label :textWrap="true" :text="$t('modal.description')" />
        </StackLayout>

        <FlexboxLayout class="radiogroup" justifyContent="center" alignItem="center">
          <SVGImage
            :class="[activeLang === 'fr' ? 'flag-icon active' : 'flag-icon']"
            src="~/assets/images/social_icons/fr_FR.svg"
            @tap="setLanguage('fr')"
          />
          <SVGImage
            :class="[activeLang === 'en' ? 'flag-icon active' : 'flag-icon']"
            src="~/assets/images/social_icons/en_EN.svg"
            @tap="setLanguage('en')"
          />
          <SVGImage
            :class="[activeLang === 'de' ? 'flag-icon active' : 'flag-icon']"
            src="~/assets/images/social_icons/de_DE.svg"
            @tap="setLanguage('de')"
          />
          <SVGImage
            :class="[activeLang === 'es' ? 'flag-icon active' : 'flag-icon']"
            src="~/assets/images/social_icons/es_ES.svg"
            @tap="setLanguage('es')"
          />
        </FlexboxLayout>
      </FlexboxLayout>
    </StackLayout>
    <StackLayout class="card-footer">
      <StackLayout class="close-button" @tap="reloadApp">
        <Label margin="8 0 0 0" :text="$t('modal.reload')" />
      </StackLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { exit } from "nativescript-exit";
import { setString, getString } from "@nativescript/core/application-settings";

export default {
  data() {
    return {
      activeLang: this.$i18n.locale,
      currentLang: "fr"
    };
  },
  methods: {
    reloadApp() {
      this.$i18n.locale = this.currentLang;
      setString("language", this.currentLang);
      setTimeout(() => {
        exit();
      }, 200);
    },
    setLanguage(lang) {
      this.activeLang = lang;
      this.currentLang = lang;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

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
    .card-icon {
      margin: 15 0 0 0;
    }
    .radiogroup {
      margin: 15 0 0 0;
      .flag-icon {
        height: 30;
        width: 30;
        margin: 0 2 0 2;
        opacity: 0.3;
        &.active {
          opacity: 1;
        }
      }
    }
    .langs-description {
      text-align: center;
      margin: 15 0 0 0;
    }
  }
  .card-footer {
    height: 45;
    padding: 5;
    width: 100%;
    margin: 15 0 0 0;
    padding: 5;
    .close-button {
      color: #fff;
      text-align: center;
      height: 35;
      background-color: $primary;
    }
  }
}
</style>