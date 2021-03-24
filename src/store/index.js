import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    link:[{
        title:'基本資料',
        subNav: [
          {
            title: '個人帳戶管理',
            path: '/admin/membermodify',
          },
          {
            title: '密碼修改',
            path: '/admin/membermodifypassword',
          },
        ],
      },
      {
        title:'訂單查詢',
        subNav: [
          {
            title: '我的送物',
            path: '/admin/giveorder',
          },
          {
            title: '我的取物',
            path: '/admin/getorder',
          },
        ],
      },
      {
        title:'追蹤清單',
        link:"/admin/wishlist",
      },
      {
        title:'我的送物',
        link:"/admin/givesshelves",
      },
      {
        title:'會員登出',
        click:'logout',
      },
      ],
  isLiked:"",
  },
  mutations: {
    SAVEUSERDATA: (state, data) => {
      state.user = data;
    },
    GETLIKESTATUS:(state,data)=>{
      console.log('state,data',state,data);
    }
  },
  actions: {
     async getLike({commit}){
      console.log('commit',commit);
      
    },
    getUsers({ commit }) {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
      commit('SET_USERS', response.data)
      })
    }
  },
  modules: {},
});
