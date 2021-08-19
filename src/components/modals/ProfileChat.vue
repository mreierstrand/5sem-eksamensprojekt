<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 28px"
          >{{ $props.post.userId?.firstName }}
          {{ $props.post.userId?.lastName }}
        </ion-title>

        <ion-icon
          id="hoverIcon"
          slot="start"
          style="color: red; font-size: 32px; margin-left: 10px"
          :icon="arrowUndoOutline"
          @click="modalCtrl.dismiss()"
        ></ion-icon>
        <ion-icon
          slot="end"
          style="color: red; font-size: 32px; margin-left: 10px"
        ></ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="container">
        <div class="row align-items-center my-3">
          <div class="col-lg-12">
            <ion-avatar id="avatarIcon">
              <ion-img
                v-if="user?.profilePictureId == ''"
                src="assets/icon/templateUser.png"
                style="color: var(--ion-color-primary)"
              ></ion-img>
              <ion-img
                v-else
                :src="$props.post.userId?.profilePictureId"
                style="color: var(--ion-color-primary)"
              ></ion-img>
            </ion-avatar>
            <ion-text style="text-align: center">
              <h1 class="font-weight-light" style="margin-top: 35px">
                <b
                  >{{ $props.post.userId?.firstName }}
                  {{ $props.post.userId?.lastName }}</b
                >
              </h1>
              <p>
                <br />
              </p>
            </ion-text>
          </div>
        </div>

        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col class="ion-text-center" size="12">
              <ion-button @click="goToChat()" id="button1" fill="clear"
                ><ion-icon
                  slot="start"
                  style="margin-left: 10px"
                  :icon="chatbubblesOutline"
                ></ion-icon>
                Start en chat med {{ $props.post.userId.firstName }}</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  modalController,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase";
import { chatbubblesOutline, arrowUndoOutline } from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: {
    post: {},
    user: { type: String, default: "bruger" },
  },

  setup() {
    return {
      arrowUndoOutline,
      chatbubblesOutline,
    };
  },

  data() {
    return {
      modalCtrl: modalController,
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonIcon,
  },

  methods: {
    async goToChat() {
      var chats = [];

      await firebase
        .firestore()
        .collection("Chats")
        .where("contact1", "==", firebase.auth().currentUser.uid)
        .get()
        .then((result) => {
          if (!result.empty && result.size >= 1) {
            result.docs.forEach((doc) => {
              chats.push({
                contact1: doc.data().contact2,
                contact2: doc.data().contact1,
                id: doc.id,
              });
            });
          }
        })
        .then(async () => {
          await firebase
            .firestore()
            .collection("Chats")
            .where("contact2", "==", firebase.auth().currentUser.uid)
            .get()
            .then((result) => {
              if (!result.empty && result.size >= 1) {
                result.docs.forEach((doc) => {
                  chats.push({
                    contact1: doc.data().contact1,
                    contact2: doc.data().contact2,
                    id: doc.id,
                  });
                });
              }
            });
        })
        .then(async () => {
          var chatIndex;
          chats.forEach(async () => {
            chatIndex = chats.findIndex(
              (contact) =>
                contact.contact1 == this.$props.post?.userId.id &&
                contact.contact2 == this.$props.user
            );
          });

          if (chats[chatIndex]) {
            this.$router
              .push({ path: "/chat/" + chats[chatIndex].id })
              .then(() => {
                this.modalCtrl.dismiss();
              });
          } else {
            await firebase
              .firestore()
              .collection("Chats")
              .add({
                contact1: this.$props.post?.userId.id,
                contact2: this.$props.user,
              })
              .then((resp) => {
                this.$router.push({ path: "/chat/" + resp.id }).then(() => {
                  this.modalCtrl.dismiss();
                });
              });
          }
        });
    },
  },
});
</script>

<style scoped>
#avatarIcon {
  width: 250px;
  height: 250px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
}
#button1 {
  border: white;
  color: var(--ion-color-primary);
  border: solid;
  border-width: 1px;
  border-radius: 25px;
  min-width: 190px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -25px;
}

.container {
  margin-top: 10%;
}
</style>
