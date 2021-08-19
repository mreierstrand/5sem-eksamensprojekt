<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
          <ion-back-button @click="goBack()"> </ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="clear"> </ion-button>
        </ion-buttons>
        <ion-title>
          {{ otherData?.firstName }}
          {{ otherData?.lastName }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="content">
      <ion-grid v-if="messages" id="msgGrid">
        <ion-row
          v-for="message in messages"
          :key="message.time"
          @loadeddata="scrollBottom()"
        >
          <ion-col
            size="7"
            v-if="currentUser == message?.senderId"
            class="message other-message"
          >
            <ion-row>
              <div style="min-width: 50px">
                <ion-avatar class="avatarIcon"
                  ><img :src="userData?.profilePictureId"
                /></ion-avatar>
                <br />
              </div>
              <ion-col>
                <b>{{ message?.senderName }}</b>
              </ion-col>
            </ion-row>

            <ion-row>
              <span>{{ message?.content }}</span
              ><br />
            </ion-row>

            <div style="text-align: right" class="time">
              <ion-text class="time">
                <br />
                {{ message?.time?.toLocaleTimeString() }} -
                {{ message?.time?.toLocaleDateString() }}
              </ion-text>
            </div>
          </ion-col>

          <ion-col
            offset="5"
            size="7"
            v-if="currentUser !== message?.senderId"
            class="message my-message"
          >
            <ion-row>
              <div style="min-width: 50px">
                <ion-avatar class="avatarIcon"
                  ><img :src="otherData?.profilePictureId"
                /></ion-avatar>
                <br />
              </div>
              <ion-col>
                <b>{{ message?.senderName }}</b>
              </ion-col>
            </ion-row>

            <ion-row>
              <span>{{ message?.content }}</span
              ><br />
            </ion-row>

            <div style="text-align: right" class="time">
              <ion-text class="time">
                <br />
                {{ message?.time?.toLocaleTimeString() }} -
                {{ message?.time?.toLocaleDateString() }}
              </ion-text>
            </div>
          </ion-col>
        </ion-row>
        <div id="msgBot" ref="bot"></div>
      </ion-grid>
    </ion-content>

    <ion-footer>
      <ion-toolbar color="light">
        <ion-row class="ion-align-items-center">
          <ion-col size="10">
            <textarea
              auto-grow="true"
              rows="3"
              v-model="newMsg"
              class="messageInput"
            ></textarea>
          </ion-col>
          <ion-col size="2">
            <ion-button @click="sendMessage()" fill="clear" class="msgBtn"
              ><ion-text class="sendText">Send</ion-text
              ><ion-icon id="sendIcon" :icon="arrowRedoCircleOutline"></ion-icon
            ></ion-button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
} from "@ionic/vue";

import { arrowRedoCircleOutline } from "ionicons/icons";

import firebase from "firebase";

export default {
  name: "Chat",
  components: {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonAvatar,
  },

  setup() {
    return {
      arrowRedoCircleOutline,
    };
  },
  data() {
    return {
      chat: [],
      messages: [],
      currentUser: firebase.auth().currentUser.uid,
      userData: "",
      otherData: "",
      newMsg: "",
    };
  },

  ionViewWillEnter() {
    this.isUserAuthorized().then(() => {
      this.getMsg().then(() => {
        this.getUser();
      });
    });
  },

  methods: {
    async getUser() {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          this.userData = doc.data();
        });

      var chat = await firebase
        .firestore()
        .collection("Chats")
        .doc(this.$route.params.id)
        .get();

      if (chat.data().contact1 != firebase.auth().currentUser.uid) {
        await firebase
          .firestore()
          .collection("users")
          .doc(chat.data().contact1)
          .get()
          .then((doc) => {
            this.otherData = doc.data();
          });
      } else {
        await firebase
          .firestore()
          .collection("users")
          .doc(chat.data().contact2)
          .get()
          .then((doc) => {
            this.otherData = doc.data();
          });
      }

      this.$nextTick(() => {
        var dimensions = document.getElementById("msgBot");
        dimensions.scrollIntoView();
      });
    },

    async getMsg() {
      await firebase
        .firestore()
        .collection("Chats")
        .doc(this.$route.params.id)
        .collection("messages")
        .orderBy("time", "asc")
        .onSnapshot((docs) => {
          if (this.messages.length < 1) {
            docs.docs.forEach((doc) => {
              this.messages.push({
                content: doc.data().content,
                senderId: doc.data().senderId,
                senderName: doc.data().senderName,
                time: doc.data().time.toDate(),
              });
            });
          } else {
            docs.docChanges().forEach((doc) => {
              if (doc.type == "added") {
                this.messages.push({
                  content: doc.doc.data().content,
                  senderId: doc.doc.data().senderId,
                  senderName: doc.doc.data().senderName,
                  time: doc.doc.data().time.toDate(),
                });
                this.$nextTick(() => {
                  setTimeout(() => {
                    var dimensions = document.getElementById("msgBot");
                    dimensions.scrollIntoView();
                  }, 300);
                });
              }
            });
          }
        });
    },

    async isUserAuthorized() {
      await firebase
        .firestore()
        .collection("Chats")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (
            doc.data().contact1 != firebase.auth().currentUser.uid &&
            doc.data().contact2 != firebase.auth().currentUser.uid
          ) {
            this.$router.push({ path: "/velkommen" });
          }
        });
    },

    async goBack() {
      this.$router.back();
    },
    sendMessage() {
      if (this.newMsg != "") {
        firebase
          .firestore()
          .collection("Chats")
          .doc(this.$route.params.id)
          .collection("messages")
          .add({
            content: this.newMsg,
            senderId: firebase.auth().currentUser.uid,
            senderName: this.userData.firstName + " " + this.userData.lastName,
            time: firebase.firestore.Timestamp.now(),
          });
        this.newMsg = "";
      } else {
        alert("Du kan ikke sende en tom besked. Skriv noget!");
      }
    },
  },
};
</script>

<style scoped>
.message {
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 4px;
  margin-top: 10px;
  white-space: pre-wrap;
}

.other-message {
  background-color: var(--ion-color-tertiary);
  color: white;
}

.my-message {
  background-color: var(--ion-color-primary);
  color: white;
}

.time {
  font-size: 15px;
  font-style: italic;
}

.messageInput {
  width: 100%;
  border: 1px solid var(--ion-color-primary);
  border-radius: 5px;
  background-color: white;
  resize: none;
  padding-left: 10px;
  padding-right: 10px;
}

.msgBtn {
  height: 60px;
  max-height: 100px;
  width: 95%;
  --border-radius: 15px;
  --color: white;
  padding-right: 5px;
  background-color: var(--ion-color-primary);
  border-radius: 15px;
  margin-top: -2px;
  margin-right: 5px;
  padding: 5px;
}

.msgBtn:hover .sendText {
  font-weight: bold;
}

.sendIcon {
  margin-left: 10px;
  font-size: 20px;
}

.sendText {
  font-size: 20px;
}

@media only screen and (min-width: 500px) {
  #sendIcon {
    display: none;
  }
}

@media only screen and (max-width: 500px) {
  .sendText {
    font-size: 12px;
    margin: auto;
    display: none;
  }
  #sendIcon {
    display: block;
    color: white;
    font-size: 22px;
    min-width: 30px;
    min-height: 30px;
  }
}

.avatarIcon {
  width: 40px;
  height: 40px;
}
</style>
