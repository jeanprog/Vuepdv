<template>
<body>
<input type="search" placeholder="Pesquisar Venda"  v-model ="search">
    
    <button class="controlecaixa" @click = "redirectcashier()">vendas por periodo</button>
    <div>
      <div class="" 
        v-for="sales in filterDate "
        v-bind:key="sales.id" >
       <div class="test1"> {{sales.product_name }}</div>  
        </div>
       
        

    </div>
<h4>PRODUTO VALOR QUANTIDADE PAGAMENTO DATA </h4>  
 <section class="list">
 
     
      <div class="collection-item" 
        v-for="sales in filteredSales "
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
              
 </section>
 </body>
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
           search: "",
          listSales:[],
          startDate: "",
          endDate: ""
        
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
      console.log('evento acionado')
      if (window.confirm("deseja mesmo deletar a venda?")) {
      
      
          db.collection('sales').doc(sales.id).delete().then(() => {
           window.alert("venda apagada com sucesso ")
           this.$router.push({ name: 'ListSales' });
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
     
     },
     
 redirectcashier () {
            this.$router.push({ name: 'controlCashier' })
  }   
    },

}

</script>

<style scoped>
body { 
 
  height: 94vh;
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
   left: 550px;
   top: 60px; 
   border: solid;
}


h1 { 
  position: relative; 
  left: 550px;
  top: 10px;

 }
.list {
   box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

  height: 66vh;
  width: 50%!important;
  overflow: hidden!important;
  border-radius: 20px;
  left: 400px;
  top: 120px;
  position: relative!important;
}
input { 
    position: relative;
    top: 60px!important;
    left: 500px !important;
    width: 350px;
    border: 1px solid   #993399;
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 30px;
     box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;

}
h4 {
  margin-left:300px!important;
  justify-content: space-around;
  position: absolute;
  top:120px!important;
  letter-spacing: 2px!important;
  word-spacing: 10px!important; 
  left: 160px!important;
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
  margin-left: 150px;
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