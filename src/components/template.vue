<template style="border: solid;">
    
  
        
        <VueSidebarMenu v-if= "isLoggedIn" />
       
         
            <div>
         
               <router-view/>
               
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
    
    localStorage.setItem("id", user.uid);
})
onBeforeUnmount(() => {
    // clear up listener
    authListener()
    
})
</script>

<style>
*{
margin: 0px!important;

font-family: 'Poppins', sans-serif!important;


}
html { 
    height: 100%;
}
body { 
    
    min-height:100% !important;
    
    overflow:hidden;
     width: 100% !important;
}

 button{ 
    cursor: pointer;
    background: #993399;
    color: white;
  
    order-radius: 10px;
   
   
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
    border: none;
}
#btn-sair { 
    width: 100%;
}
</style>
