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
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Pagamento</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sale in sales" :key="sale.product_id">
                        <td>{{ sale.product_name }}</td>
                       <td>
                            R$
                            {{ parseInt(sale.prince_sale) }}
                        </td>
                        <td>{{ sale.payment }}</td>
                        <td>{{ sale.amount }}</td>
                    </tr>
                </tbody>
            </table><br>
            
             
            
        </section>
    </div>
    <div class="container-vt">
           <span style="font-weight:bold">  Subtotal: R$
              {{this.valortotal}} 
           </span>
                 <button @click="sell()">Realizar venda</button>
    </div>
    <div class="totalCashier">
    <span style="font-weight:bold">Total Caixa 
    <br>
    R$ {{xCashier}}  
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
            id: '',
            productselected: '',
            payment: '',
            prince: '',
            amount: '',
          
        }
    },
    
    created() {
            this.listar(),
            this.listarsales()
            
       
    },
    
    
    
    
    methods: {
        
        addProduct() {
            
            let prince = parseInt(this.amount) * parseInt(this.listProdutos.find(y => y.name === this.productselected, ).prince)
              this.valortotal += prince
             console.log(this.valortotal)
            
            ref( 
                this.sales.push({
                    payment: this.payment,
                    product_name: this.productselected,
                    product_id: this.listProdutos.find(
                        x => x.name === this.productselected,
                    ).id,
                    amount: this.amount,
                    prince_sale: prince
                     
                    
                    
                   
                    
               
                }), 
                
            )
             console.log(this.amount)
             
            
            this.payment = ''
            this.productselected = ''
            this.amount = ''
            this.prince = ''
            this.total = ''
        },
       
          sell() {
        this.sales.forEach((value , index) => {
            
            db.collection('sales').add(value)
            //cresateSales(value)
        })
         
        
              //     createsales({
                
       //     }).then(() => {
         //       console.log('salvei')
          //      this.name = ''
            //    this.description = ''
              //  this.prince = ''
             //   this.amount = ''
              //  this.$router.push({ name: 'list' });
           // }) 
        //},
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
            }).then(() => {
              this.xCashier = this.totalSales.reduce((total , item) => item.prince_sale + total , 0)
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
    
    background: #F1F5FA;
    bottom: 900px;
    border-radius: 10px;
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
    
    background: #F1F5FA;
    bottom: 1007px;
    border-radius: 10px;
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
    text-align: center;
    
    background: #F1F5FA;
    bottom: 1000px;
    border-radius: 10px;
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
    
    background: #F1F5FA;
    bottom: 1100px;
    border-radius: 10px;
}
.totalCashierdebito span{
    
    position: relative;
    top: 30px;
}
h1 {
    position: relative;
    left: 200px;
    top: 70px;
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

td {
    /** Faz o estilo para as células do cabeçalho. **/
   
   font-size: 14px;
   background: #F1F5FA;
   width: 90%; 
   overflow:auto;
   
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
    background: #F1F5FA;
    height: 300px;
    width: 25%;
    left: 600px;
    bottom: 130px;
    border-radius: 10px;
}
.new-product input , select {
    width: 200px;
    border: 1px solid rgb(200, 200, 200);
    outline: 0;
    font-size: 15px;
    padding: 7px;
    border-radius: 10px;
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
    border-radius:10px;
    position: relative;
    bottom: 420px;
    height: 200px;
    width: 25%;
    background: #F1F5FA; 
    left: 855px;
    text-align: center;
    margin-top: 60px;
}
.container-vt span{
  position:relative;
  bottom: -40px;
  left: 90px;
}
 .container-vt button {
    background: #993399;
    color: white;
    width: 200px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    bottom: -100px;
    right: 60px;
    font-family: 'Poppins', sans-serif;
    text-shadow: none;

    border: none;
    cursor: pointer;
}
.sales { 
    position: relative!important;
    text-align: center;
    left: 360px;
    bottom: 140px;
    
    width: 30%;
    height: 300px!important;
    justify-content: center;
   
}
</style>
