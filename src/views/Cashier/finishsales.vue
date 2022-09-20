<template>

<form class="container-vt" v-if="finish === true">
    
                <label for="form-user-description">tipo de pagamento</label>
                <select
                    id="form-user-description"
                    v-model="payment"
                    type="text"
                    placeholder=""
                required> 
                <option>dinheiro</option>
                <option>debito</option>
                <option>credito</option>
                <option>pix</option>
                </select>
                
           
           <label for="form-user-description" id="titulotroco">Dinheiro entrada</label>
           <input v-model="troco" type="number" class ="Inputtroco">
           <span style="font-weight:bold" id="trocotela">  Troco: R$
              {{parseFloat(this.trococalc).toFixed(2) }} 
           </span>
           
              <button style="margin-top: 16px!important;" id ="trococashier" :@click="calcTroco()">calcular</button>
               <br>  <button @click.prevent="sell()">Realizar venda <div class="fas fa-donate"></div></button>
               <br><span id = "subtotal" style="font-weight:bold">  TOTAL: R$
              {{parseFloat(this.valortotal).toFixed(2)}} 
           </span>
    </form>
           <section class="add_product" v-if="finish != true">
            <form 
            className="new-product" @submit.prevent="addProduct()">
                <label for="form-user-name">Escolha o produto</label>
                <input v-model="productselected" type="text" list="listin" required />
                <datalist id="listin">
                    <option
                        v-for="products in listProdutos"
                        :key="products.id"
                        :value="products.name"
                    >
                        {{ products.name }}
                        {{products.prince}}
                    </option>
                </datalist>
  
        <label for="form-user-amount">quantidade</label>
                <input
                    id="form-user-amount"
                    v-model="amount"
                    type="number"
                    placeholder=""
                    required
                />
                <button style="margin-top: 10px!important;" type="submit">Adicionar Produto <div class="fas fa-shopping-cart"></div></button>
                    <div style="margin-top: 10px!important;" class='btn-delete' @click="deleteProduct()" >Remover
                      <span class="fa fa-trash pointer" ></span>
                    </div>
            </form>
              
        </section>

        <section class="sales" v-if="finish != true">
         <h3 
         style="margin-top: 10px!important;">Bem vindo ao caixa do dia {{this.date}}</h3>
         <div>
        
         </div>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Valor</th>
                        
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sale in sales" :key="sale.product_id">
                        <td>{{ sale.product_name }}</td>
                       <td>
                            R$
                            {{ parseFloat(sale.prince_sale).toFixed(2) }}
                        </td>
                        
                        <td>{{ sale.amount }}</td>
                            
                        
                    </tr>
                </tbody>
            </table><br>
            
          
            
        </section>
        
          <span v-if="finish != true" id = "subtotal"  style="font-weight:bold">  Subtotal: R$
              {{parseFloat(this.valortotal).toFixed(2)}} 
           </span>
     <button v-if= "finish != true" @click.prevent="setvenda"> receber e finalizar </button>
     <button v-if= "finish === true " @click.prevent="voltaAddproduct"> voltar para adicionar produto </button>
    
</template>

<script>
import { ref  } from 'vue'
import { getProducts } from '../Products/DataService'

import { db } from '../../config/firebase'
import {createSales} from './service'
import {updateEstoque} from './service'
import {getSales} from './service'
import SalesDin from './SalesDin.vue'
import salesCredito from './salesCredito.vue'
import Salesdebito from './Salesdebito.vue'
import Cashier from './Cashier'

