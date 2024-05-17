<template>
  <v-container>
    <BackHome/>
    <h2 class="encabezadoUsuario">Listado de Usuarios</h2>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      item-key="correoUsuario"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.correoUsuario }}</td>
          <td>{{ item.contraseniaUsuario }}</td>
          <td class="acciones">
            <v-icon mid color="info" @click.stop="editarUsuarios(item)">mdi-pencil</v-icon>
            <v-icon mid color="error" @click.stop="confirmarEliminarUsuario(item.correoUsuario)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-card>
      <v-card-text>
        <button class="crearUsuario" @click="crearUsuario"><v-icon mdi color="black" size="x-large">mdi-plus</v-icon></button>
      </v-card-text>
    </v-card>

    <v-dialog v-model="confirmacionEliminacionUsuario" max-width="500">
      <v-card>
        <v-card-title>¿Seguro que quieres borrar a este usuario?</v-card-title>
        <v-card-actions>
          <v-btn color="error" text @click="confirmacionEliminacionUsuario = false">Cancelar</v-btn>
          <v-btn color="success" text @click="eliminarUsuario(usuarioAEliminar)">Confirmar</v-btn>
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
      usuarios:[],
      headers: [
        { text: 'Correo', value: 'correoUsuario' },
        { text: 'Contraseña', value: 'contraseniaUsuario' },
      ],
      confirmacionEliminacionUsuario: false,
      usuarioAEliminar: null
    };
  },
  created() {
    this.obtenerUsuarios()
  },
  methods: {
    obtenerUsuarios() {
        axios.get('http://localhost:8000/api/v1/tienda/usuarios')
            .then(response => {
                this.usuarios = response.data;
            })
            .catch(error => {
              console.error('Error al recuperar usuarios:', error);
            });
    },
    editarUsuarios(usuario) {
      this.$router.push({ name: 'editarUsuario', params: { usuario } });
    },
    confirmarEliminarUsuario(correoUsuario) {
       this.usuarioAEliminar = correoUsuario;
       this.confirmacionEliminacionUsuario = true; 
    },
    eliminarUsuario(correoUsuario) {
      console.log("Elimando usuario con su correo:", correoUsuario);
      axios.delete(`http://localhost:8000/api/v1/tienda/usuario?correoUsuario=${correoUsuario}`)
        .then(response => {
            console.log(response.data);
            this.obtenerUsuarios();
        })
        .catch(error => {
          console.log('Error al eliminar al usuario:', error)
        })

        this.confirmacionEliminacionUsuario = false;
    },
    crearUsuario() {
      this.$router.push({ name: 'crearUsuario' });
    }
  }
};
</script>

<style>
  .encabezadoUsuario{
    color: greenyellow;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    text-align: center;
  }
  .crearUsuario{
    padding: 0 49% 0 49%;
  }
</style>
