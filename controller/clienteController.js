const cadastroCliente = require('../cadastro_cliente');

function listarCliente(req, res) {
  const listaCliente = cadastroCliente.listar();
  res.json(listaCliente);
}

function buscarClientePorId(req, res) {
  const id = req.params.id;

  try {
    const cliente = cadastroCliente.buscarPorId(id);
    res.json(cliente);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function inserirCliente(req, res) {
  const cliente = req.body;

  try {
    const clienteInserido = cadastroCliente.inserir(cliente);
    res.status(201).json(clienteInserido);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function atualizaCliente(req, res) {
  const id = req.params.id;
  const clienteAtualizado = req.body;

  try {
    const cliente = cadastroCliente.atualizar(id, clienteAtualizado);
    res.json(cliente);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function deletarCliente(req, res) {
  const id = req.params.id;

  try {
    cadastroCliente.deletar(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function associarClienteAoLivro(req, res) {
  const idLivro = req.params.id;
  const cliente = req.body;

  try {
    const livroComClienteAssociado = cadastroCliente.associarClienteAoLivro(idLivro, cliente);
    res.status(201).json(livroComClienteAssociado);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

function desassociarClienteDoLivro(req, res) {
  const idLivro = req.params.id;

  try {
    cadastroCliente.desassociarClienteDoLivro(idLivro);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.numero).json(err);
  }
}

module.exports = {
  listarCliente,
  buscarClientePorId,
  inserirCliente,
  atualizaCliente,
  deletarCliente,
  associarClienteAoLivro,
  desassociarClienteDoLivro
};
