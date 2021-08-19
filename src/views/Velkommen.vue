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
                :src="user?.profilePictureId"
                style="color: var(--ion-color-primary)"
              ></ion-img>
            </ion-avatar>
            <ion-text style="text-align: center">
              <h1 class="font-weight-light">
                Velkommen <b>{{ user?.firstName }} {{ user?.lastName }}</b>
              </h1>
              <p>
                Email: {{ user?.email }} <br />
                Postnummer: {{ user?.postCode }} <br />
              </p>
            </ion-text>
          </div>
        </div>
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col class="ion-text-center" size="12">
              <ion-button @click="doGoToProfilePage()" id="button1" fill="clear"
                >Ret profil</ion-button
              >
            </ion-col>
            <ion-col class="ion-text-center" size="12">
              <ion-button @click="doLogout()" id="button2" fill="clear">
                Log Ud
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        
      </div>

      <div class="card text-white" id="bigCard">
          <div class="card-body">
            <ion-grid>
              <ion-row>
                <ion-col size="12">
                  <ion-text
                    ><h1
                      style="
                        color: var(--ion-color-primary);
                        text-align: center;
                        font-weight: bold;
                      "
                    >
                      Herunder er dine valgmuligheder
                    </h1></ion-text
                  >
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </div>
      <div
        style="justify-content: center; margin-top: -40px"
        class="row row-cols-1 row-cols-md-2"
      >
        <div class="col mb-4">
          <ion-card id="mousePointer" @click="goToPostsInMyArea()">
            <div id="imgDiv">
              <ion-img src="assets/img/opslagstavle.png" />
              <div class="overlay">
                <div class="text">
                  <ion-text style="font-weight: bold"
                    >OPSLAG {{ user?.postCode }}
                  </ion-text>
                </div>
              </div>
            </div>
            <ion-card-header>
              <ion-card-title id="titleText" style="text-align: center"
                >Opslag fra {{ user?.postCode }}
              </ion-card-title>
            </ion-card-header>
          </ion-card>
        </div>
        <div class="col mb-4">
          <ion-card id="mousePointer" @click="goToAreas()">
            <div id="imgDiv">
              <ion-img src="assets/img/areamap3.png" />
              <div class="overlay">
                <div class="text">
                  <ion-text style="font-weight: bold">OMRÅDER</ion-text>
                </div>
              </div>
            </div>
            <ion-card-header>
              <ion-card-title id="titleText" style="text-align: center"
                >Find opslag i andre områder</ion-card-title
              >
            </ion-card-header>
          </ion-card>
        </div>
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
  IonImg,
  IonText,
} from "@ionic/vue";

import firebaseAuth from "../hooks/FirebaseAuth";
import firebase from "firebase";
export default {
  name: "Velkommen",
  components: {
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonText,
  },

  data() {
    return {
      user: firebaseAuth().userData,
    };
  },
  methods: {
    async doLogout() {
      //console.log(this.userData);
      await firebaseAuth()
        .Logout()
        .then(this.$router.go({ path: "/login" }))
        .catch(this.$router.go({ path: "/login" }));
    },
    doGoToProfilePage() {
      this.$router.push({ path: "/rediger" });
    },
    goToAreas() {
      this.$router.push({ path: "/areas" });
    },
    async goToPostsInMyArea() {
      var area;

      if (this.user.postCode >= 1000 && this.user.postCode <= 1499) {
        await firebase
          .firestore()
          .collection("areas")
          .where("areaCode", "==", "1000-1499")
          .get()
          .then((result) => {
            if (!result.empty && result.size < 2) {
              result.docs.forEach((doc) => (area = doc.data()));
              var routePath = "/areas/" + area.areaName + "/posts";
              this.$router.push({ path: routePath });
            } else {
              area = { areaName: "ikke eksisterende" };
            }
          });
      } else if (this.user.postCode >= 1500 && this.user.postCode <= 1778) {
        await firebase
          .firestore()
          .collection("areas")
          .where("areaCode", "==", "1000-1499")
          .get()
          .then((result) => {
            if (!result.empty && result.size < 2) {
              result.docs.forEach((doc) => (area = doc.data()));
              var routePath = "/areas/" + area.areaName + "/posts";
              this.$router.push({ path: routePath });
            } else {
              area = { areaName: "ikke eksisterende" };
            }
          });
      } else if (this.user.postCode >= 1800 && this.user.postCode <= 1999) {
        await firebase
          .firestore()
          .collection("areas")
          .where("areaCode", "==", "1000-1499")
          .get()
          .then((result) => {
            if (!result.empty && result.size < 2) {
              result.docs.forEach((doc) => (area = doc.data()));
              var routePath = "/areas/" + area.areaName + "/posts";
              this.$router.push({ path: routePath });
            } else {
              area = { areaName: "ikke eksisterende" };
            }
          });
      } else {
        await firebase
          .firestore()
          .collection("areas")
          .where("areaCode", "==", this.user.postCode)
          .get()
          .then((result) => {
            if (!result.empty && result.size < 2) {
              result.docs.forEach((doc) => (area = doc.data()));
              var routePath = "/areas/" + area.areaName + "/posts";
              this.$router.push({ path: routePath });
            } else {
              area = { areaName: "ikke eksisterende" };
            }
          });
      }
    },
  },
};
</script>

<style scoped>
ion-row {
  padding-bottom: 10px;
}

ion-button:hover#button2 {
  color: red;
}

.card {
  border-radius: 15px;
  border-color: var(--ion-color-primary);
}

#mousePointer:hover .overlay {
  opacity: 0.75;
}

#mousePointer {
  cursor: pointer;
  border-radius: 5px;
  margin-top: -15px;
  margin: 30px;
  border-radius: 15px;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: var(--ion-color-primary);
}

#imgDiv:hover .overlay {
  opacity: 0.75;
}

#imgDiv {
  max-height: 553px;
  position: relative;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  background-color: var(--ion-color-primary);
  --ion-grid-column-padding: 10px;
}

#containerTop {
  left: 0;
  right: 0;
  position: absolute;
}

#bigCard {
  border-color: var(--ion-color-primary) !important;
  border-radius: 15px !important;
  margin-top: 0px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  border: 1px solid #007bff; 
  width: 96.5%;
  margin-bottom: 40px;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
  margin-top: 0%;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: white;
  margin: 0;
}

#container a {
  text-decoration: none;
}

#velkommenText {
  color: white;
  font-weight: bold;
}

#avatarIcon {
  width: 115px;
  height: 115px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
}

#andenDiv {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  --ion-grid-column-padding: 10px;
}

#row {
  height: 400px;
}

#mousePointer:hover #titleText {
  font-weight: bold;
  color: var(--ion-color-primary);
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

#button2 {
  border: white;
  color: var(--ion-color-primary);
  border: solid;
  border-width: 1px;
  border-radius: 25px;
  right: 100%;
  min-width: 190px;
}

#hjemhedCard {
  background: var(--ion-color-primary);
  font-weight: bold;
  margin: 15px;
  margin-top: 65px;
  margin-bottom: 55px;
}

.buttonContainer {
  margin-top: 60px;
}
.center {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 50%;
}
</style>
