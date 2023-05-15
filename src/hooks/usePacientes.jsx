import {useContext} from 'react'
import PacientesContext from '../context/PacienteProvider'


const usePacientes = () =>{
    //Extrraer valores
    return useContext(PacientesContext)
}

export default usePacientes