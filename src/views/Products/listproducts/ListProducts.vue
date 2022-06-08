<template >
  <div class="list">
    <h1> ESTOQUE</h1>
      <input type="search" placeholder="Pesquisar Produto" v-model="searchQuery" />
      
      
   <h4>PRODUTO VALOR QUANTIDADE DESCRIÇÃO</h4>
    
    <div
      class="collection-item"
      v-for="products in searchedProducts"
      :key="products.id"
     
    >
      
      <div class= "dados" id="name"> {{products.name }}</div>
     <div class= "dados" id="prince"> {{products.prince}} </div>
     <div class= "dados" id="amount">   {{products.amount}} </div>
     <div class= "dados" id="description">{{products.description}}</div>  
      <div class='btn-delete' @click= "deleteProducts(products)">
       <span class="fa fa-trash pointer"></span>
       </div>
       <div class='btn-edit' @click="edit(products.id)" >
              <span class="fa fa-pen pointer"></span> 
      </div>
    </div>
  </div>
  
</template>

// @ is an alias to /src



<script>

import { ref } from 'vue';
import {db} from '../../../config/firebase'

import { computed, onMounted, reactive } from "vue";

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
        const productsSnap = await db
          .collection("products")
          .get();
        productsSnap.forEach((doc) => {
          let objetoproducts = doc.data();
          objetoproducts.id = doc.id;
          ref(listProducts.push(objetoproducts));
        });
      } catch (e) {
        console.log("Error Loading Products");
      }
    });
    return { searchedProducts, searchQuery };
  
  },
methods: {
  
  
        edit(idproduct) {
      this.$router.push({ name: 'RegisterProducts' , params: {id: idproduct}})

    },
   

     deleteproduct(products) {
     
      if (window.confirm("deseja mesmo deletar o produto?")) {
      
      
          db.collection('products').doc(products.id).delete().then(() => {
           window.alert("produto deletado com sucesso")
           this.$router.push({ name: 'list' });
            
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
 h1 {
  position: relative; 
  left: 550px;
  top:10px;
 }
.list {
 
  height: 90vh;
  
  
}
input { 
    position: relative;
    top: 60px!important;
    left: 500px !important;
    width: 350px;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 10px;
}
h4 {
  margin-left:300px!important;
  justify-content: space-around;
  position: relative;
  top: 90px!important;
  letter-spacing: 2px!important;
  word-spacing: 10px!important; 
  left: 30px!important;
}

.collection-item {
    margin-left: 300px!important;
    
    display: flex;
    width: 60%;
    justify-content: space-around;
    padding: 0.9%;
    border:solid white;
    
    
    position: relative;
    top: 100px;
    background-color: #D6DEE2
}
.dados {
  
  padding: 0.9%; 
  display: inline;
 
  
  }
  
  .pointer {
    cursor: pointer;
    color: white;
    left: 12px!important;
    top: 7px!important;
    position: relative!important;
}

.btn-delete  {
  margin-left: 150px;
   background-color: #993399!important;
  position:relative;
 border-radius: 4px;
  width: 40px;
  left: 20px;
}

.btn-edit {
  position:relative;
  
  left: 10px;
  margin-left: 70px;
  width: 40px;
  background-color: #993399!important;
  border-radius: 4px;
  
  
  
}


</style>