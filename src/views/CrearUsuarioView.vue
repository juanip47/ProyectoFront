<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Crear Nuevo Usuario</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarCreacionUsuario">
                        <div class="hijos">
                            <label for="correo">Correo:</label>
                            <input v-model="usuario.correoUsuario" type="text" class="form-control" id="correo" required>
                        </div>
                        <div class="hijos">
                            <label for="contrasenia">Contraseña:</label>
                            <input v-model="usuario.contraseniaUsuario" type="text" class="form-control" id="contrasenia" required>
                        </div>
                        <v-btn 
                            type="submit" 
                            class="submit"
                        >Crear</v-btn>
                        <v-btn  
                            class="cancelar"
                            @click="cancelarCreacionUsuario"
                        >Cancelar</v-btn >
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
            usuario: new Usuario(),
        }
    },
    created() {
    },
    methods: {
        confirmarCreacionUsuario() {
            axios.post('http://localhost:8000/api/v1/tienda/nuevoUsuario', this.usuario)
                .then(response => {
                    this.$router.push({ name: 'usuarios' });
                    window.alert(response.data)
                })
                .catch(error => {
                    console.error('Error al crear el usuario:', error);
                    
                    if (error == 'AxiosError: Request failed with status code 500') {
                        window.alert('El usuario ya existe')
                    }
                });
        },
        cancelarCreacionUsuario() {
            this.$router.push({ name: 'usuarios' })
        }
    }
}
</script>

<style>
.encabezado {
    display: flex;
     justify-content: center;
    color: red;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
}
.hijos{
    margin-top: 2%;
    text-align: center;
}
.submit{
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    padding: 0.1%;
    border-radius: 5%;
    margin-left: 40%;
}
.cancelar{
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    padding: 0.1%;
    border-radius: 5%;
    margin-left: 2%;
}
label{
    margin-right: 2.5%;
}
</style>