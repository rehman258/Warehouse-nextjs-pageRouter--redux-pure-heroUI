import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

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
  public async get<T=unknown>(
    url:string,
    config:AxiosRequestConfig
  ):Promise<T>{
    const response = await this.instance.get<T>(url,config);
    return response.data;
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  public async post<T=unknown>(
    url:string,
    config:AxiosRequestConfig,
    data?:unknown,
  ):Promise<T>{
    const response = await this.instance.post<T>(url,data,config);
    return response.data;
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  public async put<T=unknown>(
    url:string,
    config:AxiosRequestConfig,
    data?:unknown,
  ):Promise<T>{
    const response = await this.instance.put<T>(url,data,config);
    return response.data;
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  public async patch<T=unknown>(
    url:string,
    config:AxiosRequestConfig,
    data?:unknown,
  ):Promise<T>{
    const response = await this.instance.patch<T>(url,data,config);
    return response.data;
  };
  /**
   * 
   * @param {url} string endpoint url
   * @param {config} config optional axios config
   */
  public async delete<T=unknown>(
    url:string,
    config:AxiosRequestConfig
  ):Promise<T>{
    const response = await this.instance.delete<T>(url,config);
    return response.data;
  };

}

export default Axios;