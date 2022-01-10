//DEPENDENCIAS
import express from 'express';
import cors from 'cors'
import productosRouter from './routes/productos.js'
import carritosRouter from './routes/carrito.js'
import upload from './services/upload.js'
import {carritos} from './daos/index.js';
import __dirname from './utils.js';
const app = express();


//CONFIGURO EL SERVIDOR
const server = app.listen(8080,()=>{
    console.log("server listening on port 8080")
})


const admin = true;

app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url)
    req.auth = admin
    next()
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.static(__dirname+'public'))
app.use('/api/productos',productosRouter);
app.use('/api/carritos',carritosRouter)



app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const file = req.file;
    if(!file||file.length===0){
        res.status(500).send({message:"No se subio ningun archivo"})
    }
    res.send(file);
})

//POST - Agrega un producto a un carrito
app.post('/api/addProd', (req, res) => {
    let cartId = req.body.cid;
    let prodId = req.body.pid;
    carritos.addProducto(cartId,prodId).then(result =>{
        res.send(result);   
    })
})

