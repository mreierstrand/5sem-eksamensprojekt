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
        <ion-card id="card">
          <ion-card-content>
            <ion-list>
              <ion-item lines="none">
                <ion-img id="logo" src="assets/img/nytlogo.png"></ion-img>
              </ion-item>
            </ion-list>
            <div id="dividerDiv" />
            <ion-card-title id="header">Glemt adgangskode</ion-card-title>
            <ion-list>
              <ion-item id="roundedFirst">
                <ion-input
                  @keydown.enter="focusNextInput()"
                  tabindex="1"
                  id="emailInput"
                  placeholder="Email"
                  type="email"
                  @input="email = $event.target.value"
                ></ion-input>
              </ion-item>
            </ion-list>

            <ion-button
              tabindex="3"
              @click="resetPassword()"
              fill="clear"
              id="roundedButton"
              expand="full"
              >Nulstil adgangskode</ion-button
            >
          </ion-card-content>
        </ion-card>
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
  IonCard,
  toastController,
} from "@ionic/vue";

import firebase from "firebase";

export default {
  name: "Login",
  components: {
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
  },

  setup() {},
  data() {
    return {
      email: this.email,
      error: null,
    };
  },

  methods: {
    async openToast(message) {
      const toast = await toastController.create({
        message: message,
        duration: 2500,
      });
      return toast.present();
    },
    focusNextInput() {
      this.$refs.pwRef.setFocus();
    },

    async resetPassword() {
      var auth = firebase.auth();

      auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          alert("Kig på din mail");
          this.$router.go({ route: "/login" });
        })
        .catch(function (error) {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
#textLink2 {
  text-align: center;
  align-content: center;
}
#rounded {
  margin-bottom: 1em;
  background: #ffffff;
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
}

#logo {
  width: 125px;
  height: 125px;
  margin-left: auto;
  margin-right: auto;
}
#iconsApple {
  color: black;
  font-size: 2.9em;
  margin-top: -1.5px;
}

#icons {
  font-size: 2.5em;
}

#iconButtonGoogle {
  width: 150px;
}

#iconButtonFacebook {
  width: 85px;
}

#iconButtonApple {
  width: 85px;
}

#iconButtonApple:hover {
  transform: scale(1.1);
}

#iconButtonFacebook:hover {
  transform: scale(1.1);
}

#iconButtonGoogle:hover {
  transform: scale(1.1);
}

#textLink {
  color: #76ab2e;
}

#opretBrugerText {
  margin-top: 1em;
}

#roundedButton {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 8px;
  max-width: 250px;
  height: 48px;
  color: white;
  background-color: #76ab2e;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 10px;
}

#container {
  width: 350px;
  padding: 0 10px;
  margin-right: auto;
  margin-left: auto;
}
#roundedFirst {
  margin-bottom: 1em;
  background: #ffffff;
  border: solid 1px;
  border-radius: 12px !important;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  margin-top: 0px;
}
#header {
  text-align: center;
  margin-bottom: 0.5em;
  color: #2f4858;
  font-weight: 600;
  font-size: 2em;
  margin-top: 20px;
}

#card {
  border-radius: 12px !important;
}

#dividerDiv {
  border: solid;
  border-color: lightgrey;
  border-width: 1px;
  margin-top: 10px;
}

ion-content {
  --background: linear-gradient(
    103deg,
    rgba(147, 203, 38, 1) 1%,
    rgba(7, 102, 57, 1) 59%
  );
}
</style>
