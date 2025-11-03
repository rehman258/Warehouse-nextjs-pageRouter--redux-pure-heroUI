export interface IResponse<T> {
  data:T;
  status:number;
}

export interface IError{
  response:{
    error?:object;
    errorMessage?:object;
    status:number;
  }
}