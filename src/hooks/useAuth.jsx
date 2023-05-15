import {useContext} from 'react'
import AuthContext from '../context/AuthProvider'


const useAuth = () =>{
    //Extrraer valores
    return useContext(AuthContext)
}

export default useAuth