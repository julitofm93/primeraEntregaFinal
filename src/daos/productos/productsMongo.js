import Schema from "mongoose";
import MongoContainer from "../../contenedores/MongoContainer.js";

export default class ProductsMongo extends MongoContainer{
    constructor(){
        super(
            'productos',
            {
                nombre:{type:String},
                descripcion:{type:String},
                 codigo:{type:Number,required:true},
                precio:{type:Number,required:true},
                stock:{type:Number,required:true},
                thumbnail:{type:String},
                carrito:{
                    type:Schema.Types.ObjectId,
                    ref:'carritos',
                    default:null
                }
            },{timestamps:true}
        )
    }
}