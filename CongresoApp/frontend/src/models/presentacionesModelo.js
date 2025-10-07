export class PresentacionesModelo {
    constructor(data = {}) {
        // Aseguramos que 'data' sea un objeto para evitar errores
        if (typeof data !== 'object' || data === null) {
            data = {};
        }
        
        // Asignación de propiedades con valores por defecto si no existen
        this.id = data.id || null;
        this.departamento = data.departamento || "N/A";
        this.dia = data.dia || "Fecha no especificada";
        this.hora = data.hora || "Hora no especificada";
        this.nombre_modulo = data.nombre_modulo || "Módulo General";
        this.ponente = data.ponente || "Ponente no disponible";
        this.salon = data.salon || "Ubicación no especificada";
        this.titulo = data.titulo || "Título de la Ponencia Desconocido";

        // Propiedad adicional para clasificar el tipo de evento si es necesario
        this.tipo = 'presentacion oral'; 
    }

    /**
     * Retorna una representación legible de la hora de inicio y fin.
     * Si los datos originales son ISO Strings (como se sugiere en tu Schedule.jsx),
     * tendrías que ajustar este método para parsear la cadena 'hora' si es un rango,
     * o si los campos originales son 'hora_inicio' y 'hora_fin'.
     *
     * Asumiendo que 'hora' ya es el string "HH:MM - HH:MM":
     */
    getHoraFormateada() {
        return this.hora;
    }

    /**
     * Retorna el título completo para la tarjeta.
     */
    getTitulo() {
        return this.titulo;
    }

    /**
     * Retorna el nombre del ponente principal.
     */
    getPonentePrincipal() {
        return this.ponente;
    }
}