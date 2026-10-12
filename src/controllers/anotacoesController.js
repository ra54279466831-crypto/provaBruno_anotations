import * as service from '../services/anotacoesService.js'
import { Router } from 'express'

const endpoints = Router()

// buscar anotações de um usuário
endpoints.get("/note/:id_cliente", async (req, res) => {
    try {
        const id_cliente = Number(req.params.id_cliente)

        const resultado = await service.buscarAnotacaoPorCliente(id_cliente)

        if(!resultado) throw new Error("Erro ao buscar anotação")

        res.status(200).json({
            mensagem: "Anotação encontrada!",
            resultado
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            error: "Usuário não encontrado"
        })
    }
})

// criar anotaçao indicando o id do cliente
endpoints.post("/note/:id_cliente", async (req, res) => {
    try {
        const dados = req.body
        const id_cliente = Number(req.params.id_cliente)

        const resultado = await service.criarAnotacao(dados, id_cliente)

        res.status(201).json({
            mensagem: "Sucesso ao criar anotação!",
            resultado
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            mensagem: "Erro ao criar a anotação"
        })
    }
})

//atualizar anotação pelo id do usuario
endpoints.put('/note/:id_cliente/:id_anotacao', async (req, res) => {
    try {
        const id_cliente = Number(req.params.id)
        const id_anotacao = Number(req.params.id_anotacao)
        const dados = req.body

        const resultado = await service.atualizarAnotacao(dados, id_cliente, id_anotacao)

        res.status(200).json({
            mensagem: "Sucesso ao atualizar anotação",
            resultado
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            mensagem: "Erro ao atualizar anotação",
        })
    }
})

// buscar anotação por id da anotação
endpoints.get('/notes/:id_cliente/:id_anotacao', async (req, res) => {
    try {
        const id_anotacao = Number(req.params.id_anotacao)
        const id_cliente = Number(req.params.id_cliente)
        
        const resultado = await service.buscarAnotacaoPorId(id_cliente, id_anotacao)

        if (!resultado) throw new Error("Erro ao buscar anotação")

        res.status(200).json({
            mensagem: "Anotação encontada!",
            resultado
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            mensagem: "Anotação não encontrada"
        })
    }
})

// deletar anotacao de um cliente
endpoints.delete('/note/:id_cliente/:id_anotacao', async (req, res) => {
    try {
        const id_cliente = Number(req.params.id_cliente)
        const id_anotacao = Number(req.params.id_anotacao)

        const resultado = await service.deletarAnotacao(id_cliente, id_anotacao)

        res.status(200).json({
            mensagem: "Anotação deletada com sucesso",
            resultado
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            mensagem: "Erro ao deletar a anotação"
        })
    }
})

export default endpoints