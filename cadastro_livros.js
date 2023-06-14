let listaLivros = [];
let idAutoIncrement = 1;

function listar() {
    return listaLivros;
}

function inserir(livro) {
    if(livro && livro.isbn && livro.nome && livro.autor && livro.editora && livro.ano){
        livro.id = idAutoIncrement++;
        listaLivros.push(livro);
        return livro;
    }
    else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estão invalidos"
        });
    }
}

function buscarPorId(id) {
    for(let livro of listaLivros){ 
        if(livro.id == id){
            return livro;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Livro não encontrado."
    });
}

function atualizar(id, livroAlterar) {
    if(!livroAlterar || !livroAlterar.nome || !livroAlterar.preco){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estão invalidos"
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
        msg: "Erro: Livro não encontrado."
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
        msg: "Erro: Livro não encontrado."
    });

}

function retirarLivro(clienteId, livroId) {
    const cliente = buscarPorId(clienteId);
    const livro = buscarPorId(livroId);

    if (!cliente) {
        throw ({
            numero: 404,
            msg: "Erro: Cliente não encontrado."
        });
    }

    if (!livro) {
        throw ({
            numero: 404,
            msg: "Erro: Livro não encontrado."
        });
    }

    if (!livro.disponivel) {
        throw ({
            numero: 400,
            msg: "Erro: Livro indisponível para retirada."
        });
    }

    if (cliente.livrosRetirados.length >= 3) {
        throw ({
            numero: 400,
            msg: "Erro: O cliente atingiu o limite máximo de livros retirados."
        });
    }

    livro.disponivel = false; // Define o livro como indisponível para retirada
    const dataEntrega = calcularDataEntrega();
    const retirada = {
        livroId: livro.id,
        dataRetirada: new Date(),
        dataEntrega: dataEntrega
    };
    cliente.livrosRetirados.push(retirada);

    return {
        cliente: cliente,
        livro: livro,
        dataEntrega: dataEntrega
    };
}

function calcularDataEntrega() {
    const dataAtual = new Date();
    const prazoEntrega = 7; // Prazo de entrega em dias
    const dataEntrega = new Date(dataAtual.getTime() + prazoEntrega * 24 * 60 * 60 * 1000);
    return dataEntrega;
}

function devolverLivro(clienteId, livroId) {
    const cliente = buscarPorId(clienteId);
    const livro = buscarPorId(livroId);

    if (!cliente) {
        throw ({
            numero: 404,
            msg: "Erro: Cliente não encontrado."
        });
    }

    if (!livro) {
        throw ({
            numero: 404,
            msg: "Erro: Livro não encontrado."
        });
    }

    const livroRetirado = cliente.livrosRetirados.find(retirada => retirada.livroId === livro.id);

    if (!livroRetirado) {
        throw ({
            numero: 400,
            msg: "Erro: O livro não foi retirado pelo cliente."
        });
    }

    const dataAtual = new Date();
    const dataEntrega = new Date(livroRetirado.dataEntrega);
    const atraso = Math.max(0, dataAtual - dataEntrega); 
    const diasAtraso = Math.ceil(atraso / (24 * 60 * 60 * 1000)); 

    livro.disponivel = true; 

    cliente.livrosRetirados = cliente.livrosRetirados.filter(retirada => retirada.livroId !== livro.id); 

    return {
        cliente: cliente,
        livro: livro,
        atraso: diasAtraso
    };
}


function buscarLivrosDisponiveis() {
    return listaLivros.filter(livro => livro.disponivel);
}

function buscarLivrosPorAutor(autor) {
    return listaLivros.filter(livro => livro.autor.toLowerCase() === autor.toLowerCase());
}

function buscarLivrosPorNome(nome) {
    return listaLivros.filter(livro => livro.nome.toLowerCase().includes(nome.toLowerCase()));
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    retirarLivro,
    devolverLivro,
    buscarLivrosDisponiveis,
    buscarLivrosPorAutor,
    buscarLivrosPorNome
};

