import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {
    createBoletoRequest,
    getBoletosRequest,
    getBoletosViajeRequeest,

} from "../api/boletos";

import { registerPrestamoRequest, getPrestamoRequest } from "../api/prestamo";

const BoletoContext = createContext()

export const useBoleto = () => {
    const context = useContext(BoletoContext)

    if (!context) {
        throw new Error("useBIajes must be used a ViajeProviader")
    }

    return context
}

export function BoletoProvider({ children }) {

    const [boletos, setBoletos] = useState([]);
    const [asientosOcupados, setAsientosOcupados] = useState([]);


    // Para el prestamo del libro

    const [libroPrestados, setLibrosPrestados] = useState([]);
    

    // Para obtener los viajes

    const getBoletos = async () => {
        
        try {
            const res = await getBoletosRequest();
            setBoletos(res.data);
            console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    // Obtener los boletos ocupados de un viaje
     const  getBoletosViaje = async (id)=>{
        try {
            const res = await getBoletosViajeRequeest(id)
            setAsientosOcupados(res.data)
            //console.log(res.data) 
        } catch (error) {
            //console.error(error)
            setAsientosOcupados([])
        }
     }

    
    const createBoleto = async (boleto) => {

        try {
            const res = await createBoletoRequest(boleto);
            //console.log(">>Res backend create correct")
            
        } catch (error) {
            console.error(error)
        }
    }

    // PARA REGISTRAR EL PRESTAMO

    const registerPrestamo = async(prestamo) =>{
        try {
            const res = await registerPrestamoRequest(prestamo);
            console.log(res.data)
        } catch (error) {
            console.error(error);
            
        }
    }

    // Para obtener los libros prestados de un usuario

    const getPrestamo = async(id)=>{

        try {
            const res = await getPrestamoRequest(id);
            setLibrosPrestados(res.data);
            console.log(res.data);
            console.log(libroPrestados);
            
        } catch (error) {
            console.error(error);
        }

    }
    




    return (
        <BoletoContext.Provider value={{
            boletos,
            createBoleto,
            getBoletos,
            getBoletosViaje,
            asientosOcupados,

            registerPrestamo,
            getPrestamo,
            libroPrestados
            
        }}>
            {children}
        </BoletoContext.Provider>
    )
} 