import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const registerApi = (data) => {
  return api.post("/api/v1/register", data);
};

export const loginApi = (data) => {
  return api.post("/api/v1/login", data);
};

export const userDashbordApi = () => {
  return api.get("/api/v1/dashbord", {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("auth"))?.token,
    },
  });
};

export const adminDashbordApi = ()=>{
  return api.get("/api/v1/admin",{
    headers:{
      Authorization: JSON.parse(localStorage.getItem("auth"))?.token,
    }
  })
}

export const resetPassword = (data)=>{
  return api.post("/api/v1/forget_password", data)
}
