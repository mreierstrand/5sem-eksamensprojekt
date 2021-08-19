<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 28px"
          >Rediger</ion-title
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
          :icon="ellipsisHorizontalSharp"
          @click="doDeletePost()"
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

          <ion-item lines="none">
            <div style="margin-left: auto; margin-right: auto">
              <ion-img
                id="previewImage"
                v-if="post?.postContentImg != ''"
                :src="post?.postContentImg"
              ></ion-img>
            </div>
          </ion-item>

          <ion-item lines="none">
            <ion-label
              style="font-size: 24px; margin-top: 0px; font-weight: bold"
              >Titel på opslag:
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-input
              style="font-size: 24px; margin-top:-15px; font-weight: bold:"
              type="text"
              placeholder="Opslagets titel"
              :value="title"
              @input="title = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-textarea
              style="
                font-size: 18px;
                height: auto;
                margin-top: 20px;
                border-radius: 15px;
                padding-top: 5px;
                padding-left: 10px;
              "
              id="opslagText"
              type="text"
              maxlength="1000"
              rows="10"
              cols="20"
              placeholder="Skriv dit opslag her..."
              :value="content"
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
              @click="doEditPost()"
              >Gem opslag<ion-spinner
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
  actionSheetController,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent } from "vue";
import * as icons from "ionicons/icons";
import firebase from "firebase";
import ImageService from "../../hooks/ImageService";
import {
  arrowUndoOutline,
  trashSharp,
  ellipsisHorizontalSharp,
} from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: {
    user: { type: String, default: "bruger" },
    area: {},
    post: {},
  },

  setup() {
    return {
      arrowUndoOutline,
      trashSharp,
      ellipsisHorizontalSharp,
    };
  },

  data() {
    return {
      content: this.$props.post.postContent,
      modalCtrl: modalController,
      title: this.$props.post.postName,
      date: new Date(),
      selectOption: "Nej",
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
    doUpload() {
      document.getElementById("imageInput").childNodes.item(0).click();
    },
    preview(event) {
      document.getElementById("previewImage").style.display = "block";
      this.formImage = event.target.files[0];
      document.getElementById("previewImage").src = URL.createObjectURL(
        event.target.files[0]
      );
    },

    async doDeletePost() {
      const actionSheet = await actionSheetController.create({
        buttons: [
          {
            text: "Gem opslag",
            icon: icons.addCircleSharp,
            handler: async () => {
              await this.doEditPost().then(this.modalCtrl.dismiss());
            },
          },
          {
            text: "Slet opslag",
            role: "destructive",
            icon: icons.trash,
            handler: async () => {
              await this.doAcceptDelete().then(this.modalCtrl.dismiss());
            },
          },
          {
            text: "Gå tilbage",
            icon: icons.close,
            role: "cancel",
            handler: async () => {
              await this.modalCtrl.dismiss();
            },
          },
        ],
      });
      await actionSheet.present();
    },

    async doEditPost() {
      document.getElementById("spinner").style.display = "block";

      if (this.formImage != "") {
        var uploadImage = await ImageService().upload(this.formImage);

        await firebase
          .firestore()
          .collection("areas")
          .doc(this.$props.area.areaCode)
          .collection("posts")
          .doc(this.$props.post.postId)
          .set({
            postContent: this.content,
            postContentImg: uploadImage,
            postName: this.title,
            userId: this.$props.user,
            postDateTime: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            document.getElementById("spinner").style.display = "none";
            this.modalCtrl.dismiss();
          });
      } else {
        await firebase
          .firestore()
          .collection("areas")
          .doc(this.$props.area.areaCode)
          .collection("posts")
          .doc(this.$props.post.postId)
          .set({
            postContent: this.content,
            postContentImg: this.$props.post.postContentImg,
            postName: this.title,
            userId: this.$props.user,
            postDateTime: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            document.getElementById("spinner").style.display = "none";
            this.modalCtrl.dismiss();
          });
      }
    },

    async doAcceptDelete() {
      document.getElementById("spinner").style.display = "block";
      await firebase
        .firestore()
        .collection("areas")
        .doc(this.$props.area.areaCode)
        .collection("posts")
        .doc(this.$props.post.postId)
        .delete()
        .then(() => {
          document.getElementById("spinner").style.display = "none";
          this.modalCtrl.dismiss();
        });
    },
  },
});
</script>

<style scoped>
#previewImage {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  margin-bottom: 25px;
  margin-top: 25px;
}
</style>
