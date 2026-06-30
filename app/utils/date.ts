export function formatDate(dateString: string) {
    if (!dateString) return 'Fecha no disponible';
        return new Intl.DateTimeFormat('es-CL', { 
        dateStyle: 'medium' 
    }).format(new Date(dateString));
}