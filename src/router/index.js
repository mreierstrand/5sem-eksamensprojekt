import { createRouter, createWebHistory } from "@ionic/vue-router";
import firebase from "firebase";
import useFirebaseAuth from "../hooks/FirebaseAuth";
const routes = [
  {
    path: "",
    redirect: "/landingPage",
  },
  {
    path: "/folder/:id",
    component: () => import("../views/Folder.vue"),
  },
  {
    path: "/velkommen",
    name: "Velkommen til Hjemhed",
    component: () => import("../views/Velkommen.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "Velkommen",
    path: "/landingPage",
    component: () => import("../views/LandingPage.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/Opret",
    name: "Opret profil",
    component: () => import("../views/CreateUser.vue"),
    meta: {
      requiresGuest: true,
    },
    
  },
  {
    path: "/chatOverview",
    name: "Beskeder",
    component: () => import("../views/ChatOverview.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat/:id",
    name: "Direkte beskeder",
    component: () => import("../views/Chat.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logud",
    name: "Log ud",
    component: () => import("../views/Logout.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: {
      requiresAdmin: true,
    },
  },
  {
    path: "/rediger",
    name: "Rediger profil",
    component: () => import("../views/EditUser.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/areas",
    name: 'Områder',
    component: () => import("../views/Areas.vue"),
    meta: {
      requiresAuth: true,
    },
  

  },
  {
    path: '/areas/:id',
    component: () => import("../views/SpecificArea.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/areas/:id/posts',
    name: 'Opslag',
    component: () => import('../views/Posts.vue'),
    meta: {
      requiresAuth: true,
    }
  },
{
    path: "/reset",
    name: 'Glemt adgangskode',
    component: () => import("../views/ResetPassword.vue"),
    meta: {
      requiresGuest: true,
    },

  },
  {
    path: "/areas/:id/createhouse",
    name: 'Opret bolig opslag',
    component: () => import("../views/Houses.vue"),
    meta: {
      requiresAuth: true,
    }
  },
 

  {
    path: "/:pathMatch(.*)*",

    redirect: () => {
      if (firebase.auth().currentUser) {
        return { path: "/velkommen" };
      } else {
        return { path: "/landingPage" };
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    // Check if logged user
    if (firebase.auth().currentUser) {
      // Go to Velkommen
      next({
        path: "/velkommen",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    // Check if logged user not admin
  } if (firebase.auth().currentUser && useFirebaseAuth().userData.admin == false) {
    // Proceed to velkommen 
    next({
      path: '/velkommen',
      query: {
        redirect: to.fullPath
      }
    })
  }
  else if (!firebase.auth().currentUser) {
    // Go to login
    next({
      path: '/landingPage',
      query: {
        redirect: to.fullPath
      }
    });

  }
  else if(firebase.auth().currentUser && useFirebaseAuth().userData.admin == true){
    // Proceed to route
    next();
  }else{
    next({
      path: '/velkommen',
      query: {
        redirect: to.fullPath
      }
    })
  }

});

export default router;
