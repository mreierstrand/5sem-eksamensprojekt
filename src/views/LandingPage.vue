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
        <div class="row align-items-center">
          <div class="col-lg-5">
            <ion-img
              id="stortLogo"
              style="
                max-width: 250px;
                max-height: 250px;
                margin-left: auto;
                margin-right: auto;
              "
              class="img-fluid rounded mb-4 mb-lg-0"
              src="assets/img/Logo.png"
            />
          </div>
          <div class="col-lg-7">
            <ion-text>
              <h1
                id="headerText"
                style="font-size: 55px; font-weight: bold; text-align: center"
                class="font-weight-light;"
              >
                Velkommen til
                <p style="color: var(--ion-color-primary)">Hjemhed!</p>
              </h1>

              <div id="typed-strings">
                <p>Få kontrol over dit boligsalg og køb</p>
                <p>Lær de lokale at kende</p>
                <p>Din digitale opslagstavle</p>
              </div>
              <span
                style="font-size: 25px; font-weight: bold"
                id="typed"
              ></span>
            </ion-text>
            <ion-button
              @click="navigateToCreate()"
              id="userButtons"
              fill="clear"
              expand="full"
              ><ion-icon id="iconLeft" :icon="personAddOutline"></ion-icon>Opret
              profil</ion-button
            >
            <ion-button
              @click="navigateToLogin()"
              id="userButtons1"
              fill="clear"
              expand="full"
              ><ion-icon id="iconLeft" :icon="arrowForwardOutline"></ion-icon
              >Login</ion-button
            >
          </div>
        </div>

        <div class="card text-white" id="bigCard">
          <div class="card-body">
            <ion-grid>
              <ion-row style="margin-top: 10px">
                <ion-col size="4">
                  <ion-text style="margin-top: 5px; margin-bottom: auto">
                    <p
                      id="text"
                      class="m-0"
                      style="
                        font-size: 18px;
                        font-weight: bold;
                        color: var(--ion-color-primary);
                        margin-top: 5px;
                        margin-bottom: auto;
                      "
                    >
                      TRYGHED
                    </p>
                  </ion-text>
                </ion-col>
                <ion-col size="4">
                  <ion-text>
                    <p
                      id="text"
                      class="m-0"
                      style="
                        font-size: 18px;
                        font-weight: bold;
                        color: var(--ion-color-primary);
                      "
                    >
                      NÆRHED
                    </p>
                  </ion-text>
                </ion-col>
                <ion-col size="4">
                  <ion-text>
                    <p
                      id="text"
                      class="m-0"
                      style="
                        font-size: 18px;
                        font-weight: bold;
                        color: var(--ion-color-primary);
                      "
                    >
                      HJEMHED
                    </p>
                  </ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </div>

        <div class="card" id="bigCard1">
          <div class="card-body">
            <ion-grid>
              <ion-row>
                <ion-col size="12">
                  <ion-text>
                    <p
                      style="
                        font-size: 40px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      <ion-icon
                        :icon="accessibilityOutline"
                        style="color: white"
                      ></ion-icon>
                      TRYGHED
                    </p>
                    <p
                      style="
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      Få kontrol over dit boligsalg og køb
                    </p>
                  </ion-text>

                  <ion-text>
                    <p style="font-size: 20px">
                      Del oplysninger om dit hus i dit eget tempo, og få et
                      uforpligtende indblik i dit måske kommende lokalområde fra
                      dem, som bor der!
                    </p>
                  </ion-text>
                  <hr class="rounded" />
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col size="12">
                  <ion-text>
                    <p
                      style="
                        font-size: 40px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      NÆRHED
                      <ion-icon
                        :icon="chatbubblesOutline"
                        style="color: white"
                      ></ion-icon
                      ><br />
                    </p>
                    <p
                      style="
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      Lær de lokale at kende
                    </p>
                  </ion-text>

                  <ion-text>
                    <p class="" style="font-size: 20px">
                      Chat med lokale i dit udvalgte boligområde og mød dine
                      måske kommende naboer i et uformelt virtuelt netværk!
                    </p>
                  </ion-text>
                  <hr class="rounded" />
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col size="12">
                  <ion-text>
                    <p
                      class="m-0"
                      style="
                        font-size: 40px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      <ion-icon
                        :icon="homeOutline"
                        style="color: white"
                      ></ion-icon>
                      HJEMHED<br />
                    </p>
                    <p
                      style="
                        font-size: 24px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      Din digitale opslagstavle
                    </p>
                  </ion-text>

                  <ion-text>
                    <p class="m-0" style="font-size: 20px">
                      Til dig, som går med købs- eller salgstanker!
                      <br />
                      Til dig, som interesserer sig for dit lokalområde!
                    </p>
                  </ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </div>
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
  IonIcon,
} from "@ionic/vue";
import firebaseAuth from "../hooks/FirebaseAuth";
import Typed from "typed.js";

