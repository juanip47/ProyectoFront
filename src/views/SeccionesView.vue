<template>
  <v-container>
    <BackHome/>
    <h2 class="encabezadoSeccion">Listado de Secciones</h2>
    <v-data-table
      :headers="headers"
      :items="secciones"
      item-key="idSeccion"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.idSeccion }}</td>
          <td>{{ item.nombreSeccion }}</td>
          <td><v-btn color="primary" @click="verArticulosPorSeccion(item)">Ver</v-btn></td>
          <td class="acciones">
            <v-icon mid color="info" @click.stop="editarSecciones(item)">mdi-pencil</v-icon>
            <v-icon mid color="error" @click.stop="confirmarEliminarSeccion(item.idSeccion)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-card>
      <v-card-text>
        <button class="crearSeccion" @click="crearSeccion"><v-icon mdi color="black" size="x-large">mdi-plus</v-icon></button>
      </v-card-text>
    </v-card>

    <v-dialog v-model="confirmacionEliminacionSeccion" max-width="500">
      <v-card>
        <v-card-title>¿Seguro que quieres borrar esta sección?</v-card-title>
        <v-card-actions>
          <v-btn color="error" text @click="confirmacionEliminacionSeccion = false">Cancelar</v-btn>
          <v-btn color="success" text @click="eliminarSeccion(seccionAEliminar)">Confirmar</v-btn>
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
      secciones:[],
      headers: [
        { text: 'Id', value: 'idSeccion' },
        { text: 'Sección', value: 'nombreSeccion' },
        { text: 'Artículos' },
        { text: 'Editar' }
      ],
      confirmacionEliminacionSeccion: false,
      seccionAEliminar: null
    };
  },
  created() {
    this.obtenerSecciones()
  },
  methods: {
    obtenerSecciones() {
        axios.get('http://localhost:8000/api/v1/tienda/secciones')
            .then(response => {
                this.secciones = response.data;
            })
            .catch(error => {
              console.error('Error al recuperar secciones:', error);
            });
    },
    editarSecciones(seccion) {
      this.$router.push({ name: 'editarSeccion', params: { seccion } });
    },
    confirmarEliminarSeccion(idSeccion) {
       this.seccionAEliminar = idSeccion;
       this.confirmacionEliminacionSeccion = true; 
    },
    eliminarSeccion(idSeccion) {
      console.log("Elimando seccion con Id:", idSeccion);
      axios.delete(`http://localhost:8000/api/v1/tienda/seccion?idSeccion=${idSeccion}`)
        .then(response => {
            console.log(response.data);
            this.obtenerSecciones();
        })
        .catch(error => {
          console.log('Error al eliminar la sección:', error)
        })

        this.confirmacionEliminacionSeccion = false;
    },
    crearSeccion() {
      this.$router.push({ name: 'crearSeccion' });
    },
    verArticulosPorSeccion(seccion) {
        this.$router.push({ name:'articulosPorSeccion', params: { seccion } });
    }
  }
};
</script>

<style scoped>
  .encabezadoSeccion{
    color: greenyellow;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    text-align: center;
  }
  .crearSeccion{
    padding: 0 49% 0 49%;
  }
</style>
