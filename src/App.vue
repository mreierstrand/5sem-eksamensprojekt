<template>
  <IonApp>
    <Menu/>
  </IonApp>
</template>

<script>
import {
  IonApp,
} from "@ionic/vue";

import { defineComponent } from "vue";
import Menu from './components/Menu'
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    Menu
  },
})
</script>

