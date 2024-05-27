<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Editar Sección</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarEdicionSeccion">
                        <div class="hijos">
                            <label for="nombre">Nombre:</label>
                            <input v-model="seccion.nombreSeccion" type="text" class="form-control" id="nombre" required>
                        </div>
                        <v-btn
                            type="submit" 
                            class="submit"
                            color="success"
                        >Guardar Cambios</v-btn>
                        <v-btn 
                            class="cancelar"
                            color="error"
                            @click="cancelarEdicionSeccion"
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
import Seccion from '@/models/Seccion';
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            seccion: new Seccion()
        }
    },
    created() {
        this.seccion = this.$route.params.seccion;
    },
    methods: {
        confirmarEdicionSeccion() {
            axios.put(`http://localhost:8000/api/v1/tienda/editarSeccion`, this.seccion)
                .then(response => {
                    this.$router.push({ name: 'secciones' });
                    window.alert(response.data)
                })
                .catch(error => {
                    console.error('Error al guardar los cambios:', error);
                    if (error == 'AxiosError: Request failed with status code 500') {
                        window.alert('La sección ya existe')
                    }
                });
        },
        cancelarEdicionSeccion() {
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