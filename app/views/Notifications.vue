<template>
  <Page :actionBarHidden="true">
    <GridLayout orientation="vertical" rows="auto, *">
      <RadListView
        ref="listView"
        for="item in itemList"
        swipeActions="true"
        @itemSwipeProgressStarted="onSwipeStarted"
      >
        <v-template>
          <StackLayout class="notifications-bg" orientation="vertical">
            <FlexboxLayout>
              <StackLayout>
                <Image class="animal-picture" :src="item.image" />
              </StackLayout>
              <StackLayout class="animal-infos">
                <FlexboxLayout>
                  <Label class="animal-name" :text="item.name + ' : '" />
                  <Label class="notification-type" :text="item.notification" />
                </FlexboxLayout>
                <Label
                  :text="item.time"
                  class="descriptionLabel"
                />
              </StackLayout>
            </FlexboxLayout>
          </StackLayout>
        </v-template>

        <v-template name="itemswipe">
          <GridLayout class="notifications-action" columns="auto, *, auto">
            <StackLayout
              width="40"
              id="mark-view"
              col="0"
              class="keep-action"
              orientation="horizontal"
              @tap="onLeftSwipeClick"
            >
              <SVGImage
                class="keep-icon"
                src="~/assets/images/skeleton/reload.svg"
                height="25"
                width="25"
              />
            </StackLayout>
            <StackLayout
              width="40"
              id="delete-view"
              col="2"
              class="delete-action"
              orientation="horizontal"
              @tap="onRightSwipeClick"
            >
              <SVGImage
                class="delete-icon"
                src="~/assets/images/skeleton/trash.svg"
                height="25"
                width="25"
              />
            </StackLayout>
          </GridLayout>
        </v-template>
      </RadListView>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          image: "~/assets/images/skeleton/animal.jpg",
          name: "Jeffrey",
          notification: this.$t('notifications.type.eat'),
          time: this.$t('notifications.notification_time_format') + ' 6 ' + this.$t('notifications.notification_time')
        },
        {
          image: "~/assets/images/skeleton/animal.jpg",
          name: "Jeffrey",
          notification: this.$t('notifications.type.eat'),
          time: this.$t('notifications.notification_time_format') + ' 9 ' + this.$t('notifications.notification_time')
        },
        {
          image: "~/assets/images/skeleton/animal.jpg",
          name: "Jeffrey",
          notification: this.$t('notifications.type.eat'),
          time: this.$t('notifications.notification_time_format') + ' 12 ' + this.$t('notifications.notification_time')
        },
      ]
    };
  },

  methods: {
    onSwipeStarted({ data, object }) {
      const swipeLimits = data.swipeLimits;
      const swipeView = object;
      const leftItem = swipeView.getViewById("mark-view");
      const rightItem = swipeView.getViewById("delete-view");
      swipeLimits.left = leftItem.getMeasuredWidth();
      swipeLimits.right = rightItem.getMeasuredWidth();
      swipeLimits.threshold = leftItem.getMeasuredWidth();
    },
    onLeftSwipeClick(event) {
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
    onRightSwipeClick({ object }) {
      // remove item
      this.itemList.splice(this.itemList.indexOf(object.bindingContext), 1);
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~/colors.scss";

.notifications-bg {
  background-color: #fafafa;
  height: 60;
  padding: 5 0 5 5;
  border-bottom-width: 2;
  border-bottom-color: $primary; 
  .animal-picture {
    border-radius: 60%;
  }
}
.animal-infos {
    margin: 5 0 0 10;
  }
.animal-name {
  color: $primary;
  font-weight: bold;
}
.notification-type {
  font-weight: bold;
}
.notifications-action {
  width: 95%;
  height: 60;
  background-color: #EEE;
  border-bottom-width: 2;
  border-bottom-color: $primary; 
  .keep-action {
    margin: -5 0 0 5;
    .keep-icon {
      background-color: $primary;
      border-radius: 60%;
      padding: 4;
    }
  }
  .delete-action {
    margin: -5 -5 0 0;
    .delete-icon {
      background-color: red;
      border-radius: 60%;
      padding: 4;
    }
  }
}
</style>