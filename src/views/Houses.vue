<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
          <ion-back-button @click="goBack()"> </ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="clear" id="opretBtn" @click="NewPost()">
            <ion-text id="headerButtonText"> Opret boligopslag</ion-text>
            <ion-icon id="addButton" slot="start" :icon="addOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{ this.$route.params?.id }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="content" fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content> </ion-refresher-content>
      </ion-refresher>
      <ion-list lines="none" style="margin-top: 10px">
        <ion-item lines="none" v-if="houses.length === 0">
          <div class="h1Text">
            <h1>
              Der er ingen boligopslag i <b>{{ this.$route.params?.id }}</b
              >, Du kan være den første til at lave et opslag!
            </h1>
          </div>
        </ion-item>
        <ion-item v-for="house in houses" :key="house?.postDateTime">
          <div class="card rounded text-white">
            <div class="card-header text-white">
              <div class="column1">
                <ion-avatar id="avatar">
                  <ion-img
                    v-if="house?.userId?.profilePictureId != ''"
                    :src="house?.userId?.profilePictureId"
                  />
                  <ion-img v-else src="assets/icon/templateUser.png" />
                </ion-avatar>
              </div>
              <div class="column2">
                <ion-icon
                  v-if="house.userId.id == user.uid"
                  @click="EditHousePost(house)"
                  id="iconDots"
                  slot="end"
                  :icon="ellipsisHorizontalOutline"
                ></ion-icon>
                <ion-icon
                  v-else-if="user.uid != house.userId.id"
                  id="iconDots"
                  slot="end"
                  @click="doOpenChat(house)"
                  :icon="chevronDownOutline"
                ></ion-icon>
                <ion-text>
                  <h3>
                    {{ house?.userId.firstName }} {{ house?.userId?.lastName }}
                  </h3>
                  <h6>
                    {{ house?.postDateTime?.toLocaleTimeString() }} -
                    {{ house?.postDateTime?.toLocaleDateString() }}
                  </h6>
                </ion-text>
              </div>
            </div>

            <div
              class="card-header text-left pointer"
              @click="readHouseInfo(house)"
            >
              <div>
                <ion-img
                  id="postImg"
                  v-if="house?.postMultipleImg != ''"
                  :src="house?.postMultipleImg[0].image"
                ></ion-img>
              </div>
              <h5 class="card-title">{{ house?.houseTitel }}</h5>
            </div>
            <div class="card-body">
              <ion-text>
                <p class="cardText">Hustype: {{ house?.houseHousetype }}</p>
              </ion-text>
              <ion-text>
                <p class="cardText">Pris: {{ house?.housePrice }}</p>
              </ion-text>
              <ion-text>
                <p class="cardText">
                  Kvadratmeter: {{ house?.houseHouseArea }}
                </p>
              </ion-text>
              <ion-button class="readMoreButton" @click="readHouseInfo(house)"
                >Læs mere</ion-button
              >
            </div>
          </div>
        </ion-item>
      </ion-list>

      <div
        v-if="houses.length != 0"
        class="center"
        style="text-align: center; margin-bottom: 20px"
      >
        <ion-button @click="goToTop()" fill="clear" id="toTopButton">
          <ion-icon
            style="color: white; margin-right: 10px; margin-left: -5px"
            :icon="arrowUpOutline"
          ></ion-icon>
          <ion-text>Til toppen </ion-text>
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonAvatar,
  IonImg,
  IonPage,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonButton,
  toastController,
  modalController,
  IonIcon,
  IonRefresher,
} from "@ionic/vue";
import firebase from "firebase";
import Modal from "../components/modals/BoligSalgModal.vue";
import profileChatModal from "../components/modals/ProfileChat.vue";
import InfoModal from "../components/modals/BoligInfoModal.vue";
import editBoligSalgModal from "../components/modals/EditBoligSalgModal.vue";
import {
  ellipsisHorizontalOutline,
  addOutline,
  arrowUpOutline,
  chevronDownOutline,
} from "ionicons/icons";

