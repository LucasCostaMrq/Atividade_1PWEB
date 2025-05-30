const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    estoque: {
        type: Number,
        default: 0
    },
    categoria: {
        type: String,
        required: true
    },
    imagem: {
        type: String, // URL da imagem do produto
        default: ''
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Produto', ProdutoSchema);
