import {createRouter, createWebHistory} from 'vue-router'

/**
 *  页面 和 组件
 */
import Login from "@/views/login";
import Register from "@/views/register";
import CustomLayout from "@/components/custom/Layout.vue"
import AdminLayout from "@/components/admin/Layout.vue"
/**
 *  custom
 */
import CustomHome from "@/views/custom/home"
import CustomCategory from "@/views/custom/category"
import CustomCart from "@/views/custom/cart"
import CustomOrder from "@/views/custom/order"
/**
 *  admin
 */
import AdminMine from "@/views/admin/mine"
import AdminOrder from "@/views/admin/order"
import AdminProduct from "@/views/admin/product"
import AdminUser from "@/views/admin/user"

/**
 * 商品详情
 */
import ProductDetail from "@/views/custom/product"
const routes = [
    {
        path: "/login",
        name: "login page",  // 自定义的组件（页面）名称
        component: Login    // 导入的组件
    },
    {
        path: "/reg",
        name: "register page",  // 自定义的组件（页面）名称
        component: Register    // 导入的组件
    },
    {
        path: "/",
        name: "custom layout",
        component: CustomLayout,
        children: [
            {
                path: "/",
                component: CustomHome,
                meta: {title: "首页"}
            },
            {
                path: "/category",
                component: CustomCategory,
                meta: {title: "分类"}
            },
            {
                path: "/cart",
                component: CustomCart,
                meta: {title: "购物车"}
            },
            {
                path: "/order",
                component: CustomOrder,
                meta: {title: "订单"}
            },
            {
                path: "/product",
                component: ProductDetail,
                meta: {title: "商品详情"}
            }
        ]
    },
    {
        path: "/admin",
        name: "admin layout",
        component: AdminLayout,
        children:[
            {
                path: "/admin",
                component: AdminMine,
                meta: {title: "个人管理"},
            },
            {
                path: "/admin/user",
                component: AdminUser,
                meta: {title: "用户管理"}
            },
            {
                path: "/admin/product",
                component: AdminProduct,
                meta: {title: "商品管理"}
            },
            {
                path: "/admin/order",
                component: AdminOrder,
                meta: {title: "订单管理"}
            }
        ]
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
