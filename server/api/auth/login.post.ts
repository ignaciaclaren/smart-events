import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  // obtener email y password que escribió el usuario
  const { email, password } = await readBody(event);
  console.log("mail: ", email);
  console.log("password: ", password);
  // revisar si usuario omitió email o password
  if (!email || !password) {
    throw createError({ statusCode: 401, message: "Se necesita emial y password" });
  }

  // revisar que haya una cuenta asociada al email
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });
  if (!usuario) {
    throw createError({ statusCode: 401, message: "Credenciales no válidas" });
  }

  // revisar que password sea el correcto
  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) {
    throw createError({ statusCode: 401, message: "Credenciales no válidas" });
  }

  // Guardar sesión
  await setUserSession(event, {
    user: {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
    },
  });

  return { ok: true };
});