import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const hash = await bcrypt.hash(body.password, 12);
    body.password = hash;
    body.nombre = body.nombre.trim().toUpperCase();
    body.apellido = body.apellido.trim().toUpperCase();
    body.email = body.email.trim().toUpperCase();
    return await prisma.usuario.create({
        data: body
    })
})