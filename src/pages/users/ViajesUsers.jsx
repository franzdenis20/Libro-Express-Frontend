import { useEffect, useState } from "react";

import { useViajes } from "../../context/ViajesContext";

import '../../Cards.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function ViajesUsers() {
    const { getViajes, viajes, sedes, getSedes } = useViajes();
    const { cerrarSecion } = useAuth()

    const [sede, setSede] = useState("Historia")

    const navigate = useNavigate()



    useEffect(() => {
        
        getSedes();
        
        navigate(`/viajes/${sede}`)
        
        getViajes(sede);
        //console.log(user)
        //<li style={{color:"skyblue"}}>{user.email} </li>
    }, [sede])
    //console.log(viajes)




    function handleSelect(event) {
        setSede(event.target.value)
    }


    

    return (
        <div className="container mx-auto px10">
            <nav style={{ flex: "row", flexWrap: "wrap" }}
                className=" navar my-2 flex justify-between py-5 px-10 rounded-lg ">
                <h1 style={{ color: "red", fontWeight: "bold" }}>Libro Express</h1>

                <ul style={{ flex: "row", flexWrap: "wrap" }} className="flex gap-x-2">
                    <li style={{ color: "skyblue" }}>{localStorage.getItem('correo')}</li>
                    <li>
                        <select className=" form-select form-select-lg mb-3" aria-label="Large select example" onChange={handleSelect}>
                            {
                                sedes.map(sede => (
                                    <option key={sede._id} value={sede.sede}>{sede.sede}</option>
                                ))
                            }
                        </select>
                    </li>

                    <li>

                        <Link type="button" className="btn btn-primary" style={{ color: "skyblue" }} to="/MisLibros" >Mis Libros</Link>

                    </li>



                    <li>

                        <Link type="button" className="btn btn-danger" style={{ color: "red" }} to="/login" onClick={() => cerrarSecion()}>Cerrar Secion</Link>

                    </li>
                </ul>
            </nav>
            <div className="Contenedor">

                {
                    viajes.map((viaje) => (

                        <div className="card" key={viaje._id}>
                            <img src={viaje.imagen}
                                alt="Autobús" style={{ width: "280px", height: "320px", borderRadius: "5%" }} />
                            <p className="heading">
                                {viaje.titulo}
                            </p>
                            
                            <p> Autor: 
                                {viaje.autor}
                            </p>
                            
                            <p>Estado: {viaje.estado}</p>
                            
                            

                            <div>

                                <Link to={`/ObtenerLibro/${viaje._id}`} type="button" className='btn btn-primary' style={{ width: "90%", margin: "2%", color: "skyblue" }} >Obtener</Link>

                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}


export default ViajesUsers