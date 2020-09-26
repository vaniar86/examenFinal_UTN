const mongoose = require('mongoose');

const candidatosSchema = new mongoose.Schema({
    id_candidato: {type:String},
    candidato:{type: String},
    partido:{type: String},
    votos:{type:Number, default: 0},
    imagen:{type: String}
});

const Candidatos = mongoose.model ("Candidatos", candidatosSchema);

module.exports = Candidatos