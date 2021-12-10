import express from 'express'
import Carritos from '../classes/carrito.js'
const router = express.Router();
const carritos = new Carritos();


//POST - Crea un carrito
router.post('/',(req,res)=>{
    let cart = req.body;
    let newDate = new Date()
    cart.timestamp = newDate.toLocaleString()
    carritos.save(cart).then(result=>{
        res.send(result);
        })
})

//DELETE - Elimina un carrito según su ID
router.delete('/:cid',(req,res)=>{
    let id = parseInt(req.params.cid);
    carritos.deleteById(id).then(result=>{
        res.send(result);
    })
}) 

//GET - Devuelve los productos de un carrito según su ID
router.get('/:cid/productos', (req, res) => {
    let id = parseInt(req.params.cid)
    carritos.getProductsByCartId(id)
    .then(result => res.send(result))
})

//POST - Agrega un producto a un carrito
router.post('/:cid/productos/:pid', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let prodId = parseInt(req.params.pid)
    carritos.addProduct(cartId, prodId)
    .then(result => res.send(result))
})

//DELETE - Elimina un producto de un carrito
router.delete('/:cid/productos/:pid', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let prodId = parseInt(req.params.pid)
    carritos.deleteProduct(cartId, prodId)
    .then(result => res.send(result))
})



export default router;