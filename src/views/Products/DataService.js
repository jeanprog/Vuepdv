
import { db } from '../../config/firebase'
import firebase from 'firebase/compat/app'


const createCategory = (category, idUser) => {
    return db.collection('users').doc(idUser).collection('productsUsers').add(category)
} 

const createProduct = (products, idUser) => {
    return  db.collection('users').doc(idUser).collection('productsUsers').add(products)
} 

const getProducts = async (idUser) => {
    return await db.collection('users').doc(idUser).collection('productsUsers').get() //db.collection('products').get()
}
const editgetProducts = async (idUser , id) => {
    return await db.collection('users').doc(idUser).collection('productsUsers').doc(id).get()
}
const updateProducts = async ( idUser ,id , product) => {
    
  return await   db.collection('users').doc(idUser).collection('productsUsers').doc(id).set(product)
}
const deleteProducts = async (idUser , id ) => {
    
   return await  db.collection('users').doc(idUser).collection('productsUsers').doc(id).delete()
}

export {
    createProduct,
    getProducts,
    updateProducts,
    editgetProducts,
    deleteProducts,
    createCategory
}