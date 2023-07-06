
import {useState,useEffect,useContext,createContext} from 'react'

//  use to save token and check private routes with that token

const AuthContext=createContext()

const AuthProvider=({children})=>{

    const [auth,setAuth]=useState({
        user:null,
        token:""
    });
    
    //  alert(auth?.token)
    useEffect(()=>{
        const data=localStorage.getItem('netflixauthadmin')
        if(data){
            const parseData=JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
           
        }
        // 
        
        // eslint-disable-next-line
    },[]);  
   
    return(
    <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
    )
}

//custom hook 
const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider}