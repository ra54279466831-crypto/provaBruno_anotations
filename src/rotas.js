import clientes from './controllers/clienteController.js'


export default function rotas(app){
    app.use(clientes)
}