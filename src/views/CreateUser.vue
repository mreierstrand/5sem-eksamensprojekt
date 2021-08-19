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

            <ion-card-title id="header">Opret profil</ion-card-title>
            <ion-button
              id="roundedButtonEmail"
              @click="useEmail()"
              fill="clear"
              expand="full"
              ><ion-icon
                style="margin-left: -20px"
                :icon="mailOpenOutline"
              ></ion-icon
              ><ion-text
                style="
                  color: white;
                  margin-left: 5px;
                  font-size: 18px;
                  text-align: right;
                "
                >Mail</ion-text
              ></ion-button
            >

            <ion-button
              @click="doLoginWithGoogle()"
              id="roundedButtonGoogle"
              fill="clear"
              expand="full"
              ><ion-icon style="margin-left: 0px" :icon="logoGoogle"></ion-icon
              ><ion-text style="color: white; margin-left: 5px; font-size: 18px"
                >Google</ion-text
              ></ion-button
            >

            <ion-button
              @click="doLoginWithFacebook()"
              id="roundedButtonFacebook"
              fill="clear"
              expand="full"
              ><ion-icon :icon="logoFacebook"></ion-icon
              ><ion-text style="color: white; margin-left: 5px; font-size: 18px"
                >Facebook</ion-text
              ></ion-button
            >
            <ion-list id="emailList" lines="none" style="display: none">
              <ion-item id="billedeItem" style="display: none">
                <ion-avatar id="avatarLogo">
                  <ion-img
                    id="previewImage"
                    src=""
                    alt="sæt dit billede ind her"
                    style="display: none"
                  >
                  </ion-img>
                </ion-avatar>
              </ion-item>
              <ion-item>
                <ion-input
                  id="imageInput"
                  type="file"
                  @change="preview($event)"
                  hidden
                ></ion-input>
                <ion-button id="uploadBtn" fill="clear" @click="doUpload()"
                  ><ion-text id="uploadBilledeText">Upload billede</ion-text>
                  <ion-icon slot="end" :icon="cloudUploadOutline"></ion-icon>
                </ion-button>
              </ion-item>
              <ion-item id="roundedFirst">
                <ion-input
                  minlength="2"
                  maxlength="25"
                  id="fornavnInput"
                  placeholder="Fornavn"
                  type="text"
                  @input="firstName = $event.target.value"
                  @keydown.enter="focusNextInput('lnInp')"
                >
                </ion-input>
              </ion-item>
              <ion-item id="rounded">
                <ion-input
                  minlength="2"
                  maxlength="25"
                  ref="lnInp"
                  id="efternavnInput"
                  placeholder="Efternavn"
                  type="text"
                  @input="lastName = $event.target.value"
                  @keydown.enter="focusNextInput('emInp')"
                >
                </ion-input>
              </ion-item>
              <ion-item id="rounded">
                <ion-input
                  ref="emInp"
                  id="emailInput"
                  placeholder="Email"
                  type="email"
                  @input="email = $event.target.value"
                  @keydown.enter="focusNextInput('pwInp')"
                >
                </ion-input>
              </ion-item>
              <ion-item id="rounded">
                <ion-input
                  ref="pwInp"
                  id="kodeordInput"
                  placeholder="Kodeord"
                  type="password"
                  @input="password = $event.target.value"
                  @keydown.enter="doCreateAccount()"
                >
                </ion-input>
              </ion-item>
            </ion-list>

            <ion-button
              style="display: none"
              id="roundedButtonCreate"
              @click="doCreateAccount()"
              fill="clear"
              expand="full"
              >Opret profil</ion-button
            >
            <ion-button
              style="display: none"
              id="roundedButtonReturn"
              href="/Login"
              fill="clear"
              expand="full"
              >Fortryd</ion-button
            >
          </ion-card-content>
        </ion-card>
      </div>
      <div id="containerSlides">
        <ion-card id="cardSlides">
          <ion-card-content>
            <ion-slides pager="true" :options="slideOpts" ref="slides" zoom>
              <ion-slide>
                <div class="slide">
                  <ion-grid>
                    <ion-row>
                      <ion-col>
                        <h1 id="slideHeader">Velkommen til Hjemhed</h1>
                        <img src="assets/img/Logo.png" id="slideLogos" />
                      </ion-col>
                    </ion-row>
                    <ion-row>
                      <ion-col size="12">
                        <ion-text>
                          <p id="slide1Text">Tryghed - Nærhed - Hjemhed</p>
                          <br />
                          <p>
                            Hjemhed er applikationen, hvor du bliver en del af
                            lokalområdet!
                          </p>
                        </ion-text>
                      </ion-col>
                    </ion-row>
                    <ion-row class="ButtonRow">
                      <ion-col size="12">
                        <ion-button
                          style="margin-top: 105px"
                          fill="clear"
                          @click="$refs.slides.$el.slideNext()"
                          >Næste
                          <ion-icon slot="end" :icon="arrowForward"></ion-icon
                        ></ion-button>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </div>
              </ion-slide>
              <ion-slide>
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <h1 id="slideHeader">Tryghed</h1>
                      <div id="slideLogo">
                        <lottie-animation
                          path="assets/lottie/conversation/conversation.json"
                          :loop="true"
                          :autoPlay="true"
                          :speed="1"
                          :width="280"
                          :height="280"
                        />
                      </div>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-text>
                        <p id="slide2Text">
                          Få kontrol over dit boligsalg og køb!
                        </p>
                        <br />
                        <p>
                          Del oplysninger om dit hus i dit eget tempo, og få et
                          uforpligtende indblik i dit måske kommende lokalområde
                          fra dem, som bor der!
                        </p>
                      </ion-text>
                    </ion-col>
                  </ion-row>
                  <ion-row class="ButtonRow">
                    <ion-col size="12">
                      <ion-button
                        style="margin-top: 36px"
                        fill="clear"
                        @click="$refs.slides.$el.slideNext()"
                        >Næste
                        <ion-icon slot="end" :icon="arrowForward"></ion-icon
                      ></ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-slide>
              <ion-slide>
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <h1 id="slideHeader">Nærhed</h1>
                      <div id="slide2Logo">
                        <lottie-animation
                          path="assets/lottie/conversation/chat.json"
                          :loop="true"
                          :autoPlay="true"
                          :speed="1"
                          :width="200"
                          :height="200"
                        />
                      </div>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-text>
                        <p id="slide3Text">Lær de lokale at kende</p>
                        <br />
                        <p>
                          Chat med lokale i dit udvalgte boligområde og mød dine
                          måske kommende naboer i et uformelt virtuelt netværk
                        </p>
                      </ion-text>
                    </ion-col>
                  </ion-row>
                  <ion-row class="ButtonRow">
                    <ion-col size="12">
                      <ion-button
                        style="margin-top: 1rem; margin-bottom: 50px"
                        fill="clear"
                        @click="$refs.slides.$el.slideNext()"
                        >Næste
                        <ion-icon slot="end" :icon="arrowForward"></ion-icon
                      ></ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-slide>
              <ion-slide>
                <h1 style="margin-top: 10px" id="slideHeader">Hjemhed</h1>
                <div id="slide4Logo">
                  <lottie-animation
                    path="assets/lottie/conversation/house.json"
                    :loop="true"
                    :autoPlay="true"
                    :speed="0.8"
                    :width="280"
                    :height="280"
                  />
                </div>
                <ion-text>
                  <p id="slide4Text">Din digitale opslagstavle</p>
                  <br />
                  <p>Til dig som går med købs- eller salgstanker.</p>
                  <br />
                  <p>Til dig som interesserer sig for dit lokalområde</p>
                </ion-text>
                <ion-row class="ButtonRow">
                  <ion-col size="12">
                    <ion-button
                      style="margin-top: 110px"
                      fill="clear"
                      @click="doContinue()"
                      >Fortsæt
                      <ion-icon slot="end" :icon="arrowForward"></ion-icon
                    ></ion-button>
                  </ion-col>
                </ion-row>
              </ion-slide>
            </ion-slides>
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
  IonIcon,
  IonSlides,
  IonGrid,
} from "@ionic/vue";
import firebase from "firebase";
import ImageService from "../hooks/ImageService";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import {
  cloudUploadOutline,
  arrowForward,
  ellipse,
  ellipseOutline,
  arrowBack,
  mailOpenOutline,
  logoFacebook,
  logoGoogle,
} from "ionicons/icons";

