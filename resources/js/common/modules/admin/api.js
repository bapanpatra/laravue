import axios from 'axios';
const api =function(){
    const BaseApi = axios.create({
        baseUrl: "https://laravel.gowebbidemo.com/122245/public/"
      //  baseUrl: "http://127.0.0.1:8000"
    });
    const token=localStorage.getItem('api_token');
    if(token){
        BaseApi.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    return BaseApi;
}

export default api;
