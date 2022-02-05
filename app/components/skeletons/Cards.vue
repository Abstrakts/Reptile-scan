<template>
  <StackLayout class="card" v-shadow="2" >
    <StackLayout class="card-top">
      <FlexboxLayout>
        <Image class="card-img" :src="picture" @tap="goToLink" stretch="aspectFill"/>
      </FlexboxLayout>
    </StackLayout>
    <StackLayout class="card-container">
      <FlexboxLayout flexDirection="column">
        <StackLayout class="animal-informations">
          <Label class="animal-name" :text="$t('message.animal_name') + name" />
          <Label :text="$t('message.animal_species') + species" />
          <Label :text="$t('message.animal_morph') + morph" />
        </StackLayout>
      </FlexboxLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {
      card_openned: false
    };
  },
  props: {
    picture: String,
    name: String,
    species: String,
    morph: String,
    comment: String,
    age: Number
  },
  methods: {
    goToLink() {
      this.$emit('displayAnimal')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";
.card {
  margin: 10;
  border-radius: 10;
}
.card-top {
  margin: 0 0 0 0;
  background-color: $skeleton_content;
  width: 100%;
  height: 200;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
}
.card-img {
  background-size: cover;
  width: 100%;
  height: 200;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
}
.card-container {
  background-color: $skeleton_content;
  height: 80;
  width: 100%;
  .animal-informations {
    margin: 5 0 0 5;
    .animal-name {
      font-size: 20;
      font-weight: bold;
      color: $primary;
    }
  }
}
.card-arrow {
  margin: -20 5 0 0;
  .down-arrow {
    height: 25;
    width: 25;
    background-color: #f0f0f0;
    border-radius: 60%;
    padding: 5;
  }
}

.card-footer {
  background-color: $skeleton_content;
  width: 100%;
  min-height: 50;
  font-size: 14;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  .animal-description {
    margin: 0 5 0 5;
  }
  .card-end {
    margin: 10 0 0 0;
    background-color: $primary;
    padding: 5;
    border-bottom-left-radius: 10;
    border-bottom-right-radius: 10;
    .animal-sexe {
      width: 25;
      height: 25;
      background-color: #FFF;
      border-radius: 60%;
      padding: 3 2 3 2;
    }
    .animal-age {
      margin: 0 0 0 5;
      color: #fff;
    }
  }
}
</style>