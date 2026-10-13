import * as db from '../repos/anotacoesRepo.js'

export async function buscarAnotacaoPorCliente(id_cliente) {
    if(!id) throw new Error("Digite o id do cliente")
    if(!Number.isInteger(id) || id <= 0) throw new Error("O id do cliente precisa ser inteiro e positivo")

    return db.buscarAnotacaoPorCliente(id_cliente)
}

export async function criarAnotacao(dados, id_cliente) {
    if(!id_cliente || !dados) throw new Error("Digite os dados e id do cliente")
    if(!Number.isInteger(id_cliente) || id_cliente <= 0) throw new Error("O id do cliente precisa ser inteiro e positivo")

    const { titulo, mensagem, favorita, categoria, cor } = dados

    if(!titulo || !mensagem || !favorita || !categoria || !cor) throw new Error("Digite todos os campos")

    if(titulo.length > 50) throw new Error ("O titulo não pode ser maior que 50 caracteres")

    if(mensagem.length > 500) throw new Error("A mensagem não pode ser maior que 500 caracteres")

    if(typeof favorita !== "boolean") throw new Error("Favorita só pode ser true ou false")

    if(
        categoria !== 'padrao' && categoria !== 'importante' && categoria !== 'pessoal' && categoria !== 'segredo'
    ) throw new Error("A categoria só pode ser padrao, importante, pessoal ou segredo")

    if(
        cor.length > 7 || cor.length <= 0 || !cor.includes('#')
    ) throw new Error("Digite a cor em valor hexadecimal")

    const nomesIguals = await db.buscarAnotacaoPorTitulo(titulo, id_cliente)

    if(nomesIguals) throw new Error("Já possui uma anotação com esse nome")

    return db.criarAnotacao(dados, id_cliente)
}

export async function atualizarAnotacao(dados, id_cliente, id_anotacao) {
    if (!dados || !id_cliente || !id_anotacao) throw new Error("Digite os dados corretamente")

    if (!Number.isInteger(id_cliente) || id_cliente <= 0) throw new Error("O id do cliente precisa ser inteiro e positivo")

    if (!Number.isInteger(id_anotacao) || id_anotacao <= 0) throw new Error("O id da anotação precisa ser inteiro e positivo")

    const { titulo, mensagem, favorita, categoria, cor } = dados

    if (!titulo || !mensagem || favorita === undefined || !categoria || !cor) throw new Error("Digite todos os campos")


    if (typeof titulo !== 'string' || titulo.trim().length > 50) throw new Error("O título não pode ser maior que 50 caracteres")

    if (typeof mensagem !== 'string' || mensagem.trim().length > 500) throw new Error("A mensagem não pode ser maior que 500 caracteres")

    if (typeof favorita !== 'boolean') throw new Error("Favorita só pode ser true ou false")

    if (
        categoria !== 'padrao' &&
        categoria !== 'importante' &&
        categoria !== 'pessoal' &&
        categoria !== 'segredo'
    ) {
        throw new Error("A categoria só pode ser padrao, importante, pessoal ou segredo")
    }

    if(
        cor.length > 7 || cor.length <= 0 || !cor.includes('#')
    ) throw new Error("Digite a cor em valor hexadecimal")

    const anotacaoExistente = await db.buscarAnotacaoPorId(
        id_cliente,
        id_anotacao
    )

    if (!anotacaoExistente) throw new Error("Anotação não encontrada para esse cliente")

    const dadosAtualizados = {
        titulo: titulo.trim(),
        mensagem: mensagem.trim(),
        favorita,
        categoria,
        cor
    }

    return await db.atualizarAnotacao(
        dadosAtualizados,
        id_cliente,
        id_anotacao
    )
}

export async function buscarAnotacaoPorId(id_cliente, id_anotacao) {
    if (!id_cliente || !id_anotacao) throw new Error("Digite os dados corretamente")

    if (!Number.isInteger(id_cliente) || id_cliente <= 0) throw new Error("O id do cliente precisa ser inteiro e positivo")

    if (!Number.isInteger(id_anotacao) || id_anotacao <= 0) throw new Error("O id da anotação precisa ser inteiro e positivo")

    return db.buscarAnotacaoPorId(id_cliente, id_anotacao)
}

export async function deletarAnotacao(id_cliente, id_anotacao) {
    if (!id_cliente || !id_anotacao) throw new Error("Digite os dados corretamente")

    if (!Number.isInteger(id_cliente) || id_cliente <= 0) throw new Error("O id do cliente precisa ser inteiro e positivo")

    if (!Number.isInteger(id_anotacao) || id_anotacao <= 0) throw new Error("O id da anotação precisa ser inteiro e positivo")

    return db.deletarAnotacao(id_cliente, id_anotacao)
}

