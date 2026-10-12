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

