import requests from "./http.service";
import { AxiosResponse } from "axios";

const Services = {
  getAll({ query }: any): Promise<AxiosResponse> {
    return requests.get(`/categories`, { params: query });
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/category/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post("/category", body);
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`category/${id}`, body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`category/${id}`);
  },
  // search({ query }: any): Promise<AxiosResponse> {
  //   return requests.get(`category?${query}`)
  // },
};

export default Services;
