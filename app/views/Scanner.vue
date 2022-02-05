<template>
  <Page :actionBarHidden="true">
    <BarcodeScanner
      row="1"
      height="300"
      formats="QR_CODE, EAN_13, UPC_A"
      beepOnScan="true"
      reportDuplicates="true"
      preferFrontCamera="false"
      v-if="isIOS"
    ></BarcodeScanner>
  </Page>
</template>

<script>
import { isIOS } from "tns-core-modules/platform";
import { BarcodeScanner } from "nativescript-barcodescanner";
export default {
  data() {
    return {
      isIOS,
      qrcode: "",
      animal: []
    };
  },
  mounted() {
    this.scan(true);
  },
  methods: {
    scan(front) {
      let that = this;
      new BarcodeScanner()
        .scan({
          cancelLabel: "EXIT. Also, try the volume buttons!",
          cancelLabelBackgroundColor: "#333333",
          message: "Use the volume buttons for extra light",
          preferFrontCamera: false,
          showFlipCameraButton: true,
          showTorchButton: true,
          torchOn: false,
          resultDisplayDuration: 500,
          beepOnScan: true,
          openSettingsIfPermissionWasPreviouslyDenied: true
        })
        .then(
          function(result) {
            that.$axios
              .get(`/api/user/me/animal/${result.text}`)
              .then(response => {
                that.animal = response.data;
                let animal = that.animal;
                that
                  .$goto("animalProfil", {
                    props: {
                      id: result.text,
                      name: animal.name,
                      birthday: animal.birthday,
                      species: animal.species,
                      morph: animal.morph,
                      sexe: animal.sexe,
                      comment: animal.comment,
                      picture: animal.picture
                    },
                    frame: "content"
                  })
                  .catch(e => {
                    console.log(e);
                  });
                setTimeout(() => {
                  console.log(that.animal);
                }, 1000);
              });
          },
          function(errorMessage) {
            console.log("No scan. " + errorMessage);
            that.$goto('home')
          }
        )
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>