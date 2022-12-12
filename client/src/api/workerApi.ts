import axios from "axios";

const API_URL = "http://localhost:3000/api/corporations";

const getWorkers = (corporationId: string, branchId: string) => {
  return axios.get(
    `${API_URL}/${corporationId}/branches/${branchId}/workers`,
    {}
  );
};

const getWorker = (corporationId: string, branchId: string, id: string) => {
  return axios.get(
    `${API_URL}/${corporationId}/branches/${branchId}/workers/${id}`
  );
};

const createWorker = (
  corporationId: string,
  branchId: string,
  data: { name: string; surname: string; phoneNumber: string; position: string }
) => {
  return axios.post(
    `${API_URL}/${corporationId}/branches/${branchId}/workers`,
    data
  );
};

const updateWorker = (
  data: {
    name: string;
    surname: string;
    phoneNumber: string;
    position: string;
  },
  corporationId: string,
  branchId: string,
  id: string
) => {
  return axios.put(
    `${API_URL}/${corporationId}/branches/${branchId}/workers/${id}`,
    data
  );
};

const deleteWorker = (corporationId: string, branchId: string, id: string) => {
  return axios.delete(
    `${API_URL}/${corporationId}/branches/${branchId}/workers/${id}`
  );
};

const workerApi = {
  getWorkers,
  getWorker,
  createWorker,
  updateWorker,
  deleteWorker,
};

export default workerApi;
