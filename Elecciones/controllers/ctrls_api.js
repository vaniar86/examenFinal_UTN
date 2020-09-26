const Votante = require('../model/votante');
const Candidato =  require('../model/candidatos');

exports.checkVotante = (req, res, next) => {
    var permitir_votar=true;
    Votante.findOne({dni : req.params.dni}, (err, existe) => {
        if(err){res.status(404).send("Error al recuperar el dato");}
        if(existe){
                permitir_votar=false;
                res.status(200).send(permitir_votar);
                console.log('ya voto')
        } if(!existe){
            res.status(200).send(permitir_votar);
            console.log('no existe')           
        }
    
    })
}

exports.checkVoto= (req, res, next) =>{
    var yaVoto = true;
    Votante.findOne({dni : req.params.dni}, (err, existe) => {
        if(err|| !existe){res.status(404).send("Error al recuperar el dato");}
        if(existe){
            if(existe.voted == true){
                res.status(200).send(yaVoto);
            }else{
                yaVoto=false;
                res.status(200).send(yaVoto);
            }
        }
    });
} 

exports.votar = (req, res, next) =>{
    let id= req.params.id
    Votante.findOneAndUpdate({dni:req.params.dni},{$set:{voted: true}},{new:true},function(err, resp){
      console.log(resp)
      if(err || !resp){res.status(400).send('error al guardar el voto')}
      if(resp){
        Candidato.findByIdAndUpdate(id, {$inc :{votos: 1}, new:true}, function(err, resp){
          console.log(resp)
          if(err || !resp){res.status(400).send('error al votar')}
          else{ res.status(200).send(resp)}        
        })
      }
    })
  }
