import axios from "./axios";

export const registerPrestamoRequest = (prestamo) => axios.post("/registerPrestamo",prestamo);

export const getPrestamoRequest = (id) => axios.get(`/librosPrestados/${id}`);