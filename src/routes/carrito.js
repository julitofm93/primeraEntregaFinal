import express from 'express'
import {carritos} from '../daos/index.js'   
const router = express.Router();

//POST - Crea un carrito (Mongo/FileSystem)
router.post('/',(req,res)=>{
    let cart = {productos:[]}
    let newDate = new Date()
    cart.timestamp = newDate.toLocaleString()
     carritos.saveCart(cart).then(result=>{
        res.send(result);
    })
})
//POST - Crea un carrito (Firebase)
router.post('/',(req,res)=>{
    let cart = {productos:[]}
    carritos.save(cart).then(result=>{
        res.send(result);
    })
})

//GET - Devuelve todos los carritos
router.get('/', (req, res) => {
    carritos.getAll().then(result =>{
        res.send(result.payload)
    })
})

//GET - Devuelve un carrito segun su ID
router.get('/:cid',(req,res)=>{
    let id = req.params.cid;
    id = parseInt(id)
    carritos.getById(id).then(result=>{
        res.send(result.payload);
    })
})

//GET - Devuelve los productos de un carrito según su ID
router.get('/:cid/productos', (req, res) => {
    let id = parseInt(req.params.cid)
    carritos.getProductsByCartId(id)
    .then(result => res.send(result))
})

//DELETE - Elimina un carrito según su ID
router.delete('/:cid', (req,res)=>{
    let id = parseInt(req.params.cid);
    carritos.deleteById(id).then(result=>{
        res.send(result);
    })
})

//DELETE - Elimina un producto de un carrito
router.delete('/:cid/productos/:pid', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let prodId = parseInt(req.params.pid)
    carritos.deleteProduct(cartId, prodId)
    .then(result => res.send(result))
})


export default router;