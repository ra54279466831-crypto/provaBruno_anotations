import * as db from '../repos/anotacoesRepo.js'

export async function buscarAnotacaoPorCliente(id_cliente) {
    if(!id) throw new Error("Digite o id do cliente")
    if(!Number.isInteger(id) || id <= 0) throw new Error("O id do cliente precisa ser inteiro e positivo")

    return db.buscarAnotacaoPorCliente(id_cliente)
}

export async function criarAnotacao(dados, id_cliente) {
    if(!id || !dados) throw new Error("Digite os dados e id do cliente")
    if(!Number.isInteger(id) || id <= 0) throw new Error("O id do cliente precisa ser inteiro e positivo")

    const { titulo, mensagem, favorita, categoria, cor } = dados

    if(!titulo || !mensagem || !favorita || !categoria || !cor) throw new Error("Digite todos os campos")

    
}