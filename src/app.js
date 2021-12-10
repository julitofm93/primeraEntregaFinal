//DEPENDENCIAS
import express from 'express';
import cors from 'cors'
import Productos from './classes/productos.js'
import productosRouter from './routes/productos.js'
import carritosRouter from './routes/carrito.js'
import upload from './services/upload.js'
import Carritos from './classes/carrito.js';
import __dirname from './utils.js';
const app = express();


//CONFIGURO EL SERVIDOR
const server = app.listen(8080,()=>{
    console.log("server listening on port 8080")
})


const productos = new Productos();
const carritos = new Carritos()


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.static(__dirname+'public'))
app.use('/api/productos',productosRouter);
app.use('/api/carritos',carritosRouter)

const admin = true;

app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url)
    req.auth = admin
    next()
})


app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const file = req.file;
    if(!file||file.length===0){
        res.status(500).send({message:"No se subio ningun archivo"})
    }
    res.send(file);
})

