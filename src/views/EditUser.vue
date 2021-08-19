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
            <ion-list lines="none">
              <ion-item>
                <ion-avatar id="avatarLogo">
                  <ion-img
                    v-if="user?.profilePictureId == ''"
                    src="assets/icon/templateUser.png"
                    id="profileImage"
                    style="color: var(--ion-color-primary)"
                  ></ion-img>
                  <ion-img
                    v-else
                    :src="user?.profilePictureId"
                    id="profileImage"
                  ></ion-img>
                </ion-avatar>
              </ion-item>
              <ion-item>
                <ion-input
                  id="imageInput"
                  type="file"
                  @change="preview($event)"
                  style="display: none"
                ></ion-input>
                <ion-button id="uploadBtn" fill="clear" @click="doUpload()"
                  >Skift billede
                  <ion-icon slot="end" :icon="cloudUploadOutline"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>
            <div id="dividerDiv" />

            <ion-card-title id="header"
              >Tilpas dine oplysninger
            </ion-card-title>
            <ion-list lines="none">
              <ion-item>
                <ion-text style="margin-left: 11px; margin-top: -15px">
                  <h1>Fornavn</h1>
                </ion-text>
              </ion-item>
              <ion-item id="rounded">
                <ion-input
                  autocapitalize="on"
                  :value="user?.firstName"
                  minlength="2"
                  type="text"
                  placeholder="Fornavn"
                  @input="firstName = $event.target.value"
                >
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-text style="margin-left: 11px; margin-top: -15px">
                  <h1>Efternavn</h1>
                </ion-text>
              </ion-item>

              <ion-item id="rounded">
                <ion-input
                  minlength="2"
                  :value="user?.lastName"
                  type="text"
                  placeholder="Efternavn"
                  @input="lastName = $event.target.value"
                >
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-text style="margin-left: 11px; margin-top: -15px">
                  <h1>Postnummer</h1>
                </ion-text>
              </ion-item>

              <ion-item id="rounded">
                <ion-input
                  minlength="4"
                  maxlength="4"
                  placeholder="Postnummer"
                  :value="user?.postCode"
                  type="text"
                  @input="postCode = $event.target.value"
                >
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-text style="margin-left: 11px; margin-top: -15px">
                  <h1>Telefonnummer</h1>
                </ion-text>
              </ion-item>

              <ion-item id="rounded">
                <ion-input
                  placeholder="Telefonnummer"
                  minlength="8"
                  maxlength="8"
                  :value="user?.phoneNumber"
                  type="text"
                  @input="phoneNumber = $event.target.value"
                >
                </ion-input>
              </ion-item>
            </ion-list>

            <ion-button
              id="uploadBtn1"
              style="margin-top: 0px; margin-bottom: 10px"
              fill="clear"
              expand="full"
              >Nulstil adgangskode</ion-button
            >
            <ion-button
              id="roundedButton"
              @click="doUpdateAccount()"
              fill="clear"
              expand="full"
              >Opdater oplysninger</ion-button
            >

            <ion-button
              id="roundedButtonReturn"
              href="/Login"
              fill="clear"
              expand="full"
              >Fortryd</ion-button
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
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController,
} from "@ionic/vue";

import { cloudUploadOutline } from "ionicons/icons";

import firebase from "firebase";
import useFirebaseAuth from "../hooks/FirebaseAuth";
import ImageService from "../hooks/ImageService";

