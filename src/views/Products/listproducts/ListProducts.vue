<template >
 
      
      <div class = "titulo">
        <h2> ESTOQUE</h2>
        <input type="search" placeholder="Pesquisar Produto" v-model="searchQuery" />
      </div>
      
   <h4>PRODUTO VALOR QUANTIDADE DESCRIÇÃO APAGAR/EDITAR</h4>
    
  
     <section>
    <div
      class="collection-item"
      v-for="products in searchedProducts"
      :key="products.id"
     
    >
      
     <div class= "dados" id="name"> {{products.name }}</div>
     <div class= "dados" id="prince"> {{products.prince}} </div>
     <div class= "dados" id="amount">   {{products.amount}} </div>
     <div class= "dados" id="description">{{products.description}}</div>
         
      <div class='deleteproduct' @click= "deleteproduct(products)">
       <span class="fa fa-trash pointer"></span>
       </div>
       <div class='editproduct' @click="edit(products.id)" >
              <span class="fa fa-pen pointer"></span> 
      </div>
    </div>
  </section>
  <button class="Register-product" @click = "redirectproduct()">adicionar novo produto</button>
</template>

// @ is an alias to /src



<script>

import { ref } from 'vue';
import {db} from '../../../config/firebase';
import { computed, onMounted, reactive } from "vue";
import {getProducts} from '../DataService';
import {deleteProducts} from '../DataService';


export default {
  setup() {
    const listProducts = reactive([]);
    const searchQuery = ref("");
    const searchedProducts = computed(() => {
      return listProducts.filter((products) => {
        return (
          products.name
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });
    
     

    onMounted(async () => {
      try {
        let idUser = localStorage.getItem('id')
       
       const productsSnap = await getProducts(idUser)
       
    
        productsSnap.forEach((doc) => {
           
           let objetoproducts = doc.data();
           console.log(objetoproducts)
          objetoproducts.id = doc.id;
          ref(listProducts.push(objetoproducts));  
        }); 
      } catch (e) {
        console.log(e);
      }
    });
    return { searchedProducts, searchQuery };
  
  },
methods: {
  redirectproduct() {
    this.$router.push({ name: 'RegisterProducts'})
  },
  edit(idproduct) {
    this.$router.push({ name: 'RegisterProducts' , params: {id: idproduct}})
  },
   
 deleteproduct(products) {
    let id = products.id
    let idUser = localStorage.getItem('id')
    
     if (window.confirm("deseja mesmo deletar o produto?")) {
           deleteProducts(idUser , id)
           .then(() => {
                  window.alert("produto deletado com sucesso")
                  window.location.reload();
        })
          .catch((error) => {
            console.error(error);
          });
    }
  },

 }

};

</script>

<style scoped>

.Register-product {
   background: #993399;
    color: white;
    margin-left: 40%!important;
    margin-top: 5%!important;
    border-radius: 10px;
 
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
    cursor: pointer ;    
  
    
    
 }
 .titulo {

 height: 20vh!important;
 display:flex; 
 flex-direction: column;
 align-items: center;
 
 }
 .titulo input { 
  margin-top: 16px!important;
 }


input { 
 
    width: 350px;
    border: 1px solid #993399!important;
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
    
}
h4 {
  width: 40%;
  align-important: center;
  margin-left: 30%!important;
  text-align: center;
 
  letter-spacing: 2% !important;
  word-spacing: 24px!important; 

  border: 1px solid #993399!important;
  border-radius: 10px;
  background-color: #fbf7fb;
   box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
   padding: 10px;
 
}
  
.collection-item {
    margin-left: 30%!important;
    
    display: flex;
    width: 40%;
    justify-content: space-around;
    padding: 0.5%;
    border:solid white;
   
    
    background-color: #fbf7fb;
    
}
.dados {
  
  padding: 0.5%; 
  display: inline;
 
  
  }
  
  .pointer {
    cursor: pointer;
    color: white;
    left: 12px!important;
    top: 9px!important;
    position: relative!important;
}
.deleteproduct  {
 
  background-color: #993399!important;
  width: 10%;
  border-radius: 4px;
 
  display: flex!important;
  justify-content: center!important;
}

#description {
  min-width: 5%;
}
#name {
  min-width: 10%;
}
#amount {
  min-width: 1%;
}
#price {
  min-width: 25%;
}
.editproduct {

  
  
  width: 10%;
  background-color: #993399!important;
  border-radius: 4px;
  
  
  
}

</style>