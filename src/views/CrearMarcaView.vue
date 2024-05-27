<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Crear Marca</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarCreacionMarca">
                        <div class="hijos">
                            <label for="nombre">Nombre:</label>
                            <input v-model="marca.nombreMarca" type="text" class="form-control" id="nombre" required>
                        </div>
                        <v-btn 
                            type="submit" 
                            class="submit"
                            color="success"
                        >Crear</v-btn>
                        <v-btn  
                            class="cancelar"
                            color="error"
                            @click="cancelarCreacionMarca"
                        >Cancelar</v-btn >
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Marca from '@/models/Marca';
import axios from 'axios';
import BackHome from '../components/BackHome.vue';
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            marca: new Marca(),
        }
    },
    created() {
    },
    methods: {
        confirmarCreacionMarca() {
            axios.post('http://localhost:8000/api/v1/tienda/nuevaMarca', this.marca)
                .then(response => {
                    this.$router.push({ name: 'marcas' });
                    window.alert(response.data)
                })
                .catch(error => {
                    console.error('Error al crear la nueva sección:', error);
                    
                    if (error == 'AxiosError: Request failed with status code 500') {
                        window.alert('La sección ya existe')
                    }
                });
        },
        cancelarCreacionMarca() {
            this.$router.push({ name: 'marcas' });
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