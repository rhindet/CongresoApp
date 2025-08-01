import { ApiRequestsResult } from '../models/ApiRequestResult';
import { AvisosModel } from '../models/AvisosModel';
import { Simposio, Simposios } from '../models/simposiosModel';

const methods = {
    GET: "GET",
    PUT:"PUT",
    POST:"POST",
    DELETE:"DELETE"
}

function getHeaders(){
        var typeHeader = "none"
        switch(typeHeader){
            case "none":
                return {'Content-Type': 'application/json'}
            default:
                return {'Content-Type': 'application/json'}
        }
    }


export class ApiCalls{

    _buildFetch = new BuildFetch()
    constructor(){};

    


    async actualizarLinkYoutube(id,videoUrl){
       
        console.log(videoUrl)
        var result = await this._buildFetch.fetch({url:`/api/platicas/linkYoutube/${id}`,method:methods.PUT,headers:getHeaders(),body:JSON.stringify({ videoUrl: videoUrl }) })
        console.log("Result antes modelo",result)
        if(result != null && result.status == 200){
            return result
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }


     async getAllAvisos(){
        var res = await this._buildFetch.fetch({url:"/api/platicas/avisos",method:methods.GET,headers:getHeaders()})
        const result = new ApiRequestsResult(res.data)
        if(res != null && res.status == 200){
              const avisos = result.data.map(item => new AvisosModel(item));
              return avisos;
        }

        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }
     async getAllEvents(){
        var result = await this._buildFetch.fetch({url:"/api/platicas/eventos",method:methods.GET,headers:getHeaders()})
        console.log(result)
        if(result != null && result.status == 200){
            const simposios = result.data.data.flatMap((grupo, index) => {
              const tipo = index === 0 ? 'simposio' : 'magistral';

              return grupo.map(item => {
                item.tipo = tipo; // le añadimos el tipo
                return new Simposios(item); // instanciamos
              });
            });

            return simposios


        }


        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

    async getAllSimposios(){
        var result = await this._buildFetch.fetch({url:"/api/platicas/simposios",method:methods.GET,headers:getHeaders()})
        console.log(result)
        if(result != null && result.status == 200){
            const simposios = result.data.data.simposios.map(item => new Simposios(item));
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }
      async getAllMagistrales(){
        var result = await this._buildFetch.fetch({url:"/api/platicas/magistrales",method:methods.GET,headers:getHeaders()})
                console.log("resultados:magistrales")

        console.log(result.data.data.platicas_magistrales[0])

        if(result != null && result.status == 200){
            const simposios = result.data.data.platicas_magistrales.map(item => new Simposios(item));
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

    async getAllOralPresentation(){
        var result = await this._buildFetch.fetch({url:"/api/platicas/oralPresentations",method:methods.GET,headers:getHeaders()})
                console.log("resultados:magistrales")

        console.log(result)

        if(result != null && result.status == 200){
            const simposios = result.data.data.platicas_magistrales.map(item => new Simposios(item));
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

      async getAllTalleres(){
        var result = await this._buildFetch.fetch({url:"/api/platicas/talleres",method:methods.GET,headers:getHeaders()})
                console.log("resultados:magistrales")

        console.log(result)

        if(result != null && result.status == 200){
            const simposios = result.data.data.platicas_magistrales.map(item => new Simposios(item));
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

    

    async getSimposio(id){
        var result = await this._buildFetch.fetch({url:`/api/platicas/simposio/${id}`,method:methods.GET,headers:getHeaders()})
        console.log("Result antes modelo",result)
        if(result != null && result.status == 200){
            const simposios = new Simposios(result.data.data)
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

    async getEvent(id){
        var result = await this._buildFetch.fetch({url:`/api/platicas/evento/${id}`,method:methods.GET,headers:getHeaders()})
        console.log(result)
        if(result != null && result.status == 200){
            const simposios = new Simposios(result.data.data)
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

     async actualizarAviso(aviso){
      
        var result = await this._buildFetch.fetch({url:`/api/platicas/aviso/${aviso._id}`,method:methods.PUT,headers:getHeaders(),body:JSON.stringify(aviso) })
        if(result != null && result.status == 200){
            return result
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

       async eliminarAviso(_id){
        console.log("Eliminar",_id)
        var result = await this._buildFetch.fetch({url:`/api/platicas/eliminarAviso/${_id}`,method:methods.DELETE,headers:getHeaders() })
        if(result != null && result.status == 200){
            return result
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }


    async getMagistral(id){
        var result = await this._buildFetch.fetch({url:`/api/platicas/magistral/${id}`,method:methods.GET,headers:getHeaders()})
        console.log(result)
        if(result != null && result.status == 200){
            const simposios = new Simposios(result.data.data)
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

    async getTaller(id){
        var result = await this._buildFetch.fetch({url:`/api/platicas/taller/${id}`,method:methods.GET,headers:getHeaders()})
        console.log(result)
        if(result != null && result.status == 200){
            const simposios = new Simposios(result.data.data)
            return simposios
        }
        console.log("Llamada realizada sin exito")   
        return []
       
        //return this.formatResult(result);
    }

    async getOralPresentation(id){
        var result = await this._buildFetch.fetch({url:`/api/platicas/oralPresentation/${id}`,method:methods.GET,headers:getHeaders()})
        console.log(result)
        if(result != null && result.status == 200){
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


export class BuildFetch{
     constructor(){}

    #apiRootUrl  = import.meta.env.VITE_SERVER_ROOT_URL;
   
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