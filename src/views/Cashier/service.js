
import { db } from '../../config/firebase'



const createSales = (sales , idUser) => {
    return db.collection('users').doc(idUser).collection('SalesUsers').add(sales)
} 

const updateEstoque = async (idUser, id , updateestoque) => {
 

     return await db.collection('users').doc(idUser).collection('productsUsers').doc(id).update({amount: updateestoque})
 }

const getSales = async (idUser) => {
    
    return await  db.collection('users').doc(idUser).collection('SalesUsers').get()
}

const deleteSalesapi = async (idUser , id) => {
    
    return await  db.collection('users').doc(idUser).collection('SalesUsers').doc(id).delete()
 }
 
export {
    createSales,
    getSales,
    deleteSalesapi,
    updateEstoque

}