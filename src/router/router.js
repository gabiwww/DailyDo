import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@subpages/main-page.vue";
import MainActivity from "@subpages/main-activity.vue";
import MainManage from "@subpages/main-manage.vue";
import MainAddActivity from "@subpages/main-add-activity.vue";
import MainEditActivity from "@subpages/main-edit-activity.vue";
import MainCalendar from "@subpages/main-calendar.vue";
import MainAnalitics from "@subpages/main-analitics.vue";
import MainProfile from "@subpages/main-profile.vue";
import MainRegister from "@subpages/main-register.vue";
import MainLogin from "@subpages/main-login.vue";
import MainProfileLoginDetails from "@subpages/main-profile-login-details.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainPage,
      name: "main-page",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/activity",
      component: MainActivity,
      name: "main-activity",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/manage",
      component: MainManage,
      name: "main-manage",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/add-activity",
      component: MainAddActivity,
      name: "main-add-activity",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/edit-activity/:id",
      component: MainEditActivity,
      name: "main-edit-activity",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/calendar",
      component: MainCalendar,
      name: "main-calendar",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/analitics",
      component: MainAnalitics,
      name: "main-analitics",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/profile",
      component: MainProfile,
      name: "main-profile",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/login",
      component: MainLogin,
      name: "main-login",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/register",
      component: MainRegister,
      name: "main-register",
      meta: {
        title: "",
        description: "",
      },
    },
    {
      path: "/main-profile-login-details",
      component: MainProfileLoginDetails,
      name: "main-profile-login-details",
      meta: {
        title: "",
        description: "",
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;