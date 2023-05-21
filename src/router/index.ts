import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
      {
        path:"/income",
        name:"income",
        component:()=>import("../views/Income.vue")
      },
      {
        path:"/expenditure",
        name:"expenditure",
        component:()=>import("../views/Expenditure.vue")
      },
      {
        path:"/creatproject",
        name:"creatproject",
        component:()=>import("../views/CreatProject.vue")
      },
      {
        path:"/dataview",
        name:"dataview",
        component:()=>import("../views/DataView.vue")
      },
      {
        path:"/setplan",
        name:"setplan",
        component:()=>import("../views/SetPlan.vue")
      },
      {
        path:"/setting",
        name:"setting",
        component:()=>import("../views/Setting.vue")
      }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
