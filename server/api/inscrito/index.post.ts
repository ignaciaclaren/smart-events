export default defineEventHandler(async (event) =>{
    const body = await readBody(event)

    return await prisma.inscrito.create({
        data:body
    })

})