export default {
  name: "Houses",
  components: {
    IonPage,
    IonToolbar,
    IonTitle,
    IonItem,
    IonButton,
    IonList,
    IonAvatar,
    IonImg,
    IonIcon,
    IonRefresher,
  },

  setup() {
    return {
      ellipsisHorizontalOutline,
      addOutline,
      arrowUpOutline,
      chevronDownOutline,
    };
  },

  data() {
    return {
      houses: [],
      area: {},
      user: firebase.auth().currentUser,
    };
  },

  methods: {
    async doOpenChat(post) {
      const modal = await modalController.create({
        component: profileChatModal,
        componentProps: {
          post: post,
          user: "" + firebase.auth().currentUser.uid,
        },
      });
      modal.present();
    },

    doGoToInfoSite() {
      this.$router.push({
        name: "Hus Info",
      });
    },

    doRefresh(event) {
      this.getArea();
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    },
    async EditHousePost(house) {
      if (house.userId.id == firebase.auth().currentUser.uid) {
        const modal = await modalController.create({
          component: editBoligSalgModal,

          componentProps: {
            house: house,
            area: this.area,
            user: "" + firebase.auth().currentUser.uid,
          },
        });
        modal.present();

        modal.onDidDismiss().then(() => {
          this.getArea();
        });
      }
    },

    async getUsers() {
      this.houses.forEach((house) => {
        if (house.userId != "") {
          firebase
            .firestore()
            .collection("users")
            .doc(house.userId)
            .get()
            .then((result) => {
              house.userId = {
                id: house.userId,
                firstName: result.data().firstName,
                lastName: result.data().lastName,
                profilePictureId: result.data().profilePictureId,
                areaName: result.data().areaName,
                areaCode: result.data().areaCode,
              };
            });
        } else {
          house.userId = {
            firstName: "Admin",
            lastName: "",
            profilePictureId: "",
          };
        }
      });
    },

    async readHouseInfo(house) {
      const modal = await modalController.create({
        component: InfoModal,
        componentProps: {
          house: house,
          area: this.area,
        },
      });
      // console.log("readHouseInfo" + house);
      modal.present();

      modal.onDidDismiss().then(() => {
        this.getHouses();
      });
    },

    async NewPost() {
      const modal = await modalController.create({
        component: Modal,

        componentProps: {
          user: "" + firebase.auth().currentUser.uid,
          area: this.area,
        },
      });

      modal.present();

      modal.onDidDismiss().then(() => {
        this.getArea();
      });
    },

    async goBack() {
      this.$router.back();
    },
    async getArea() {
      var searchParam =
        this.$route.params?.id.charAt(0).toUpperCase() +
        this.$route.params?.id.slice(1);
      await firebase
        .firestore()
        .collection("areas")
        .where("areaName", "==", searchParam)
        .get()
        .then((result) => {
          if (!result.empty && result.size < 2) {
            result.docs.forEach((doc) => (this.area = doc.data()));
            //console.log(this.area);
            this.getHouses();
          } else {
            this.area = { areaName: "ikke eksisterende" };
            this.openToast(
              "Der opstod en fejl, den by du leder efter, eksisterer ikke"
            );
          }
        });
    },

    async getHouses() {
      this.houses = [];

      await firebase
        .firestore()
        .collection("areas")
        .doc(this.area.areaCode)
        .collection("housePosts")
        .orderBy("postDateTime", "desc")
        .get()
        .then((docs) => {
          docs.docs.forEach((doc) => {
            this.houses.push({
              houseTitel: doc.data().postName,
              housePrice: doc.data().housePrice,
              houseDescription: doc.data().postContent,
              postMultipleImg: doc.data().postMultipleImg,
              houseConditionReport: doc.data().conditionReport,
              houseGroundArea: doc.data().groundArea,
              houseHouseArea: doc.data().houseArea,
              houseHousetype: doc.data().houseType,
              houseRoadName: doc.data().roadName,
              houseRoadNumber: doc.data().roadNumber,
              houseRooms: doc.data().rooms,
              userId: doc.data().userId,
              houseId: doc.id,
              postDateTime: doc.data().postDateTime.toDate(),
            });
            //console.log(doc.data());
          });
        })
        .then(() => {
          this.getUsers();
        });
    },
    goToTop() {
      var content = document.getElementById("content");
      content.scrollToTop();
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
    this.getArea().then(() => {
      let lottie = document.getElementById("lottieDiv");
      if (this.house) {
        setTimeout(() => {
          lottie.style.display = "none";
        }, 1000);
      }
    });

    //this.$route.params?.id
  },
};
</script>

<style>
#downIcon {
  right: 0;
}