export default {
  name: "CreateUser",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },

  setup() {
    return { cloudUploadOutline };
  },

  ionViewDidEnter() {
    this.asyncValues();
  },

  data() {
    return {
      user: useFirebaseAuth().userData,
      firstName: "",
      lastName: "",
      postCode: 0,
      phoneNumber: 0,
      formImage: "",
    };
  },

  methods: {
    doUpload() {
      document.getElementById("imageInput").childNodes.item(0).click();
    },

    async preview(event) {
      var uploadImage = event.target.files[0];
      document.getElementById("profileImage").src = URL.createObjectURL(
        event.target.files[0]
      );

      this.formImage = await ImageService().upload(uploadImage);
      this.doUpdateAccount();
    },

    async asyncValues() {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.postCode = this.user.postCode;
      this.phoneNumber = this.user.phoneNumber;
    },
    async openToast(message) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
      });
      return toast.present();
    },

    hasNumber(myString) {
      return /\d+/.test(myString);
    },

    async doUpdateAccount() {
      if (
        this.hasNumber(this.firstName) == false &&
        this.hasNumber(this.lastName) == false
      ) {
        if (this.firstName.length > 1 && this.lastName.length > 1) {
          var db = await firebase.firestore();

          if (this.formImage != "") {
            var userdb = db
              .collection("users")
              .doc(firebase.auth().currentUser.uid);
            return userdb
              .update({
                firstName: this.firstName,
                lastName: this.lastName,
                postCode: this.postCode,
                phoneNumber: this.phoneNumber,
                profilePictureId: this.formImage,
              })
              .then(() => {
                // console.log("update");
                this.openToast(
                  "Din bruger blev opdateret: " + this.firstName
                ).then(() => {
                  this.$router.go({ path: "/velkommen" });
                });
              });
          } else {
            userdb = db
              .collection("users")
              .doc(firebase.auth().currentUser.uid);
            return userdb
              .update({
                firstName: this.firstName,
                lastName: this.lastName,
                postCode: this.postCode,
                phoneNumber: this.phoneNumber,
                profilePictureId: this.user.profilePictureId,
              })
              .then(() => {
                // console.log("update");
                this.openToast(
                  "Din bruger blev opdateret: " + this.firstName
                ).then(() => {
                  this.$router.push({ path: "/velkommen" });
                });
              });
          }
        } else {
          return this.openToast(
            "Navn eller efternavn skal være længere end 1 tegn"
          );
        }
      } else {
        return this.openToast("Navn eller efternavn må ikke indeholde tal");
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: var(--ion-font-family) !important;
}

h1 {
  font-size: 20px;
}

#uploadBtn {
  border: rgba(147, 203, 38, 1);
  border: solid;
  border-width: 1px;
  max-width: 250px;
  margin-top: 20px;
  font-weight: 300;
  border-radius: 12px;
  margin-right: auto;
  margin-left: auto;
  height: 30px;
  width: 200px;
}

#uploadBtn1 {
  border: rgba(147, 203, 38, 1);
  border: solid;
  border-width: 1px;
  max-width: 250px;
  margin-top: 20px;
  font-weight: 300;
  border-radius: 12px;
  margin-right: auto;
  margin-left: auto;
  height: 30px;
  width: 200px;
}

ion-button:hover#uploadBtn1 {
  color: red;
}

.uploadIcon {
  margin: 0px;
  padding: 1em;
}

#avatarLogo {
  width: 200px;
  height: 200px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
}

#header {
  text-align: center;
  margin-bottom: 0.5em;
  color: #2f4858;
  font-weight: 600;
  font-size: 2em;
  margin-top: 20px;
}

#logo {
  padding: -1px;
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  border-radius: 50% !important;
  width: 125px;
  overflow: hidden;
  height: 125px;
  margin-right: auto;
  margin-left: auto;
}

#dividerDiv {
  border: solid;
  border-color: lightgrey;
  border-width: 1px;
  margin-top: 10px;
}

#rounded {
  margin-bottom: 1em;
  background: #ffffff;
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
}

#card {
  border-radius: 12px !important;
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

#roundedBtn {
  color: var(--ion-color-primary);
  border: solid;
  border-width: 1px;
  border-radius: 12px !important;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  height: 35px;
}

#roundedButtonReturn {
  border: solid 1px;
  border-radius: 12px !important;
  max-width: 250px;
  height: 48px;
  color: white;
  background-color: #ed576b;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 15px;
}

#container {
  width: 380px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
}
#signupWith {
  text-align: center;
  margin-bottom: 1em;
  color: #2f4858;
  font-weight: 400;
}

ion-content {
  --background: linear-gradient(
    103deg,
    rgba(147, 203, 38, 1) 1%,
    rgba(7, 102, 57, 1) 59%
  );
}
img {
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.item-has-focus {
  --highlight-background: #76ab2e;
}
</style>
