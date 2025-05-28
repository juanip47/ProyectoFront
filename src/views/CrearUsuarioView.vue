<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Crear Nuevo Usuario</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarCreacionUsuario">
                        <div class="hijos">
                            <label for="nombre">Nombre:</label>
                            <input v-model="usuario.nombreUsuario" type="text" class="form-control" id="nombre" required>
                        </div>
                        <div class="hijos">
                            <label for="correo">Correo:</label>
                            <input v-model="usuario.correoUsuario" type="text" class="form-control" id="correo" required>
                        </div>
                        <div class="hijos">
                            <label for="contrasenia">Contraseña:</label>
                            <input v-model="usuario.contraseniaUsuario" type="password" class="form-control" id="contrasenia" required>
                        </div>
                        <div class="hijos">
                            <label for="tipo">Tipo:</label>
                            <select v-model="rol" id="rol">
                                <option value="usuario">Usuario</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div class="botones">
                            <v-btn 
                                type="submit" 
                                class="submit"
                                color="success"
                            >Crear</v-btn>
                            <v-btn  
                                class="cancelar"
                                color="error"
                                @click="cancelarCreacionUsuario"
                            >Cancelar</v-btn >
                        </div>
                        
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
                    this.$router.push({ name: 'admin' });
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
            window.history.go(-1)
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
.botones{
    display: flex;
    justify-content: center;
    margin-top: 3.5%;
}
select{
    border: solid 1px black !important;
}
</style>