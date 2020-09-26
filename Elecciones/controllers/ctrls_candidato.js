const Candidatos = require('../model/candidatos');


exports.lista_candidatos= (req, res) => {
  var dni = req.params.dni
  Candidatos.find((err, candidatos) => {
    if(err){
      res.status(400).send(new Error("Error:" + err.message));
    }
    if(!candidatos){
      res.status(400).send(new Error("No hay Candidatos"));
    }
    res.render ('elegirCandidato', {title: "Elegir Candidato",   dni : dni,  candidatos: candidatos});
   
  });  
}

exports.resultado_candidatos = (req, res) =>{
  Candidatos.find((err, candidatos) => {
    if(err || !candidatos){res.status(400).send(new Error("Error:" + err.message))}
    res.render('resultado', {title: "Resultados de las Elecciones", candidatos})
  }).sort({votos: -1})
}

