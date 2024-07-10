import {USERINFO} from "@/constant";
import {getItem, setItem} from "@/utils/storage"
import {login} from "@/api/login";

const home = {
    // 存放状态
    state: {
        userinfo: getItem(USERINFO)
    },
    // 修改状态
    mutations: {
        //自定义方法
        SET_USERINFO(state, userInfo) {
            state.userinfo = userInfo
            setItem(USERINFO, userInfo)
        }
    },
    actions: {
        Login({commit}, loginForm) {
            const {username, password} = loginForm
            login(username, password)
            commit("SET_USERINFO", {username, password})
        }
    }
}

export default home