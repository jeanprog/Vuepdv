<template>
    <body>
        <form className="new-task" @submit.prevent="handleSubmit">
            <label for="form-user-name">Nome</label>
            <input
                id="form-user-name"
                v-model="name"
                type="name"
                placeholder="Nome"
            />
            <label for="form-user-email">Email</label>
            <input
                id="form-user-email"
                v-model="email"
                type="email"
                placeholder="Email"
            />
            <label for="form-user-telefone">Telefone</label>
            <input
                id="form-user-telefone"
                v-model="telefone"
                type="text"
                placeholder="Telefone"
            />
            <button type="submit">Adicionar Usuário</button>
        </form>
    </body>
</template>

// @ is an alias to /src
<script>
import UserDataService from './UserDataService'

export default {
    name: 'AddUser',
    data() {
        return {
            id: null,
            name: '',
            email: '',
            telefone: '',
        }
    },
    methods: {
        handleSubmit() {
            UserDataService.createUser({
                name: this.name,
                email: this.email,
                telefone: this.telefone,
            }).then(() => {
                console.log('salvei')
                this.name = ''
                this.email = ''
                this.telefone = ''
            })
        },
    },
}
</script>

<style scoped>

</style>
