const mongoose = require ('mongoose');

const votanteSchema = new mongoose.Schema(
    {
            nombre: {
                type: String,
                required: true,
                minlength: 3,
            },
            apellido:{
                type:String,
                minlength:5
            },
            dni:{
                type:Number,
                unique:true,
                required:true,
                minlength: 7
            },
            sexo:{
                type:String,
                genre:  ["masculino" , "femenino", "otro"],
                required: true
            },
            voted:{
                type:Boolean,
                default: false
            },
            createdOn:{
                type:Date,
                default:Date.now
            }            
    }
);

votanteSchema.statics.authenticate=(dni, callback) =>{
    Votante.findOne({dni : dni})
           .exec((err, data) => {
            if(err){
                return callback(err);
            }
             return callback(data);
           });
}
      
const Votante = mongoose.model("Votante", votanteSchema);

module.exports = Votante
