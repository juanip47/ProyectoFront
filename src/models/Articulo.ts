export default class Articulo {
    descripcionArticulo: string;
    cantidadArticulo: number;
    precioArticulo: number;
    nombreSeccion: string;

    constructor(descripcionArticulo: string, cantidadArticulo: number, precioArticulo: number, nombreSeccion: string) {
        this.descripcionArticulo = descripcionArticulo;
        this.cantidadArticulo = cantidadArticulo;
        this.precioArticulo = precioArticulo;
        this.nombreSeccion = nombreSeccion;
    }
}