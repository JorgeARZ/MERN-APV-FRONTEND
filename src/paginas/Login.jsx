import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';



const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alerta,setAlerta] = useState({})

  const {setAuth} = useAuth()

  const navigate =useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if([email,password].includes('')){
      setAlerta({
        msg:'Todos los Campos son obligarotios',
        error:true
      })
      return
    }

    try{
      const {data} = await clienteAxios.post('/veterinarios/login',{email,password})

      setAuth(data)
      navigate('/admin')


      localStorage.setItem('token',data.token)
  
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
              Inicia Sesesion y Administra tus  
            <span className="text-black"> Pacientes</span> </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg &&<Alerta
            alerta={alerta}
          
          />}

            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <label className="uppercase text-gray-600 block text-l font-bold">Email</label>
                    <input type="text" placeholder="Email de Registro" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    
                    
                    />

                  
                </div>
                <div className="my-4">
                    <label className="uppercase text-gray-600 block text-l font-bold">Password</label>
                    <input type="password" placeholder="Email de Registro" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                    
                    
                    />
                </div>

                <input type="submit" value="Iniciar Sesion" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " />

                
                
            </form>
            <nav className='mt-5 lg:flex lg:justify-between'>
              <Link className='block text-center my-5 text-gray-500' to="/registrar" >¿No tienes una Cuenta? Registrate</Link>
              <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide mi password</Link>
            </nav>
        </div>

    
    </>
  )
}


export default Login