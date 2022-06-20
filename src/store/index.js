import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        currentPathName:''
    },
    mutations:{
        setPatch(state){
            state.currentPathName=localStorage.getItem("currentPathName")
        }
    }
})

export default store