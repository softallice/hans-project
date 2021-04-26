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
