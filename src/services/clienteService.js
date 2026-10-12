import * as db from '../repos/clienteRepo.js'

export async function adicionarFoto(id, caminhoFoto) {
    if(!id) throw new Error("Digite o id do usuário")

    if(!Number.isInteger(id) || id <= 0) throw new Error("Digite um id positivo e inteiro")

    if(typeof caminhoFoto !== "string" || !caminhoFoto.trim()) throw new Error("o caminho da foto é obrigatorio!")

    const resposta = await db.adicionarFoto(id, caminhoFoto)

    if(!resposta) throw new Error("Erro ao adicionar a foto")

    return resposta
}

export async function criarConta(dados) {
    if(!dados || typeof dados !== "object" || Array.isArray(dados)) throw new Error("Erro ao enviar os dados")

    const { nome, cpf, email, telefone, data_nasc, cidade, pin } = dados

    if(!nome || !cpf || !email || !telefone || !data_nasc || !cidade || !pin) throw new Error("Todos os dados devem ser preenchidos")

    const cpfNormal = cpf.replace(/\D/g, '')

    if(cpfNormal.length !== 11) throw new Error("CPF digitado incorretamente")


    const emailNormal = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormal)) throw new Error('Digite um e-mail válido')
    
    const telefoneNormal = telefone.replace(/\D/g, '')

    if (telefoneNormal.length !== 10 && telefoneNormal.length !== 11) {
        throw new Error('Telefone digitado incorretamente')
    }

    const cidadeNormal = cidade.trim()
    const nomeNormal = nome.trim()
    const pinNormal = String(pin)

    const hoje = new Date()

    if (data_nasc > hoje) throw new Error("Não é possivel nascer no futuro")

    if (!/^\d{6}$/.test(pinNormal)) throw new Error('O PIN deve conter exatamente 6 dígitos')

    const verificacaoClienteCadastrado = await db.buscarPorDados(emailNormal, telefoneNormal, cpfNormal)

    if(verificacaoClienteCadastrado.clienteEmail) throw new Error("Cliente cadastrado com esse email")

    if(verificacaoClienteCadastrado.clienteTelefone) throw new Error("Cliente cadastrado com esse telefone")

    if(verificacaoClienteCadastrado.clienteCpf) throw new Error("Cliente cadastrado com esse CPF")

    return db.criarConta({
        nome: nomeNormal    ,
        cpf: cpfNormal,
        email: emailNormal,
        telefone: telefoneNormal,
        data_nasc,
        cidade: cidadeNormal,
        pin: pinNormal
    })
}

export async function deletarConta(id) {
    if(!id) throw new Error("Erro ao informar o id do cliente")
    if(!Number.isInteger(id) || id <= 0) throw new Error("Digite um valor inteiro e positivo")

    const cliente = await db.buscarClientePorId(id)

    if(!cliente) throw new Error("Erro ao buscar cliente")

    return db.deletarCliente(id)
}