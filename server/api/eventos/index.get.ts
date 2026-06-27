export default defineEventHandler(async() => {
    return await prisma.evento.findMany({
        include: {
            inscritos: true
        },
        orderBy: {fecha: 'desc'}
    })
})