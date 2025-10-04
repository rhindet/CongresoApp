import { ApiRequestsResult } from '../models/ApiRequestResult';
import { AvisosModel } from '../models/AvisosModel';
import { MagistralesModelo } from '../models/magistralesModel';
import { Simposio, Simposios } from '../models/simposiosModel';

const methods = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE"
}

function getHeaders() {
  var typeHeader = "none"
  switch (typeHeader) {
    case "none":
      return { 'Content-Type': 'application/json' }
    default:
      return { 'Content-Type': 'application/json' }
  }
}


export class ApiCalls {

  _buildFetch = new BuildFetch()
  constructor() { };




  async actualizarLinkYoutube(id, videoUrl) {

    console.log(videoUrl)
    var result = await this._buildFetch.fetch({ url: `/api/platicas/linkYoutube/${id}`, method: methods.PUT, headers: getHeaders(), body: JSON.stringify({ videoUrl: videoUrl }) })
    console.log("Result antes modelo", result)
    if (result != null && result.status == 200) {
      return result
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }


  async getAllAvisos() {
    var res = await this._buildFetch.fetch({ url: "/api/platicas/avisos", method: methods.GET, headers: getHeaders() })
    const result = new ApiRequestsResult(res.data)
    if (res != null && res.status == 200) {
      const avisos = result.data.map(item => new AvisosModel(item));
      return avisos;
    }

    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }


  async getAllEvents() {
    var result = await this._buildFetch.fetch({ url: "/api/platicas/eventos", method: methods.GET, headers: getHeaders() });

    if (result != null && result.status == 200) {
      // Tipos de eventos
      const eventTypes = ['simposio', 'magistral', 'presentaciones orales'];
      const eventGroups = result.data.data;

      if (!Array.isArray(eventGroups)) {
        console.error("La estructura de datos de eventos no es un array de grupos.");
        return [];
      }

      const allEvents = eventGroups.flatMap((grupo, index) => {
        // Tipo correspondiente al índice. Si no existe es'desconocido'.
        const tipo = eventTypes[index] || 'desconocido';

        if (!Array.isArray(grupo)) return []; // Saltar si un grupo no es un array

        return grupo.map(item => {
          // A diferencia del código anterior, aquí aseguramos que usamos el modelo correcto 
          // para cada tipo. Asumo que Simposios/Presentaciones Orales pueden usar Simposios 
          // y Magistrales usa MagistralesModelo.
          const Model = tipo === 'magistral' ? MagistralesModelo : Simposios;

          // Añadimos el tipo
          item.tipo = tipo;

          // Instanciamos con el modelo correcto
          return new Model(item);
        });
      });

      return allEvents;
    }

    console.log("Llamada realizada sin éxito a getAllEvents");
    return [];
  }

  async getAllSimposios() {
    var result = await this._buildFetch.fetch({ url: "/api/platicas/simposios", method: methods.GET, headers: getHeaders() })
    console.log(result)
    if (result != null && result.status == 200) {
      const simposios = result.data.data.simposios.map(item => new Simposios(item));
      return simposios
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }
  async getAllMagistrales() {
    var result = await this._buildFetch.fetch({ url: "/api/platicas/magistrales", method: methods.GET, headers: getHeaders() })
    console.log("resultados:magistrales")

    console.log(result.data.data.platicas_magistrales[0])

    if (result != null && result.status == 200) {
      const simposios = result.data.data.platicas_magistrales.map(item => new MagistralesModelo(item));
      return simposios
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }

  async getAllOralPresentation() {
    var result = await this._buildFetch.fetch({ url: "/api/platicas/oralPresentations", method: methods.GET, headers: getHeaders() })
    console.log("resultados:magistrales")

    console.log(result)

    if (result != null && result.status == 200) {
      const simposios = result.data.data.platicas_magistrales.map(item => new Simposios(item));
      return simposios
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }




  async getSimposio(id) {
    var result = await this._buildFetch.fetch({ url: `/api/platicas/simposio/${id}`, method: methods.GET, headers: getHeaders() })
    console.log("Result antes modelo", result)
    if (result != null && result.status == 200) {
      const simposios = new Simposios(result.data.data)
      return simposios
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }

  async getEvent(id) {
    var result = await this._buildFetch.fetch({ url: `/api/platicas/evento/${id}`, method: methods.GET, headers: getHeaders() })
    console.log(result)
    if (result != null && result.status == 200) {
      const simposios = new Simposios(result.data.data)
      return simposios
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }

  async actualizarAviso(aviso) {

    var result = await this._buildFetch.fetch({ url: `/api/platicas/aviso/${aviso._id}`, method: methods.PUT, headers: getHeaders(), body: JSON.stringify(aviso) })
    if (result != null && result.status == 200) {
      return result
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }

  async eliminarAviso(_id) {
    console.log("Eliminar", _id)
    var result = await this._buildFetch.fetch({ url: `/api/platicas/eliminarAviso/${_id}`, method: methods.DELETE, headers: getHeaders() })
    if (result != null && result.status == 200) {
      return result
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }


  async getMagistral(id) {
    var result = await this._buildFetch.fetch({ url: `/api/platicas/magistral/${id}`, method: methods.GET, headers: getHeaders() })
    console.log(result)
    if (result != null && result.status == 200) {
      const simposios = new MagistralesModelo(result.data.data)
      return simposios
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }


  async getOralPresentation(id) {
    var result = await this._buildFetch.fetch({ url: `/api/platicas/oralPresentation/${id}`, method: methods.GET, headers: getHeaders() })
    console.log(result)
    if (result != null && result.status == 200) {
      const simposios = new Simposios(result.data.data)
      return simposios
    }
    console.log("Llamada realizada sin exito")
    return []

    //return this.formatResult(result);
  }

  //AVISOS
  async ponerAviso(data) {
    const result = await this._buildFetch.fetch({
      url: "/api/platicas/avisos/poneraviso",
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (result?.status === 201) {
      return result.data;
    }
    console.log("No se pudo publicar el aviso");
    return null;
  }

  async getAvisos() {
    const result = await this._buildFetch.fetch({
      url: "/api/avisos",
      method: "GET",
      headers: getHeaders(),
    });

    if (result?.status === 200) {
      return result.data.data;
    }
    console.log("No se pudieron obtener los avisos");
    return [];
  }




}


export class BuildFetch {
  constructor() { }

  #apiRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

  async fetch({ url, method, headers, body }) {
    try {
      const options = {
        method,
        headers,
      };

      if (method === "POST" || method === "PUT") {
        options.body = body;
      }

      const fullUrl = this.#apiRootUrl + url;
      console.log(fullUrl)
      const respuesta = await fetch(fullUrl, options);
      if (!respuesta.ok) {
        throw new Error('Error en el fetch: ' + respuesta.status);
      }

      const data = await respuesta.json();
      console.log("Respuesta JSON:", data);

      return new ApiRequestsResult({ status: respuesta.status, data });
    } catch (error) {
      console.log(`Error en fetch: ${error}`);
    }
  }

}