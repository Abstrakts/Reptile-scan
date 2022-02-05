<template>
  <StackLayout>
    <GridLayout rows="auto">
      <StackLayout class="card" column="0">
        <Image class="avatar-profil" :src="avatar" stretch="aspectFill"/>
        <StackLayout class="user-informations">
          <Label class="user-name user-title" :text="lastName + ' ' + firstName" />
          <Label class="user-id user-title" :text="'ID-' + clientID" />
        </StackLayout>
        <GridLayout rows="auto, *, auto" class="user-personal-informations">
          <FlexboxLayout row="0" class="info" justifyContent="center" alignItems="center">
            <SVGImage src="~/assets/images/skeleton/mail.svg" width="15" height="15" />
            <Label class="user-email" :text="email" />
          </FlexboxLayout>

          <FlexboxLayout row="1" class="info" justifyContent="center" alignItems="center">
            <SVGImage src="~/assets/images/skeleton/company.svg" width="15" height="15" />
            <Label class="user-siret" :text="siret" />
          </FlexboxLayout>

          
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    clientID : String,
    avatar: String,
    email : String,
    firstName : String,
    lastName : String,
    siret: String
  },
  components: {},
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

TabContentItem {
  height: 100%;
}

.card {
  width: 95%;
  .avatar-profil {
    height: 100;
    width: 100;
    border-radius: 60%;
  }
  .user-informations {
    margin: 10 0 0 0;
  }
  .user-personal-informations {
    margin: 15 0 0 0;
    width: 100%;
    padding: 5;
    border-radius: 5;
  }
  .info {
    text-align: center;
  }
}
.users-pictures {
  margin: 10 0 0 0;
}
.user-title {
  color: $primary;
  font-weight: bold;
  text-align: center;
}
.user-email, .user-siret {
  margin: 0 0 0 10;
}

</style>