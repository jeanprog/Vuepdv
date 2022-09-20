<template>
  <div  class="fa-solid fa-dollar-sign"></div>
 <h4> R$ {{parseFloat(xCashier).toFixed(2)}} </h4>
 
     

</template>

// @ is an alias to /src



<script>
import { getSales } from './service'
import { ref } from 'vue';
import {db} from '../../config/firebase'


export default {
    name: "listSales",
    components: {},
    data() {
        return {
         
          listSales:[],
          xCashier: 0,
          
        
        };
        
    },

     created (){
      this.listar() 
      
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
        }).then(() => {
              
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();
        let yyyy = today.getFullYear();
        
    if (dd < 10) {
       dd = '0' + dd;
    }
    if (mm < 10) {
       mm = '0' + mm;
    }
              let filterByExpiration = this.listSales.filter((items)  => {
              let b = items.date === today.toLocaleDateString()
                  return  b
                  
                  
           })
              this.xCashier = filterByExpiration.filter((din) => din.payment === "dinheiro").reduce((total , item) => item.prince_sale + total , 0)
              
            }) 
      },
     
    },
}   
</script>

<style scoped>
 

</style>