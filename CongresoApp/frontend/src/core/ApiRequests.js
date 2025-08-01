import { ApiCalls } from "./ApiCalls";


export class ApiRequests { 

    _apiCall = new ApiCalls();

    constructor(){}


    
    async actualizarLinkYoutube(id,videoUrl){
         var result = await this._apiCall.actualizarLinkYoutube(id,videoUrl);
     
         return result;
    }


     async getAllAvisos(){
         var result = await this._apiCall.getAllAvisos();
         
         return result;
    }

     async getAllEvents(){
         var result = await this._apiCall.getAllEvents();
         
         return result;
    }


    async getAllSimposios(){
         var result = await this._apiCall.getAllSimposios();
         
         return result;
    }

      async getAllMagistrales(){
         var result = await this._apiCall.getAllMagistrales();
         
         return result;
    }

    async getAllOralPresentation(){
         var result = await this._apiCall.getAllOralPresentation();
         return result;
    }

     async getAllTalleres(){
         var result = await this._apiCall.getAllTalleres();
         return result;
    }


    async getSimposio(id){
         var result = await this._apiCall.getSimposio(id);
     
         return result;
    }

    async getMagistral(id){
         var result = await this._apiCall.getMagistral(id);
     
         return result;
    }

   async getTaller(id){
         var result = await this._apiCall.getTaller(id);
     
         return result;
    }

  

    

     async getOralPresentation(id){
         var result = await this._apiCall.getOralPresentation(id);
     
         return result;
    }

     async getEvent(id){
         var result = await this._apiCall.getEvent(id);
     
         return result;
    }
     async actualizarAviso(_id){
         var result = await this._apiCall.actualizarAviso(_id);
         return result;
    }
     async eliminarAviso(_id){
         var result = await this._apiCall.eliminarAviso(_id);
         return result;
    }

    

    async ponerAviso(titulo, descripcion, hora_creacion, hora_actualizacion){
          var aviso ={
              titulo,
              descripcion,
              hora_creacion,
              hora_actualizacion
          }
         var result = await this._apiCall.ponerAviso(aviso);

         return result;
    }
    
    

}