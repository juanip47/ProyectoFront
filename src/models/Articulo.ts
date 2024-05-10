import Seccion from './Seccion';

export default class Articulo {
    descripcionArticulo: string;
    cantidadArticulo: number;
    precioArticulo: number;
    seccion: Seccion;

    constructor(descripcionArticulo: string, cantidadArticulo: number, precioArticulo: number, seccion: Seccion) {
        this.descripcionArticulo = descripcionArticulo;
        this.cantidadArticulo = cantidadArticulo;
        this.precioArticulo = precioArticulo;
        this.seccion = seccion;
    }
}