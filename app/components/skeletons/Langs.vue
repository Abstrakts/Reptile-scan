<template>
  <FlexboxLayout class="lang-block" >
    <SVGImage @tap="changeLang" class="lang-icon" :src="icon" />
  </FlexboxLayout>
</template>

<script>
import LangsModal from '~/components/modals/Langs' 

export default {
  data() {
    return {
    };
  },
  props: {
    icon: String
  },
  methods: {
    changeLang() {
      this.$showModal(LangsModal)
    }
  },
  mounted() {
    setTimeout(() => {
    }, 1000)
  }
};
</script>

<style lang="scss" scoped>
.lang-block {
  justify-content: flex-end;
  .lang-icon {
    height: 30;
    width: 30;
    margin: 0 5 0 0;
  }
}
</style>