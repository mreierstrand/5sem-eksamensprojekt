<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
          <ion-back-button @click="this.$router.back()"> </ion-back-button>
        </ion-buttons>
        <ion-title>{{ $route.name }}</ion-title>
      </ion-toolbar>
      <ion-toolbar id="toolbarSearch">
        <ion-searchbar
          id="searchBar"
          @input="handleInput"
          placeholder="Find din by"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-card id="listCard">
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

        <ion-list id="indhold">
          <ion-item
            id="indholdItem"
            lines="full"
            v-for="area in areas"
            :key="area?.areaCode"
            @click="doGetSpecifiedArea(area.areaCode, area.areaName)"
            :router-link="area.areaName"
          >
            <div id="areaIndhold">
              <ion-text id="areaName"> {{ area?.areaName }}</ion-text> <br />
              <ion-text id="areaCode">{{ area?.areaCode }}</ion-text>
              <ion-icon :icon="chevronForwardOutline" id="itemIcon"></ion-icon>
              <br />
              <br />
            </div>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonButtons,
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
export default {
  name: "Folder",
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonButtons,
  },

  setup() {
    return {
      chevronForwardOutline,
    };
  },
  data() {
    return {
      areas: [],
      searchbar: "",
      items: "",
    };
  },

  methods: {
    doGetSpecifiedArea(areaCode, areaName) {
      this.$router.push({
        path: "/areas/" + areaName,
        params: { areaCode, areaName },
      });
    },

    async doGetAreas() {
      /*      var snapshot = await firebase
        .firestore()
        .collection("areas")
        .get();
      snapshot.docs.forEach((doc) => this.areas.push(doc.data()));  */

      this.areas = [
        { areaCode: "6200", areaName: "Aabenraa" },
        { areaName: "Aabybro", areaCode: "9440" },
        { areaCode: "3720", areaName: "Aakirkeby" },
        { areaCode: "9000", areaName: "Aalborg" },
        { areaName: "Aalborg SV", areaCode: "9200" },
        { areaCode: "9210", areaName: "Aalborg SØ" },
        { areaName: "Aalborg Øst", areaCode: "9220" },
        { areaCode: "9620", areaName: "Aalestrup" },
        { areaCode: "8000", areaName: "Aarhus C" },
        { areaName: "Aarhus N", areaCode: "8200" },
        { areaCode: "8210", areaName: "Aarhus V" },
        { areaCode: "9600", areaName: "Aars" },
        { areaName: "Aarup", areaCode: "5560" },
        { areaCode: "5320", areaName: "Agedrup" },
        { areaCode: "6753", areaName: "Agerbæk" },
        { areaName: "Agerskov", areaCode: "6534" },
        { areaCode: "4244", areaName: "Agersø" },
      ];

      this.areas.sort(function (a, b) {
        var nameA = a.areaName.toUpperCase();
        var nameB = b.areaName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    },

    handleInput(event) {
      this.items = Array.from(document.getElementById("indhold").children);
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        this.items.forEach((item) => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? "block" : "none";
        });
      });
    },
  },

  ionViewDidEnter() {
    this.doGetAreas().then(() => {
      let lottie = document.getElementById("lottieDiv");
      if (this.areas.length >= 1) {
        setTimeout(() => {
          lottie.style.display = "none";
        }, 1500);
      }
    });
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

#lottie {
  margin-left: auto;
  margin-right: auto;
}
#lottieDiv {
  margin-top: -25px;
  margin-bottom: -45px;
}
#listCard {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
}
#indholdItem {
  --border-color: var(--ion-color-tertiary);
  margin-top: 20px;
  cursor: pointer;
}

#areaName {
  text-align: left;
  font-weight: bold;
  text-align: center;
}

#areaCode {
  text-align: center;
  float: center;
}
#areaIndhold {
  justify-content: left;
  text-align: left;
  width: 350px;
}

#itemIcon {
  float: right;
  margin-left: -50px;
  font-size: 25px;
  margin-top: -12px;
  color: var(--ion-color-primary);
}

#toolbarSearch {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  height: 80px;
  --opacity: 99%;
}
#searchBar {
  border-radius: 50px;
  height: 80px;
  --icon-color: var(--ion-color-primary);
}

ion-content {
  --background: linear-gradient(
    103deg,
    rgba(147, 203, 38, 1) 1%,
    rgba(7, 102, 57, 1) 59%
  );
}

ion-item:hover {
  --color: var(--ion-color-primary-tint);
}
</style>
