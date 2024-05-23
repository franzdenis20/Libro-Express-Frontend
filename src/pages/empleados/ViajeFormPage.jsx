

import { useViajes } from "../../context/ViajesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

function ViajeFormPage() {
    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate()

    const params = useParams();

    const { sedes, getSedes } = useViajes()
    useEffect(() => {
        async function CargarViaje() {
            if (params.id) {
                const libro = await getViaje(params.id);
                console.log(libro)
                setValue('titulo', libro.titulo);
                setValue('imagen', libro.imagen);
                setValue('autor', libro.autor);
                setValue('descripcion', libro.descripcion);
                
                setValue('categoria', libro.categoria);
                
            }
        }
        getSedes()
       
        CargarViaje()
    }, [])
    // hacemos uso del contexto de viajes

    const { createViaje, getViaje, updateViaje } = useViajes()
    const [idUrl, setIdUrl] = useState("Tarija")
    // Selecionar los departamentos


    // determinar url de vuelta
    function handleSelect(event) {
        setIdUrl(event.target.value)

    }

    const onSubmit = handleSubmit(async (data) => {


        if (params.id != "new") {
            //console.log(params)

            updateViaje(params.id, data)
        } else {
            //console.log(">>entro crear viaje")
            console.log(data)
            createViaje(data)

        }
        navigate(`/viajes/admin/${idUrl}`)
    })


    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-950 max-w-md p-10 rounded-md'>
                <h1 className='text-2xl font-bold' style={{ marginLeft: "30%" }}>Agregar Libro</h1>
                <form onSubmit={onSubmit}>
                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="text"
                        placeholder="Titulo"
                        {...register("titulo")}
                        autoFocus
                    >
                    </input>

                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="text"
                        placeholder="Imagen"
                        {...register("imagen")}

                    >
                    </input>

                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="text"
                        placeholder="Autor"
                        {...register("autor")}

                    >
                    </input>

                    <textarea
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Descripción"
                        {...register("descripcion")}
                    ></textarea>



                    <label>Categoria</label>
                    <select className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" aria-label="Large select example" {...register("categoria")} onChange={handleSelect} >
                        {
                            sedes.map(sede => (
                                <option key={sede._id} value={sede.sede} >{sede.sede}</option>
                            ))
                        }

                    </select>

                    <button type="submit" className='btn btn-primary' style={{ width: "90%", margin: "5%" }}>Guardar Libro</button>
                </form>
            </div>

        </div >
    )
}

export default ViajeFormPage;