
let listaLivros = [];
let idAutoIncrement = 1;

function listar() {
    return listaLivros;
}

function inserir(autor) {
    if(autor && autor.nome && autor.paisOrigem){
        autor.id = idAutoIncrement++;
        listaLivros.push(autor);
        return autor;
    }
    else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros de autor estao invalidos"
        });
    }
}

function buscarPorId(id) {
    for(let autor of listaLivros){ 
        if(autor.id == id){
            return autor;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor nao encontrado."
    });
}

function atualizar(id, livroAlterar) {
    if(!livroAlterar || !livroAlterar.nome || !livroAlterar.preco){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do Autor estao invalidos"
        });       
    }
    for(let indice in listaLivros){
        if(listaLivros[indice].id == id) {
            livroAlterar.id = parseInt(id);
            listaLivros[indice] = livroAlterar;
            return listaLivros[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    });
}

function deletar(id) {
    for(let indice in listaLivros){
        if(listaLivros[indice].id == id) {
            const livroDeletado = listaLivros.splice(indice,1);
            return livroDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor nao encontrado."
    });

}

module.exports = { 
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}