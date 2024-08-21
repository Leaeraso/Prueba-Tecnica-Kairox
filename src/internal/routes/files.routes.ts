import { Router } from 'express'
import multer from 'multer'

const router = Router()
const storage = multer.memoryStorage() // almacena el archivo en memoria
const upload = multer({ storage }) //middleware

router.get('/files')

router.post('/files')

router.put('/files/:id')

export default router
