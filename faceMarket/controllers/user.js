var User = require('../../models/user')

module.exports.consultar = uid => {
    return User
        .findOne({_id: uid})
        .exec()
}

module.exports.inserir = user => {
    return User.create(user)
}

module.exports.alteraDescricao = (id, texto) => {
    return User.findOne({email: id}, function(err, user){            
                if(user){
                    user.descricao = texto
                    user.save(function(erro) {
                        if (erro) console.log('Erro no update do user: ' + erro);
                    });
                }else{
                    console.log(err);
                }
            })
            .exec();
}