export default {
    name: 'finishsales',
    
    
    components: { 
        Cashier
    },
    data() {
        return {
            listProdutos: ref([]),
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
            finish: '',
            envialista: []
            
          
        }
    },
    
    created() {
            this.listar(),
            this.listarsales() 
           
            
    },
 
   

   
methods: {
    setvenda() { 
        this.finish = true 
    },
  voltaAddproduct() { 
    this.finish = false 
  },
    
   
    
addProduct() {
            
            let sub = parseInt(this.listProdutos.find(x => x.name === this.productselected,).amount) - parseInt(this.amount)
                       
            if (sub < 0) {
                window.alert('quantidade ' + this.productselected +' indisponivel no estoque')
                return 
            }
            
            let prince = parseFloat(this.amount) * parseFloat(this.listProdutos.find(y => y.name === this.productselected, ).prince)
                this.valortotal += prince
             
              
            let verify = this.sales.find(x => x.product_name === this.productselected,)
             
             if (verify != undefined) { 
               let altQtd = this.sales.find(x => x.product_name === this.productselected,)
                  altQtd.amount += this.amount 
               
               let altvalorunit = this.sales.find(x => x.product_name === this.productselected,)
                 altvalorunit.prince_sale = altvalorunit.prince_unit * altvalorunit.amount
                  console.log(altvalorunit)
             } 
              else { 
             
                ref( 
            
                this.sales.push({
                    payment: "",
                    product_name: this.productselected,
                    product_id: this.listProdutos.find(
                        x => x.name === this.productselected,
                    ).id,
                    amount: this.amount,
                    prince_unit: this.listProdutos.find(
                        x => x.name === this.productselected,
                    ).prince,
                    prince_sale: prince,
                    update_estoque: sub,
                    date: new Date().toLocaleDateString()
                    
               
                }),  
                
            
            )
        }
        
            this.productselected = ''
            this.amount = ''
            this.prince = ''
            this.total = ''
},
 calcTroco() {
           
        let calc = parseFloat(this.troco) - this.valortotal 
            this.trococalc += calc
 },
 
 sell() {        
    
    let payment = this.payment
    
  if(payment){
    const salesfinish = this.sales.map(object => {
        return  {...object, payment: payment};
    
    });
     console.log(salesfinish)
      salesfinish.forEach((value , index) => {   // foreach propriedade do array, nao funciona com o then, recomendado para funções assincronas ou muitos demoradas
            let id = value.product_id
            let updateestoque = value.update_estoque
            let idUser = localStorage.getItem('id')
            
           
         createSales(value, idUser)
        .then(() => {
             
             updateEstoque(idUser, id , updateestoque)
                 console.log('atualizei')
                 window.alert('venda concluida')
                 console.log('cheguei aqui')
                window.location.reload();
           }) 
        }) 
   } 
 },
    
 listar() {
     let idUser = localStorage.getItem('id')
            getProducts(idUser).then(snapshot => {
                this.listProdutos = []
                snapshot.forEach(doc => {
                let objectProduct = {}
                    objectProduct = doc.data()
                    objectProduct.id = doc.id

                    ref(this.listProdutos.push(objectProduct)) 
                    
                })     
              
                localStorage.setItem("produtos", JSON.stringify(this.listProdutos))
  
            })
        /*     let envialista = [];
            envialista =  console.log (JSON.parse(localStorage.getItem("produtos"))) */
          
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
            
 },
 
 deleteProduct(){
    ref( this.sales.pop())
    console.log(this.sales)
 },

 },
 
}

</script>

<style>

h1 {
    position: relative;
    left: 200px;
    top: 70px;
    border:solid;
    
}
h3 { 
    
    border: 1px solid   #993399;;
    border-radius: 10px;
   
    border-radius: 15px;
}

.vt { 
   
    font-size: 20px;
    justify-content: center;
    
    text-align: center;
    
}
tbody {
   width:100%;
   margin: 0;
   
}

td {
    /** Faz o estilo para as células do cabeçalho. **/
   
   font-size: 14px;
   background: #fbf7fb;
   width: 10%; 
   overflow:auto;
   text-align:center;
   justify-content: center;
   
   
   /** Muda para um fundo cinza. **/
    /** Troca a cor da fonte para branco. **/

}

.new-product {
    
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    
    flex-direction: column !important;
    padding-top: 16px!important;
    height: 34vh !important;
    

   
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    border: 1px solid   #993399;
}



.add_product {
    
    
    width: 100% !important;
    height: 60%!important;
   
}

.new-product input  {
    width: 90%;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
    
}

.new-product button {
    background: #993399;
    color: white;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    
  

    font-family: 'Poppins', sans-serif;
    text-shadow: none;

    border: none;
    cursor: pointer;
}
.btn-delete  {
  margin-left: 150px;
  background-color: #993399!important;
  
  border-radius: 10px;
  width: 130px;
  left: 0px;
  top: 30px;
  text-align: center;
  color: white;
  cursor: pointer;
}
 .pointer {
    cursor: pointer;
    color: white;
    
   
}
.container-vt {
    border-radius:20px;
    display: flex;
    flex-direction: column;
    align-items: center!important;
   
    height: 65vh!important;
    width: 100%;
     border: 1px solid   #993399; 
    
    text-align: center;
    ;
   box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}
#subtotal {
   
  
    display:flex;
    width: 20vh;
}
#trocotela{
  
  bottom: -100px;
  left: -120px;
  
  
  
}
.container-vt select {
    width: 200px;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
    
    
}
 .container-vt button {
    background: #993399;
    color: white;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    
    bottom: -95px;
    right: 40px;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
  
    border: none;
    cursor: pointer;
    
}
#trococashier {
    background: #993399;
    color: white;
    width: 70px;
    height: 30px;
    border-radius: 10px;
  
    bottom: -16px;
    right: -226px;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
 
    border: none;
    cursor: pointer;
}
#titulotroco { 
  
}
.container-vt input  {
    width: 200px;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
   
   
    
}

.sales { 
   
    text-align: center;
    margin-top: 16px!important;
    border-radius: 30px;
    overflow: auto!important;
   
    height: 300px!important;
    justify-content: center;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
   
}
</style>