export interface IResponse<T> {
  data:T;
  error?:object;
  errorMessage?:object;
}