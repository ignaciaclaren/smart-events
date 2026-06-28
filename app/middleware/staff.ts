export default defineNuxtRouteMiddleware(() => {
    const { user } = useUserSession();
    if(!user){
        throw createError({ statusCode: 403, message: "Acceso Denegado" });
    }
}) 