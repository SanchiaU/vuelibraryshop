import {setItem,removeItem} from "@/utils/storage"
import {USERINFO} from "@/constant"
export function login(username,password){
    let userinfo = {username,password}
    userinfo.username = username
    userinfo.password = password
    setItem(USERINFO,{username,password})
}

export function logout(){
    removeItem(USERINFO)
}
