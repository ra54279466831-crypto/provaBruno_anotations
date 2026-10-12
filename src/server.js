import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import rotas from './rotas.js';

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads/perfis', express.static(path.resolve('uploads/perfis')))
rotas(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`---> API rodando na porta ${PORT}`)
})