import useFirebaseAuth from "../hooks/FirebaseAuth.js";

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
    LottieAnimation,
    IonSlides,
    IonGrid,
    IonIcon,
  },
  setup() {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    return {
      slideOpts,
      arrowForward,
      ellipse,
      ellipseOutline,
      arrowBack,
      cloudUploadOutline,
      mailOpenOutline,
      logoFacebook,
      logoGoogle,
    };
  },

  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      formImage: "",
    };
  },

  methods: {
    async doLoginWithGoogle() {
      var googleProvider = new firebase.auth.GoogleAuthProvider();
      useFirebaseAuth()
        .LoginProvider(googleProvider)
        .then(() => {
          if (useFirebaseAuth().user) {
            this.doContinue();
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
            this.doContinue();
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

    goToSlide() {
      this.$refs.slides.$el.slideNext();
    },
    doContinue() {
      this.$router.push({ path: "/rediger" });
    },

    doUpload() {
      document.getElementById("imageInput").childNodes.item(0).click();
    },

    useEmail() {
      document.getElementById("emailList").style.display = "block";
      document.getElementById("roundedButtonEmail").style.display = "none";

      document.getElementById("roundedButtonReturn").style.display = "block";
      document.getElementById("roundedButtonCreate").style.display = "block";
    },

    async preview(event) {
      document.getElementById("previewImage").style.display = "block";
      var uploadImage = event.target.files[0];
      document.getElementById("previewImage").src = URL.createObjectURL(
        event.target.files[0]
      );
      this.formImage = await ImageService().upload(uploadImage);
      document.getElementById("billedeItem").style.display = "block";
      document.getElementById("uploadBilledeText").innerHTML = "Skift billede";
    },

    async openToast(message) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
      });
      return toast.present();
    },
    focusNextInput(nextInput) {
      this.$refs[nextInput].setFocus();
    },

    hasNumber(myString) {
      return /\d+/.test(myString);
    },

    doHideDiv() {
      var div = document.getElementById("container");
      var slidesDiv = document.getElementById("containerSlides");

      div.style.display = "none";
      slidesDiv.style.display = "block";
      this.$refs.slides.$el.update();
    },
    doShowDiv() {
      var div = document.getElementById("container");
      var slidesDiv = document.getElementById("containerSlides");

      div.style.display = "block";
      slidesDiv.style.display = "none";
    },

    async doCreateAccount() {
      if (
        this.hasNumber(this.firstName) == false &&
        this.hasNumber(this.lastName) == false
      ) {
        if (this.firstName.length > 1 && this.lastName.length > 1) {
          var uploadImage;
          if (this.formImage == "") {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((user) => {
                var db = firebase.firestore();
                db.collection("users").doc(user.user.uid).set({
                  admin: false,
                  email: this.email,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  postCode: 4000,
                  profilePictureId: user.user.photoURL,
                });
                //console.log(user);
                //alert('Bruger oprettet')
                this.openToast("Bruger oprettet med email: " + this.email).then(
                  () => {
                    this.doHideDiv();
                  }
                );
              })
              .catch((err) => {
                if (err.code == "auth/invalid-email") {
                  this.openToast("Ugyldig email, prøv igen");
                  document.getElementById("emailInput").color = "danger";
                } else if (err.code == "auth/weak-password") {
                  this.openToast("Kodeord skal indeholde mindst 6 tegn");
                  document.getElementById("emailInput").color = "danger";
                  document.getElementById("kodeordInput").color = "danger";
                } else if (err.code == "auth/email-already-in-use") {
                  this.openToast(
                    "En bruger med denne email eksisterer allerede"
                  );
                }
              });
          } else {
            uploadImage = this.formImage;

            await firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((user) => {
                var db = firebase.firestore();
                db.collection("users").doc(user.user.uid).set({
                  admin: false,
                  email: this.email,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  postCode: 0,
                  profilePictureId: uploadImage,
                });
                //console.log(user);
                this.openToast("Bruger oprettet med email: " + this.email).then(
                  () => {
                    this.doHideDiv();
                  }
                );
              })
              .catch((err) => {
                if (err.code == "auth/invalid-email") {
                  this.openToast("Ugyldig email, prøv igen");
                  document.getElementById("emailInput").color = "danger";
                } else if (err.code == "auth/weak-password") {
                  this.openToast("Kodeord skal indeholde mindst 6 tegn");
                  document.getElementById("emailInput").color = "danger";
                  document.getElementById("kodeordInput").color = "danger";
                } else if (err.code == "auth/email-already-in-use") {
                  this.openToast(
                    "En bruger med denne email eksisterer allerede"
                  );
                }
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
      //console.log(this.email, this.password)
    },
  },
};
</script>

<style scoped>
body {
  font-family: var(--ion-font-family) !important;
}
.ButtonRow {
  vertical-align: bottom;
}

ion-icon {
  font-size: 35px;
}
#uploadBtn {
  border: rgba(147, 203, 38, 1);
  border: solid;
  border-width: 1px;
  max-width: 250px;
  margin-top: 0px;
  font-weight: 300;
  border-radius: 12px;
  margin-right: auto;
  margin-left: auto;
  height: 30px;
  width: 200px;
}

#avatarLogo {
  width: 200px;
  height: 200px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
}

#roundedButtonDiv {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 8px;
  max-width: 250px;
  height: 48px;
  color: white;
  background-color: navy;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 10px;
}
#roundedButtonDiv1 {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 8px;
  bottom: 10px;
  position: absolute;
  max-width: 250px;
  height: 48px;
  color: white;
  background-color: blue;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 10px;
}

#header {
  text-align: center;
  margin-bottom: 0.5em;
  color: #2f4858;
  font-weight: 600;
  font-size: 36px;
  margin-top: 20px;
}

