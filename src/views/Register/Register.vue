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
import { db } from '../../config/firebase'


const email = ref('')
const password = ref('')
const router = useRouter()
 // get a reference to our vue router
const register = () => {
    let emailparam = email.value
    let passwordparam = password.value
    firebase
      .auth() // get the auth api
      .createUserWithEmailAndPassword(emailparam, passwordparam) 
 // need .value because ref()
       .then(pessoa => {
        let id = pessoa.user.uid.toString()
          db.collection('users').doc(id).set({email: emailparam , password: passwordparam})

            router.push('/Cashier') // redirect to the feed
        })
        .catch(error => {
            console.log(error.code)
            alert(error.message)
        })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap');




</style>
