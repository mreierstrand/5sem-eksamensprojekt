<template>
  <IonSplitPane content-id="main-content">
    <ion-menu content-id="main-content" type="overlay">
      <ion-content>
        <ion-list id="inbox-list">
          <ion-img
            id="logo"
            src="assets/img/Logofortekst.png"
            @click="doRedirect()"
          ></ion-img>
          <div style="margin-left: -7px">
            <ion-item lines="full" id="infoItem">
              <ion-grid v-if="user">
                <ion-row class="text-align-left" @click="doGoToProfilePage()">
                  <ion-col size="2">
                    <ion-avatar id="avatarIcon">
                      <ion-img
                        v-if="user?.profilePictureId == ''"
                        src="assets/icon/templateUser.png"
                        style="color: var(--ion-color-primary)"
                      ></ion-img>
                      <ion-img
                        v-else
                        :src="user?.profilePictureId"
                        style="color: var(--ion-color-primary)"
                      ></ion-img>
                    </ion-avatar>
                  </ion-col>

                  <ion-col size="10">
                    <div style="margin-left: 5px">
                      <ion-label
                        style="
                          margin-top: 15px;
                          font-weight: 900;
                          color: #005e70;
                        "
                        >{{ user?.firstName }} {{ user?.lastName }}</ion-label
                      >
                      <ion-note style="margin-bottom: 5px;">{{
                        user?.email
                      }}</ion-note>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </div>
          <ion-menu-toggle
            auto-hide="false"
            v-for="(p, i) in appPages"
            :key="i"
          >
            <ion-item
              id="cursorPointer"
              @click="selectedIndex = i"
              router-direction="root"
              :router-link="p.url"
              lines="none"
              detail="false"
              class="hydrated"
              :class="{ selected: selectedIndex === i }"
            >
              <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </IonSplitPane>
</template>

<script>
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import {
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
  homeOutline,
  personAddOutline,
  personAddSharp,
  personOutline,
  personSharp,
  businessOutline,
  businessSharp,
  informationCircleOutline,
  chatbubbleSharp,
  chatbubbleOutline,
} from "ionicons/icons";
import firebase from "firebase";
import firebaseAuth from "../hooks/FirebaseAuth";
import { menuController } from "@ionic/core";
export default defineComponent({
  name: "App",
  components: {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
  },

  setup() {
    const selectedIndex = ref(0);

    var appPages = [
      {
        title: "Velkommen",
        url: "/LandingPage",
        iosIcon: informationCircleOutline,
        mdIcon: informationCircleOutline,
      },
      {
        title: "Login",
        url: "/Login",
        iosIcon: homeOutline,
        mdIcon: homeOutline,
      },
      {
        title: "Opret profil",
        url: "/Opret",
        iosIcon: personAddOutline,
        mdIcon: personAddSharp,
      },
    ];

    if (firebase.auth().currentUser) {
      appPages = [
        {
          title: "Velkommen",
          url: "/Velkommen",
          iosIcon: logInOutline,
          mdIcon: logInSharp,
        },
        {
          title: "Rediger profil",
          url: "/rediger",
          iosIcon: personOutline,
          mdIcon: personSharp,
        },
        {
          title: "Områder",
          url: "/areas",
          iosIcon: businessOutline,
          mdIcon: businessSharp,
        },
        {
          title: "Chat",
          url: "/chatOverview",
          iosIcon: chatbubbleOutline,
          mdIcon: chatbubbleSharp,
        },
        {
          title: "Log ud",
          url: "/logud",
          iosIcon: logOutOutline,
          mdIcon: logOutSharp,
        },
      ];
    } else {
      appPages = [
        {
          title: "Velkommen",
          url: "/LandingPage",
          iosIcon: informationCircleOutline,
          mdIcon: informationCircleOutline,
        },
        {
          title: "Login",
          url: "/Login",
          iosIcon: homeOutline,
          mdIcon: homeOutline,
        },
        {
          title: "Opret profil",
          url: "/Opret",
          iosIcon: personAddOutline,
          mdIcon: personAddOutline,
        },
      ];
    }

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
    const route = useRoute();

    return {
      selectedIndex,
      appPages,
      isSelected: (url) => (url === route.path ? "selected" : ""),
    };
  },
  data() {
    return {
      user: firebaseAuth().userData,
    };
  },
  methods: {
    doRedirect() {
      if (firebase.auth().currentUser) {
        this.$router.push({
          path: "/velkommen",
        });
      } else {
        this.$router.push({
          path: "/landingPage",
        });
      }
    },
    doGoToProfilePage() {
      this.$router.push({
        path: "/rediger",
      });
      setTimeout(() => menuController.toggle(), 100);
    },
  },
});
</script>
<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

#cursorPointer {
  cursor: pointer;
}
#logo {
  margin-left: 10px;
  margin-bottom: 15px;
  padding: 0px;
  max-width: 10em;
  cursor: pointer;
}

#logo:hover {
  transform: scale(1.01);
}

#avatarIcon {
  width: 40px;
  height: 40px;
  margin-top: 18px;
}
.split-pane-ios.split-pane-visible > .split-pane-side,
.split-pane-md.split-pane-visible > .split-pane-side {
  max-width: 350px;
  min-width: 350px;
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 0px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;
  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;
  margin-bottom: 18px;
  color: #757575 !important;
  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item:hover {
  --background: var(--ion-color-primary-tint);
}

ion-menu.md ion-item#infoItem:hover {
  --background: transparent;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e !important;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a !important;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;
  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

.cursorPointer {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
}
</style>
