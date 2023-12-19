import AxiosService from "../axiosService";

export const login = async (data) => {
  const response = await AxiosService.post("/auth/login", data);
  return response.data;
};

export const registerRoute = `/auth/register/`;
