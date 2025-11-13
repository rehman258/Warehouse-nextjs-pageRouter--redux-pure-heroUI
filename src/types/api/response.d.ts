export interface IResponse<T> {
  data:T;
  status:number | boolean | string;
}

export interface IError{
  response:{
    error?:object;
    errorMessage?:object;
    status:number;
  }
}