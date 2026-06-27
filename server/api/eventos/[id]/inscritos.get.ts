// server/api/eventos/[id]/inscritos.get.ts
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if(!id){
        throw createError({ statusCode: 401, message: "se requiere un id"});
    }
    return await prisma.inscrito.findMany({
        where:{eventoId: Number(id)},
        //join con evento
        include: {
            evento: true,
        },
        orderBy: {nombre: 'asc'}
    })
});


