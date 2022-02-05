<template>
  <StackLayout class="card" width="300">
    <StackLayout class="card-top">
      <FlexboxLayout justifyContent="space-between">
        <Label class="card-title" text="Ajouter un couple" />
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
      <StackLayout class="added" v-if="added">
        <StackLayout class="checkIcon">
          <SVGImage src="~/assets/images/skeleton/check.svg" width="60" height="60" />
        </StackLayout>
        <StackLayout>
          <Label text="Couple ajouté avec succès" />
        </StackLayout>
      </StackLayout>
      <StackLayout class="notAdded" v-if="notAdded">
        <Label text="Il manque des informations" />
      </StackLayout>
      <StackLayout v-if="!added">
        <StackLayout>
          <GridLayout columns="250, auto" rows="50, 50" height="55">
            <TextField class="input" hint="Date" row="0" col="0" v-model="animal.date" />
            <SVGImage
              class="setTime"
              src="~/assets/images/actions/clock.svg"
              row="0"
              col="1"
              @tap="setDate"
            />
          </GridLayout>
          <TextField class="input" hint="Compagnon" v-model="animal.companion" />
          <TextField class="input" hint="Commentaire" v-model="animal.comment" />
        </StackLayout>
      </StackLayout>
      <StackLayout class="confirm-button" v-if="!added" @tap="addMoult">
        <Label class="confirm-text" text="Ajouter" />
      </StackLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      added: false,
      notAdded: false,
      qrcode: "",
      newDate: new Date(),
      animal: {
        date: null,
        companion: null,
        comment: null
      }
    };
  },
  mounted() {
    this.qrcode = this.getQrcode;
    console.log(this.qrcode);
  },
  computed: {
    ...mapGetters({
      getQrcode: "actions/getQrcode"
    })
  },
  methods: {
    addMoult() {
      if (this.animal.date && this.animal.companion !== null) {
        this.$axios.post(
          `/api/user/me/animal/${this.qrcode}/addCouplings`,
          {
            date: this.animal.date,
            companion: this.animal.companion,
            comment: this.animal.comment
          }
        );
        (this.added = true), (this.notAdded = false);
      } else {
        (this.added = false), (this.notAdded = true);
      }
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

      return [day, month, year].join("/");
    },
    setDate() {
      this.animal.date = this.formatDate(new Date());
    }
  }
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