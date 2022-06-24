<template>
 <h2>REGISTRE SEU PRODUTO</h2>
    <section class ="registerprod">
        
        <form className="new-product1" @submit.prevent="saveProducts()">
            <label for="form-user-name">Nome</label>
            <input
                id="form-user-name"
                v-model="name"
                type="name"
                placeholder=""
            />
            <label for="form-user-description">descrição</label>
            <input
                id="form-user-description"
                v-model="description"
                type="text"
                placeholder=""
            />
            <label for="form-user-prince">valor</label>
            <input
                id="form-user-prince"
                v-model="prince"
                type="text"
                placeholder=""
            />
             <label for="form-user-amount">quantidade</label>
            <input
                id="form-user-amount"
                v-model="amount"
                type="number"
                placeholder=""
            />
            <button type="submit">Salvar</button>
        </form>
   </section>
</template>

// @ is an alias to /src
<script >
import { createProduct } from './DataService'
import {getProducts} from './DataService'
import { db } from '../../config/firebase'
import { setProducts} from './DataService'
import { ref } from 'vue';

export default {
    name: 'products ',
    data() {
        return {
            
            id: '',
            name: '',
            description: '',
            prince: '',
            amount: '',
            
        }
    },


created(){
      
      
      this.id = this.$route.params.id
      console.log(this.id)
      if(this.id){
        db.collection('products').doc(this.id)
        .get()
        .then(snapshot => {
          const objetoproducts = snapshot.data()
          this.name = objetoproducts.name
          this.description = objetoproducts.description
          this.prince = objetoproducts.prince
          this.amount = objetoproducts.amount
          
        })
      }
    },


    methods: {
        saveProducts(){
        if(this.id){
          this.updateProduct();
          
        } else {
          this.handleProducts();
        }
      },
        handleProducts() {
            createProduct({
                name: this.name,
                description: this.description,
                prince: this.prince,
                amount: this.amount,
            }).then(() => {
                console.log('salvei')
                this.name = ''
                this.description = ''
                this.prince = ''
                this.amount = ''
                this.$router.push({ name: 'list' });
            })
        },
         updateProduct(){
           
        db.collection('products').doc(this.id).set({name: this.name,
                description: this.description,
                prince: this.prince,
                amount: this.amount,})
                .then(() => {
         
          this.$router.push({ name: 'list' });
          console.log('atualizei')
          window.alert("produto atualizado com sucesso")
        })
      },
    },
}
</script>


<style scoped>

h2 { 
  position: relative;
  left: 550px;
  top: 100px;
  border-radius: 4px;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  width: 60vh;
  text-align: center;
  background: #fbf7fb;;
}
.registerprod {
  
    
    margin-top: 0px!important;;
    margin-right:0px!important;; 
    margin-bottom:0px!important;;
    margin-left: 255px!important;;
    
    height: 94vh !important;
    width: 70% !important;
    
    top: 80px;
}

.new-product1 { 
  position: relative!important;
  display: flex!important; 
  justify-content: center!important;
  align-items: center!important;
  margin-top: 100px !important;
  flex-direction: column!important;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  width: 60vh;
  height: 400px;
  left: 300px;
  top: 60px;
  background: #fbf7fb;

}

.new-product1  input {
  width: 300px;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 15px;
    
}

.new-product1 button {
  background: #993399;
    color: white;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    position:relative;
    top: 20px;
    
    
   
    
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
  
    
    border: none;
    cursor: pointer;
}
    
</style>
