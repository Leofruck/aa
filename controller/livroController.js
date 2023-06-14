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
    cadastroLivros.remover(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function buscarAutorDoLivro(req, res) {
  const id = req.params.id;

  try {
    const autor = cadastroLivros.buscarAutorDoLivro(id);
    res.json(autor);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

module.exports = {
  listarLivros,
  buscarLivroPorId,
  inserirLivro,
  atualizarLivro,
  deletarLivro,
  buscarAutorDoLivro
};