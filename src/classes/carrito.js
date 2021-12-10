import fs from 'fs'
import Productos from '../classes/productos.js'
import __dirname from '../utils.js';
const cartURL = __dirname+'/files/carritos.txt'
const prodURL = __dirname+'/files/productos.txt'

class Carritos {
//CREAR CARRITO
    async save (cart) {
        try{
            let data = await fs.promises.readFile(cartURL, 'utf-8');
            let carts = JSON.parse(data);
            let arrayProductos = []
            let id = carts[carts.length-1].id+1;
            cart = Object.assign({id:id, productos:arrayProductos},cart)
            carts.push(cart)
            try{
                await fs.promises.writeFile(cartURL,JSON.stringify(carts,null,2));
                return {status:"success", cartId:cart.id, message:"Carrito creado con exito"};
            }catch{
                return {status:"error", message:"No se pudo crear el carrito"}
            }
            }catch{
                cart = Object.assign({id:1, productos:[]},cart)
                try{
                    await fs.promises.writeFile(cartURL,JSON.stringify([cart], null, 2));
                    return {status:"success", cartId:cart.id, message:"Carrito creado con exito"}
                }
                catch{
                    return {status:"error", message:"No se pudo crear el carrito"}
                }
        }
    }
//BORRAR CARRITO
    async deleteById(id){
        try{
            let data =  await fs.promises.readFile(cartURL,'utf-8')
            let events = JSON.parse(data);
            if(!events.some(event=>event.id===id)) return {status:"error", message:"No hay carritos con el id especificado"}
            let event = events.find(v=>v.id===id);
            let aux = events.filter(event=>event.id!==id);
            try{
                await fs.promises.writeFile(cartURL,JSON.stringify(aux,null,2));
                return {status:"success",message:"Carrito eliminado"}
            }catch{
                return {status:"error", message:"No se pudo eliminar el carrito"}
            }
        }catch{
            return {status:"error",message:"Falló al eliminar el producto"}
        }
    }

//OBTENER LOS PRODUCTOS DE UN CARRITO
    async getProductsByCartId(idNumber){
        try{
            let data = await fs.promises.readFile(cartURL, 'utf-8')
            let carts = JSON.parse(data)
            let cartIndex = carts.findIndex(cart => cart.id === idNumber)
            let productsInCart = carts[cartIndex].productos
            if(productsInCart){
                return productsInCart
            }else{
                console.log(null)
                return null
            }
        }
        catch(err){
            console.log(err)
        }
    }

//AGREGAR PRODUCTOS A UN CARRITO
async addProduct(idNumber, productId){
    try{
        let data = await fs.promises.readFile(cartURL, 'utf-8')
        let carts = JSON.parse(data)
        let cartIndex = carts.findIndex(cart => cart.id === idNumber)
        let cart = carts.find(cart => cart.id === idNumber)

        let dataProducts = await fs.promises.readFile(prodURL, 'utf-8')
        let allProducts = JSON.parse(dataProducts)
        let productToAdd = allProducts.find(prod => prod.id === productId)
        
        cart.productos.push(productToAdd)
        carts.splice(cartIndex, 1, cart)

        try{
            await fs.promises.writeFile(cartURL,JSON.stringify(carts,null,2))
            return {status:"success", message:`Product ${productId} added to Cart ${idNumber}`}
        }
        catch(err){
            return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
        }
    }
    catch(err){
        return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
    }
}

//BORRAR UN PRODUCTO DE UN CARRITO
async deleteProduct(idNumber, productId){
    try{
        let data = await fs.promises.readFile(cartURL, 'utf-8')
        let carts = JSON.parse(data)
        let cart = carts.find(cart => cart.id === idNumber)
        let cartIndex = carts.findIndex(cart => cart.id === idNumber)
        
        let productIndex = cart.productos.findIndex(prod => prod.id === productId)
        //let deletedProduct = productsinCart.find(prod => prod.id === productId)
        
        if(productIndex > -1){
            cart.productos.splice(productIndex, 1)
            carts.splice(cartIndex, 1, cart)
            try{
                await fs.promises.writeFile(cartURL, JSON.stringify(carts, null, 2))
                console.log(`product deleted at cart ${cart.id}`)
                return {status:"success",message:`product deleted at cart ${cart.id}`}
            }
            catch(err){
                console.log(err)
                return {status:"error",message:err}
            }
        }
    }
    catch(err){
        return {status:"error",message:err}
    }
}
}


export default Carritos;