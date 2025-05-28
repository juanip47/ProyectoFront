export class CarritoId {
  correoUsuario: string;
  idArticulo: number;

  constructor(correoUsuario: string, idArticulo: number) {
    this.correoUsuario = correoUsuario;
    this.idArticulo = idArticulo;
  }
}

export class Carrito {
  id: CarritoId;
  cantidadArticulo: number;

  constructor(correoUsuario: string, idArticulo: number, cantidadArticulo: number) {
    this.id = new CarritoId(correoUsuario, idArticulo);
    this.cantidadArticulo = cantidadArticulo;
  }
}
