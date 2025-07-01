export class Simposios {
  constructor(data) {
    
    this.departamento = data.departamento || "";
    this.nombre = data.nombre || "";
    this.objetivo = data.objetivo || "";
    this.dirigido = data.dirigido || "";
    this.requisito = data.requisito || "";
    this.jefe = data.jefe || "";
    this.coordinador = data.coordinador || "";
    this.moderador = data.moderador || "";
    this.hora_inicio = data.hora_inicio || "";
    this.hora_fin = data.hora_fin || "";
    this.salon = data.salon || "";
    this.capacidad = data.capacidad || 0;
    this.extra = data.extra || "";
    this.programa = data.programa || [];
  }
}
/**
 * @typedef {Object} ProgramaItem
 * @property {string} tema
 * @property {string} ponente
 * @property {string} hora_inicio
 * @property {string} hora_fin
 */

/**
 * Clase que representa un Simposio.
 */
export class Simposio {
  /**
   * @param {Object} data
   * @param {string} data.departamento
   * @param {string} data.nombre
   * @param {string} data.objetivo
   * @param {string} data.dirigido
   * @param {string} data.requisito
   * @param {string} data.jefe
   * @param {string} data.coordinador
   * @param {string} data.moderador
   * @param {string} data.hora_inicio
   * @param {string} data.hora_fin
   * @param {string} data.salon
   * @param {number} data.capacidad
   * @param {string} data.extra
   * @param {ProgramaItem[]} data.programa
   */
  constructor(data) {
    this.departamento = data.departamento || "";
    this.nombre = data.nombre || "";
    this.objetivo = data.objetivo || "";
    this.dirigido = data.dirigido || "";
    this.requisito = data.requisito || "";
    this.jefe = data.jefe || "";
    this.coordinador = data.coordinador || "";
    this.moderador = data.moderador || "";
    this.hora_inicio = data.hora_inicio || "";
    this.hora_fin = data.hora_fin || "";
    this.salon = data.salon || "";
    this.capacidad = data.capacidad || 0;
    this.extra = data.extra || "";
    this.programa = data.programa || [];
  }

  /**
   * Devuelve un resumen breve del simposio.
   * @returns {string}
   */
  resumen() {
    return `${this.nombre} (${this.departamento}) en el salón ${this.salon}`;
  }
}