export default defineEventHandler(async(req) =>{
    const query = getQuery(req);
    // si se está consultando por un email lo agregro en el where
    if (!query.email) {
        throw createError({ statusCode: 401, message: "se requiere un email" });
    }
    return await prisma.inscrito.findMany({
        where:{email: String(query.email)},
        // acà hago el join con evento
        include: {
            evento: true
        },
        orderBy: { nombre: 'asc'}
    })

})