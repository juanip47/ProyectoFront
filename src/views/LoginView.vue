<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezadoLogin">
                    <v-img
                        alt="H&S Super Logo"
                        class="shrink mr-2"
                        contain
                        src="../assets/Logo H&S Super.png"
                        transition="scale-transition"
                        width="55"
                    />
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <div class="hijosLogin">
                            <label for="correo">Correo:</label>
                            <input v-model="correo" type="text" class="form-control" id="correo" required>
                        </div>
                        <div class="hijosLogin">
                            <label for="contrasenia">Contraseña:</label>
                            <input v-model="contrasenia" type="password" class="form-control" id="contrasenia" required>
                        </div>
                        <v-btn 
                            type="submit" 
                            class="submitLogin"
                            @click="validarLoginUsuario"
                        >Continuar</v-btn>
                        <br/>
                        <button 
                            class="crearUsuarioLogin"
                        >¿No tienes cuenta? Crea una aquí</button>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import BackHome from '../components/BackHome.vue';
import Usuario from '../models/Usuario';
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            correo: "",
            contrasenia: "",
            usuarioComprobar: new Usuario()
        }
    },
    created() {
    },
    methods: {
        validarLoginUsuario() {
            window.alert("ENTRE")
            window.alert(this.correo)
            axios.get(`http://localhost:8000/api/v1/tienda/usuarioPorCorreo?correoUsuario=${this.correo}`)
                .then(response => {
                    this.usuarioComprobar = response.data
                    console.log(response.data)
                    console.log(this.usuarioComprobar)
                    window.alert("ENTRE1")
                })
                .catch(error => {
                    console.log('Error al obtener el usuario:', error)
                    window.alert("ENTRE2")
                })
            window.alert("SALI")
        }
    }
}
</script>

<style>
.v-main{
    background-color: #FF6961;
}
.encabezadoLogin{
    display: flex;
    justify-content: center;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    margin-top: 20%;
}
.hijosLogin{
    margin-top: 2%;
    text-align: center;
}
.submitLogin{
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    border-radius: 5%;
    margin: 5% 0 0 38.5%; 
}
.crearUsuarioLogin{
    font-family: 'Times New Roman', Times, serif;
    color: blue;
    font-style: italic;
    font-weight: bold;
    font-style: italic;
    margin: 3% 0 0 33%;    
}
label{
    margin-right: 2.5%;
}
</style>