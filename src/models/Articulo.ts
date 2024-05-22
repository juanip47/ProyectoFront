import Seccion from './Seccion'
import Marca from './Marca'

export default class Articulo {
    descripcionArticulo: string;
    cantidadArticulo: number;
    precioArticulo: number;
    seccion: Seccion;
    marca: Marca;

    constructor(descripcionArticulo: string, cantidadArticulo: number
        , precioArticulo: number, seccion: Seccion, marca: Marca) {
        this.descripcionArticulo = descripcionArticulo;
        this.cantidadArticulo = cantidadArticulo;
        this.precioArticulo = precioArticulo;
        this.seccion = seccion;
        this.marca = marca;
    }
}