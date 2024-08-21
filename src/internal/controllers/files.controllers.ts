import { Request, Response } from 'express'
import File from '../models/files.models'
import moment from 'moment'

const parseDate = (dateString: string): Date => {
  return moment(dateString, 'DD/MM/YYYY HH:mm:ss').toDate()
}

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('no file uploaded')
    }

    const fileContent = req.file.buffer.toString('utf-8')
    const jsonData = convertTxtToJson(fileContent)

    const newFile = new File({ content: JSON.stringify(jsonData) })
    await newFile.save()

    res.status(201).json({ message: 'file uploaded and save' })
  } catch (error) {
    res
      .status(500)
      .send('error uploading the file: ' + (error as Error).message)
  }
}

const convertTxtToJson = (txt: string) => {
  const lines = txt.split('\n')
  const jsonResult: any[] = []

  for (const line of lines) {
    if (!line.trim()) continue

    const fields = line.split('|')

    if (fields.length < 17) {
      console.warn('the lines have the wrong formatting', line)
      continue
    }

    const jsonObject = {
      dni: fields[0].trim(),
      id_afiliado: fields[1].trim(),
      nombre: fields[2].trim(),
      archivo: {
        fecha: parseDate(fields[3].trim()),
        tipo_pago: fields[4].trim(),
        desc_tipo_pago: fields[5].trim(),
        cod_tipo_cuota: fields[6].trim(),
        desc_tipo_cuota: fields[7].trim(),
        importe: parseFloat(fields[8].trim()),
        cant_cuotas: fields[9].trim(),
        porcentaje: parseFloat(fields[10].trim()),
        subtotal: parseFloat(fields[12].trim()),
        total: parseFloat(fields[13].trim()),
        estado_cuota: fields[17].trim() === 'True',
      },
      cod_sindicato: fields[11].trim(),
      tipo_fecha_afiliacion: fields[14].trim(),
      cod_referencia: fields[15].trim(),
      cod_identificacion: fields[16].trim(),
    }

    jsonResult.push(jsonObject)
  }

  return jsonResult
}
