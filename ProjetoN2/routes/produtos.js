var express = require('express');
var router = express.Router();
const Produto = require('../models/produtos'); // Importa o modelo de Produto

// 📌 Rota para listar todos os produtos (GET)
router.get('/', async function(req, res, next) {
  try {
    const produtos = await Produto.find(); // Busca todos os produtos no banco
    res.render('produtos', { produtos }); // Renderiza a view passando os produtos
  } catch (error) {
    res.status(500).send('Erro ao buscar produtos');
  }
});

// 📌 Criar um novo produto (POST)
router.post('/', async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
});

// 📌 Buscar um produto por ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// 📌 Atualizar um produto (PUT)
router.put('/:id', async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produtoAtualizado) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// 📌 Deletar um produto (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const produtoDeletado = await Produto.findByIdAndDelete(req.params.id);
    if (!produtoDeletado) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;
