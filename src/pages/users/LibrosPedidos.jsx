
import { useParams } from 'react-router-dom'
import '../../BoletosComprados.css'
import { useEffect } from 'react';
import { useBoleto } from '../../context/BoletosContext';


function LibrosPedidos() {


    const params = useParams();

    const { getPrestamo, libroPrestados } = useBoleto();

    
    
    useEffect(() => {

        const CargarLibrosPrestdos = async()=>{
            await getPrestamo(params.id);
            //console.log(params.id)
            console.log(libroPrestados);
        }

        CargarLibrosPrestdos();
        
    }, [])
    return (
        <div>
            <h1 style={{ color: "white", fontSize: "40px", fontWeight: "bold", margin: "5%" }}>Mis Libros</h1>

            <div style={{ margin: "5%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

            {
                    libroPrestados.map((libro) => (
                        <div style={{ margin: "5%" }} key={libro._id}>
                            <div className="cardBoleto">

                                <div className="cardBoleto-info">
                                    <h1 style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}>Libro </h1>
                                    <img src={libro.idLibro.imagen} alt="Autobús" className="img-fluid mb-3" />
                                    
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Titulo: </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{libro.idLibro.titulo} </h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Autor: </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{libro.idLibro.autor} </h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Descripcion:  </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{libro.idLibro.descripcion} </h2>
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Estado:  </h2>
                                    <h2 style={{ color: "green", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{libro.estado}</h2>
                                    
                                    <h2 style={{ color: "skyblue", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>Fecha de Devolucion:  </h2>
                                    <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>{libro.fechaDevolucion}</h2>
                                </div>
                            </div>
                        </div>
                    ))

                }
                
            </div>
        </div>
    )
}


export default LibrosPedidos