export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  await prisma.inscrito.delete({
    where: { id: Number(id) },
  });

  return { ok: true };
});