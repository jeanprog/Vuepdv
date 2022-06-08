<template>
<input type="search" placeholder="Pesquisar Venda" >
<h4>PRODUTO VALOR QUANTIDADE PAGAMENTO </h4>  
 <section class="list">
 
     <ul>
      <li class="collection-item" 
        v-for="sales in listSales"
        v-bind:key="sales.id" >
         <div class= "dados" id="name"> {{sales.product_name }}</div>
  
     <div class= "dados" id="prince"> {{sales.prince_sale}} </div>
     <div class= "dados" id="amount">   {{sales.amount}} </div>
     <div class= "dados" id="payment">{{sales.payment}}</div>  
      <div class='btn-delete' @click="deleteSales(sales)" >
       <span class="fa fa-trash pointer" ></span>
            </div>
             <div class='btn-edit' @click="edit(sales.id)" >
              <span class="fa fa-pen pointer"></span>
              </div>
              </li>
              </ul>
 </section>
</template>

// @ is an alias to /src



<script>
import { getSales } from '../service'
import { ref } from 'vue';
import {db} from '../../../config/firebase'


export default {
    name: "listSales",
    components: {},
    data() {
        return {
         
          listSales:[],
        
        };
        
    },

     created (){
      this.listar() 
      
      },
     
     methods:{
       listar() {
        getSales().then((snapshot) => {
          this.listSales = [];
          snapshot.forEach( doc => {
            console.log(doc);
            let objectSales = {};
                objectSales = doc.data ();
                objectSales.id = doc.id;
                
            ref(this.listSales.push(objectSales));
            
          });
        }); 
      },
      
  edit(id) {
     
       
      this.$router.push({ name: 'cashier' , params: {id: id}})

      
    },
    
     deleteSales(sales) {
      console.log('evento acionado')
      if (window.confirm("deseja mesmo deletar o produto?")) {
      
      
          db.collection('sales').doc(sales.id).delete().then(() => {
           window.alert("produto deletado com sucesso")
           this.$router.push({ name: 'ListSales' });
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
     
     },
     
    }
}   
</script>

<style scoped>
 
.list {
 
margin-top: 5%!important;
  height: 70vh;
  border: 1px solid #D6DEE2;
  box-shadow: 15px 15px 10px #D6DEE2;
  
}
.list ul {
  margin-top: 30px!important;
}
input { 
    margin-top: 20px!important;
    margin-left: 400px !important;
    width: 350px;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 10px;
}
h4 {
  margin-left:350px!important;
  justify-content: space-around;
  position: relative;
  top: 40px!important;
  letter-spacing: 2px!important;
  word-spacing: 20px!important; 
}
.collection-item {
 margin-left: 300px!important;
    display:flex;
    position: relative;
    width: 60%;
    justify-content: space-around;
    padding: 0.9%;
    margin-bottom:20px!important;
    bottom: 50px!important;
}
.dados {
 border-right: 0px solid grey;
  border-left: 0px solid grey;
  padding: 0.9%; 
  background-color: #D6DEE2
  }
  .pointer {
    cursor: pointer;
}

.btn-delete  {
  margin-left: 100px;
  
  position:relative;
  
  width: 40px;

}

.btn-edit {
 margin-left: 20px;
  width: 40px;
}

#id {
  min-width: 20%;
 
}
#name {
  min-width: 35%;
}
#amount {
  min-width: 1%;
}
#price {
  min-width: 25%;
}
</style>