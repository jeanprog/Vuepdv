<template>
    <div>
        <section class="add_product">
           
            <form className="new-product" @submit.prevent="addProduct()">
                <label for="form-user-name">Escolha o produto</label>
                <input v-model="productselected" type="text" list="listin" />
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
                />
                <button type="submit">Adicionar Produto</button>
            </form>
        </section>
        <section class="sales">
         <h3>Bem vindo ao caixa do dia {{this.date}}</h3>
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
    </div>
    <div class="container-vt">
                <label for="form-user-description">tipo de pagamento</label>
                <select
                    id="form-user-description"
                    v-model="payment"
                    type="text"
                    placeholder=""
                > 
                <option>dinheiro</option>
                <option>debito</option>
                <option>credito</option>
                <option>pix</option>
                </select>
                
           <span id = "subtotal" style="font-weight:bold">  Subtotal: R$
              {{parseFloat(this.valortotal)}} 
           </span>
           <label for="form-user-description" id="titulotroco">Dinheiro entrada</label>
           <input v-model="troco" type="number" class ="Inputtroco">
           <span style="font-weight:bold" id="trocotela">  Troco: R$
              {{this.trococalc }} 
           </span>
              <button id ="trococashier" @click="calcTroco()">calcular</button>
                 <button @click="sell()">Realizar venda</button>
    </div>
    <div class="totalCashier">
    <span style="font-weight:bold">Total Caixa 
    <br>
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

 
    
</template>

// @ is an alias to /src
<script>
import { ref } from 'vue'
import { getProducts } from '../Products/DataService'
import { db } from '../../config/firebase'
import { createSales } from './service'
import {getSales} from './service'
import SalesDin from './SalesDin.vue'
import salesCredito from './salesCredito.vue'
import Salesdebito from './Salesdebito.vue'
export default {
    name: 'ListProducts',
    components: {SalesDin,
    salesCredito,
    Salesdebito
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
            
          
        }
    },
    
    created() {
            this.listar(),
            this.listarsales()
            
       
    },
    
    
    
    
    methods: {
        
        addProduct() {
            
             let sub = parseInt(this.listProdutos.find(x => x.name === this.productselected,).amount) - parseInt(this.amount)
             console.log(sub)
            if (sub < 0) {
                window.alert('quantidade ' + this.productselected +' indisponivel no estoque')
                return 
            }
            
            let prince = parseFloat(this.amount) * parseFloat(this.listProdutos.find(y => y.name === this.productselected, ).prince)
              this.valortotal += prince
             console.log(parseFloat(this.valortotal).toFixed(2))
          

            
            ref( 
                this.sales.push({
                    payment: "",
                    product_name: this.productselected,
                    product_id: this.listProdutos.find(
                        x => x.name === this.productselected,
                    ).id,
                    amount: this.amount,
                    prince_sale: prince,
                    update_estoque: sub,
                    date: new Date().toLocaleDateString()
                    
               
                }),  console.log(this.sales)
                
            )
             
             
            
            
            this.productselected = ''
            this.amount = ''
            this.prince = ''
            this.total = ''
        },
        calcTroco() {
            console.log(parseFloat(this.troco) - this.valortotal )
            let calc = parseFloat(this.troco) - this.valortotal 
            this.trococalc += calc
        },
       
          sell() {
             let payment = this.payment
           console.log(payment)
        const salesfinish = this.sales.map(object => {
        return {...object, payment: payment};
        });
         
          console.log(salesfinish)
         
        salesfinish.forEach((value , index) => {   // foreach propriedade do array, nao funciona com o then, recomendado para funções assincronas ou muitos demoradas
            
           db.collection('sales').add(value).then(() => {
          db.collection('products').doc(value.product_id).update({amount: value.update_estoque})
           console.log('atualizei')
            window.alert('venda concluida')
           window.location.reload();
         })
        }) 

  },
    
        listar() {
            getProducts().then(snapshot => {
                this.listProdutos = []
                snapshot.forEach(doc => {
                    let objectProduct = {}
                    objectProduct = doc.data()
                    objectProduct.id = doc.id

                    ref(this.listProdutos.push(objectProduct))
                })
            })
        },
        listarsales() {
            getSales().then(snapshot => {
                this.totalSales = []
                snapshot.forEach(doc => {
                    console.log(doc)
                    let objectsales = {}
                    objectsales = doc.data()
                    objectsales.id = doc.id

                    ref(this.totalSales.push(objectsales))
                })
                let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();
        let yyyy = today.getFullYear();
        console.log(today)
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
                  console.log(this.totalSales)
                
                
            })
            
        },

        updateProductamount(id) {
            db.collection('products')
                .doc(id)
                .update({ amount: 'agoraatualizei' })
                .then(() => {
                    console.log('atualizei')
                })
        },
    },
    
}
</script>
<style>
.totalCashier {
    
    position: relative;
    width: 12%;
    height: 16vh;
    left: 600px;
    text-align: center;
     box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    background: #fbf7fb;
    bottom: 880px;
    border-radius: 20px;
}
.totalCashier span{
    
    position: relative;
    top: 30px;
}
.totalCashierdin {
    
    position: relative;
    width: 12%;
    height: 16vh;
    left: 400px;
    text-align: center;
     box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    background: #fbf7fb;
    bottom: 1100px;
    border-radius: 20px;
}
.totalCashierdin span{
    
    position: relative;
    top: 30px;
}
.totalCashiercredito {
    
    position: relative;
    width: 12%;
    height: 16vh;
    left: 400px;
    top: -1090px;
   
    text-align: center;
     box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    
    background: #fbf7fb;
    bottom: 1000px;
    border-radius: 20px;
}
.totalCashiercredito span{
    
    position: relative;
    top: 30px;
}
.totalCashierdebito {
    
    position: relative;
    width: 12%;
    height: 16vh;
    left: 600px;
    text-align: center;
     box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    background: #fbf7fb;
    bottom: 1310px;
    border-radius: 20px;
}
.totalCashierdebito span{
    
    position: relative;
    top: 30px;
}
h1 {
    position: relative;
    left: 200px;
    top: 70px;
    border:solid;
    
}
h3 { 
    
    border: 1px solid   #993399;;
    border-radius: 10px;
    width: 50vh;
    position:relative;
    left: 35px;
    top: 6px;
    padding: 3px;
    border-radius: 15px;
}

