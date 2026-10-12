import { Router } from 'express'
import upload from '../config/multer.js'
import * as service from '../services/clienteService.js'

const endpoints = Router()

// Adicionar foto de perfil

endpoints.put('/foto/:id', upload.single('foto'), async (req, res) => {
    try {
        const imagem = req.file

        if (!req.file) {
            return res.status(400).json({
                erro: 'Envie uma imagem no campo foto'
            })
        }

        const caminhoFoto = `/uploads/perfis/${imagem.filename}`
        const id = Number(req.params.id)

        const resposta = await service.adicionarFoto(id, caminhoFoto)
        
        res.status(200).json({
            mensagem: "Foto atualizada com sucesso!",
            resposta
        })
    } catch (error) {
        console.log(error.message)

        res.status(400).json({
            error: "Erro ao colocar imagem."
        })
    }
})

// Criar uma conta

endpoints.post('/conta', async (req, res) => {
    try {
        const dados = req.body

        const resultado = await service.criarConta(dados)

        res.status(201).json({
            mensagem: "Conta criada com sucesso!",
            resultado
        })
    } catch (error) {
        console.log(error.message)

        res.status(400).json({
            mensagem: "Erro ao criar a conta",
            error: error.message
        })
    }
})

// Deletar conta

endpoints.delete('/conta/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        const resultado = await service.deletarConta(id)

        res.status(200).json({
            mensagem: "Cliente deletado com sucesso!"
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            error: "Cliente não encontrado"
        })
    }
})



export default endpoints;