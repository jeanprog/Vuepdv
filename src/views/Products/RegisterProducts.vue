<template>
 <h2 v-if="!this.id">REGISTRE SEU PRODUTO</h2>
 <h2 v-if = "this.id" >EDITE SEU PRODUTO</h2>

    <div class ="registerprod">
        
      <form 
        class="form"  
        @submit.prevent="saveProducts()" 
        style="display: flex;"
        v-if="modal !== true">
        
        <div class= "coluna-form">
            <label for="form-user-name">Nome</label>
            <input
                id="form-user-name"
                v-model="name"
                type="name"
                placeholder=""
            />
            <label for="form-user-name">Codigo de barra</label>
            <input
                id="form-user-name"
                v-model="codigodebarra"
                type="name"
                placeholder=""
            />
                <label for="form-user-name">Categoria</label>
                <input v-model="category" type="text" />
               
                <label for="form-user-name">Escolha uma foto</label>
                <input
                id="form-user-amount"
              
                type="file"
                placeholder="escolha imagem"
                style="border:none; border-radius: 1px"
               />
                </div> 
                <div class= "coluna-form">
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
            </div>
         
        </form>

        <button 
         @click.prevent= "showModalcategory"
         style = "border-radius: 16px;"
         v-if ="modal != true "> adicionar categoria
         </button>
         <button 
         @click.prevent= "pushRegisteproducts"
         style = "border-radius: 16px;"
         v-if = "modal ===true"> voltar para registro de produtos
         </button>
        
         <form class="add-category"
         v-if="modal === true "> 
          <h3 style=" margin-top: 5%!important;"> REGISTRE SUA NOVA CATEGORIA </h3>
          <label for="form-user-name">Digite aqui a categoria de seu produto</label>
           <input
                id="form-user-amount"
                v-model="newcategory"
                type="text"
                placeholder=""
            />
             <button
               type="submit"
               @click.prevent= "handleCategory"
                style = "border-radius: 16px;"> Salvar nova categoria
              </button>
      

         </form>

   </div>
</template>

// @ is an alias to /src
<script >
import { createProduct } from './DataService'
import {getProducts} from './DataService'
import { db } from '../../config/firebase'
import { updateProducts} from './DataService'
import {editgetProducts} from './DataService'
import {createCategory} from './DataService'
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
            category:'', 
            codigodebarra: '' ,
            modal: '',
            newcategory:'' 
            
        }
    },


created(){
    
    this.id = this.$route.params.id
      
    if(this.id){
        let id = this.id
        let idUser = localStorage.getItem('id')
       editgetProducts(idUser , id)
       .then(snapshot => {
          const objetoproducts = snapshot.data()
          console.log(objetoproducts)
          this.name = objetoproducts.name
          this.description = objetoproducts.description
          this.prince = objetoproducts.prince
          this.amount = objetoproducts.amount
          this.category = objetoproducts.category
          this.codigodebarra = objetoproducts.codigodebarra
          
        })
      }
      
    },

       
methods: {
     showModalcategory() { 
      this.modal = true ;
     },
     pushRegisteproducts() { 
      this.modal = false ;
     },
     handleCategory() { 
      let idUser = localStorage.getItem('id')
      
        createCategory({categoria: this.newcategory} , idUser).then(() => { 
        window.alert("categoria salva com sucesso")
      })
    
     }, 
  
      saveProducts(){
        if(this.id){
          this.updateProduct();
          
        } else {
          this.handleProducts();
        }
      },
        handleProducts() {
           let idUser = localStorage.getItem('id')
           
            createProduct({
                name: this.name,
                description: this.description,
                prince: this.prince,
                amount: this.amount,
                category: this.category,
                codigodebarra: this.codigodebarra
            } , idUser).then(() => {
                console.log('salvei')
                this.name = ''
                this.description = ''
                this.prince = ''
                this.amount = ''
                this.category =''
                this.codigobarra =''
                this.$router.push({ name: 'list' });
            })
        },
updateProduct(){
      let id = this.id
      let idUser = localStorage.getItem('id')
    
    updateProducts(idUser , id , {
           name: this.name,
           description: this.description,
           prince: this.prince,
           amount: this.amount,
           category: this.category,
           codigodebarra: this.codigodebarra
    }).then(() => {
           this.$router.push({ name: 'list' });
           console.log('atualizei')
           window.alert("produto atualizado com sucesso")
    }).catch(error => {
          {console.log(error)}
        }) 
      },
    },
}
</script>


<style scoped>

.add-category { 
  
  flex-direction: column;
  display: flex;
  text-align: center;
  aling-itens: center; 
  justify-content: center; 
 
 
}
.add-category label { 
  margin-top: 16px!important;
}  
.add-category input { 
   width: 60%; 
   height: 5vh!important; 
   margin-left: 20%!important;
   margin-top: 2%!important; 
   border: 1px solid rgb(200, 200, 200);
   border-radius: 12px;
}
.add-category button { 
   width: 60%; 
   height: 5vh!important; 
   margin-left: 20%!important; 
   margin-top: 10%!important; 
   border-radius: 12px;
}
h2 { 
 
  
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  width: 20%;
  text-align: center;
  background: #fbf7fb;
  margin-left: 45%!important;
  margin-top: 1%!important;
}
.form { 
 height: 90%!important;
 width: 100%!important; 
}
.registerprod {
  

    margin-top: 5%!important;;
    margin-right:0px!important;; 
    margin-bottom:0px!important;;
    
    
    height: 60vh !important;
    width: 60% !important;
    margin-left: 25%!important;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 12px;
}

.coluna-form { 
 
  width: 50%; 
  display: flex; 
  flex-direction: column;
  text-align: center; 
  align-itens: center;
 

  
}

.coluna-form  input {
  width: 90%;
  height: 10%; 
  margin-left: 3%!important; 
  border: 1px solid rgb(200, 200, 200);
  border-radius: 12px;
    
}

.coluna-form button {
   background: #993399;
    color: white;
    width: 70%!important;
    height: 10%;
    border-radius: 12px;
    margin-top: 20px!important;
    margin-left: 14%!important;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
    border: none;
    cursor: pointer;
}
    
</style>
