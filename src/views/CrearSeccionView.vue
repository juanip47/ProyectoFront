<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Crear Sección</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarCreacionSeccion">
                        <div class="hijos">
                            <label for="nombre">Nombre:</label>
                            <input v-model="seccion.nombreSeccion" type="text" class="form-control" id="nombre" required>
                        </div>
                        <v-btn 
                            type="submit" 
                            class="submit"
                        >Crear</v-btn>
                        <v-btn  
                            class="cancelar"
                            @click="cancelarCreacionSeccion"
                        >Cancelar</v-btn >
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Seccion from '@/models/Seccion';
import axios from 'axios';
import BackHome from '../components/BackHome.vue';
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            seccion: new Seccion(),
        }
    },
    created() {
    },
    methods: {
        confirmarCreacionSeccion() {
            axios.post('http://localhost:8000/api/v1/tienda/nuevaSeccion', this.seccion)
                .then(() => {
                    this.$router.push({ name: 'secciones' });
                })
                .catch(error => {
                    console.error('Error al crear la nueva sección:', error);
                });
        },
        cancelarCreacionSeccion() {
            this.$router.push({ name: 'secciones' });
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