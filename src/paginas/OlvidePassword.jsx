import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

  const [email,setEmail] = useState('')
  const [alerta,setAlerta] = useState({})



  const handleSubmit = async e=>{
    e.preventDefault()

    if(email === '' || email.length < 6){
      setAlerta({msg:'El Email es Obligatorio',error:true})
      return;
    }



    try{
      const { data} = await clienteAxios.post('veterinarios/olvide-password',{email})
      console.log(data)  

      setAlerta({msg: data.msg})

    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const {msg} = alerta;


  return (
    <>
          
        <div>
            <h1 className="text-indigo-600  font-black text-3xl">
              Recupera tu Acceso y no Pierdes{" "}
            <span className="text-black">Tus pacientes</span> </h1>
        </div>


        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg &&<Alerta
            alerta={alerta}
          
          />}
          <form 
            onSubmit={handleSubmit}
          >
            <div className="my-4">
                    <label className="uppercase text-gray-600 block text-l font-bold">Email</label>


                    <input type="Email" placeholder="Ingresa Email" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12" 
                    value={email}
                    onChange={e=>setEmail(e.target.value)}/>


                    <input type="submit" value="Enviar Instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " />

            </div>
          </form>

          <nav className='mt-5 lg:flex lg:justify-between'>
              <Link className='block text-center my-5 text-gray-500' to="/" >¿Ya tienes una Cuenta? Inicia Sesion</Link>
              <Link className='block text-center my-5 text-gray-500' to="/registrar">¿No tienes una Cuenta? Registrate</Link>
            </nav>
          </div>
            

            
    

    
    </>
  )
}

export default OlvidePassword