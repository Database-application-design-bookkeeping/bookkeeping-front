import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"home",
    component:()=>import("../views/Home.vue"),
    children:[
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
    ]
  },
  {
    path:"/404",
    name:"404",
    component:()=>import("../views/404.vue")
  },
  {
    path:'/:pathMatch(.*)',
    redirect:{
        name:"404"
    }
  }
      
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
