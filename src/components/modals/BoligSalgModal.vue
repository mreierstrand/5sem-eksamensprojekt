<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 28px"
          >Min bolig</ion-title
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
              multiple
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
              @click="doUploadMultiple()"
              >Upload billeder
            </ion-button>
          </ion-item>

          <ion-item lines="none">
            <ion-grid>
              <ion-row>
                <ion-item lines="none" v-for="file in fileList" :key="file">
                  <ion-img :src="imageHelper(file)" style="margin-top: 10px" />
                </ion-item>
              </ion-row>
            </ion-grid>
          </ion-item>

          <ion-item lines="none" id="houseTitel">
            <ion-input
              style="
                font-size: 24px;
                margin-top: 10px;
                font-weight: bold;
                margin-left: 10px;
              "
              type="text"
              placeholder="Giv opslaget en titel..."
              @input="title = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-textarea
              id="textArea"
              type="text"
              rows="10"
              cols="20"
              maxlength="1000"
              placeholder="Skriv dit opslag her..."
              @input="content = $event.target.value"
            >
            </ion-textarea>
          </ion-item>

          <ion-item id="roundedFirst" lines="none">
            <ion-label>Vælg Boligtype</ion-label>
            <ion-select
              id="boligtypeInput"
              @ionChange="houseType = $event.target.value"
            >
              <ion-select-option value="Ejerlejlighed"
                >Ejerlejlighed</ion-select-option
              >
              <ion-select-option value="Andelsbolig"
                >Andelsbolig</ion-select-option
              >
              <ion-select-option value="Villa">Villa</ion-select-option>
              <ion-select-option value="Villalejlighed"
                >Villalejlighed</ion-select-option
              >
              <ion-select-option value="Rækkehus">Rækkehus</ion-select-option>
              <ion-select-option value="Landejendom"
                >Landejendom</ion-select-option
              >
              <ion-select-option value="Fritidsbolig"
                >Fritidsbolig</ion-select-option
              >
            </ion-select>
          </ion-item>

          <ion-item id="roundedFirst" lines="none">
            <ion-input
              id="boligPriceInput"
              placeholder="Din salgspris"
              type="number"
              class="numberInput"
              @input="housePrice = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item id="roundedFirst" lines="none">
            <ion-input
              id="boligArealInput"
              placeholder="Boligareal i kvm"
              type="number"
              class="numberInput"
              @input="houseArea = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item id="roundedFirst" lines="none">
            <ion-input
              id="grundArealInput"
              placeholder="Grundareal i kvm"
              type="number"
              class="numberInput"
              @input="groundArea = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item id="roundedFirst" lines="none">
            <ion-input
              id="roomsInput"
              placeholder="Antal rum"
              type="number"
              class="numberInput"
              @input="rooms = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>
          <ion-item id="roundedFirst" lines="none">
            <ion-input
              id="roadNameInput"
              placeholder="Gadenavn"
              type="text"
              @input="roadName = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>
          <ion-item id="roundedFirst" lines="none">
            <ion-input
              id="roadNumberInput"
              placeholder="Husnummer"
              type="number"
              class="numberInput"
              @input="roadNumber = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item id="roundedFirst" lines="none">
            <ion-label>Tilstandsrapport</ion-label>
            <label>Nej</label>
            <ion-toggle
              @ionChange="conditionReport = $event.target.checked"
            ></ion-toggle>
            <label>Ja</label>
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
              >Opret boligopslag
              <ion-spinner
                id="spinner"
                style="margin-left: 5px; color: white; display: none"
                name="crescent"
              ></ion-spinner
            ></ion-button>
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
  IonSelect,
  IonSelectOption,
  IonToggle,
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
  arrowForwardOutline,
} from "ionicons/icons";
export default defineComponent({
  name: "Modal",
  props: {
    user: { type: String, default: "bruger" },
    area: {},
  },

  setup() {
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };

    return {
      arrowUndoOutline,
      addCircleOutline,
      arrowUndoCircleSharp,
      addCircleSharp,
      arrowForwardOutline,
      slideOpts,
    };
  },

  ionViewWillEnter() {},

  data() {
    return {
      content: "",
      modalCtrl: modalController,
      title: "",
      date: new Date(),
      imageArray: [],
      groundArea: 0,
      houseArea: 0,
      conditionReport: false,
      houseType: "",
      housePrice: 0,
      rooms: 0,
      roadName: "",
      roadNumber: 0,
      fileList: [],
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonSpinner,
  },

  methods: {
    preview(event) {
      this.fileList = event.target.files;

      this.fileList.forEach(async (file) => {
        var image = await this.handleUpload(file);

        this.imageArray.push({
          image,
        });
      });
    },

    imageHelper(image) {
      return URL.createObjectURL(image);
    },

    doUploadMultiple() {
      document.getElementById("imageInput").childNodes.item(0).click();
    },

    async handleUpload(img) {
      return await imageService().upload(img);
    },

    async doCreatePost() {
      document.getElementById("spinner").style.display = "block";
      if (this.imageArray.length >= 1) {
        setTimeout(() => {
          firebase
            .firestore()
            .collection("areas")
            .doc(this.$props.area.areaCode)
            .collection("housePosts")
            .add({
              postContent: this.content,
              postMultipleImg: this.imageArray,
              postName: this.title,
              userId: this.$props.user,
              postDateTime: firebase.firestore.Timestamp.now(),
              areaCode: this.$props.area.areaCode,
              areaName: this.$props.area.areaName,
              housePrice: this.housePrice,
              groundArea: this.groundArea,
              houseArea: this.houseArea,
              conditionReport: this.conditionReport,
              houseType: this.houseType,
              rooms: this.rooms,
              roadName: this.roadName,
              roadNumber: this.roadNumber,
            })
            .then(() => {
              document.getElementById("spinner").style.display = "none";
              this.modalCtrl.dismiss();
            });
        }, 2000);
      } else {
        console.log("ingen billeder modtaget");
        this.imageArray = "";

        firebase
          .firestore()
          .collection("areas")
          .doc(this.$props.area.areaCode)
          .collection("housePosts")
          .add({
            postContent: this.content,
            postMultipleImg: this.imageArray,
            postName: this.title,
            userId: this.$props.user,
            postDateTime: firebase.firestore.Timestamp.now(),
            areaCode: this.$props.area.areaCode,
            areaName: this.$props.area.areaName,
            housePrice: this.housePrice,
            groundArea: this.groundArea,
            houseArea: this.houseArea,
            conditionReport: this.conditionReport,
            houseType: this.houseType,
            rooms: this.rooms,
            roadName: this.roadName,
            roadNumber: this.roadNumber,
          });
        this.modalCtrl.dismiss();
      }
    },
  },
});
</script>

<style scoped>
@media only screen and (max-width: 500px) {
  ion-textarea {
    border: solid 1px var(--ion-color-secondary);
    min-width: 600px;
    font-size: 40px;
  }
}

#houseTitel {
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
}
#textArea {
  font-size: 18px;
  height: auto;
  border-radius: 12px;
  padding-top: 5px;
  padding-left: 10px;
  min-width: 310px;
  max-width: 330px;
  margin-left: auto;
  margin-right: auto;
}
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
  width: 330px;
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
  margin: 0px;
  padding: 0px;
}

#slide2Text {
  margin-top: -70px;
  font-size: 18px;
  font-weight: bold;
}

.ButtonRow {
  vertical-align: bottom;
}

.splide__slide img {
  width: 100%;
  height: auto;
}

.numberInput {
  -moz-appearance: textfield;
}

.numberInput::-webkit-outer-spin-button,
.no-numberInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
