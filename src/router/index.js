import { createRouter, createWebHistory } from 'vue-router'
import { OAuthCredential, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:"/", component: ()=> import("@/views/taskViewPage.vue"), meta:{requiresLogged:true}},
    {path: "/workspace", component: ()=> import("@/views/workSpaceViewPage.vue"), meta:{requiresLogged:true}},
    {path : "/auth", component:()=> import("@/views/authViewPage.vue"), meta:{isAuth:true}}
  ],
})

router.beforeEach((to,from,next)=>{
  onAuthStateChanged(auth,(firebaseUser)=>{
    if(to.meta.isAuth && firebaseUser){
      next("/")
    }

    if(to.meta.requiresLogged && !firebaseUser){
      next("/auth")
    }else{
    next()
    }
  })
})

export default router
