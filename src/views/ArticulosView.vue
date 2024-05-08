<template>
  <v-container>
    <BackHome/>
    <h2 class="encabezado">Listado de Articulos</h2>
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
          <td>{{ item.seccion.nombreSeccion }}</td>
          <td class="acciones">
            <v-icon mid color="blue" @click.stop="editarArticulos(item)">mdi-pencil</v-icon>
            <v-icon mid color="red" @click.stop="confirmarEliminarArticulo(item.idArticulo)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="confirmacionEliminacionArticulo" max-width="500">
      <v-card>
        <v-card-title>¿Seguro que quieres borrar este artículo?</v-card-title>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="confirmacionEliminacionArticulo = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="eliminarArticulo(articuloAEliminar)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios';
import BackHome from '../components/BackHome.vue';
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
        { text: 'Seccion', value: 'nombreSeccion' },
      ],
      confirmacionEliminacionArticulo: false,
      articuloAEliminar: null
    };
  },
  created() {
    this.fetchArticulos();
  },
  methods: {
    fetchArticulos() {
        axios.get('http://localhost:8000/api/v1/tienda/articulos')
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
            this.fetchArticulos();
        })
        .catch(error => {
          console.log('Error al eliminar el artículo:', error)
        })

        this.confirmacionEliminacionArticulo = false;
    }
  }
};
</script>

<style scoped>
  .encabezado{
    color: red;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
  }
</style>
