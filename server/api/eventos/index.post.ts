export default defineEventHandler(async(datos) => {
    const body = await readBody(datos)
    return await prisma.evento.create({
        data:body
    })  
})