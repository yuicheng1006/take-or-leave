import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/pages/Login'; //登入頁面
import Dashboard from '@/components/pages/Dashboard'; //追蹤清單
import center from '@/components/pages/center'; //追蹤清單
import Signup from '@/components/pages/Signup'; //註冊頁面
import Home from '@/components/pages/Home'; //首頁
import MemberCenter from '@/components/pages/MemberCenter'; //會員中心
import GetOrderDetail from '@/components/pages/GetOrderDetail'; //取物訂單明細
import GiveOrderDetail from '@/components/pages/GiveOrderDetail'; //送物訂單明細
import CheckForm from '@/components/pages/CheckForm'; //取物者填寫資料
import GetOrder from '@/components/pages/GetOrder'; //取物訂單
import GiveOrder from '@/components/pages/GiveOrder'; //送物訂單
import GivesList from '@/components/pages/GivesList'; //送物清單
import ForgetPassword from '@/components/pages/ForgetPassword'; //忘記密碼
import MemberModify from '@/components/pages/MemberModify'; //個人帳戶管理
import MemberModifyPassword from '@/components/pages/MemberModifyPassword'; //修改密碼
import GivesDetail from '@/components/pages/GivesDetail'; //送物明細
import GivesShelves from '@/components/pages/GivesShelves'; //上架物品頁面
import GivesShelvesForm from '@/components/pages/GivesShelvesForm'; //上架物品表單
import GivesInfo from '@/components/pages/GivesInfo'; //送物詳細資訊
import WishList from '@/components/pages/WishList'; //追蹤清單

import store from '../store';


Vue.use(Router);

export default new Router({


  routes: [

    {
      path: '*', //如果亂打網址則會導回登入頁面
      redirect: 'home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,

    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [{
          path: 'center',
          name: 'center',
          component: center,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'membercenter',
          name: 'MemberCenter',
          component: MemberCenter,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'getorderdetail/:goods_id',
          name: 'GetOrderDetail',
          component: GetOrderDetail,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'giveorderdetail/:goods_id',
          name: 'GiveOrderDetail',
          component: GiveOrderDetail,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'getorder',
          name: 'GetOrder',
          component: GetOrder,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'giveorder',
          name: 'GiveOrder',
          component: GiveOrder,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'membermodify',
          name: 'MemberModify',
          component: MemberModify,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'membermodifypassword',
          name: 'MemberModifyPassword',
          component: MemberModifyPassword,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'givesshelves',
          name: 'GivesShelves',
          component: GivesShelves,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'givesshelvesform',
          name: 'GivesShelvesForm',
          component: GivesShelvesForm,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'givesshelvesform/:goods_id',
          name: 'GivesShelvesForm',
          component: GivesShelvesForm,
          meta: {
            requiresAuth: true
          }
        },

        {
          path: 'givesdetail/:goods_id',
          name: 'GivesDetail',
          component: GivesDetail,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'wishlist',
          name: 'WishList',
          component: WishList,
          meta: {
            requiresAuth: true
          }
        }
      ],
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/checkform/:goods_id',
      name: 'CheckForm',
      component: CheckForm,
    },
    {
      path: '/giveslist',
      name: 'GivesList',
      component: GivesList,

    },
    {
      path: '/givesinfo/:goods_id',
      name: 'GivesInfo',
      component: GivesInfo,

    },
    {
      path: '/forgetpassword',
      name: 'ForgetPassword',
      component: ForgetPassword,
    },


  ]
})
