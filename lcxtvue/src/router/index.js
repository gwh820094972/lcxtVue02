import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeMain from "../views/home/HomeMain";
import Login from '../components/login'
import Register from '../components/register'
import Recharge from "../views/home/Recharge";
import Withdrawal from "../views/home/Withdrawal";
import HelpCenter from "../views/home/HelpCenter/HelpCenter";
import HelpCenterCom1 from "../views/home/HelpCenter/HelpCenterCom1";
import HelpCenterCom2 from "../views/home/HelpCenter/HelpCenterCom2";
import PersonalCenter from "../views/home/PersonalCenter/PersonalCenter";
import MyAssets from "../views/home/PersonalCenter/MyAssets";
import ChangeInfo from "../views/home/PersonalCenter/ChangeInfo";
import Admin from "../views/home/Admin/Admin";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
      redirect:'/homeMain',
      children:[
        {
            path:'homeMain',
            component:HomeMain
        },
        {
          path:'recharge',
          component: Recharge
        },
        {
          path:'withdrawal',
          component: Withdrawal
        },
        {
          path:'personalCenter',
          component:PersonalCenter,
          redirect:'personalCenter/myAssets',
          children:[
            {
              path:'myAssets',
              component:MyAssets
            },
            {
              path: 'changeInfo',
              component:ChangeInfo
            },

          ]
        },
        {
          path:'helpCenter',
          component:HelpCenter,
          redirect:'helpCenter/helpCenterCom1',
          children:[
            {
              path:'helpCenterCom1',
              component:HelpCenterCom1
            },
            {
              path:'helpCenterCom2',
              component:HelpCenterCom2
            }
          ]
        },
        {
          path:'/admin',
          component:Admin
        }
      ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path:'/register',
    component:Register
  }

]

const router = new VueRouter({
  routes
})

export default router
