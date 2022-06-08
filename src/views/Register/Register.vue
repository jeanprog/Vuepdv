<template>
    <body>
        <div class="container">
            <h1>Registre-se</h1>
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
            <p v-if="errMsg">{{ errMsg }}</p>
            <button @click="register">Criar Conta</button>
        </div>
    </body>
</template>

<script setup>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useRouter } from 'vue-router' // import router

const email = ref('')
const password = ref('')
const router = useRouter() // get a reference to our vue router
const register = () => {
    firebase()
        .auth // get the auth api
        .createUserWithEmailAndPassword(email.value, password.value) // need .value because ref()
        .then(() => {
            console.log('Successfully registered!')
            router.push('/sign') // redirect to the feed
        })
        .catch(error => {
            console.log(error.code)
            alert(error.message)
        })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');

body {
    border: none;
    background-size: cover;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    height: 100vh !important;
    background-color: #993399 !important;
    overflow: hidden !important;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #ffff;
}
h1 {

    margin-top: 70px !important;
    text-align: center;
}

.container {
    width: 350px!important;
    height: 70vh !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 0 0 5px rgba(0, 0, 1, 3);
    padding: 30px 4%;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
}

.container div.single-input {
    position: relative;
    
     margin: 40px 10px !important;
    width: 100%!important;
}

.container div.single-input input {
    position: relative;
    border-radius: 10px;
      width: 100% !important;
    height: 30px !important;
    padding: 7px;
    border: 0;
    border-bottom: 2px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    font-family: 'Poppins', sans-serif;
}
.container div.single-input input:focus {
    border-bottom: 2px solid #993399;
}

button {
    background: #993399;
    color: white;

    border-radius: 10px;
    height: 50px;
       width: 70% !important;

    font-family: 'Poppins', sans-serif;
    text-shadow: none;
   margin-left: 15% !important;
    margin-top: 15% !important;
    position: relative;
    border: none;
}

button:hover {
    background: #e0bcdd;
    cursor: pointer;
}
</style>
