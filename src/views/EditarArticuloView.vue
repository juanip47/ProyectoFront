<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezado">Editar Artículo</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="confirmarEdicionArticulo">
                        <div class="hijos">
                            <label for="descripcion">Descripción:</label>
                            <input v-model="articulo.descripcionArticulo" type="text" class="form-control" id="descripcion" required>
                        </div>
                        <div class="hijos">
                            <label for="cantidad">Cantidad:</label>
                            <input v-model="articulo.cantidadArticulo" type="number" class="form-control" id="cantidad" required>
                        </div>
                        <div class="hijos">
                            <label for="precio">Precio:</label>
                            <input v-model="articulo.precioArticulo" type="number" class="form-control" id="precio" required>
                        </div>
                        <div class="hijos">
                            <v-select
                                v-model="articulo.seccion.idSeccion"
                                :items="secciones"
                                label="Selecciona la sección"
                                item-value="idSeccion"
                                item-text="nombreSeccion"
                                solo
                                dense
                            ></v-select>
                        </div>
                        <v-btn
                            type="submit" 
                            class="submit"
                        >Guardar Cambios</v-btn>
                        <v-btn 
                            class="cancelar" 
                            @click="cancelarEdicionArticulo"
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
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            articulo: {
                descripcionArticulo: "",
                cantidadArticulo: null,
                precioArticulo: null,
                seccion: {
                    idSeccion: null,
                    nombreSeccion: ""
                }
            },
            secciones:[]
        }
    },
    created() {
        this.articulo = this.$route.params.articulo;
        this.obtenerSecciones();
    },
    methods: {
        confirmarEdicionArticulo() {
            axios.put(`http://localhost:8000/api/v1/tienda/editarArticulo`, this.articulo)
                .then(() => {
                    this.$router.push({ name: 'articulos' });
                })
                .catch(error => {
                    console.error('Error al guardar los cambios:', error);
                });
        },
        obtenerSecciones() {
            axios.get('http://localhost:8000/api/v1/tienda/secciones')
                .then(response => {
                    this.secciones = response.data;
                })
                .catch(error => {
                    console.error('Error al recuperar secciones:', error);
                });
        },
        cancelarEdicionArticulo() {
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