#readMore {
  height: 25px;
  max-height: 140px;
}
#opretBtn {
  border: solid 1px;
  border-radius: 12px !important;
  max-width: 250px;
  margin-top: 10px;
  height: 40px;
  color: white;
  font-weight: bold;
  background-color: #76ab2e;
  align-content: center;
  margin-bottom: 10px;
  font-size: 18px;
}
.h1Text {
  margin-left: auto;
  margin-right: auto;
}
#avatar {
  margin-left: -10px;
  width: 60px;
  height: 60px;
}

#toTopButton {
  border: solid 1px;
  border-radius: 12px !important;
  max-width: 250px;
  margin-top: 10px;
  height: 40px;
  color: white;
  font-weight: bold;
  background-color: #76ab2e;
  align-content: center;
  margin-bottom: 10px;
  font-size: 18px;
}
.card {
  width: 19rem;
  border: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #383a3e;
}

.card,
.card-header,
.card-body,
.card-footer {
  border-radius: 15px !important;
}

.pointer {
  cursor: pointer;
}

.readMoreButton {
  color: white;
}

ion-content ion-segment {
  margin: 5px 0;
}

#hoverIcon:hover {
  cursor: pointer;
}

.column1 {
  float: left;
  width: 20%;
  padding: 10px;
  margin-right: 20px;
  position: relative;
}

.column2 {
  float: left;
  width: 60%;
  margin-left: 10px;
  margin-top: -7.5px;
}
.column3 {
  float: left;
}

.card-title {
  font-weight: bold;
  font-size: 24px;
}

#iconDots {
  margin-top: 10px;
  font-size: 35px;
  position: absolute;
  right: 20px;
  top: 0px;
}

p {
  word-break: break-all;
  white-space: normal;
}

p.letters {
  word-wrap: break-word;
}

#iconDots:hover {
  cursor: pointer;
  color: var(--ion-color-primary);
}

#hiddenAddButton {
  font-size: 35px;
  color: var(--ion-color-primary);
  display: none;
}

#lottie {
  margin-left: auto;
  margin-right: auto;
}
#lottieDiv {
  margin-top: -25px;
  margin-bottom: -45px;
}

html {
  scroll-behavior: smooth;
}

@media only screen and (min-width: 991px) {
  .card {
    width: 35rem;
  }

  .column2 {
    margin-left: -45px;
  }
  .card-text {
    overflow: hidden;
  }
}

@media only screen and (min-width: 691px) {
  .card {
    width: 30rem;
  }
  .column2 {
    margin-left: -35px;
  }

  .card-text {
    overflow: hidden;
  }
}

@media only screen and (max-width: 500px) {
  #opretBtn {
    display: inline-block;
  }

  #addButton {
    margin-right: 1px;
    font-size: 32px;
    color: white;
  }

  #headerButtonText {
    display: none;
  }

  .card-text {
    width: 285px;
    min-height: 20px;
    max-height: 80px;
    height: 60px;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }

  #postImg {
    height: 250px;
    width: 250px;
    max-width: 300px;
    max-height: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
