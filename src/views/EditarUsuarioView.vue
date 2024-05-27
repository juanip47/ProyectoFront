<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Editar Usuario</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarEdicionUsuario">
                        <div class="hijos">
                            <label for="nombre">Nombre:</label>
                            <input v-model="usuario.nombreUsuario" type="text" class="form-control" id="nombre" required>
                        </div>
                        <v-btn
                            type="submit" 
                            class="submit"
                            color="success"
                        >Guardar Cambios</v-btn>
                        <v-btn 
                            class="cancelar"
                            color="error"
                            @click="cancelarEdicionUsuario"
                        >Cancelar</v-btn>
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
import Usuario from '@/models/Usuario';
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            usuario: new Usuario()
        }
    },
    created() {
        this.usuario = this.$route.params.usuario;
    },
    methods: {
        confirmarEdicionUsuario() {
            axios.put(`http://localhost:8000/api/v1/tienda/editarUsuario`, this.usuario)
                .then(response => {
                    this.$router.push({ name: 'usuarios' });
                    window.alert(response.data)
                })
                .catch(error => {
                    console.error('Error al guardar los cambios:', error);
                    if (error == 'AxiosError: Request failed with status code 500') {
                        window.alert('El usuario ya existe')
                    }
                });
        },
        cancelarEdicionUsuario() {
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
.submit{
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    padding: 0.1%;
    border-radius: 5%;
    margin-left: 32%;
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