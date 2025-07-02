import { ApiCalls } from "./ApiCalls";


export class ApiRequests { 

    _apiCall = new ApiCalls();

    constructor(){}


    async getAllSimposios(){
         var result = await this._apiCall.getAllSimposios();
         
         return result;
    }

}