.vt { 
    left: 25px!important;
    font-size: 20px;
    justify-content: center;
    
    text-align: center;
    
}
tbody {
   width:100%;
   margin: 0;
   
}
thead { 
   justify-content: center;
   
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


.add_product {
    margin-top: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
    margin-left: 255px !important;
    width: 100% !important;
    
    top: 50px;
}

.new-product {
    position: relative !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-top: 150px !important;
    flex-direction: column !important;
    
    height: 250px;
    width: 25%;
    left: 600px;
    bottom: 130px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
     border: 1px solid   #993399;
}
.new-product input  {
    width: 200px;
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
    position: relative;
    top: 20px;

    font-family: 'Poppins', sans-serif;
    text-shadow: none;

    border: none;
    cursor: pointer;
}
.container-vt {
    border-radius:20px;
    position: relative;
    bottom: 400px;
    height: 320px;
    width: 25%;
     border: 1px solid   #993399; 
    left: 855px;
    text-align: center;
    margin-top: 60px;
   box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}
#subtotal {
    position: relative;
    top: 25px;
    left: 100px;
    display:flex;
    width: 20vh;
}
#trocotela{
  position:relative;
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
    position: relative;
    left: 0px;
    
}
 .container-vt button {
    background: #993399;
    color: white;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    bottom: -120px;
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
    position: relative;
    bottom: -16px;
    right: -226px;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;
 
    border: none;
    cursor: pointer;
}
#titulotroco { 
    position: relative;
    top:50px;
    right: 30px;
}
.container-vt input  {
    width: 200px;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 20px;
    position: relative;
    left: 20px; 
    top: 50px;
    
}

.sales { 
    position: relative!important;
    text-align: center;
    left: 360px;
    bottom: 140px;
    border-radius: 30px;
    overflow: auto!important;
    width: 30%;
    height: 300px!important;
    justify-content: center;
     box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
   
}
</style>
