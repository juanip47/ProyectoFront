export default class Usuario {
    correoUsuario: string
    nombreUsuario: string
    contraseniaUsuario: string

    constructor(correoUsuario: string, nombreUsuario: string, contraseniaUsuario: string) {
        this.correoUsuario = correoUsuario
        this.nombreUsuario = nombreUsuario
        this.contraseniaUsuario = contraseniaUsuario
    }
}