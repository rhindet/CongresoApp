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


    async getAllSimposios(){
        var result = await this._buildFetch.fetch({url:"/api/platicas/simposios",method:methods.GET,headers:getHeaders()})
        
        if(result != null && result.status == 200){
            const simposios = result.data.data.map(item => new Simposios(item));
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