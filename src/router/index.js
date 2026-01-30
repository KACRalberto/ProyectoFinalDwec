import { createRouter, createWebHistory } from 'vue-router'
import { OAuthCredential, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:"/", component: ()=> import("@/views/taskViewPage.vue"), meta:{requiresLogged:true}},
    {path: "/workspace", component: ()=> import("@/views/workSpaceViewPage.vue"), meta:{requiresLogged:true}},
    {path : "/auth", component:()=> import("@/views/authViewPage.vue")},
    {path: "/verification", component: ()=> import ("@/views/verificationViewPage.vue")}
  ],
})

router.beforeEach((to,from,next)=>{
  const user = auth.currentUser
  if(to.meta.requiresLogged && !user){
  
    next("/auth")
  
  }else{
    // if(user.emailVerified){
    //   next()
    // }else{
    //   next("/verification")
    // }
  next()
  }
})

export default router
