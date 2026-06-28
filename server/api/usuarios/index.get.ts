export default defineEventHandler(async() => {
    return await prisma.usuario.findMany({
        select: {
            email: true,
            nombre: true,
            apellido: true,
            rol: true,
        },
        orderBy: { nombre: 'asc'}
    })
})