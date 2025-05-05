import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import ResumeWithIARouter from './routers/ResumeWithIA.routes.js'

const app = express()

//Conecta ao banco de dados
// connectDB()

app.use(express.json())

// Middleware para resolver erro CORS

app.use(cors({
  origin: true, // Permitir qualquer origem
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Permitir credenciais
}));


app.get('/', (req, res) => {
    res.status(200).json("SERVIDOR OK")
})

app.use('/resume', ResumeWithIARouter)

export default app