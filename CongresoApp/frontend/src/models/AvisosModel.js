export class AvisosModel {
  constructor(data) {
    
    this._id = data._id || "";
    this.descripcion = data.descripcion || "";
    this.hora_actualizacion = data.hora_actualizacion || {};
    this.hora_creacion = data.hora_actualizacion || {};
    this.titulo = data.titulo || ""
  }
}