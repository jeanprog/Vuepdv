<template >
    <div class="tela" style="display: flex; min-height: 100vh!important;" >
    <div style=" display: flex; height: 20%; width: 70%; flex-wrap: wrap; ">
    <section class="header-total">
    <div class="totalCashier">
    <span style="font-weight:bold">Total Caixa 
    <br><div class="fa-solid fa-cash-register"></div><br>
    R$ {{parseFloat(xCashier).toFixed(2)}}  
    </span>
    
    </div>
    <div class="totalCashierdin">
    <span style="font-weight:bold">Total Dinheiro 
    <br>
    <salesDin />
    </span>
    </div>
    
    <div class="totalCashiercredito">
    <span style="font-weight:bold">Total Credito 
    <br>
    <salesCredito />
    </span>
    </div>

    <div class="totalCashierdebito">
    <span style="font-weight:bold">Total Débito 
    <br>
    <Salesdebito />
    </span>
    </div>
    </section>
  
    <div class="filter-products">
        <div class="category"> 
         <h4> Filtrar produtos por categoria </h4>
            <div class="card-category">
              <p> filtro de categorias</p>
            </div>
         </div>
         <br>
         <div class="products-cashier" >
              <div class="products-card"
               v-for="products in listProdutos"
               :key="products.id"  
               @click.prevent="handleProduct"
               > 
                  <div class ="product-title"> {{products.name}} 
                     <div class="product-image"> 
                    <p> aqui é area da imagem </p>
                      </div>
                     </div>
                  </div>
               </div>
              
         </div>
         </div>
        <div class="caixa" style ="width: 30%; height: 100%;"> 
       <finishsales />
       </div>
   
 </div>
    
</template>

// @ is an alias to /src
<script>
import { ref } from 'vue'
import { getProducts } from '../Products/DataService'

import { db } from '../../config/firebase'
import { createSales } from './service'
import {updateEstoque} from './service'
import {getSales} from './service'
import SalesDin from './SalesDin.vue'
import salesCredito from './salesCredito.vue'
import Salesdebito from './Salesdebito.vue'
import finishsales from './finishsales.vue'
import {addProduct} from './finishsales.vue'

export default {
    name: 'Cashier',
    
    
   
    components: {SalesDin,
    salesCredito,
    Salesdebito,
    finishsales
    },
    
    data() {
        return {
            listProdutos: [],
            sales: [],
            xCashier: 0, //total do caixa 
            valortotal: 0,
            trococalc: 0,
            id: '',
            productselected: '',
            payment: '',
            prince: '',
            amount: '',
            date: new Date().toLocaleDateString() ,
            troco: '',
            etapavenda: ''
            
          
        }
    },
    
    created() {
            
            this.listarsales() , 
            this.listProducts()
           
            
     
   

       
    },
    
    
    
    
methods: {
handleProduct() { 
  console.log('selecionei o produto')
},
   
 listProducts () { 
    
   this.listProdutos = JSON.parse(localStorage.getItem("produtos"))
    
         
        
    
 },
 
 listarsales() {
    let idUser = localStorage.getItem('id')
    getSales(idUser).then(snapshot => {
                this.totalSales = []
                snapshot.forEach(doc => {
                    
                    let objectsales = {}
                    objectsales = doc.data()
                    objectsales.id = doc.id

                    ref(this.totalSales.push(objectsales))
                   
                })
                
                
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
              let filterByExpiration = this.totalSales.filter((items)  => {
              let b = items.date === today.toLocaleDateString()
                  return  b
           })
             
              this.xCashier = filterByExpiration.reduce((total , item) => item.prince_sale + total , 0)
                  
                
                
            })
            console.log(this.totalSales)
 },
 
 deleteProduct(){
    ref( this.sales.pop())
   
 },

 }
}
</script>
<style>
.header-total { 
    display: flex ; 
    width: 100%;
    height: 90%; 
    align-items: center!important;
    padding-left: 10%!important;
    

}

.totalCashier {
    
    
    
    margin-left: 40%!important;
    margin-right: 1%!important;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    background: #fbf7fb;
    
    
    border-radius: 20px;
}
.totalCashier span{
    
   
}
.totalCashierdin {
    
    
  
    margin-right: 1%!important;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    background: #fbf7fb;
   
    border-radius: 20px;
}
.totalCashierdin span{
    
    
}
.totalCashiercredito {
    
   
   
     margin-right: 1%!important;
    
   
    text-align: center;
     box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    
    background: #fbf7fb;
  
    border-radius: 20px;
}
.totalCashiercredito span{
    
    
    top: 30px;
}
.totalCashierdebito {
    
     margin-right: 1%!important;
   
   
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    background: #fbf7fb;
    
    border-radius: 20px;
}
.totalCashierdebito span{
    
    
    
}

.filter-products { 
    
    display: flex ; 
    width: 100%;
    min-height: 70vh!important; 
    align-items: center!important;
    flex-direction: column;
    
    margin-top: 1%!important;
}
.products-cashier { 
     display: flex!important; 
     flex-wrap: wrap;
     margin-left: 30% !important; 
    
     
}
.category { 
  
    width: 100%;
    height: 30%;
    diplay: flex ; 
    flex-direction: column; 
    text-align: center!important;
    justify-content: center; 
    flex-wrap: wrap; 
    align-itens: center!important;
}
.card-category { 
      width: 20%;
      height: 65px;
      text-align: center;
      justify-content: center; 
      display: flex; 
      flex-direction: column;
      margin-left: 50%!important;
     
      box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
      border: 1px solid rgb(200, 200, 200);
      
}
.products-card { 
      
      width: 30%;
      text-align: center;
      justify-content: center; 
      display: flex; 
      flex-direction: column;
      margin-left: 16px!important;
      margin-top: 16px!important;
      box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
      border: 1px solid rgb(200, 200, 200);
}

.products-card:hover { 
    cursor: pointer;
    background-color: #993399; 
    color: white!important;
}

</style>
