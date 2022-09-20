<template>
    
    <section class="home">
        <div class="container">
           
            <h1>Login</h1>
            <div class="single-input">
                <input v-model="email" type="text" placeholder="Email" />
            </div>
            <div class="single-input">
                <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <button class ="btn-login" @click="signIn">Entrar</button>
           
            <div class="registrar">
                <router-link to="/register"> ainda não tem conta? </router-link>
            </div>
            </div>
        </section>
    
</template>

<script setup>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useRouter } from 'vue-router' // import router
const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE
const router = useRouter() // get a reference to our vue router
const signIn = () => {
    // we also renamed this method
    firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
        .then(() => {
            console.log('Successfully logged in!')
            router.push('/cashier') // redirect to the feed
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email'
                    window.alert('email ou senha invalido')
                    break
                case 'user-not-found':
                    errMsg.value = 'No account with that email was found'
                    window.alert('sua conta nao existe')
                    break
                default:
                    errMsg.value = 'Email or password was incorrect'
                    break
            }
        })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');
.home {
  
    background-size: cover !important;
    margin-top: 0px!important;;
    margin-right:0px!important;; 
    margin-bottom:0px!important;;
    margin-left: 0px!important;;
    background: linear-gradient(0deg, rgba(232,34,232,1) 0%, rgba(153,51,153,1) 100%);
    height: 100% !important;
    width: 100% !important;
    position: absolute;
}

h1 {
    
   border: none!important;
    position: relative!important;
    left:150px;
    
}
.container {
    width: 370px;
    height: 70vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px rgba(0, 0, 1, 3);
    padding: 30px 4%;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #ffff;
    overflow: hidden !important;
}
.registrar {
    position: relative;
    padding-top: 20px;
    margin-left: 90px!important; 
    }
.container div.single-input {
    position:relative;
    margin: 40px 10px !important;
    width: 100%;
    
    top: 80px;
}
.container div.single-input input {
    position: relative;
    border-radius: 10px;
    width: 80%;
    height: 30px;
    padding: 7px;
    border: 0;
    border-bottom: 2px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    font-family: 'Poppins', sans-serif;
    margin-left: 22px !important;
}
.container div.single-input input:focus {
    border-bottom: 2px solid #993399;
}
button {
    background: #993399;
    color: white;
    border-radius: 10px;
    height: 50px;
    width: 70%;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
    margin-left: 15% !important;
    margin-top: 30% !important;
    position: relative;
    border: none;
}
button:hover {
    background: #e0bcdd;
    cursor: pointer;
}

</style>