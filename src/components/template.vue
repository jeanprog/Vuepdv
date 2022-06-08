<template>
    
  
        
        <div class="side-bar" v-if ="isLoggedIn">
        <VueSidebarMenu />
        </div>
            <body>
        
              <router-view />
        </body>
        
        <div class="btn-sair">
        <button  v-if = "isLoggedIn " @click="signOut">Sair</button>
    </div>
</template>

// @ is an alias to /src
<script setup>
import { ref, onBeforeUnmount } from 'vue' // used for conditional rendering
import firebase from 'firebase/compat/app'
import { useRouter } from 'vue-router'
import VueSidebarMenu from './VueSidebarMenu'

const router = useRouter()
const isLoggedIn = ref(true)
// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        isLoggedIn.value = true // if we have a user
    } else {
        isLoggedIn.value = false // if we do not
    }
})
const signOut = () => {
    firebase.auth().signOut()
    router.push('/')
}
const authListener = firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        // not logged in
        alert('voce precisa estar logado para acessar essa rota')
        router.push('/')
    }
})
onBeforeUnmount(() => {
    // clear up listener
    authListener()
})
</script>

<style >
*{
margin: 0px!important;
overflow: hidden !important;
font-family: 'Poppins', sans-serif!important;

}

.btn-sair button{ 
    cursor: pointer;
    background: #993399;
    color: white;
    width: 100px;
    order-radius: 10px;
    position:relative;
    left: 85%;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
    border: none;
}
</style>
