import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Api {
  static readonly BASE_URL = 'https://rtmbackend-new.onrender.com/api/v1/';
  axiosInstance: AxiosInstance;

  constructor(resource: string) {
    this.axiosInstance = axios.create({
      baseURL: Api.BASE_URL + resource,
    });
  }

  async get<T = any>(url: string, data?: T) {
    return await this.axiosInstance.get<T>(url, data ? data : undefined);
  }
  async post<T = any>(url: string, data: T, config?: AxiosRequestConfig<T>) {
    return await this.handlePromiseResult(this.axiosInstance.post<T>(url, data, config));
  }

  async delete<T = any>(url: string, data: T) {
    return await this.axiosInstance.delete<T>(url, data ? data : undefined);
  }
  async put<T = any>(url: string, data: T) {
    return await this.handlePromiseResult(this.axiosInstance.put<T>(url, data));
  }

  async handlePromiseResult(request: Promise<any>) {
      const {status, data, ...res} = await request;
      
      if (status < 200 || status  > 210) {
        console.log('error', status);
        console.log('error', data);
      }
      return data;
  }
}

