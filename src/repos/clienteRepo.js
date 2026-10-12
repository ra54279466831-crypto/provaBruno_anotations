import { db } from './connection.js'

export async function adicionarFoto(id, caminhoFoto){
    const [resposta] = await db.query(`
        UPDATE clientes
        SET foto_perfil = ?
        WHERE id_cliente = ?    
    `, [
        caminhoFoto,
        id
    ])

    return resposta.affectedRows
}

export async function buscarPorDados(email, telefone, cpf) {
    const [clienteEmail] = await db.query(
        'SELECT id_cliente FROM clientes WHERE email = ? LIMIT 1',
        [email]
    )

    const [clienteCpf] = await db.query(
        'SELECT id_cliente FROM clientes WHERE cpf = ? LIMIT 1',
        [cpf]
    )

    const [clienteTelefone] = await db.query(
        'SELECT id_cliente FROM clientes WHERE telefone = ? LIMIT 1',
        [telefone]
    )

    return {
        clienteEmail: clienteEmail[0] ?? null,
        clienteCpf: clienteCpf[0] ?? null,
        clienteTelefone: clienteTelefone[0] ?? null
    }
}


export async function criarConta(dados) {
    const [resultado] = await db.query(
        `INSERT INTO clientes
        (nome, cpf, email, telefone, data_nasc, cidade, pin)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            dados.nome,
            dados.cpf,
            dados.email,
            dados.telefone,
            dados.data_nasc,
            dados.cidade,
            dados.pin
        ]
    )

    return {
        id_cliente: resultado.insertId,
        nome: dados.nome,
        email: dados.email
    }
}

export async function deletarCliente(id) {
    const [resultado] = await db.query(`
        DELETE FROM clientes
        WHERE id_cliente = ?`, [id])

        return resultado.affectedRows
}

export async function buscarClientePorId(id) {
    const [resultado] = await db.query(`
        SELECT * FROM clientes
        WHERE id_cliente = ?`, [id])

    return resultado[0]
}