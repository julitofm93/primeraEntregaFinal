import express from 'express'
import Productos from '../classes/productos.js';
import upload from '../services/upload.js'
import { authMiddleware } from '../utils.js'
const router = express.Router();
const productos = new Productos();


//GET - Devuelve todos los productos
router.get('/',(req,res)=>{
    productos.getAll().then(result=>{
        res.send(result.payload)
    })
})

//GET - Devuelve un producto según su ID
router.get('/:pid',(req,res)=>{
    let id = req.params.pid;
    id = parseInt(id)
    productos.getById(id).then(result=>{
        res.send(result);
    })
})

//POST - Recibe y agrega un producto, y lo devuelve con su ID asignado
router.post('/', /* authMiddleware, */ upload.single('image'),(req,res)=>{
    let file = req.file;
    let event = req.body;
    let newDate = new Date()
    event.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    event.timestamp = newDate.toLocaleString()
    productos.save(event).then(result=>{
        res.send(result);
        })
})

//PUT - Recibe y actualiza un producto según si ID
router.put('/:pid',/* authMiddleware, */(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid)
    productos.updateProducto(id,body).then(result=>{
        res.send(result)
    })
})

//DELETE - Elimina un producto según su ID
router.delete('/:pid', /* authMiddleware, */(req,res)=>{
    let id = parseInt(req.params.pid);
    productos.deleteById(id).then(result=>{
        res.send(result);
    })
})

export default router;