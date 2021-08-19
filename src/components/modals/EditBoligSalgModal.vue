<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 28px"></ion-title>

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
          @click="doDeleteHousePost()"
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

          <ion-item lines="none" style="margin-top: -12px" id="labels1">
            <h1 style="margin-left: auto; margin-right: auto">Titel</h1>
          </ion-item>
          <ion-item
            lines="none"
            style="margin-left: auto; margin-right: auto; width: 320px"
          >
            <ion-input
              text-center
              style="
                margin-left: auto;
                margin-right: auto;
                font-size: 24px;
                margin-top: 10px;
                font-weight: bold;
              "
              type="text"
              placeholder="Titel på boligopslag..."
              :value="thisHouse.houseTitel"
              @input="title = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" style="margin-top: -12px" id="labels1">
            <h1 style="margin-left: auto; margin-right: auto">
              Beskrivelse af bolig
            </h1>
          </ion-item>
          <ion-item
            lines="none"
            style="margin-left: auto; margin-right: auto; width: 350px"
          >
            <ion-textarea
              style="
                font-size: 18px;
                height: auto;
                border-radius: 15px;
                padding: 10px;
                margin-left: auto;
                margin-right: auto;
              "
              id="opslagText"
              type="text"
              rows="10"
              cols="20"
              maxlength="1000"
              placeholder="Skriv dit opslag her..."
              :value="thisHouse.houseDescription"
              @input="content = $event.target.value"
            >
            </ion-textarea>
          </ion-item>

          <ion-item lines="none" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">Boligtype</h1>
          </ion-item>
          <ion-item
            id="roundedFirst"
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <ion-label>Boligtype</ion-label>
            <ion-select
              id="boligtypeInput"
              placeholder="Vælg boligtype"
              :value="thisHouse.houseHousetype"
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
          <ion-item lines="none" style="margin-top: -15px" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">Boligpris</h1>
          </ion-item>
          <ion-item
            id="roundedFirst"
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <ion-input
              id="boligPriceInput"
              :placeholder="housePrice"
              type="number"
              class="numberInput"
              :value="housePrice"
              @input="housePrice = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item lines="none" style="margin-top: -15px" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">Boligareal</h1>
          </ion-item>
          <ion-item
            id="roundedFirst"
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <ion-input
              id="boligArealInput"
              :placeholder="houseHouseArea"
              type="number"
              class="numberInput"
              :value="thisHouse.houseHouseArea"
              @input="houseArea = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item lines="none" style="margin-top: -15px" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">Grundareal</h1>
          </ion-item>
          <ion-item
            id="roundedFirst"
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <ion-input
              id="grundArealInput"
              placeholder="Grundareal i kvm"
              type="number"
              class="numberInput"
              :value="thisHouse.houseGroundArea"
              @input="groundArea = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item lines="none" style="margin-top: -15px" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">Antal rum</h1>
          </ion-item>
          <ion-item
            id="roundedFirst"
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <ion-input
              id="roomsInput"
              placeholder="Antal rum"
              type="number"
              class="numberInput"
              :value="thisHouse.houseRooms"
              @input="rooms = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>

          <ion-item lines="none" style="margin-top: -15px" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">Vejnavn</h1>
          </ion-item>
          <ion-item
            id="roundedFirst"
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <ion-input
              id="roadNameInput"
              placeholder="Gadenavn"
              type="text"
              :value="thisHouse.houseRoadName"
              @input="roadName = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>
          <ion-item lines="none" style="margin-top: -15px" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">Vejnummer</h1>
          </ion-item>
          <ion-item
            id="roundedFirst"
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <ion-input
              id="roadNumberInput"
              placeholder="Husnummer"
              type="number"
              class="numberInput"
              :value="thisHouse.houseRoadNumber"
              @input="roadNumber = $event.target.value"
              @keydown.enter="focusNextInput('lnInp')"
            >
            </ion-input>
          </ion-item>
          <ion-item lines="none" style="margin-top: -15px" id="labels">
            <h1 style="margin-left: auto; margin-right: auto">
              Tilstandsrapport
            </h1>
          </ion-item>
          <ion-item
            style="margin-left: auto; margin-right: auto; width: 320px"
            lines="none"
          >
            <div style="margin-left: auto; margin-right: auto">
              <label style="margin-top: -10px">Nej</label>
              <ion-toggle
                :value="thisHouse.houseConditionReport"
                @ionChange="conditionReport = $event.target.checked"
              ></ion-toggle>
              <label>Ja</label>
            </div>
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
              @click="doEditHousePost()"
              >Opdater boligopslag
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
  actionSheetController,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase";
import * as icons from "ionicons/icons";

import imageService from "../../hooks/ImageService";
import {
  arrowUndoOutline,
  addCircleOutline,
  arrowUndoCircleSharp,
  addCircleSharp,
  arrowForwardOutline,
  trashSharp,
  ellipsisHorizontalSharp,
} from "ionicons/icons";
export default defineComponent({
  name: "Modal",
  props: {
    house: {},
    area: {},
    user: { type: String, default: "bruger" },
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
      trashSharp,
      ellipsisHorizontalSharp,
    };
  },

  data() {
    return {
      content: this.$props.house.houseDescription,
      modalCtrl: modalController,
      title: this.$props.house.houseTitel,
      date: new Date(),
      imageArray: this.$props.house.postMultipleImg,
      groundArea: this.$props.house.houseGroundArea,
      houseArea: this.$props.house.houseHouseArea,
      conditionReport: this.$props.house.houseConditionReport,
      houseType: this.$props.house.houseHousetype,
      housePrice: this.$props.house.housePrice,
      rooms: this.$props.house.houseRooms,
      roadName: this.$props.house.houseRoadName,
      roadNumber: this.$props.house.houseRoadNumber,
      fileList: [],
      thisHouse: this.$props.house,
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
      var result = await imageService().upload(img);
      return result;
    },

    Change() {
      console.log();
    },
    async doDeleteHousePost() {
      const actionSheet = await actionSheetController.create({
        buttons: [
          {
            text: "Gem opslag",
            icon: icons.addCircleSharp,
            handler: async () => {
              await this.doEditHousePost().then(this.modalCtrl.dismiss());
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
            handler: () => {
            },
          },
        ],
      });
      await actionSheet.present();
    },

    async doEditHousePost() {
      document.getElementById("spinner").style.display = "block";
      if (this.fileList.length >= 1) {
        setTimeout(() => {
          firebase
            .firestore()
            .collection("areas")
            .doc(this.$props.area.areaCode)
            .collection("housePosts")
            .doc(this.$props.house.houseId)
            .set({
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
        await firebase
          .firestore()
          .collection("areas")
          .doc(this.$props.area.areaCode)
          .collection("housePosts")
          .doc(this.$props.house.houseId)
          .set({
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
      }
    },
    async doAcceptDelete() {
      await firebase
        .firestore()
        .collection("areas")
        .doc(this.$props.area.areaCode)
        .collection("housePosts")
        .doc(this.$props.house.houseId)
        .delete()
        .then(this.modalCtrl.dismiss());
    },
  },
});
</script>

<style scoped>
#labels {
  margin-bottom: -15px;
}
#labels1 {
  margin-bottom: -8px;
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
  width: 500px;
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
  max-width: 600px;
  border: solid 1px var(--ion-color-primary);
  padding: 5px;
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
