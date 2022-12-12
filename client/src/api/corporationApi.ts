import axios from "axios";

const API_URL = "http://localhost:3000/api/corporations";

const getAllCorporations = () => {
  return axios.get(`${API_URL}`, {});
};

const getCorporation = (id: string) => {
  return axios.get(`${API_URL}/${id}`);
};

const createCorporation = (data: { name: string; description: string }) => {
  return axios.post(`${API_URL}`, data);
};

const updateCorporation = (
  data: { name: string; description: string },
  id: string
) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const deleteCorporation = (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

const corporationApi = {
  getAllCorporations,
  getCorporation,
  createCorporation,
  updateCorporation,
  deleteCorporation,
};

export default corporationApi;
