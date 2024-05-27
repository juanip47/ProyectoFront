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
                        <div class="hijos">
                            <v-select
                                v-model="articulo.marca.idMarca"
                                :items="marcas"
                                label="Selecciona la marca"
                                item-value="idMarca"
                                item-text="nombreMarca"
                                solo
                                dense
                            ></v-select>
                        </div>
                        <v-btn
                            type="submit" 
                            class="submit"
                            color="success"
                        >Guardar Cambios</v-btn>
                        <v-btn 
                            class="cancelar"
                            color="error"
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
import Articulo from '@/models/Articulo';
export default {
    components: {
        BackHome,
    },
    data() {
        return {
            articulo: new Articulo(),
            secciones:[],
            marcas:[]
        }
    },
    created() {
        this.articulo = this.$route.params.articulo;
        this.obtenerSecciones();
        this.obtenerProveedores();
    },
    methods: {
        confirmarEdicionArticulo() {
            axios.put(`http://localhost:8000/api/v1/tienda/editarArticulo`, this.articulo)
                .then(response => {
                    this.$router.push({ name: 'articulos' });
                    window.alert(response.data)
                })
                .catch(error => {
                    console.error('Error al guardar los cambios:', error);
                    if (error == 'AxiosError: Request failed with status code 500') {
                        window.alert('El artículo ya existe')
                    }
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
        obtenerProveedores() {
            axios.get('http://localhost:8000/api/v1/tienda/marcas')
            .then(response => {
                this.marcas = response.data;
            })
            .catch(error => {
              console.error('Error al recuperar marcas:', error);
            });
        },
        cancelarEdicionArticulo() {
            this.$router.push({ name: 'articulos' });
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