#logo {
  width: 125px;
  height: 125px;
  margin-left: auto;
  margin-right: auto;
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
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  font-size: 22px;
}
#roundedFirst {
  margin-bottom: 1em;
  background: #ffffff;
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  font-size: 22px;
}
#card {
  border-radius: 12px !important;
}
#cardSlides {
  border-radius: 12px !important;
  height: 650px;
}
#roundedButtonOpret {
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

#roundedButtonCreate {
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

#roundedButtonEmail {
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

#roundedButtonFacebook {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 8px;
  max-width: 250px;
  height: 48px;
  color: white;
  background-color: #3b5998;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 10px;
  font-size: 22px;
}

#roundedButtonGoogle {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 8px;
  max-width: 250px;
  height: 48px;
  color: white;
  background-color: #cf4332;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 10px;
  font-size: 22px;
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
  font-size: 22px;
}

#container {
  width: 360px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
}

#containerSlides {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
  display: none;
}

#signupWith {
  text-align: center;
  margin-bottom: 1em;
  color: #2f4858;
  font-weight: 400;
}

#slideLogos {
  margin-top: 50px;
  width: 150px;
  height: 125px;
  margin-left: auto;
  margin-right: auto;
}

#slideIcons {
  color: #76ab2e;
}

#iconDiv {
  margin-top: 140px;
}
#iconDiv2 {
  margin-top: 39px;
}

