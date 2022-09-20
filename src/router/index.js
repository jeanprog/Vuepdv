import { createRouter, createWebHistory } from 'vue-router'
import listProducts from '../views/Products/listproducts/ListProducts.vue'
import template from '../components/template.vue'
import SignIn from '../views/SignIn/SignIn.vue'
import Register from '../views/Register/Register.vue'
import Products from '../views/Products/RegisterProducts.vue'
import Cashier from '../views/Cashier/Cashier.vue'
import ListSales from '../views/Cashier/ListSales/ListSales.vue'
import listsalesteste from '../views/Cashier/ListSales/listsalesteste.vue'
import Users from '../views/Users/Users.vue'
import controlCashier from '../views/Cashier/controlCashier.vue' 

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: SignIn,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/template',
            component: template,
        },

        {
            path: '/register-products',
            name: 'RegisterProducts',
            component: Products,
        },
        {
            path: '/list-products',
            name: 'list',
            component: listProducts,
        },
        {
            path: '/cashier',
            name: 'cashier',
            component: Cashier,
        },
        {
            path: '/listin-sales',
            name: 'ListSales',
            component: ListSales,
            
        },
        {
            path: '/list-salesteste',
            name: 'ListSalesteste',
            component: listsalesteste,
            
        },

        {
            path: '/users',
            component: Users,
        },
        {
            path: '/controlcashier',
            component: controlCashier,
            name: 'controlCashier'
        },
    ],
})

export default router
