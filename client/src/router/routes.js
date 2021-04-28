const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { 
        path: "", 
        icon: 'home', 
        name: "Home", 
        component: () => import("pages/Account.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login.vue")
      },
      {
        path: "/account",
        name: "Account",
        icon: "account_box",
        component: () => import("pages/Account.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/basicInfo",
        name: "BasicInfo",
        icon: "how_to_reg",
        component: () => import("pages/basic/BasicInfo.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/blog",
        name: "Blog",
        icon: "history",
        component: () => import("pages/blog/BlogList.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/blogEntry",
        name: "BlogEntry",
        icon: "source",
        component: () => import("pages/blog/BlogEntry.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/blogView/:blogId",
        name: "BlogView",
        icon: "article",
        component: () => import("pages/blog/BlogView.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/exercise",
        name: "Exercise",
        icon: "accessibility",
        component: () => import("pages/exercise/Exercise.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/goal",
        name: "Goal",
        icon: "control_camera",
        component: () => import("pages/goal/Goal.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/meal",
        name: "Meal",
        icon: "restaurant",
        component: () => import("pages/meal/Meal.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/writeMeal",
        // path: "/writeMeal/:mealId",
        name: "WriteMeal",
        icon: "history",
        component: () => import("pages/meal/WriteMeal.vue"),
        props: true,
        meta: { requiresAuth: true }
      },
      {
        path: "/weight",
        name: "Weight",
        icon: "square_foot",
        component: () => import("pages/weight/Weight.vue"),
        meta: { requiresAuth: true }
      },

      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("pages/ForgotPassword.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import("pages/ResetPassword.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/Register.vue")
      },
      {
        name: 'About',
        path: '/about',
        icon: 'help',
        component: () => import('pages/About.vue')
      },
    ]
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "AdminHome",
        icon: 'manage_accounts',
        component: () => import("pages/admin/Index.vue"),
        meta: { requiresAuth: true, requiresAdmin: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