#iconDiv3 {
  margin-top: 60px;
}

#iconDiv4 {
  margin-top: 6px;
}

#slide1Text {
  font-size: 18px;
  white-space: nowrap;
  font-weight: bold;
  margin-left: -28px;
}

#slide2Text {
  margin-top: -70px;
  font-size: 18px;
  font-weight: bold;
}

#slide3Text {
  margin-top: -5px;
  font-size: 18px;
  font-weight: bold;
}

#slide4Text {
  font-size: 18px;
  margin-top: -38px;
  font-weight: bold;
  white-space: nowrap;
}

#slideHeader {
  margin-top: 1%;
  font-weight: bold;
  font-size: 22px;
}

#continueButton {
  margin-top: 25px;
  vertical-align: bottom;
}
#slideLogo {
  margin-top: -35px;
  margin-left: -15px;
}

#slide2Logo {
  margin: auto;
}

#slide4Logo {
  margin-left: -10px;
  margin-top: -45px;
}

ion-content {
  --background: linear-gradient(
    103deg,
    rgba(147, 203, 38, 1) 1%,
    rgba(7, 102, 57, 1) 59%
  );
}

.item-has-focus {
  --highlight-background: #76ab2e;
}

.swiper-slide {
  display: block;
}

.swiper-slide h2 {
  margin-top: 2.8rem;
}

.swiper-slide img {
  max-height: 50%;
  max-width: 80%;
  margin: 60px 0 40px;
  pointer-events: none;
}

b {
  font-weight: 500;
}

p {
  padding: 0 40px;
  font-size: 18px;
  line-height: 1.5;
  color: var(--ion-color-step-600, #60646b);
}

p b {
  color: var(--ion-text-color, #000000);
}
</style>
