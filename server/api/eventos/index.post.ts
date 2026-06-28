import { readMultipartFormData } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const items = await readMultipartFormData(event)
  if (!items) throw createError({ statusCode: 400, message: 'No se recibieron datos' })

  const bodyData: any = {}
  let fileData: any = null

  // acá separo los campos (body) del archivo (file)
  for (const item of items) {
    if (item.name === 'file') {
      fileData = item
    } else if (item.name) {
      bodyData[item.name] = item.data.toString()
    }
  }

  // Lógica para subir la imagen
  let relativePath: string

  if (fileData && fileData.filename && fileData.data.length > 0) {
    // Si viene una imagen la guardo
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
    
    const fileName = `${Date.now()}_${fileData.filename.replace(/\s+/g, '_')}`
    await fs.promises.writeFile(path.join(uploadDir, fileName), fileData.data)
    relativePath = `/uploads/${fileName}`
  } else {
    // Si no viene uso la imagen por defecto
    relativePath = '/uploads/defecto.jpeg'
  }

  // Guard todo en la BD
  return await prisma.evento.create({
    data: {
      titulo: bodyData.titulo,
      lugar: bodyData.lugar,
      valor: Number(bodyData.valor),
      fecha: new Date(bodyData.fecha),
      imagen: relativePath 
    }
  })
})