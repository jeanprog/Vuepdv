<template>
 
  <div class= 'items'>
    
    <input type="date" v-model = "startDate">
   
    <input type="date" v-model = "endDate" >
    <span class = 'datainicio'>Data inicio:</span>
    <span class = 'datafinal'>Data final:</span>
    <button class="controlecaixa" @click = "redirectcashier()">voltar</button>
 
   
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
   <div class="totalCashier">
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
        getSales().then((snapshot) => {
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
       deleteSalesapi(id).then(() => {
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
.datainicio {
  position: relative;
  right: 470px!important;
  width: 20%;
  bottom: 70px;
  
}
.datafinal {
  position: relative;
  right: 550px!important;
  width: 20%;
  bottom: 10px;

  
}
.controlecaixa {
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
    top:1px;
    left: 30px; 
    border:solid;
    
}

.totalCashier {
    
    position: relative !important;
    width: 12%;
    height: 16vh;
     box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
    top: -295px!important;
    left: 300px!important;
    right: 200px;
    border-radius: 20px;
    
}
.totalCashierdin {
    
    position: relative !important;
    width: 12%;
    height: 16vh;
     box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
    top: 25px;
    left: 700px!important;
    right: 200px;
    border-radius: 20px;
    
}
.totalCashierdin span{
    position: relative;
    bottom: 300px;
}

.totalCashiercredito {
    
    position: relative !important;
    width: 12%;
    height: 16vh;
     box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
    top: -85px;
    left: 500px!important;
    right: 200px;
    border-radius: 20px;
    
}
.totalCashiercredito span{
    position: relative;
    bottom: 300px;
}
.totalCashierdebito {
    
    position: relative !important;
    width: 12%;
    height: 16vh;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    text-align: center;
    background: #fbf7fb;
    top: -186px;
    left: 900px!important;
    
    border-radius: 20px;
    
}
.totalCashierdebito span{
    position: relative;
    bottom: 300px;
}
.items { 
  
  height:50vh;
  
  
}
.list {
  left: 350px;
  position: relative;
  height: 50vh;
  width: 60%;
  border: 1px solid #D6DEE2;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  top: -60px;
  overflow: auto!important;
  border-radius: 30px;
}

input { 
    margin-top: 20px!important;
    margin-left: 500px !important;
    width: 350px;
    border: 1px solid   #993399;
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
    position: relative;
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
    
    
    position: relative;
    top: 40px!important;
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