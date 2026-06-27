import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const hash = await bcrypt.hash(body.password, 12);
    body.password = hash;
    return await prisma.usuario.create({
        data: body
    })
})