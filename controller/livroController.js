const cadastroLivros = require('../cadastro_livros');

function listarLivros(req, res) {
  const listaLivros = cadastroLivros.listar();
  res.json(listaLivros);
}

function buscarLivroPorId(req, res) {
  const id = req.params.id;

  try {
    const livro = cadastroLivros.buscarPorId(id);
    res.json(livro);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function inserirLivro(req, res) {
  const livro = req.body;

  try {
    const livroInserido = cadastroLivros.inserir(livro);
    res.status(201).json(livroInserido);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function atualizarLivro(req, res) {
  const id = req.params.id;
  const livroAtualizado = req.body;

  try {
    const livro = cadastroLivros.atualizar(id, livroAtualizado);
    res.json(livro);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function deletarLivro(req, res) {
  const id = req.params.id;

  try {
    cadastroLivros.deletar(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function buscarLivrosPorAutor(req, res) {
  const autor = req.params.autor;
  const livrosEncontrados = cadastroLivros.buscarLivrosPorAutor(autor);
  res.json(livrosEncontrados);
}

function buscarLivrosPorNome(req, res) {
  const nome = req.params.nome;
  const livrosEncontrados = cadastroLivros.buscarLivrosPorNome(nome);
  res.json(livrosEncontrados);
}

function buscarLivrosDisponiveis(req, res) {  
  const livrosEncontrados = cadastroLivros.buscarLivrosDisponiveis();
  res.json(livrosEncontrados);
}


function retirarLivro(req, res) {
 const id = req.params.id;
 const clienteId = req.params.id;
 const livroRetirada = cadastroLivros.retirarLivro(id,clienteId)
 res.json(livroRetirada)

}

function devolverLivro(req, res) {   // refazeeeerrrr
  const id = req.params.id;
  const clienteId = req.params.id;
  const livroRetirada = cadastroLivros.devolverLivro(id,clienteId)
  res.json(livroRetirada)
 
 }



module.exports = {
  listarLivros,
  buscarLivroPorId,
  inserirLivro,
  atualizarLivro,
  deletarLivro,
  devolverLivro,
  buscarLivrosPorAutor,
  buscarLivrosPorNome,
  buscarLivrosDisponiveis,
  retirarLivro
};
