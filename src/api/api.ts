import axios from "axios";

export const api = axios.create({
  baseURL: "https://lecturizeit.westus2.cloudapp.azure.com"
});
