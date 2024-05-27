<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Editar Marca</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarEdicionMarca">
                        <div class="hijos">
                            <label for="nombre">Nombre:</label>
                            <input v-model="marca.nombreMarca" type="text" class="form-control" id="nombre" required>
                        </div>
                        <v-btn
                            type="submit" 
                            class="submit"
                            color="success"
                        >Guardar Cambios</v-btn>
                        <v-btn 
                            class="cancelar"
                            color="error"
                            @click="cancelarEdicionMarca"
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
import Marca from '@/models/Marca';
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            marca: new Marca()
        }
    },
    created() {
        this.marca = this.$route.params.marca;
    },
    methods: {
        confirmarEdicionMarca() {
            axios.put(`http://localhost:8000/api/v1/tienda/editarMarca`, this.marca)
                .then(response => {
                    this.$router.push({ name: 'marcas' });
                    window.alert(response.data)
                })
                .catch(error => {
                    console.error('Error al guardar los cambios:', error);
                    if (error == 'AxiosError: Request failed with status code 500') {
                        window.alert('La marca ya existe')
                    }
                });
        },
        cancelarEdicionMarca() {
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