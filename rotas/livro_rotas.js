
const express = require('express');
const livroController = require('../controller/livroController');
const autorController = require('../controller/autorController');

const router = express.Router();


router.get('/', livroController.listarLivros);
router.get('/:id', livroController.buscarLivroPorId);
router.post('/', livroController.inserirLivro);
router.put('/:id', livroController.atualizarLivro);
router.delete('/:id', livroController.deletarLivro);


router.get('/:id/autor', livroController.buscarAutorDoLivro);
router.post('/:id/autor', autorController.associarAutorAoLivro);
router.delete('/:id/autor', autorController.desassociarAutorDoLivro);

module.exports = router;