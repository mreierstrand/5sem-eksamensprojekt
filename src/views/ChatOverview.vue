<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
          <ion-back-button @click="goBack()"> </ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="clear"> </ion-button>
        </ion-buttons>
        <ion-title> Beskeder </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list v-if="initialized == true">
        <ion-item
          style="
            --min-height: 100px;
            border-radius: 15px;
            margin-left: 10px;
            margin-right: 10px;
          "
          class="itemList"
          @click="GoToMessages(chat)"
          v-for="chat in this?.Chats"
          :key="chat.FromDate"
        >
          <ion-avatar v-if="chat.contact1?.profilePictureId" class="avatarIcon">
            <ion-img :src="chat.contact1?.profilePictureId"> </ion-img>
          </ion-avatar>
          <ion-label id="text">
            {{
              chat?.contact1?.firstName + " " + chat?.contact1?.lastName
            }}</ion-label
          >
          <ion-icon
            id="icon"
            :icon="chevronForwardOutline"
            slot="end"
          ></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController,
  IonIcon,
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import firebase from "firebase";
export default {
  name: "ChatOverview",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
  },

  ionViewWillEnter() {
    this.getChats();
  },
  data() {
    return {
      Chats: [],
      initialized: false,
      chevronForwardOutline,
    };
  },

  methods: {
    GoToMessages(chat) {
      this.$router.push({ path: "/chat/" + chat.id });
    },
    async goBack() {
      this.$router.back();
    },

    async getChats() {
      this.Chats = [];

      await firebase
        .firestore()
        .collection("Chats")
        .where("contact1", "==", firebase.auth().currentUser.uid)
        .get()
        .then((result) => {
          if (!result.empty && result.size >= 1) {
            result.docs.forEach((doc) => {
              this.Chats.push({
                contact1: doc.data().contact2,
                contact2: doc.data().contact1,
                id: doc.id,
              });
            });
          }
        });
      await firebase
        .firestore()
        .collection("Chats")
        .where("contact2", "==", firebase.auth().currentUser.uid)
        .get()
        .then((result) => {
          if (!result.empty && result.size >= 1) {
            result.docs.forEach((doc) => {
              // console.log(doc.data());
              this.Chats.push({
                contact1: doc.data().contact1,
                contact2: doc.data().contact2,
                id: doc.id,
              });
            });
          }
        });
      this.Chats.reverse();

      this.sortChat();
    },

    sortChat() {
      this.Chats.forEach(async (chat) => {
        var chatIndex = this.Chats.findIndex(
          (contact) =>
            contact.contact1 == chat.contact1 &&
            contact.contact2 == chat.contact2
        );
        await firebase
          .firestore()
          .collection("users")
          .doc(chat.contact1)
          .get()
          .then((doc) => {
            this.Chats[chatIndex].contact1 = doc.data();
          });
        this.Chats[chatIndex].contact2 = firebase.auth().currentUser.uid;

        this.initialized = true;
      });
    },

    async openToast(message) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
      });
      return toast.present();
    },
  },
};
</script>

<style>
ion-item:hover #text {
  font-weight: bold;
  color: var(--ion-color-primary);
  font-size: 21px;
  cursor: pointer;
}

ion-item:hover .avatarIcon {
  cursor: pointer;
}

ion-item:hover #item {
  cursor: pointer;
}

ion-item:hover #icon {
  color: var(--ion-color-primary) !important;
}

#text {
  margin-left: 25px;
  font-size: 20px;
}

ion-item #item {
  min-height: 200px;
}

ion-item .itemClass {
  --min-height: 200px;
}

.avatarIcon {
  height: 75px;
  width: 75px;
}
</style>
