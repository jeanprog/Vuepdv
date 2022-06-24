<template >
 <body>
      <button class="Register-product" @click = "redirectproduct()">adicionar novo produto</button>

  <h2 class="titulo"> ESTOQUE</h2>
      <input type="search" placeholder="Pesquisar Produto" v-model="searchQuery" />
      
      
   <h4>PRODUTO VALOR QUANTIDADE DESCRIÇÃO</h4>
    
  <div class="list">
   
    <div
      class="collection-item"
      v-for="products in searchedProducts"
      :key="products.id"
     
    >
      
      <div class= "dados" id="name"> {{products.name }}</div>
     <div class= "dados" id="prince"> {{products.prince}} </div>
     <div class= "dados" id="amount">   {{products.amount}} </div>
     <div class= "dados" id="description">{{products.description}}</div>  
      <div class='btn-delete' @click= "deleteproduct(products)">
       <span class="fa fa-trash pointer"></span>
       </div>
       <div class='btn-edit' @click="edit(products.id)" >
              <span class="fa fa-pen pointer"></span> 
      </div>
    </div>
  </div>
  </body>
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
  redirectproduct() {
    this.$router.push({ name: 'RegisterProducts'})
  },
   edit(idproduct) {
    this.$router.push({ name: 'RegisterProducts' , params: {id: idproduct}})
},
   
   deleteproduct(products) {
     if (window.confirm("deseja mesmo deletar o produto?")) {
           db.collection('products').doc(products.id).delete().then(() => {
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
    width: 200px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
    cursor: pointer ;    
    position: relative !important; 
    top:150px;
    left: 900px; 
    border:solid;
 }
 .titulo {
  position: relative; 
  left: 580px;
  top:20px;
  border: none;
 
 }
 body { 
 
  height: 94vh;
}
.list {
 
   box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

  height: 50vh;
  width: 50%!important;
  overflow: scroll!important;
  border-radius: 10px;
  left: 400px;
  top: 150px;
  position: relative!important;
  
  
}
input { 
    position: relative;
    top: 60px!important;
    left: 500px !important;
    width: 350px;
    border: 1px solid #993399!important;
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
    
}
h4 {
  margin-left:300px!important;
  justify-content: space-around;
  position: absolute;
  top:200px!important;
  letter-spacing: 2px!important;
  word-spacing: 10px!important; 
  left: 160px!important;
  
    border: 1px solid #993399!important;
  border-radius: 10px;
  background-color: #fbf7fb;

   box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
   padding: 10px;
 
}
  

.collection-item {
    margin-left: 60px!important;
    
    display: flex;
    width: 80%;
    justify-content: space-around;
    padding: 0.9%;
    border:solid white;
    position: relative;
    top: 10px;
    background-color: #fbf7fb;
    
}
.dados {
  
  padding: 0.9%; 
  display: inline;
 
  
  }
  
  .pointer {
    cursor: pointer;
    color: white;
    left: 12px!important;
    top: 9px!important;
    position: relative!important;
}

.btn-delete  {
  margin-left: 100px;
   background-color: #993399!important;
  position:relative;
 border-radius: 4px;
  width: 40px;
  left: 20px;
}



#id {
  min-width: 20%;
  margin-left: 20px!important;
 
}
#description {
  min-width: 5%;
}
#name {
  min-width: 15%;
}
#amount {
  min-width: 1%;
}
#price {
  min-width: 25%;
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