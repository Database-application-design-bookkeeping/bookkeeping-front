import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
/* import HomeView from "../views/HomeView.vue"; */

const routes: Array<RouteRecordRaw> = [
/*     path:"/",
    name:"home",
    component:()=>import("../views/Home.vue"),
    children:[ */
      {
      path:"/income",
      name:"income",
      component:()=>import("../views/Income.vue")
      },
      {
        path:"/expenditure",
        name:"expenditure",
        component:()=>import("../views/Expenditure.vue")
        }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
