import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState(()=>{
        const data = localStorage.getItem("auth");
        return data ? JSON.parse(data) : {user:null,token:""}
    })
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth = ()=> useContext(AuthContext);

export {useAuth,AuthProvider}