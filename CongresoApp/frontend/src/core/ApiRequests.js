import { ApiCalls } from "./ApiCalls";


export class ApiRequests { 

    _apiCall = new ApiCalls();

    constructor(){}

    async login(userID) {
        var result = await this._apiCall.login(userID);
        return result;
    }

}