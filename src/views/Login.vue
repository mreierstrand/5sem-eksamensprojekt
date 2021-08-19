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

            <ion-card-title id="header">Login</ion-card-title>
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

              <ion-item id="rounded">
                <ion-input
                  ref="pwRef"
                  @keydown.enter="doLogin()"
                  minlength="6"
                  tabindex="2"
                  id="passwordInput"
                  placeholder="Kodeord"
                  type="password"
                  @input="password = $event.target.value"
                ></ion-input>
              </ion-item>
            </ion-list>

            <ion-button
              tabindex="3"
              @click="doLogin()"
              fill="clear"
              id="roundedButton"
              expand="full"
              >Login</ion-button
            >
            <div id="textLink2">
              <ion-text>
                <a href="/reset">Glemt adgangskode?</a>
              </ion-text>
            </div>
            <ion-card-title id="header"> Eller login med </ion-card-title>

            <ion-grid>
              <ion-row>
                <ion-col size="6">
                  <ion-button
                    @click="doLoginWithGoogle()"
                    id="iconButtonGoogle"
                    fill="clear"
                  >
                    <ion-icon
                      id="icons"
                      src="assets/icon/google.svg"
                    ></ion-icon>
                  </ion-button>
                </ion-col>
                <ion-col size="6">
                  <ion-button
                    id="iconButtonFacebook"
                    fill="clear"
                    @click="doLoginWithFacebook()"
                  >
                    <ion-icon
                      id="icons"
                      src="assets/icon/facebook.svg"
                    ></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>

            <div id="opretBrugerText" class="ion-text-center">
              <ion-text>Har du ikke en bruger? </ion-text>
              <!-- <br/> -->
              <ion-text id="textLink">
                <a href="/Opret">Opret en her!</a></ion-text
              >
            </div>
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

import useFirebaseAuth from "../hooks/FirebaseAuth.js";
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
      email: "",
      password: "",
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
    async doLogin() {
      await useFirebaseAuth()
        .Login(this.email, this.password)
        .then(async () => {
          this.openToast("Velkommen").then(() => {
            if (useFirebaseAuth().user) {
              this.$router.go({ route: "/velkommen" });
            }
          });
        })
        .catch((err) => {
          //console.log(err);
          if (err.code == "auth/wrong-password") {
            this.openToast("Ugyldigt kodeord, prøv igen");
            document.getElementById("passwordInput").color = "danger";
          } else if (err.code == "auth/invalid-email") {
            document.getElementById("emailInput").color = "danger";
            this.openToast("Ugyldig email, prøv igen");
          } else if (err.code == "auth/too-many-requests") {
            this.openToast(
              "For mange forsøg på login, vent venligst et øjeblik"
            );
          } else if (err.code == "auth/user-not-found") {
            document.getElementById("emailInput").color = "danger";
            document.getElementById("passwordInput").color = "danger";
            this.openToast("Ukendt bruger, prøv igen");
          }
        });
    },

    async doLoginWithGoogle() {
      var googleProvider = new firebase.auth.GoogleAuthProvider();
      useFirebaseAuth()
        .LoginProvider(googleProvider)
        .then(() => {
          if (useFirebaseAuth().user) {
            this.$router.go({ route: "/velkommen" });
          }
        })
        .catch((err) => {
          //console.log(err);
          if (err.code == "auth/popup-closed-by-user") {
            this.openToast(
              "Du nåede ikke at færdiggøre dit login, forsøg venligst igen"
            );
          } else if (err.code == "auth/invalid-email") {
            this.openToast("Ugyldig email, prøv igen");
          }
        });
    },

    async doLoginWithFacebook() {
      var facebookProvider = new firebase.auth.FacebookAuthProvider();
      useFirebaseAuth()
        .LoginProvider(facebookProvider)
        .then(() => {
          if (useFirebaseAuth().user) {
            this.$router.go({ route: "/velkommen" });
          }
        })
        .catch((err) => {
          //console.log(err);
          if (err.code == "auth/popup-closed-by-user") {
            this.openToast(
              "Du nåede ikke at færdiggøre dit login, forsøg venligst igen"
            );
          } else if (err.code == "auth/invalid-email") {
            this.openToast("Ugyldig email, prøv igen");
          }
        });
    },
  },
};
</script>

<style scoped>
#textLink2 {
  text-align: center;
  align-content: center;
  font-size: 20px;
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
  font-size: 22px;
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

#iconButtonFacebook:hover {
  transform: scale(1.2);
  --background-hover: white;
  --background-activated: white;
}

#iconButtonGoogle:hover {
  transform: scale(1.2);
  --background-hover: white;
}

#textLink {
  color: #76ab2e;
}

#opretBrugerText {
  margin-top: 1em;
  font-size: 22px;
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
  font-size: 22px;
}

#container {
  width: 360px;
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
  font-size: 22px;
}
#header {
  text-align: center;
  margin-bottom: 0.5em;
  color: #2f4858;
  font-weight: 600;
  font-size: 36px;
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
