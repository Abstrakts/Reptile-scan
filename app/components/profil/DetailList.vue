<template>
  <FlexboxLayout class="list-detail" justifyContent="space-between">
    <Label :text="date" />
    <Label :text="quantity" />
    <Label :text="prey" />
    <Label :text="weight" />
    <Label :text="length" />
    <Label :text="companion" />
    <Label :text="comment" />
    <Label :text="action" />
  </FlexboxLayout>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    date: String,
    quantity: Number,
    prey: String,
    weight: String,
    length: String,
    companion: String,
    comment: String,
    action: String
  }
};
</script>

<style lang="scss" scoped>
.list-detail {
  padding: 5;
  border-bottom-width: 2px;
  border-bottom-color: #111;
}
</style>