import clientes from './controllers/clienteController.js'
import anotacoes from './controllers/anotacoesController.js'

export default function rotas(app){
    app.use(clientes)
    app.use(anotacoes)
}

