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
            <ion-text id="headerButtonText"> Opret opslag</ion-text>
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
      <div id="lottieDiv">
        <lottie-player
          id="lottie"
          src="https://assets5.lottiefiles.com/packages/lf20_jrvmilsc.json"
          background="transparent"
          speed="2"
          style="width: 150px; height: 150px"
          loop
          autoplay
        ></lottie-player>
      </div>

      <ion-list lines="none" style="margin-top: 10px">
        <ion-item lines="none" v-if="posts.length === 0">
          <div class="h1Text">
            <h1>Der er ingen opslag i <b>{{ this.$route.params?.id }}</b>, Du kan være den første til at lave et opslag!</h1>
          </div>
        </ion-item>
        <ion-item v-for="post in posts" :key="post?.postDateTime">
          <div class="card rounded text-white">
            <div class="card-header text-white">
              <div class="column1">
                <ion-avatar id="avatar">
                  <img
                    v-if="post?.userId?.profilePictureId != ''"
                    :src="post?.userId?.profilePictureId"
                  />
                  <img v-else src="assets/icon/templateUser.png" />
                </ion-avatar>
              </div>
              <div class="column2">
                <ion-icon
                  v-if="post.userId.id == user.uid"
                  @click="EditPost(post)"
                  id="iconDots"
                  slot="end"
                  :icon="ellipsisHorizontalOutline"
                ></ion-icon>
                <ion-icon
                  v-if="post.userId.id != user.uid"
                  id="iconDots"
                  slot="end"
                  @click="doOpenChat(post)"
                  :icon="chevronDownOutline"
                ></ion-icon>

                <ion-text>
                  <h3>
                    {{ post?.userId?.firstName }} {{ post?.userId?.lastName }}
                  </h3>
                  <h6>
                    {{ post?.postDateTime?.toLocaleTimeString() }} -
                    {{ post?.postDateTime?.toLocaleDateString() }}
                  </h6>
                </ion-text>
              </div>
            </div>

            <div class="card-header text-left">
              <div>
                <ion-img
                  id="postImg"
                  v-if="post?.postContentImg != ''"
                  :src="post?.postContentImg"
                ></ion-img>
              </div>
              <h5 class="card-title">{{ post?.postName }}</h5>
            </div>
            <div class="card-body">
              <ion-text>
                <p class="cardText">
                  {{ post?.postContent }}
                </p>
              </ion-text>
            </div>
          </div>
        </ion-item>
      </ion-list>

      <div v-if="posts.length != 0" class="center" style="text-align: center; margin-bottom: 20px">
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
import Modal from "../components/modals/OpslagModal.vue";
import editModal from "../components/modals/EditOpslagModal";
import profileChatModal from "../components/modals/ProfileChat.vue";
import {
  ellipsisHorizontalOutline,
  addOutline,
  arrowUpOutline,
  chevronDownOutline,
} from "ionicons/icons";
export default {
  name: "Posts",
  components: {
    IonPage,
    IonToolbar,
    IonTitle,
    IonItem,
    IonButton,
    IonList,
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
      posts: [],
      area: {},
      user: firebase.auth().currentUser,
    };
  },

  methods: {
    doRefresh(event) {
      this.getArea();

      setTimeout(() => {
        event.target.complete();
      }, 1000);
    },

    async EditPost(post) {
      if (post.userId.id == firebase.auth().currentUser.uid) {
        const modal = await modalController.create({
          component: editModal,

          componentProps: {
            post: post,
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

    async getUsers() {
      this.posts.forEach(async (post) => {
        if (post.userId != "") {
          await firebase
            .firestore()
            .collection("users")
            .doc(post.userId)
            .get()
            .then((result) => {
              post.userId = {
                id: post.userId,
                admin: result.data().admin,
                email: result.data().email,
                firstName: result.data().firstName,
                lastName: result.data().lastName,
                profilePictureId: result.data().profilePictureId,
                areaName: result.data().areaName,
                areaCode: result.data().areaCode,
              };
            });
        } else {
          post.userId = {
            firstName: "Admin",
            lastName: "",
            profilePictureId: "",
          };
        }
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
            this.getPosts();
          } else {
            this.area = { areaName: "ikke eksisterende" };
            this.openToast(
              "Der opstod en fejl, den by du leder efter, eksistere ikke"
            );
          }
        });
    },

    async getPosts() {
      this.posts = [];

      await firebase
        .firestore()
        .collection("areas")
        .doc(this.area.areaCode)
        .collection("posts")
        .orderBy("postDateTime", "desc")
        .get()
        .then((docs) => {
          docs.docs.forEach((doc) =>
            this.posts.push({
              postContent: doc.data().postContent,
              postContentImg: doc.data().postContentImg,
              postName: doc.data().postName,
              userId: doc.data().userId,
              postId: doc.id,
              postDateTime: doc.data().postDateTime.toDate(),
            })
          );
        })
        .then(() => {
          this.getUsers();
        });
    },
    goToTop() {
      var content = document.getElementById("content");
      content.scrollToTop();
    },

    ionViewDidEnter() {
      this.getArea().then(() => {
        let lottie = document.getElementById("lottieDiv");
        if (this.posts) {
          setTimeout(() => {
            lottie.style.display = "none";
          }, 1500);
        }
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
#downIcon {
  right: 0;
}

.cartText {
  white-space: pre-wrap;
  word-break: keep-all;
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
  white-space: pre-wrap;
  word-break: keep-all;
}

ion-content ion-segment {
  margin: 5px 0;
}

.h1Text {
  margin-left: auto;
  margin-right: auto;
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
  white-space: pre-wrap;
  word-break: keep-all;
}

p.letters {
  white-space: pre-wrap;
  word-break: keep-all;
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
