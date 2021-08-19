  <template>
  <ion-page>
      <ion-content>
   </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
} from "@ionic/vue";

import useFirebaseAuth from "../hooks/FirebaseAuth.js";
import { useRouter } from 'vue-router';

export default {
  name: "Login",
  components: {
    IonContent,
    IonPage,
  },

async setup(){
 await useFirebaseAuth().Logout().then(
         useRouter().go('/login')
     )
},
  

}
</script>