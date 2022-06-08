<template>

 <h4> R$ {{xCashier}} </h4>
 
     

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
        getSales().then((snapshot) => {
          this.listSales = [];
          snapshot.forEach( doc => {
            console.log(doc);
            let objectSales = {};
                objectSales = doc.data ();
                objectSales.id = doc.id;
                
            ref(this.listSales.push(objectSales));
            
          });
        }).then(() => {
              this.xCashier = this.listSales.filter((din) => din.payment === "dinheiro").reduce((total , item) => item.prince_sale + total , 0)
              console.log(this.xCashier)
                  
                
                
            }) 
      },
     
    },
}   
</script>

<style scoped>
 

</style>