import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import geminiRouter from './routes/gemini.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/api/gemini', geminiRouter)

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
