import axios from "./axios";

export const registerPrestamoRequest = (prestamo) => axios.post("/registerPrestamo",prestamo);