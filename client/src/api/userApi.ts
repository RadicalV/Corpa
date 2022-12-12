import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

interface Role {
  role: "USER" | "ADMIN" | "CEO";
}

const getUserData = () => {
  return axios.get(`${API_URL}/me`, {});
};

const getUserCorporations = () => {
  return axios.get(`${API_URL}/me/corporations`, {});
};

const getUsers = () => {
  return axios.get(`${API_URL}`, {});
};

const getUser = (id: string) => {
  return axios.get(`${API_URL}/${id}`);
};

const updateUser = (data: { username: string; role: Role }, id: string) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const deleteUser = (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};

const userApi = {
  getUserData,
  getUserCorporations,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userApi;
