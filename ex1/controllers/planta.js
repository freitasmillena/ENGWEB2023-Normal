var Planta = require('../models/planta')


// Lista de plantas
module.exports.list = () => {
    return Planta
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getRegisto = id => {
    return Planta.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getEspecies = e => {
    return Planta.find({"Espécie": e})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getImplant = e => {
    return Planta.find({"Implantação": e})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getFreguesias = () => {
    return Planta.distinct("Freguesia").sort()
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getEspeciesList = () => {
    return Planta.distinct("Espécie").sort()
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.addRegisto = c => {
    
    return Planta.find({}, {_id: 1})
        .then(qtd => {
        
            //ordenar
            qtd.sort((a, b) => b._id - a._id);
            
            var next = qtd[0]._id + 1
            
            c._id = next
    
            return Planta.create(c)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
        })
        .catch(erro => {
            return erro
        })
}


module.exports.deleteRegisto = id => {
    return Planta.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
