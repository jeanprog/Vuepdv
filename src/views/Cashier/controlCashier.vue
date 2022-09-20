<template>
 
  <div class= 'items'>
    <div class="itens-input">
    <span class = 'datainicio'>Data inicio:</span>
    <input type="date" v-model = "startDate">
    <span class = 'datafinal'>Data final:</span>
    <input type="date" v-model = "endDate" >
    </div>
  <div class="itens-button">
   <button class="controlecaixa" @click = "redirectcashier()">voltar</button>
  </div>
  </div>
   <div class="cards-container">
   <div class="totalCashierdin">
     <span style="font-weight:bold">Total Dinheiro 
      <br>
       {{parseFloat(this.xCashierdin).toFixed(2)}}
     </span>
   </div> 
   
   <div class="totalCashiercredito">
     <span style="font-weight:bold">Total Crédito 
      <br>
       {{parseFloat(this.xCashiercredito).toFixed(2) }}
     </span>
   </div>  
   <div class="totalCashierdebito">
     <span style="font-weight:bold">Total Débito 
      <br>
       {{parseFloat(this.xCashierdebito).toFixed(2) }}
     </span>
   </div>  
   <div class="totalCashierControl">
     <span style="font-weight:bold">Total Periodo  
      <br>
       {{parseFloat(this.xCashier).toFixed(2) }}
     </span>
   </div> 
   </div>
       
<div class ='list'>
<h4>PRODUTO VALOR QUANTIDADE PAGAMENTO DATA </h4>  
   <div class="collection-item" 
        v-for="sales in filterDate "
        v-bind:key="sales.id" >
      
     <div class= "dados" id="name"> {{sales.product_name }}</div>
     <div class= "dados" id="prince"> {{sales.prince_sale}} </div>
     <div class= "dados" id="amount">   {{sales.amount}} </div>
     <div class= "dados" id="payment">{{sales.payment}}</div> 
     <div class= "dados" id="payment">{{sales.date}}</div>  
      <div class='btn-delete' @click="deleteSales(sales)" >
       <span class="fa fa-trash pointer" ></span>
            </div>
             
              
       </div>       
 </div>
</template>

// @ is an alias to /src



<script>
import { getSales } from './service'
import { deleteSalesapi } from './service'
import { ref } from 'vue';
import {db} from '../../config/firebase'


