import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { IError } from "@/types/api/response";
class Axios {
  private instance: AxiosInstance;
  constructor(){
    this.instance = axios.create({
      baseURL: "https://warehouse-d9e26-default-rtdb.firebaseio.com/" as const,
      headers: {} as Record<string,string>,
    });
    this.instance.interceptors.request.use(
      (config:InternalAxiosRequestConfig)=>{
        // token will be added here
        config.headers.Authorization = "token";
        config.headers["Accepted-language"] = "en";
        config.headers["Device-type"] = "WEB";
        return config;
      },
      (error:AxiosError)=>{
        throw error;
      }
    );  
    this.instance.interceptors.response.use(
      (response:AxiosResponse)=>{
        return response;
      },
      (error:AxiosError)=>{
        return error;
      }
    );
  } 
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  protected async get<T=unknown>(
    url:string,
    config?:AxiosRequestConfig
  ):Promise<AxiosResponse<T>>{
    try{
      const response = await this.instance.get<T>(`${url}.json`,config);
      return response;
    }catch(err:unknown){
      throw this.handleError(err as IError);
    }
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */

  private handleError(error: IError) {
    if (error.response?.status === 404) {
      throw new Error("Resource not found");
    }
    if (error.response?.status === 500) {
      throw new Error("Server error");
    }
    throw error;
  }

  protected async post<T=unknown>(
    url:string,
    config:AxiosRequestConfig,
    data?:unknown,
  ):Promise<AxiosResponse<T>>{
    try{
      const response = await this.instance.post<T>(`${url}.json`,data,config);
      return response;
    }catch(err:unknown){
      throw this.handleError(err as IError);
    }
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  protected async put<T=unknown>(
    url:string,
    config:AxiosRequestConfig,
    data?:unknown,
  ):Promise<AxiosResponse<T>>{
    try{
      const response = await this.instance.put<T>(`${url}.json`,data,config);
      return response;
    }catch(err:unknown){
      throw this.handleError(err as IError);
    }
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  protected async patch<T=unknown>(
    url:string,
    config:AxiosRequestConfig,
    data?:unknown,
  ):Promise<AxiosResponse<T>>{
    try{
      const response = await this.instance.patch<T>(`${url}.json`,data,config);
      return response;
    }catch(err:unknown){
      throw this.handleError(err as IError);
    }
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  protected async delete<T=unknown>(
    url:string,
    config:AxiosRequestConfig
  ):Promise<AxiosResponse<T>>{
    try{
      const response = await this.instance.delete<T>(`${url}.json`,config);
      return response;
    }catch(err:unknown){
      throw this.handleError(err as IError);
    }
  };

}

export default Axios;