import {
  accessibilityOutline,
  chatbubblesOutline,
  homeOutline,
  arrowForwardOutline,
  personAddOutline,
} from "ionicons/icons";

export default {
  name: "Velkommen",
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

  setup() {
    return {
      accessibilityOutline,
      chatbubblesOutline,
      homeOutline,
      arrowForwardOutline,
      personAddOutline,
    };
  },

  ionViewDidEnter() {
    this.typedJsUsage();
  },

  data() {
    return {
      user: firebaseAuth().userData,
      msgs: ["in CodeSandbox!", "from Irando"],
    };
  },

  methods: {
    navigateToLogin() {
      this.$router.push({ path: "/Login" });
    },
    navigateToCreate() {
      this.$router.push({ path: "/Opret" });
    },
    typedJsUsage() {
      var typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 40,
        backSpeed: 20,
        loop: true,
        loopCount: Infinity,
        cursorChar: "|",
      });
      typed.start();
    },
  },
};
</script>

<style scoped>
.typed-cursor {
  background-color: red;
  color: red;
}
:root {
  --ion-safe-area-top: 20px;
  --ion-safe-area-bottom: 22px;
}

ion-row {
  padding-bottom: 10px;
}

ion-button:hover#button1 {
  color: red;
}

#iconLeft {
  margin-right: 10px;
}

#rounded {
  margin-bottom: 1em;
  background: #ffffff;
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  font-size: 22px;
  width: 150px;
}
#userButtons1:hover {
  transform: scale(1.01);
}
#userButtons:hover {
  transform: scale(1.01);
}

#bigCard {
  background-color: white;
  color: var(--ion-color-primary);
  margin-top: 30px;
}

#bigCard1 {
  background-color: var(--ion-color-primary);
  color: white;
  border-radius: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
}

#cardText {
  text-align: center;
  color: var(--ion-color-primary);
  font-weight: bold;
  margin-top: 32px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 35px;
  background-color: var(--ion-color-primary);
}

.card {
  border-radius: 15px;
  border-color: var(--ion-color-primary);
}

#headerCard {
  background-color: var(--ion-color-primary);
}

#mousePointer {
  cursor: pointer;
  border-radius: 15px;
  margin-top: -15px;
}

#userButtons {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 18px !important;
  max-width: 250px;
  height: 48px;
  color: white;
  background-color: #76ab2e;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 15px;
}

#userButtons1 {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 8px;
  max-width: 250px;
  height: 48px;
  color: var(--ion-color-primary);
  background-color: white;
  margin: 0 auto;
  align-content: center;
  margin-bottom: 10px;
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

#mousePointer:hover .overlay {
  opacity: 0.75;
}

#mousePointer {
  position: relative;
  height: 100px;
}

.container {
  text-align: center;
  position: absolute;
  right: 0;
  left: 0;
}

#containerTop {
  left: 0;
  right: 0;
  position: absolute;
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

#button1 {
  border: white;
  color: var(--ion-color-primary);
  border: solid;
  border-width: 1px;
  max-width: 250px;
  border-radius: 25px;
  min-width: 190px;
}
#button2 {
  border: white;
  color: var(--ion-color-primary);
  border: solid;
  margin-top: -80px;
  border-width: 1px;
  max-width: 250px;
  border-radius: 25px;
  min-width: 190px;
}

#hjemhedCard {
  background: var(--ion-color-primary);
  font-weight: bold;
  margin: 20px;
  margin-top: 65px;
  margin-bottom: 55px;
}

.buttonContainer {
  margin-top: 60px;
}
.center {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media only screen and (min-width: 500px) {
  #text {
    font-size: 16px;
  }
}

@media only screen and (max-width: 500px) {
  #stortLogo {
    width: 100px;
    height: 100px;
  }
  #headerText {
    margin-top: -10px;
  }
}
</style>
