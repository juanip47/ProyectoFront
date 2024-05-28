<template>
  <v-container>
    <BackHome/>
    <h2 class="encabezado">Listado de Artículos de {{ this.marca.nombreMarca }}</h2>
    <v-data-table
      :headers="headers"
      :items="articulos"
      item-key="idArticulo"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.idArticulo }}</td>
          <td>{{ item.descripcionArticulo }}</td>
          <td>{{ item.cantidadArticulo }}</td>
          <td>{{ item.precioArticulo }}</td>
          <td>{{ item.seccion?.nombreSeccion }}</td>
          <td class="acciones">
            <v-icon mid color="info" @click.stop="editarArticulos(item)">mdi-pencil</v-icon>
            <v-icon mid color="error" @click.stop="confirmarEliminarArticulo(item.idArticulo)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-card>
      <v-card-text>
        <button class="crear" @click="crearArticulo"><v-icon mdi color="black" size="x-large">mdi-plus</v-icon></button>
      </v-card-text>
    </v-card>

    <v-dialog v-model="confirmacionEliminacionArticulo" max-width="500">
      <v-card>
        <v-card-title>¿Seguro que quieres borrar este artículo?</v-card-title>
        <v-card-actions>
          <v-btn color="error" text @click="confirmacionEliminacionArticulo = false">Cancelar</v-btn>
          <v-btn color="success" text @click="eliminarArticulo(articuloAEliminar)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios';
import BackHome from '../components/BackHome.vue';
import Marca from '@/models/Marca'
export default {
    components: {
    BackHome
    },
  data() {
    return {
      articulos:[],
      headers: [
        { text: 'Id', value: 'idArticulo' },
        { text: 'Descripcion', value: 'descripcionArticulo' },
        { text: 'Cantidad', value: 'cantidadArticulo' },
        { text: 'Precio', value: 'precioArticulo' },
        { text: 'Marca', value: 'nombreMarca' },
        { text: 'Editar' }
      ],
      confirmacionEliminacionArticulo: false,
      articuloAEliminar: null,
      marca: new Marca()
    }
  },
  created() {
    this.marca = this.$route.params.marca;
    this.obtenerArticulosPorMarca()
  },
  methods: {
    obtenerArticulosPorMarca() {
        axios.get(`http://localhost:8000/api/v1/tienda/articulos/marca?idMarca=${this.marca.idMarca}`)
            .then(response => {
                this.articulos = response.data;
            })
            .catch(error => {
              console.error('Error al recuperar artículos:', error);
            });
    },
    editarArticulos(articulo) {
      this.$router.push({ name: 'editarArticulo', params: { articulo } });
    },
    confirmarEliminarArticulo(idArticulo) {
       this.articuloAEliminar = idArticulo;
       this.confirmacionEliminacionArticulo = true; 
    },
    eliminarArticulo(idArticulo) {
      console.log("Elimando articulo con Id:", idArticulo);
      axios.delete(`http://localhost:8000/api/v1/tienda/articulo?idArticulo=${idArticulo}`)
        .then(response => {
            console.log(response.data);
            this.obtenerArticulosPorMarca();
        })
        .catch(error => {
          console.log('Error al eliminar el artículo:', error)
        })

        this.confirmacionEliminacionArticulo = false;
    },
    crearArticulo() {
      this.$router.push({ name: 'crearArticulo' });
    }
  }
};
</script>

<style scoped>
  .encabezado{
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
  }
  .crear{
    padding: 0 49% 0 49%;
  }
</style>
