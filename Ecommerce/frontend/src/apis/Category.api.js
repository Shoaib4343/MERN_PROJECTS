import axios  from "axios";

const api = axios.create({
     baseURL: "http://localhost:8080/",
})


// GET ALL CATEGORIES
export const getAllCategoriesApi = ()=>{
    return api.get("/api/v1/get-categories")
}

// CREATE CATEGORY || METHOD POST
export const createCategoryApi = (data)=>{
    return api.post("/api/v1/create-category",data,{
        headers:{
            Authorization: JSON.parse(localStorage.getItem("auth"))?.token,
        }
    })
}

// DELETE CATEGORY || METHOD DELETE
export const deleteSingleCategoryApi = (id)=>{
    return api.delete(`/api/v1/delete-category/${id}`,{
        headers:{
            Authorization: JSON.parse(localStorage.getItem("auth"))?.token,
        }
    })
}



// UPDATE CATEGORY || METHOD POST
export const updateCategoryApi = (id,name)=>{
    return api.put(`/api/v1/update-category/${id}`,{name},{
        headers:{
            Authorization: JSON.parse(localStorage.getItem("auth"))?.token,
        }
    })
}