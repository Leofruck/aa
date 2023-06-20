
const express = require('express');
const livroController = require('../controller/livroController');
const autorController = require('../controller/autorController');

const router = express.Router();


router.get('/', livroController.listarLivros);
router.get('/:id', livroController.buscarLivroPorId);
router.post('/', livroController.inserirLivro);
router.put('/:id', livroController.atualizarLivro);
router.delete('/:id', livroController.deletarLivro);
router.put('/:id/retirar/:clienteId', livroController.retirarLivro);
router.put('/:id/devolver/:clienteId', livroController.devolverLivro);


router.get('/autor/:autor', livroController.buscarLivrosPorAutor);
router.get('/nome/:nome', livroController.buscarLivrosPorNome);
router.get('/disponiveis/listar', livroController.buscarLivrosDisponiveis);
router.post('/:id/autor', autorController.associarAutorAoLivro);
router.delete('/:id/autor', autorController.desassociarAutorDoLivro);

module.exports = router;
