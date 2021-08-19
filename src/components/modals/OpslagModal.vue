<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 28px"
          >Opret opslag</ion-title
        >

        <ion-icon
          id="hoverIcon"
          slot="start"
          style="color: red; font-size: 32px; margin-left: 10px"
          :icon="arrowUndoOutline"
          @click="modalCtrl.dismiss()"
        ></ion-icon>
        <ion-icon
          id="hoverIcon1"
          slot="end"
          style="
            color: var(--ion-color-primary);
            font-size: 32px;
            margin-right: 10px;
          "
          :icon="addCircleOutline"
          @click="doCreatePost()"
        ></ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div style="margin-top: 10px">
        <ion-list>
          <ion-item lines="none">
            <ion-input
              id="imageInput"
              type="file"
              @change="preview($event)"
              hidden
            ></ion-input>
            <ion-button
              class="roundedButtonOpret"
              style="
                margin-left: auto;
                margin-right: auto;
                font-size: 18px;
                background-color: var(--ion-color-tertiary);
              "
              id="uploadBtn"
              fill="clear"
              @click="doUpload()"
              >Upload billede
            </ion-button>
          </ion-item>

          <ion-item>
            <ion-img
              id="previewImage"
              src=""
              alt="sæt dit billede ind her"
              style="
                width: 250px;
                height: 250px;
                display: none;
                margin-left: auto;
                margin-right: auto;
                margin-top: 10px;
                margin-bottom: 10px;
              "
            >
            </ion-img>
          </ion-item>
          <ion-item lines="none">
            <ion-input
              style="font-size: 24px; margin-top: 10px; font-weight: bold"
              type="text"
              placeholder="Indtast titel på opslag her..."
              @input="this.title = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-textarea
              style="font-size: 18px; height: auto; border-radius: 15px; padding-top: 5px; padding-left: 10px;"
              id="opslagText"
              type="text"
              rows="10"
              cols="20"
              maxlength="1000"
              placeholder="Skriv dit opslag her..."
              @input="content = $event.target.value"
            >
            </ion-textarea>
          </ion-item>
          <ion-item lines="none">
            <ion-button
              class="roundedButtonOpret"
              style="
                margin-left: auto;
                margin-right: auto;
                font-size: 18px;
                margin-top: 25px;
              "
              id="uploadBtn"
              fill="clear"
              @click="doCreatePost()"
              >Post opslag<ion-spinner
                id="spinner"
                style="margin-left: 5px; color: white; display: none"
                name="crescent"
              ></ion-spinner>
            </ion-button>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  modalController,
  IonIcon,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase";
import imageService from "../../hooks/ImageService";
import {
  arrowUndoOutline,
  addCircleOutline,
  arrowUndoCircleSharp,
  addCircleSharp,
} from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: {
    user: { type: String, default: "bruger" },
    area: {},
  },

  setup() {
    return {
      arrowUndoOutline,
      addCircleOutline,
      arrowUndoCircleSharp,
      addCircleSharp,
    };
  },

  data() {
    return {
      content: "Brugeren har ikke indtastet tekst til opslaget",
      modalCtrl: modalController,
      title: "Brugeren har ikke indtastet en titel",
      date: new Date(),
      formImage: "",
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonIcon,
    IonSpinner,
  },

  methods: {
    preview(event) {
      document.getElementById("previewImage").style.display = "block";
      this.formImage = event.target.files[0];
      document.getElementById("previewImage").src = URL.createObjectURL(
        event.target.files[0]
      );
    },
    doUpload() {
      document.getElementById("imageInput").childNodes.item(0).click();
    },
    async doCreatePost() {
      document.getElementById("spinner").style.display = "block";

      var uploadImage;
      if (this.formImage == "") {
        uploadImage = this.formImage;

        firebase
          .firestore()
          .collection("areas")
          .doc(this.$props.area.areaCode)
          .collection("posts")
          .add({
            postContent: this.content,
            postContentImg: uploadImage,
            postName: this.title,
            userId: this.$props.user,
            postDateTime: firebase.firestore.Timestamp.now(),
          }).then(() => {
            document.getElementById("spinner").style.display = "none";
          });
      } else {
        uploadImage = await this.doPostImage(this.formImage);

        firebase
          .firestore()
          .collection("areas")
          .doc(this.$props.area.areaCode)
          .collection("posts")
          .add({
            postContent: this.content,
            postContentImg: uploadImage,
            postName: this.title,
            userId: this.$props.user,
            postDateTime: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            document.getElementById("spinner").style.display = "none";
          });
      }

      this.modalCtrl.dismiss();
    },

    doPostImage() {
      return imageService().upload(this.formImage);
    },
  },
});
</script>

<style>
#rounded {
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
  background: #ffffff;
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  font-size: 22px;
}

.roundedButtonOpret {
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

#hoverIcon:hover {
  cursor: pointer;
  transform: scale(1.11);
}

#hoverIcon1:hover {
  cursor: pointer;
  transform: scale(1.11);
}

ion-textarea {
  border: solid 1px var(--ion-color-primary);
  padding: 5px;
}
</style>