export default {
    name: "listSales",
    components: {},
    data() {
        return {
           search: "",
          listSales:[],
          startDate: "",
          endDate: "",
          xCashierdin:0,
          xCashiercredito: 0,
          xCashierdebito: 0, 
          xCashier: 0        
        };
        
    },

     created (){
      this.listar() 
      
      },
  
  computed: {
          
 filterDate () { 
              
            if (this.startDate && this.endDate) {
                let date = this.startDate;
                console.log(date)
                let myArray = date.split("-");
                console.log(myArray);
                const d = new Date();
                d.setFullYear(parseInt(myArray[0]), parseInt(myArray[1]), parseInt(myArray[2]));
                console.log(d) 
               
                let endDt = this.endDate;
                console.log(endDt)
                let myArr = endDt.split("-");
                console.log(myArr);
                const f = new Date();
                f.setFullYear(parseInt(myArr[0]), parseInt(myArr[1]), parseInt(myArr[2]));
                console.log(f) 
                
               let filterByExpiration = this.listSales.filter((items)  => {
                      let b = items.date  
                      b = b.split('/')
                      console.log(b)
                      let e = new Date();
                      e.setFullYear(parseInt(b[2]) , parseInt(b[1]) , parseInt(b[0]))
                     
                       
                  return e.getTime() >= d.getTime() && e.getTime() <= f.getTime()
           })
              this.xCashierdin = filterByExpiration.filter((din) => din.payment === "dinheiro").reduce((total , item) => item.prince_sale + total , 0)
              console.log(this.xCashierdin)
              this.xCashiercredito = filterByExpiration.filter((din) => din.payment === "credito").reduce((total , item) => item.prince_sale + total , 0)
              console.log(this.xCashiercredito)
              this.xCashierdebito = filterByExpiration.filter((din) => din.payment === "debito").reduce((total , item) => item.prince_sale + total , 0)
              console.log(this.xCashierdebito)
               this.xCashier = filterByExpiration.reduce((total , item) => item.prince_sale + total , 0)
                 
                            
              return filterByExpiration
            }
        
     },
     

    },
             
methods:{
       listar() {
        let idUser = localStorage.getItem('id')
        getSales(idUser).then((snapshot) => {
          this.listSales = [];
          snapshot.forEach( doc => {
            
            let objectSales = {};
                objectSales = doc.data ();
                objectSales.id = doc.id;
                
            ref(this.listSales.push(objectSales));
            
          });
        }); 
      },
      
   deleteSales(sales) {
      
      if (window.confirm("deseja mesmo deletar a venda?")) {
      let id = sales.id
      let idUser = localStorage.getItem('id')
      
       deleteSalesapi(idUser , id).then(() => {
           window.alert("venda deletado com sucesso")
           this.$router.push({ name: 'ListSales' });
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
     
     },
     
 redirectcashier () {
            this.$router.push({ name: 'ListSales' })
  }   
    },

}

</script>

<style scoped>

.items { 
  margin-top: 2%!important;
  height:30vh;

  display: flex!important;
  
  aling-itens: center;
  justify-content: center;
  padding-left: 30%!important;
}
.itens-input { 
  width: 50%;
  
  display: flex; 
  flex-direction: column;
  aling-itens: center; 
  justify-content: center;
}
.itens-button { 

  margin-top: 10%!important;
}

.datainicio {
  
  width: 20%;
  
  
}
.datafinal {

  width: 20%;
  
  
}
.cards-container { 
  display: flex!important; 
  aling-itens: center;
 
  height: 16vh; 
 
  padding-left: 30%!important;
}
.controlecaixa {
  background: #993399;
    color: white;
    width: 200px;
    height: 30px;
    margin-top: 30%;
    border-radius: 10px;
    
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
    cursor: pointer ;    
 
  
 
    
}
.totalCashierControl {
    
    
    width: 12%;
    height: 16vh;
     box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
  
    
    border-radius: 20px;
    
}
.totalCashierdin {
    
   
    width: 12%;
    height: 16vh;
     box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
   
   
    border-radius: 20px;
    
}
.totalCashierdin span{
   
    bottom: 300px;
}
.totalCashiercredito {
    
   
    width: 12%;
    height: 16vh;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
    
    border-radius: 20px;
    
}
.totalCashiercredito span{
  
    bottom: 300px;
}
.totalCashierdebito {
    
    
    width: 12%;
    height: 16vh;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
   
    
    border-radius: 20px;
    
}
.totalCashierdebito span{
    
    bottom: 300px;
}

.list {
  margin-top: 2%!important;
  height: 40vh;
  width: 60%;
  border: 1px solid #D6DEE2;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  margin-left: 28%!important;
  overflow: auto!important;
  border-radius: 30px;
}
input { 
    
    width: 350px;
    border: 1px solid   #993399;
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
   
    bottom:10px;
    
   
   
}
h4 {
 
  justify-content: space-around;
  position: relative;
  top: 10px!important;
  left: 70px!important;
  letter-spacing: 2px!important;
  word-spacing: 40px!important; 
  border-radius: 10px;
  width:100vh;
  border: 1px solid   #993399;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background: #fbf7fb;
  text-align: center;
}
.collection-item {
  margin-left: 30px!important;
    
    display: flex;
    width: 90%;
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
 margin-left: 20px;
  width: 40px;
   
}
#id {
  min-width: 5%;
  
}
#name {
  min-width: 22%;
   
}
#amount {
  min-width: 10%;
  margin-left:10px;
   
}
#price {
  min-width: 15%;
   
}
</style>