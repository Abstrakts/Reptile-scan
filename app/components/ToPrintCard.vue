<template>
  <StackLayout>
    <StackLayout class="card">
      <FlexboxLayout>
        <StackLayout>
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=080620-5ede3a177a6aa-rscan"
            height="120"
            width="120"
          />
        </StackLayout>
        <StackLayout class="cardInfos">
          <Label class="title" text="ID:06205ede3a177a6aa-rscan" :textWrap="true" />
          <FlexboxLayout>
            <Label class="title" text="Nom: " />
            <Label text="Nagini" />
          </FlexboxLayout>
          <FlexboxLayout>
            <Label class="title" text="Espèce: " />
            <Label text="Boa Constrictor" />
          </FlexboxLayout>
          <FlexboxLayout>
            <Label class="title" text="Mutation: " />
            <Label text="Craw Cay" />
          </FlexboxLayout>
          <FlexboxLayout>
            <Label class="title" text="Sexe: " />
            <Label text="Femelle" />
          </FlexboxLayout>
          <FlexboxLayout>
            <Label class="title" text="Né le: " />
            <Label text="01/01/2020" />
          </FlexboxLayout>
        </StackLayout>
      </FlexboxLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { Printer } from "nativescript-printer";

export default {
  date() {
    return {
      qrcode: "",
      qrcodeImg: ""
    };
  },
  props: ["id", "name", "species", "morph", "sexe", "birthday"],
  methods: {
    print() {
      let printer = new Printer();
      printer.printScreen().then(
        success => {
          console.log(success);
        },
        error => {
          console.lor(error);
        }
      );
    }
  },
  created() {
    this.qrcodeImg =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      this.id;
    //this.qrcode = this.id.substr(62)
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

.page {
  margin: 10;
  .card {
    margin: 0 0 0 10;
    padding: 2;
    height: 130;
    width: 95%;
    border-width: 2;
    border-color: black;
  }
  .cardInfos {
    margin: 2 0 0 5;
    .title {
      font-weight: bold;
      color: #000;
    }
  }
  .backButton {
    background-color: $primary;
  }
}
</style>