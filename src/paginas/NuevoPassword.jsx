import {useState,useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Alerta from '../components/alerta'
import clienteAxios from '../config/axios'

const NuevoPassword = () => {
  const [password,setPassword] = useState('')
  const [alerta,setAlerta] = useState('')
  const [tokenValido,setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const {token} = params

  useEffect(()=>{
    const comprobarToken = async ()=>{

      try{
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo Password'
        })

        setTokenValido(true)


      }catch(erorr){
        setAlerta({
          msg:'Hubo un error con el enlace',
          error:true
        })
      }
    }
    comprobarToken()
  },[])

  const handleSubmit = async e =>{
    e.preventDefault()
    if(password.length < 8 ){
      setAlerta({
        msg:'El Password debe ser minimo de 8 Caracteres',
        error:true
      })
      return
    }
  

    try{
      const url =`/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url,{password})


      setAlerta({
        msg:data.msg
      })
      setPasswordModificado(true)
    }catch(error){
      setAlerta({
        msg:error.response.data.msg,
        error: true
      })
    }
  }


  const {msg} = alerta



  return (
    <>
    <div>
        <h1 className="text-indigo-600  font-black text-3xl">
          Restablece tu Password y no Pierdas al Acceso{" "}
        <span className="text-black">Tus pacientes</span> </h1>
    </div>

    <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
      
          {msg &&<Alerta
                    alerta={alerta}
                  
            />}

          {tokenValido && (
            <>
               <form onSubmit={handleSubmit}>


                  <div className="my-4">
                  <label className="uppercase text-gray-600 block text-l font-bold">Nuevo Password</label>
        
                  <input type="password" placeholder="Nuevo Password" className="border w-full p-2 mt-2 bg-gray-50 rounded-xl gap-12"
                  value={password}
                  onChange = {e =>setPassword(e.target.value)}
                  />
        
                    <input type="submit" value="Guardar Nuevo Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " />
                    </div>
                
                </form>

              

              </>

            )}

            {passwordModificado &&
              <Link className='block text-center my-5 text-gray-500' to="/" >Inicia Sesion</Link>
            }

     
    </div>
    </>
  )
}

export default NuevoPassword