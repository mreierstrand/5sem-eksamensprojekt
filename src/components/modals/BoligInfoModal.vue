<template>
  <ion-page id="modal">
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 28px"
          >{{ myhouse.houseRoadName }} {{ myhouse.houseRoadNumber }}</ion-title
        >

        <ion-icon
          id="hoverIcon"
          slot="start"
          style="color: red; font-size: 32px; margin-left: 10px"
          :icon="arrowUndoOutline"
          @click="modalCtrl.dismiss()"
        ></ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div style="margin-top: 10px">
        <ion-list>
          <ion-item>
            <ion-slides ref="slides" pager="true" :options="slideOpts">
              <ion-slide>
                <img
                  v-if="house?.postMultipleImg[0]?.image"
                  :src="house?.postMultipleImg[0]?.image"
                />
              </ion-slide>
              <ion-slide>
                <img
                  v-if="house?.postMultipleImg[1]?.image"
                  :src="house?.postMultipleImg[1]?.image"
                />
              </ion-slide>
              <ion-slide>
                <img
                  v-if="house?.postMultipleImg[2]?.image"
                  :src="house?.postMultipleImg[2]?.image"
                />
              </ion-slide>
            </ion-slides>
          </ion-item>
          <ion-item lines="none">
            <ion-text style="margin-left: 11px; margin-top: -15px">
              <h1></h1>
            </ion-text>
          </ion-item>

          <ion-item lines="none">
            <ion-text style="font-size: 18px; height: auto" value="houseArea">
            </ion-text>
          </ion-item>
          <ion-label>Boligtype</ion-label>
          <ion-item id="roundedFirst" lines="none">
            {{ myhouse.houseHousetype }}
          </ion-item>
          <ion-label>Pris</ion-label>
          <ion-item id="roundedFirst" lines="none">
            <ion-text id=""> {{ house.housePrice }}</ion-text>
          </ion-item>
          <ion-label>Boligareal m²</ion-label>
          <ion-item id="roundedFirst" lines="none">
            <ion-text>{{ house.houseHouseArea }} </ion-text>
          </ion-item>
          <ion-label>Grundareal m²</ion-label>
          <ion-item id="roundedFirst" lines="none">
            <ion-text id="">{{ house.houseGroundArea }} </ion-text>
          </ion-item>
          <ion-label>Antal rum</ion-label>
          <ion-item id="roundedFirst" lines="none">
            <ion-input id="">{{ house.houseRooms }} </ion-input>
          </ion-item>
          <ion-label>Beskrivelse</ion-label>
          <ion-item id="roundedFirst" lines="none">
            <ion-text id="">{{ house.houseDescription }} </ion-text>
          </ion-item>
          <ion-label>Tilstandsrapport</ion-label>
          <ion-item id="roundedFirst" lines="none">
            <label>{{ booleanToText() }}</label>
          </ion-item>

          <ion-item lines="none">
            <ion-button
              class="roundedButtonClose"
              style="
                margin-left: auto;
                margin-right: auto;
                font-size: 18px;
                margin-top: 25px;
              "
              id="uploadBtn"
              fill="clear"
              @click="closeModal()"
              >Luk
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
  IonSlides,
  IonSlide,
  modalController,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
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
    house: {},
  },

  setup() {
    return {
      arrowUndoOutline,
      addCircleOutline,
      arrowUndoCircleSharp,
      addCircleSharp,
    };
  },
mounted(){
  setTimeout(()=> {this.$refs.slides.$el.update()}, 500)},
  data() {
    return {
      content: "",
      modalCtrl: modalController,
      title: "",
      imageArray: [],
      groundArea: 0,
      houseArea: 0,
      conditionReport: false,
      houseType: "",
      rooms: 0,
      myhouse: this.$props.house,
      roadNumber: 0,
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonIcon,
    IonSlides,
    IonSlide,
  },

  methods: {
    booleanToText() {
      if (this.house.houseConditionReport === false) {
        return "Nej";
      } else {
        return "Ja";
      }
    },

    doUploadMultiple() {
      document.getElementById("imageInput").childNodes.item(0).click();
    },

    closeModal() {
      this.modalCtrl.dismiss();
    },

  },
});
</script>

<style scoped>
#rounded {
  margin-bottom: 1rem;
  background: #ffffff;
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  font-size: 22px;
}
#roundedFirst {
  margin-bottom: 1rem;
  background: #ffffff;
  border-bottom: 1px solid var(--ion-color-tertiary);
  color: var(--ion-color-primary);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: px;
  font-size: 22px;
}

.roundedButtonClose {
  border: solid 1px;
  border-radius: 12px !important;
  margin-top: 8px;
  max-width: 250px;
  height: 48px;
  min-width: 100px;
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
