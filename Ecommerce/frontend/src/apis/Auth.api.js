import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:8080/"
})

export const registerApi = (data)=>{
    return api.post("/api/v1/register",data)
}

export const loginApi = (data)=>{
    return api.post("/api/v1/login",data)
}