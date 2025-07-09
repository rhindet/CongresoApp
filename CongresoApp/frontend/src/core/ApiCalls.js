import { ApiRequestsResult } from '../models/ApiRequestResult';
import { Simposio, Simposios } from '../models/simposiosModel';

const methods = {
    GET: "GET",
    PUT:"PUT",
    POST:"POST"
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
        console.log(result)
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
    

    


}


export class BuildFetch{
     constructor(){}

    #apiRootUrl  = import.meta.env.VITE_SERVER_ROOT_URL;
   
    async fetch({ url, method, headers }) {
    try {
      const options = {
        method,
        headers,
      };
     
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