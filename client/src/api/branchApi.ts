import axios from "axios";

const API_URL = "http://localhost:3000/api/corporations";

const getAllBranches = (corporationId: string) => {
  return axios.get(`${API_URL}/${corporationId}/branches`, {});
};

const getBranch = (corporationId: string, id: string) => {
  return axios.get(`${API_URL}/${corporationId}/branches/${id}`);
};

const createBranch = (
  corporationId: string,
  data: { title: string; address: string }
) => {
  return axios.post(`${API_URL}/${corporationId}/branches`, data);
};

const updateBranch = (
  data: { title: string; address: string },
  corporationId: string,
  id: string
) => {
  return axios.put(`${API_URL}/${corporationId}/branches/${id}`, data);
};

const deleteBranch = (corporationId: string, id: string) => {
  return axios.delete(`${API_URL}/${corporationId}/branches/${id}`);
};

const branchApi = {
  getAllBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
};

export default branchApi;
