<template>
  <v-container>
    <BackHomeUsuario />
    <h2 class="encabezadoArticulo">Carrito de la compra</h2>

    <v-data-table
      :headers="headers"
      :items="carrito"
      item-key="idArticulo"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.descripcionArticulo }}</td>
          <td>
            <img
              :src="`/img/${item.imagenArticulo}`"
              alt="Imagen Artículo"
              width="100"
              style="cursor: pointer"
              @click="mostrarImagen(`/img/${item.imagenArticulo}`)"
            />
          </td>
          <td>{{ item.precioArticulo.toFixed(2) }}</td>
          <td>{{ item.cantidadArticulo }}</td>
          <td>{{ (item.precioArticulo * item.cantidadArticulo).toFixed(2) }} €</td>
          <td class="acciones">
            <v-icon mid color="error" @click.stop="confirmarEliminarArticulo(item.idArticulo)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Fila con total debajo de la tabla -->
    <v-card>
      <v-card-text class="boton-vaciar">
        <strong>Total de la compra: {{ totalCompra.toFixed(2) }} €</strong>
      </v-card-text>
    </v-card>

    <!-- Botón Vaciar Carrito -->
    <v-card>
      <v-card-text class="boton-vaciar">
      <v-btn color="success" @click="irPago" dark>
          Pagar
        </v-btn>
        <v-btn color="error" @click="vaciarCarrito" dark>
          Vaciar Carrito
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Confirmación eliminación -->
    <v-dialog v-model="confirmacionEliminacionArticulo" max-width="500">
      <v-card>
        <v-card-title>¿Seguro que quieres quitar este artículo del carrito?</v-card-title>
        <v-card-actions>
          <v-btn color="error" text @click="confirmacionEliminacionArticulo = false">Cancelar</v-btn>
          <v-btn color="success" text @click="eliminarArticulo(articuloAEliminar)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de imagen ampliada -->
    <v-dialog v-model="dialogoImagen" max-width="600" persistent @click:outside="cerrarImagen">
      <v-card class="imagen-dialogo-card" elevation="0">
        <v-img :src="imagenSeleccionada" contain height="500"></v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import BackHomeUsuario from '../components/BackHomeUsuario.vue';

export default {
  components: {
    BackHomeUsuario
  },
  data() {
    return {
      carrito: [],
      headers: [
        { text: 'Artículo', value: 'descripcionArticulo' },
        { text: 'Imagen', value: 'imagenArticulo' },
        { text: 'PvP', value: 'precioArticulo' },
        { text: 'Cantidad', value: 'cantidadArticulo' },
        { text: 'Total', value: 'totalArticulo' },
        { text: 'Eliminar' }
      ],
      confirmacionEliminacionArticulo: false,
      articuloAEliminar: null,
      correoUsuario: localStorage.correo,
      dialogoImagen: false,
      imagenSeleccionada: ''
    };
  },
  computed: {
    totalCompra() {
      return this.carrito.reduce((total, item) => {
        return total + item.precioArticulo * item.cantidadArticulo;
      }, 0);
    }
  },
  created() {
    this.fetchCarrito();
  },
  methods: {
    async fetchCarrito() {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/tienda/carrito/usuario?correoUsuario=${this.correoUsuario}`);
        const base = response.data;
        const enriquecido = await Promise.all(
          base.map(async (item) => {
            try {
              const res = await axios.get(`http://localhost:8000/api/v1/tienda/articulo/id?idArticulo=${item.idArticulo}`);
              const art = res.data;
              return {
                ...item,
                descripcionArticulo: art.descripcionArticulo,
                imagenArticulo: art.imagenArticulo,
                precioArticulo: art.precioArticulo
              };
            } catch {
              return item;
            }
          })
        );
        this.carrito = enriquecido;
      } catch (error) {
        console.error('Error al recuperar el carrito:', error);
      }
    },
    confirmarEliminarArticulo(idArticulo) {
      this.articuloAEliminar = idArticulo;
      this.confirmacionEliminacionArticulo = true;
    },
    eliminarArticulo(idArticulo) {
      axios.delete(`http://localhost:8000/api/v1/tienda/articulo/carrito?correoUsuario=${this.correoUsuario}&idArticulo=${idArticulo}`)
        .then(() => {
          this.fetchCarrito();
        })
        .catch(error => {
          console.log('Error al eliminar el artículo:', error);
        });
      this.confirmacionEliminacionArticulo = false;
    },
    vaciarCarrito() {
      axios.delete(`http://localhost:8000/api/v1/tienda/carrito?correoUsuario=${this.correoUsuario}`)
        .then(() => {
          this.fetchCarrito();
        })
        .catch(error => {
          console.log('Error al vaciar el carrito:', error);
        });
    },
    irPago() {
      this.$router.push({ name: 'pago' });
    },
    mostrarImagen(ruta) {
      this.imagenSeleccionada = ruta;
      this.dialogoImagen = true;
    },
    cerrarImagen() {
      this.dialogoImagen = false;
      this.imagenSeleccionada = '';
    }
  }
};
</script>

<style scoped>
.encabezadoArticulo {
  color: white;
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
  text-align: center;
}
.acciones {
  text-align: center;
}
.boton-vaciar {
  display: flex;
  justify-content: center;
}
.imagen-dialogo-card {
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
