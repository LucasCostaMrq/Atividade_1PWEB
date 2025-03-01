const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');

// Exibir o formulário
router.get('/', (req, res) => {
  res.render('adicionarProdutos');
});

// Processar o formulário e salvar no MongoDB
router.post('/adicionar', async (req, res) => {
  try {
    const { nome, preco, descricao, estoque, categoria, imagem } = req.body;

    const novoProduto = new Produto({
      nome,
      preco,
      descricao,
      estoque,
      categoria,
      imagem, // Apenas armazenamos a URL da imagem
    });

    await novoProduto.save();
    res.redirect('/produtos'); // Redireciona para a página de produtos
  } catch (error) {
    res.status(500).send('Erro ao adicionar produto: ' + error.message);
  }
});

module.exports = router;
