import { readMultipartFormData } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const items = await readMultipartFormData(event)
  if (!items) throw createError({ statusCode: 400, message: 'No se recibieron datos' })

  const bodyData: any = {}
  let fileData = null

  if (items) {
    for (const item of items) {
      if (item.name === 'file') {
        fileData = item
      } else if (item.name) {
        bodyData[item.name] = item.data.toString()
      }
    }
  }

  // Lógica de imagen
  let relativePath = '/uploads/defecto.jpeg' // Valor por defecto

  if (fileData && fileData.filename) {
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
    
    const fileName = `${Date.now()}_${fileData.filename.replace(/\s+/g, '_')}`
    await fs.promises.writeFile(path.join(uploadDir, fileName), fileData.data)
    relativePath = `/uploads/${fileName}`
  }

  let valorEvento = -1
  try{
    valorEvento = Number(bodyData.valor)
    if (valorEvento < 0) throw createError({ statusCode: 400, message: 'Valor debe ser mayor a cero' })
  }catch{
    throw createError({ statusCode: 400, message: 'Valor inválido' })
  }

  return await prisma.evento.create({
    data: {
      titulo: bodyData.titulo.toUpperCase().trim(),
      lugar: bodyData.lugar.toUpperCase().trim(),
      valor: valorEvento,
      fecha: new Date(bodyData.fecha),
      imagen: relativePath // Si no hubo archivo, enviará '/uploads/defecto.jpeg'
    }
  })
})