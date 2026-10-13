import { db } from './connection.js'

export async function buscarAnotacaoPorCliente(id_cliente) {
    const [resposta] = await db.query(`
        SELECT * FROM anotacaoes
        WHERE id_cliente = ?`, [id_cliente])

    return resposta
}

export async function buscarAnotacaoPorTitulo(titulo, id_cliente) {
    const [resultado] = await db.query(`
        SELECT * FROM anotacoes
        WHERE id_cliente = ?
        AND titulo = ?`, [id_cliente, titulo])

    return resultado
}

export async function criarAnotacao(dados, id_cliente) {
    const [resposta] = await db.query(`
        INSERT INTO anotacoes(id_cliente, titulo, mensagem, favorita, categoria, cor)
        VALUES (?, ?, ?, ?, ?)
    ` [
        id_cliente,
        dados.titulo,
        dados.mensagem,
        dados.favorita,
        dados.categoria,
        dados.cor
    ])

    return resposta.insertId
}

export async function buscarAnotacaoPorId(id_cliente, id_anotacao) {
    const [resultado] = await db.query(`
        SELECT * FROM anotacoes
        WHERE id_cliente = ?
        AND id_anotacao = ?
    `, [id_cliente, id_anotacao])

    return resultado
}

export async function atualizarAnotacao(dados, id_cliente, id_anotacao) {
    const [resultado] = await db.query(`
        UPDATE anotacoes
        SET titulo = ?
            mensagem = ?
            favorita = ?
            categoria = ?
            cor = ?
        WHERE id_cliente = ?
        AND id_anotacao = ?    
    `, [
        dados.titulo,
        dados.mensagem,
        dados.favorita,
        dados.categoria,
        dados.cor,
        id_cliente,
        id_anotacao
    ])

    return resultado.affectedRows
}

export async function buscarAnotacaoPorId(id_cliente, id_anotacao) {
    const [resultado] = await db.query(`
        SELECT * FROM anotacoes
        WHERE id_cliente = ?
        AND id_anotacao = ?
    `, [id_cliente, id_anotacao])

    return resultado[0]
}

export async function deletarAnotacao(id_cliente, id_anotacao) {
    const [resultado] = await db.query(`
        DELETE FROM anotacoes
        WHERE id_cliente = ?
        AND id_anotacao = ?
    `, [id_cliente, id_anotacao])

    return resultado.affectedRows
}

