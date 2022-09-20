<template>
  <div class="header-list">
    <input type="search" placeholder="Pesquisar Venda"  v-model ="search">
    <button class="controlecaixa" @click = "redirectcashier()">vendas por periodo</button>
  </div>
   
    
      <section class="list">
       <h4>PRODUTO VALOR QUANTIDADE PAGAMENTO DATA </h4>  
      <div class="collection-item" 
        v-for="sales in filteredSales "
        v-bind:key="sales.id" >
         <div class= "dados" id="name"> {{sales.product_name }}</div>
  
     <div class= "dados" id="prince"> {{parseFloat(sales.prince_sale).toFixed(2)}} </div>
     <div class= "dados" id="amount">   {{sales.amount}} </div>
     <div class= "dados" id="payment">{{sales.payment}}</div>
     <div class= "dados" id="date">{{sales.date}}</div>  
      <div class='button-delete' @click="deleteSales(sales)" >
       <span class="fa fa-trash pointer" ></span>
            </div>
             
              </div>
       
        

    
    </section>


 
</template>

// @ is an alias to /src



<script>
import { getSales } from '../service'
import{deleteSalesapi} from '../service'
import { ref } from 'vue';
import {db} from '../../../config/firebase'
import {updateEstoque} from '../service'


export default {
    name: "listSales",
    components: {},
    data() {
        return {
           search: "",
          listSales:[],
          startDate: "",
          endDate: "",
          listProdutos: []

        
        };
        
    },

created (){
      this.listar()
   
      
},
  
computed: {
          
    filteredSales() {
      let searchsales = [];
      searchsales = this.listSales.filter((sales) => {
        return (
          sales.product_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
          
        );
      });
      
     return searchsales 
     
     },  
},
   
 methods:{
    listar() {
        let idUser = localStorage.getItem('id')
        getSales(idUser)
        .then((snapshot) => {
           this.listSales = [];
          snapshot.forEach( doc => {
             let objectSales = {};
                 objectSales = doc.data ();
                 objectSales.id = doc.id;
              
               ref(this.listSales.push(objectSales));
            
          })
           localStorage.setItem("Sales", JSON.stringify(this.listSales))
       
        }); 
        
      },
    
      
 deleteSales(sales) {
      console.log('evento acionado')
  // if (window.confirm("deseja mesmo deletar a venda?")) {
        
        let id = sales.id
        let name = sales.product_name
        let idUser = localStorage.getItem('id')
        this.listProdutos = JSON.parse(localStorage.getItem("produtos"))
        console.log(this.listProdutos)
        
        let devolutionStock = parseInt(this.listProdutos.find(
                        x => x.name === sales.product_name,
                    ).amount) + parseInt(this.listSales.find(
                        x => x.id === sales.id,
                    ).amount) 
                    
            let productId = this.listProdutos.find(
                        x => x.name === sales.product_name,
                    ).id
                   console.log(productId)
        deleteSalesapi(idUser , id)
           .then(() => {
           window.alert("venda apagada com sucesso ")
          
                  
          updateEstoque(idUser, productId , devolutionStock)
                 console.log('atualizei')
                 window.alert('A quantidade do item foi devolvida ao estoque, se necessesário, edite manualmente para quantidade atual')
               console.log('cheguei aqui')
            window.location.reload()
            
            })
              .catch((error) => {
                   console.error(error);
        }); 
   },
     
 
     
 redirectcashier () {
            this.$router.push({ name: 'controlCashier' })
 }
    
    },

}

</script>

<style scoped>
.header-list { 
  display: flex; 
  align-itens: center;
  width: 100%;
 
  margin-top: 2%!important;
  padding-left: 36%;
}
.controlecaixa { 
  border-radius: 8px;
  margin-left: 16px!important;
}
.list {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  height: 66vh;
  width: 50%!important;
  overflow: hidden!important;
  border-radius: 20px;
  margin-left: 30%!important;
  margin-top: 5%!important;
 
}
input { 
   
    width: 350px;
    border: 1px solid   #993399;
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 30px;
     box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}
h4 {
  
 
  letter-spacing: 2px!important;
  word-spacing: 10px!important; 
 
}
.collection-item {
    margin-left: 60px!important;
    
    display: flex;
    width: 80%;
    justify-content: space-around;
    padding: 0.9%;
    border:solid white;
   
    background-color: #fbf7fb;
}
.dados {
  
  padding: 0.9%; 
  display: inline;
 
  
  }
  
.pointer {
    cursor: pointer;
    color: white;
   
}
.button-delete  {
  
  background-color: #993399!important;
  width: 10%!important;
  height: 3vh!important;
  display: flex; 
  aling-itens: center;
  justify-content: space-around;

  border-radius: 4px;
 
}
#date {
  min-width: 10%;
  margin-left: 20px!important;
 
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

</style>