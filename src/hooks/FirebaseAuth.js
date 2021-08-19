import { toRefs, reactive } from "vue";
import firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "../FirebaseConfig";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const state = reactive({
  user: null,
  userData: null,
  initialized: false,
});

export default function() {
  const getUserData = async () => {
    const resp = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .get();

    if (resp.exists) {
      return {
        ...resp.data(),
        id: firebase.auth().currentUser?.uid,
      };
    }
  };

  const authCheck = () => {
    return new Promise((resolve) => {
      !state.initialized &&
        firebase.auth().onAuthStateChanged(async (_user) => {
          if (_user) {
            state.user = _user;
            state.userData = await getUserData();
           // console.log(state.userData);
          } else {
            state.user = null;
            state.userData = null;
          }
          state.initialized = true;
         // console.log(_user);
          resolve(true);
        });
    });
  };
  const Logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        state.user = null;
        state.userData = null;
      });
  };

  const Login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (user) => {
        state.user = user;
        state.userData = await getUserData();
        return user;
      });
  };

  const LoginProvider = (provider) => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
       // console.log(result.credential);
        state.user = result.user;
        state.userData = await getUserData()

        if(state.userData == null){
            firebase.firestore().collection('users').doc(result.user.uid).set({
                admin: false,
                email: result.user.email,
                firstName: result.user.displayName,
                lastName: '',
                postCode: 0,
                profilePictureId: ''
              })
        }
        
        return result.user;
      });
  };

  return {
    ...toRefs(state),

    //funktioner
    getUserData,
    Login,
    Logout,
    authCheck,
    LoginProvider,
  };
}
