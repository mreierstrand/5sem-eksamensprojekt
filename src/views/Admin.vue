<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-list>
          <ion-item v-for="user in users" :key="user?.id">
            <ion-label slot="start" position="fixed">
                {{ user?.id }}
              
            </ion-label>
            {{ user?.firstName }} {{ user?.lastName }}
            <ion-button slot="end" color="danger" @click="doDeleteUserData(user)">
              Slet data</ion-button
            >
          </ion-item>
          <ion-item>
            <ion-label> Ingen brugere? </ion-label>
            <ion-button @click="doGetUsers()"> Hent</ion-button>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  toastController
} from "@ionic/vue";
import firebase from "firebase";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Admin",
  components: {
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonLabel,
    IonItem,
    
  },
  ionViewWillEnter() {
    this.doGetUsers();
  },
  data() {
    return {
      users: [],
    };
  },
  setup() {},

  methods: {
    async openToast(message) {
      const toast = await toastController.create({
        message: message,
        duration: 2500,
      });
      return toast.present();
    },

    async doGetUsers() {
      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          this.users = [];
          querySnapshot.forEach((doc) => {
            this.users.push({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email,
            });
          });
          //console.log(this.users);
        });
    },

    async doDeleteUserData(user) {
      var delData = false;

      await firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .delete()
        .then(() => {
          delData = true;
          if (delData == true) {
            this.openToast('Bruger: '+user.firstName + " " + user.lastName+ ' er nu slettet'),
              this.doGetUsers();
          }
        });
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
