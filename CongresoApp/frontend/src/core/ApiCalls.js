
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

   formatResult(result) {
        let parsedBody;
        try {
            parsedBody = typeof result.body === 'string' 
            ? JSON.parse(result.body) 
            : result.body;
        } catch (e) {
            parsedBody = result.body;
        }

        const formatted = {
            status: result.status,
            data: parsedBody,
        };

        return new ApiRequestsResult(formatted);
    }

    async login(){
        var result = await this._buildFetch.fetch({url:"/login",method:methods.GET,headers:getHeaders(),body:body})
        return this.formatResult(result);
    }


}


export class BuildFetch{
     constructor(){}

    #apiRootUrl = "http://localhost:8000"

   
     async fetch({url,method,headers,body}){
        try {
      const respuesta = await fetch(this.#apiRootUrl + url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!respuesta.ok || respuesta == null) {
        throw new Error('Error en el fetch');
      }

      if(respuesta.status == false){
         throw new Error('Respuesta fallada o nula');
      }
       setMensaje('✅ Sesión iniciada correctamente');
       return await respuesta.json();
     
    } catch (error) {
      setMensaje(`❌ Error: ${error.message}`);
    }
     }


}