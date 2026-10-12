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
        INSERT INTO anotacoes(titulo, mensagem, favorita, categoria, cor)
        VALUES (?, ?, ?, ?, ?)
    ` [
        dados.titulo,
        dados.mensagem,
        dados.favorita,
        dados.categoria,
        dados.cor
    ])

    return resposta.insertId
}

