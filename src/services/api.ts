import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";

const api = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (username: string, password: string) => {
  const response = await api.post("/ru/data/v3/testmethods/docs/login", {
    username,
    password,
  });
  return response.data;
};

export const fetchData = async (token: string) => {
  const response = await api.get("/ru/data/v3/testmethods/docs/userdocs/get", {
    headers: {
      "x-auth": token,
    },
  });
  return response.data.data;
};

export const createItem = async (token: string, item: any) => {
  const response = await api.post(
    "/ru/data/v3/testmethods/docs/userdocs/create",
    item,
    {
      headers: {
        "x-auth": token,
      },
    }
  );
  return response.data;
};

export const deleteItem = async (token: string, id: string) => {
  const response = await api.post(
    `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    null,
    {
      headers: {
        "x-auth": token,
      },
    }
  );
  return response.data;
};

export const updateItem = async (token: string, id: string, item: any) => {
  const response = await api.post(
    `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    item,
    {
      headers: {
        "x-auth": token,
      },
    }
  );
  return response.data;
};
