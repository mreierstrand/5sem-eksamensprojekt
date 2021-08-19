<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
          <ion-back-button @click="this.$router.back()"> </ion-back-button>
        </ion-buttons>
        <ion-title>{{ area?.areaName }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-grid>
        <div class="row align-items-center my-5">
          <div class="col-12">
            <ion-col size="5">
              <ion-text>
                <h2 style="margin-top: -2em; margin-left: 20px">
                  Du har valgt
                  <b>{{ this.area?.areaName }}.</b> Her kan du vælge mellem
                  opslag, boliger, aktiviteter, skoler eller indkøbsmuligheder.
                </h2>
              </ion-text>
            </ion-col>
            <ion-col size="1"> </ion-col>
          </div>
        </div>
        <div
          style="justify-content: center; margin-top: -50px"
          class="row row-cols-1 row-cols-md-2"
        >
          <div class="col mb-4">
            <ion-card
              id="mousePointer"
              @click="doOpenPosts(area?.areaName, area?.areaCode)"
            >
              <div id="imgDiv">
                <ion-img src="assets/img/opslagstavle.png" />
                <div class="overlay">
                  <div class="text">
                    <ion-text style="font-weight: bold">OPSLAG</ion-text>
                  </div>
                </div>
              </div>
              <ion-card-header>
                <ion-card-title id="titleText" style="text-align: center"
                  >Opslag i {{ this.area?.areaName }}</ion-card-title
                >
              </ion-card-header>
            </ion-card>
          </div>
          <div class="col mb-4">
            <ion-card
              id="mousePointer"
              @click="doOpenHouses(area?.areaName, area?.areaCode)"
            >
              <div id="imgDiv">
                <ion-img src="assets/img/hus2.jpg" />
                <div class="overlay">
                  <div class="text">
                    <ion-text style="font-weight: bold">BOLIGER</ion-text>
                  </div>
                </div>
              </div>
              <ion-card-header>
                <ion-card-title id="titleText" style="text-align: center"
                  >Boliger i {{ this.area?.areaName }}</ion-card-title
                >
              </ion-card-header>
            </ion-card>
          </div>
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
                        margin-top: 15px;
                        margin-bottom: 15px;
                      "
                    >
                      Andre muligheder i {{ this.area?.areaName }}
                    </h1></ion-text
                  >
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </div>
        <div
          style="justify-content: center; margin-top: 30px"
          class="row row-cols-1 row-cols-md-2"
        >
          <div class="col mb-4">
            <ion-card @click="goToAktiviteter()" id="mousePointer">
              <div id="imgDiv">
                <ion-img id="cardImg" src="assets/img/foreninger.jpg" />
                <div class="overlay">
                  <div class="text">
                    <ion-text style="font-weight: bold">AKTIVITETER</ion-text>
                  </div>
                </div>
              </div>
              <ion-card-header>
                <ion-card-title id="titleText" style="text-align: center">
                  Aktiviteter i {{ this.area?.areaName }}
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          </div>
          <div class="col mb-4">
            <ion-card @click="goToSkoler()" id="mousePointer">
              <div id="imgDiv">
                <ion-img id="cardImg" src="assets/img/glade_boern.jpg" />
                <div class="overlay">
                  <div class="text">
                    <ion-text style="font-weight: bold">SKOLER</ion-text>
                  </div>
                </div>
              </div>
              <ion-card-header>
                <ion-card-title id="titleText" style="text-align: center"
                  >Skoler i {{ this.area?.areaName }}</ion-card-title
                >
              </ion-card-header>
            </ion-card>
          </div>
          <div class="col mb-4">
            <ion-card @click="goToInstitutioner()" id="mousePointer">
              <div id="imgDiv">
                <ion-img id="cardImg" src="assets/img/institutioner.jpg" />
                <div class="overlay">
                  <div class="text">
                    <ion-text style="font-weight: bold">INSTITUTIONER</ion-text>
                  </div>
                </div>
              </div>
              <ion-card-header>
                <ion-card-title id="titleText" style="text-align: center"
                  >Institutioner i {{ this.area?.areaName }}</ion-card-title
                >
              </ion-card-header>
            </ion-card>
          </div>
          <div class="col mb-4">
            <ion-card @click="goToIndkob()" id="mousePointer">
              <div id="imgDiv">
                <ion-img id="cardImg" src="assets/img/indkob.jpg" />
                <div class="overlay">
                  <div class="text">
                    <ion-text style="font-weight: bold">INDKØB</ion-text>
                  </div>
                </div>
              </div>
              <ion-card-header>
                <ion-card-title id="titleText" style="text-align: center"
                  >Indkøb i {{ this.area?.areaName }}</ion-card-title
                >
              </ion-card-header>
            </ion-card>
          </div>
        </div>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonGrid,
  toastController,
  IonCard,
} from "@ionic/vue";
import firebase from "firebase";

export default {
  name: "SpecificArea",
  components: {
    IonPage,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonCard,
  },

  data() {
    return {
      area: {},
    };
  },

  methods: {
    doOpenPosts(areaName, areaCode) {
      this.$router.push({
        name: "Opslag",
        params: { areaName, areaCode },
      });
    },
    doOpenHouses(areaName, areaCode) {
      this.$router.push({
        name: "Opret bolig opslag",
        params: { areaName, areaCode },
      });
    },

    goToIndkob() {
      window.open(
        "https://www.google.dk/maps/search/indkøb+" + this.area?.areaName,
        "_blank"
      );
    },

    goToSkoler() {
      window.open(
        "https://www.google.dk/maps/search/skoler+" + this.area?.areaName,
        "_blank"
      );
    },

    goToAktiviteter() {
      window.open(
        "https://www.google.dk/maps/search/aktiviteter+" + this.area?.areaName,
        "_blank"
      );
    },

    goToInstitutioner() {
      window.open(
        "https://www.google.dk/maps/search/institutioner+" +
          this.area?.areaName,
        "_blank"
      );
    },

    async openToast(message) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
      });
      return toast.present();
    },
  },

  ionViewWillEnter() {
    var searchParam =
      this.$route.params?.id.charAt(0).toUpperCase() +
      this.$route.params?.id.slice(1);

    firebase
      .firestore()
      .collection("areas")
      .where("areaName", "==", searchParam)
      .get()
      .then((result) => {
        if (!result.empty && result.size < 2) {
          result.docs.forEach((doc) => (this.area = doc.data()));
        } else {
          this.area = { areaName: "ikke eksisterende" };
          this.openToast(
            "Der opstod en fejl, den by du leder efter, eksistere ikke"
          );
        }
      });
  },
};
</script>

<style>
#cardImg {
  height: 250px;
  object-fit: cover;
}
#hjemhedCard {
  background: var(--ion-color-primary);
  font-weight: bold;
  margin: 10px;
  margin-top: -50px;
  margin-bottom: 55px;
}
#mousePointer {
  cursor: pointer;
  border-radius: 15px;
}

#imgDiv {
  position: relative;
}

#bigCard {
  border-color: var(--ion-color-primary) !important;
  border-radius: 15px !important;
  margin-top: 0px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  border: 1px solid #007bff; 
  width: 98.5%;
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

#mousePointer:hover #titleText {
  font-weight: bold;
  color: var(--ion-color-primary);
}

#mousePointer:hover .overlay {
  opacity: 0.75;
}

#bigCard {
  background-color: white;
  color: var(--ion-color-primary);
}
</style>
