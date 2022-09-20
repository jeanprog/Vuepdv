<template >
 
    <h1>VENDAS</h1>
      <input type="search" placeholder="Search..." v-model="searchQuery" />
      
      
   <h4>PRODUTO VALOR QUANTIDADE PAGAMENTO</h4>
      <section style="max-height : 400px; border: solid; overflow:scroll;">
    <div
      class="collection-item"
      v-for="sales in searchedSales"
      :key="sales.id"
      style="max-height: 50px;"
    >
      
      <div class= "dados" id="name"> {{sales.product_name }}</div>
     <div class= "dados" id="prince"> {{sales.prince_sale}} </div>
     <div class= "dados" id="amount">   {{sales.amount}} </div>
     <div class= "dados" id="description">{{sales.payment}}</div>  
      <div class='btn-delete' @click= "deleteSales(sales)">
       <span class="fa fa-trash pointer"></span>
       
           
            </div> 
      
    </div>
  
  </section>
  
</template>

// @ is an alias to /src



<script>
import { getSales } from '../service'
import { ref } from 'vue';
import {db} from '../../../config/firebase'
import {getSalesuser} from '../service'

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
 

</style>