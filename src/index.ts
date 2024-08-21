import express from 'express'
import { connectDB } from './db'
import filesRouter from './internal/routes/files.routes'

const app = express()
const PORT = 8000

app.use(express.json()) //middleware para convertir el req.body en un archivo json
app.use(filesRouter)

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

startServer().catch((error) => {
  console.log('error starting the server', error)
  process.exit(1)
})
