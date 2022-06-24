<template >
  <div class="list">
    <h1>VENDAS</h1>
      <input type="search" placeholder="Search..." v-model="searchQuery" />
      
      
   <h4>PRODUTO VALOR QUANTIDADE PAGAMENTO</h4>
    
    <div
      class="collection-item"
      v-for="sales in searchedSales"
      :key="sales.id"
     
    >
      
      <div class= "dados" id="name"> {{sales.product_name }}</div>
     <div class= "dados" id="prince"> {{sales.prince_sale}} </div>
     <div class= "dados" id="amount">   {{sales.amount}} </div>
     <div class= "dados" id="description">{{sales.payment}}</div>  
      <div class='btn-delete' @click= "deleteSales(sales)">
       <span class="fa fa-trash pointer"></span>
       
           
            </div> 
      
    </div>
  </div>
  
</template>

// @ is an alias to /src



<script>
import { getSales } from '../service'
import { ref } from 'vue';
import {db} from '../../../config/firebase'

import { computed, onMounted, reactive } from "vue";

export default {
  setup() {
    const listSales = reactive([]);
    const searchQuery = ref("");
    const searchedSales = computed(() => {
      return listSales.filter((sales) => {
        return (
          sales.product_name
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });
    
    
    onMounted(async () => {
      try {
        const salesSnap = await db
          .collection("sales")
          .get();
        salesSnap.forEach((doc) => {
          let sales = doc.data();
          sales.id = doc.id;
          ref(listSales.push(sales));
        });
      } catch (e) {
        console.log("Error Loading Products");
      }
    });
    return { searchedSales, searchQuery };
  
  },

  
    
methods: {
   
  
  deleteSales(sales) {
      console.log('evento acionado')
      let sum = parseInt(this.listProdutos.find(x => x.name === this.productselected,).amount) - parseInt(this.amount)
             console.log(sub)

      if (window.confirm("deseja mesmo deletar o produto?")) {
      
      
          db.collection('sales').doc(sales.id).delete().then(() => {
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
 h1 { 
  position: relative; 
  left: 550px;
  top: 10px;

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
    top: 9px!important;
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
  top: 10px;
  left: 30px;
  margin-left: 70px;
  width: 40px;
  background-color: #993399!important;
  border-radius: 4px;
  border: solid;
  
  
}


</style>