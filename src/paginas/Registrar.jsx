import {useState} from 'react'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'




const Registrar = () => {

  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repetirPassword,setRepetirPassword] = useState('')

  const [alerta,setAlerta] = useState({})


  const handleSubmit = async e =>{
        e.preventDefault()
        //Entrar a las propiedades con include
    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({msg:'Hay Campos vacios', error:true})
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg:'Los Password no son Iguales', error:true})
      return;
    }

    if(password.length < 8){
      setAlerta({msg:'El Password es muy Corto,Agrega Minimo 8 Caracteres', error:true})
      return
    }

      setAlerta({})

      //Crear el usuario en la api

      try{
        await clienteAxios.post('/veterinarios',{nombre,email,password})
        setAlerta({
          msg:'Creado Correctamente, Revisa tu Email',
          error:false
        })
        


      }catch(error){
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
      }

  }
  
  const {msg} = alerta

  return (
    <>
        <div>
            <h1 className="text-indigo-600  font-black text-3xl">
              Crea tu Cuent y Administra{" "}
            <span className="text-black">Tus pacientes</span> </h1>
        </div>


        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

          {msg &&<Alerta
            alerta={alerta}
          
          />}

            <form onSubmit={handleSubmit}>
            <div className="my-4">
                    <label className="uppercase text-gray-600 block text-l font-bold">Nombre</label>
                    <input type="text" placeholder="Tu nombre" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12"
                    value={nombre}
                    onChange = {e =>setNombre(e.target.value)}
                     />

            </div>

            <div className="my-4">
                    <label className="uppercase text-gray-600 block text-l font-bold">Email</label>
                    <input type="email" placeholder="Email de Registro" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12"
                    value={email}
                    onChange = {e =>setEmail(e.target.value)}
                    />
            </div>




                <div className="my-4">
                    <label className="uppercase text-gray-600 block text-l font-bold">Password</label>
                    <input type="password" placeholder="Email de Registro" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12"
                    value={password}
                    onChange = {e =>setPassword(e.target.value)}
                    />
                </div>



                <div className="my-4">
                    <label className="uppercase text-gray-600 block text-l font-bold">Repetir Password</label>
                    <input type="password" placeholder="Email de Registro" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12"
                    value={repetirPassword}
                    onChange = {e =>setRepetirPassword(e.target.value)}
                    />
                </div>


                
                <input type="submit" value="Registrarse" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " />
              </form>

              <nav className='mt-5 lg:flex lg:justify-between'>
              <Link className='block text-center my-5 text-gray-500' to="/" >¿Ya tienes una Cuenta? Inicia Sesion</Link>
              <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide mi password</Link>
            </nav>
          
          </div>

          
         



    </>
  )
}

export default Registrar