import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { useViajes } from "../../context/ViajesContext";
import { useAuth } from "../../context/AuthContext";
import { verityTokenRequet } from "../../api/auth";
import { useBoleto } from "../../context/BoletosContext";



function ObtenerLibro() {

    const { register, handleSubmit, setValue } = useForm();

    const params = useParams();

    const {registerPrestamo} = useBoleto();

    const navigate =  useNavigate();

    // Cargar los datos del libro en espesifico

    const { getViaje } = useViajes();

    // Obtener a todos los empleados

    const { getEmpleados, empleados, user } = useAuth();

    useEffect(() => {
        getEmpleados()
        async function CargarLibro() {
            if (params.id) {
                const libro = await getViaje(params.id);


                setValue('idLibro', params.id);
                setValue('nameLibro', libro.titulo);
                setValue('idUser', user.id);
                setValue('idEmpleado',empleados[0]._id);


            }
        }

        CargarLibro();
        

    }, []);


    useEffect(() => {
        async function checkLogin() {
            // Obtiene la cookie 'token'
            //console.log(token)

            try {
                const res = await verityTokenRequet();
                if (res.data) {
                    setValue('idUser', res.data.id);
                } else {
                    console.error("Error no existe data del usuario");

                }
            } catch (error) {
                console.error(">> Error en la función checkLogin: ", error);

            }

        }

        checkLogin();
    }, []);

    // Funcion para enviar el formulario

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        registerPrestamo(data);
        console.log("success");
        navigate("/MisLibros");

    })
    return (


        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-950 max-w-md p-10 rounded-md'>
                <h1 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "3%" }}>Pedir Libro</h1>


                <form onSubmit={onSubmit}>

                    <input type="hidden"
                        readOnly
                        {...register("idLibro", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                    ></input>
                    <input type="hidden"
                        readOnly
                        {...register("idUser", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                    ></input>
                    <label>Nombre del Libro</label>
                    <input type="text"
                        readOnly
                        {...register("nameLibro", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                    ></input>

                    <label>Direcccion De Entrega</label>
                    <input type="text"
                        required

                        {...register("direccion", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                    ></input>

                    <label>Encargado De la Entrega</label>


                    <select className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        required
                        aria-label="Large select example"
                        {...register("idEmpleado")}
                        
                        >
                        {empleados.map(empleado => (
                            <option key={empleado._id} value={empleado._id}>{empleado.username}</option>
                        ))}
                    </select>

                    <label>Fecha De Debolucion</label>
                    <input type="date"
                        required
                        {...register("fechaDebolicion", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                    ></input>

                    <button type="submit" className='btn btn-primary' style={{ width: "90%", margin: "5%" }}>
                        Completar
                    </button>


                </form>
            </div>
        </div>

    )
}


export default ObtenerLibro