export class PresentacionesModelo {
    constructor(data = {}) {
        // Validamos el objeto recibido
        if (typeof data !== 'object' || data === null) {
            data = {};
        }

        // Nivel de bloque general (si existe)
        this.nombre = data.nombre_modulo || data.nombre || "Módulo General";
        this.hora_gnrl = data.hora_gnrl || data.hora_general || "08:00 - 18:00";
        this.salon = data.salon || "Ubicación no especificada";
        this.dia = data.dia || "Sin dia "
    }

    /**
     * Retorna la hora formateada (útil si en el futuro usas ISO strings o separas inicio/fin).
     */
    getHoraFormateada() {
        return this.hora;
    }

    /**
     * Retorna un título amigable para tarjetas o listados.
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

    /**
     * Retorna una cadena corta tipo resumen.
     */
    getResumen() {
        return `${this.titulo} — ${this.ponente} (${this.hora})`;
    }

    /**
     * Retorna los datos en formato JSON listo para enviar o guardar.
     */
    toJSON() {
        return {
            id: this.id,
            departamento: this.departamento,
            titulo: this.titulo,
            hora: this.hora,
            ponente: this.ponente,
            dia: this.dia,
            nombre_modulo: this.nombre_modulo,
            hora_gnrl: this.hora_gnrl,
            salon: this.salon,
            tipo: this.tipo
        };
    }

    /**
     * Crea una lista de modelos a partir de los datos crudos del API.
     * Ejemplo: response.data.data.presentaciones_orales
     */
    static fromApiResponse(apiData = []) {
        if (!Array.isArray(apiData)) return [];
        const models = [];

        apiData.forEach(modulo => {
            const nombre_modulo = modulo.nombre;
            const hora_gnrl = modulo.hora_gnrl;
            const salon = modulo.salon;

            // Recorremos los días (fecha_9, fecha_10, etc.)
            modulo.dia.forEach(diaObj => {
                Object.keys(diaObj).forEach(fechaKey => {
                    const departamentos = diaObj[fechaKey];
                    Object.keys(departamentos).forEach(depKey => {
                        const presentaciones = departamentos[depKey];
                        presentaciones.forEach(p => {
                            models.push(new PresentacionesModelo({
                                ...p,
                                dia: fechaKey,
                                nombre_modulo,
                                hora_gnrl,
                                salon
                            }));
                        });
                    });
                });
            });
        });

        return models;
    }
}



export class DiaModelo{
        constructor(data = {}) {
        // Validamos el objeto recibido
        if (typeof data !== 'object' || data === null) {
            data = {};
        }

        // Nivel de bloque general (si existe)
        this.fecha_9 = data.fecha_9 || "Módulo General";
        this.fecha_10 = data.fecha_10 || "08:00 - 18:00";
        
    }
}