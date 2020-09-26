const Votante = require('../model/votante');


exports.votante_ingreso = (req, res) => {res.render ('ingresar', {title: "Ingreso de Votantes"});}

exports.verificar= (req, res, next) =>{
   Votante.findOne({dni : req.params.dni}, (err, docs ) => {
        if(docs.voted == true){
            console.log(docs.voted)
            return res.render('votar', {title: "Ingreso de Votantes", data: { error: "Su voto ya fue registrado"}});
        }
        if(err){return next(err)}

        return next() 
    }) 
}

exports.create_votante = (req, res, next) => {
    console.log(req.body);
    var votante = new Votante(req.body);
    var dni= req.body.dni 
    var newVotante= false;     
        votante.save((err,resp) => {
            console.log(resp)
            if(err || !resp){            
             res.status(404).send(newVotante);
             }
             if(resp){
                 newVotante=true;
                 res.status(200).send(newVotante)
             }
        });        
    }

exports.modificarVotante= (req, res, next) => {
  var dni= req.params.dni
  console.log(votante)
  Votante.findOneAndUpdate( dni ,{$set:{voted: true}}, (err, VotoEstablecido) =>{
      console.log(VotoEstablecido);
      if(err){res.status(400).send('error al registrar el voto')}
      if(VotoEstablecido){return next()}      
  })
}

