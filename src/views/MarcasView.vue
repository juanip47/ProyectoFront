<template>
  <v-container>
    <BackHome/>
    <h2 class="encabezadoMarca">Listado de Proveedores</h2>
    <v-data-table
      :headers="headers"
      :items="marcas"
      item-key="idMarca"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.idMarca }}</td>
          <td>{{ item.nombreMarca }}</td>
          <td><v-btn color="primary" @click="verArticulosPorMarca(item)">Ver</v-btn></td>
          <td class="acciones">
            <v-icon mid color="info" @click.stop="editarMarcas(item)">mdi-pencil</v-icon>
            <v-icon mid color="error" @click.stop="confirmarEliminarMarca(item.idMarca)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-card>
      <v-card-text>
        <button class="crearMarca" @click="crearMarca"><v-icon mdi color="black" size="x-large">mdi-plus</v-icon></button>
      </v-card-text>
    </v-card>

    <v-dialog v-model="confirmacionEliminacionMarca" max-width="500">
      <v-card>
        <v-card-title>¿Seguro que quieres borrar esta sección?</v-card-title>
        <v-card-actions>
          <v-btn color="error" text @click="confirmacionEliminacionMarca = false">Cancelar</v-btn>
          <v-btn color="success" text @click="eliminarMarca(marcaAEliminar)">Confirmar</v-btn>
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
      marcas:[],
      headers: [
        { text: 'Id', value: 'idMarca' },
        { text: 'Sección', value: 'nombreMarca' },
        { text: 'Artículos' },
        { text: 'Editar' }
      ],
      confirmacionEliminacionMarca: false,
      marcaAEliminar: null
    };
  },
  created() {
    this.obtenerMarcas()
  },
  methods: {
    obtenerMarcas() {
        axios.get('http://localhost:8000/api/v1/tienda/marcas')
            .then(response => {
                this.marcas = response.data;
            })
            .catch(error => {
              console.error('Error al recuperar marcas:', error);
            });
    },
    editarMarcas(marca) {
      this.$router.push({ name: 'editarMarca', params: { marca } });
    },
    confirmarEliminarMarca(idMarca) {
       this.marcaAEliminar = idMarca;
       this.confirmacionEliminacionMarca = true; 
    },
    eliminarMarca(idMarca) {
      console.log("Elimando marca con Id:", idMarca);
      axios.delete(`http://localhost:8000/api/v1/tienda/marca?idMarca=${idMarca}`)
        .then(response => {
            console.log(response.data);
            this.obtenerMarcas();
        })
        .catch(error => {
          console.log('Error al eliminar la sección:', error)
        })

        this.confirmacionEliminacionMarca = false;
    },
    crearMarca() {
      this.$router.push({ name: 'crearMarca' });
    },
    verArticulosPorMarca(marca) {
        this.$router.push({ name:'articulosPorMarca', params: { marca } });
    }
  }
};
</script>

<style scoped>
  .encabezadoMarca{
    color: greenyellow;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    text-align: center;
  }
  .crearMarca{
    padding: 0 49% 0 49%;
  }
</style>
