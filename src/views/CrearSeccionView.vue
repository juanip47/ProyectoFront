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
                        <div class="botones">
                            <v-btn 
                                type="submit" 
                                class="submit"
                                color="success"
                            >Crear</v-btn>
                            <v-btn  
                                class="cancelar"
                                color="error"
                                @click="cancelarCreacionSeccion"
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
                .then(response => {
                    this.$router.push({ name: 'secciones' });
                    window.alert(response.data)
                })
                .catch(error => {
                    console.error('Error al crear la nueva sección:', error);
                    
                    if (error == 'AxiosError: Request failed with status code 500') {
                        window.alert('La sección ya existe')
                    }
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
.botones{
    display: flex;
    justify-content: center;
    margin-top: 3.5%;
}
</style>