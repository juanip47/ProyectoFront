<template>
  <v-container>
    <BackHomeUsuario />
    <h2 class="encabezadoAdmin">Bienvenido {{ usuarioLogueado.nombreUsuario }}</h2>

    <div class="articulos-grid">
      <div class="articulo-card" v-for="item in articulos" :key="item.idArticulo">
        <img :src="`/img/${item.imagenArticulo}`" alt="Imagen Artículo" class="imagen-articulo" />

        <h3>{{ item.descripcionArticulo }}</h3>
        <p><strong>Precio:</strong> ${{ item.precioArticulo }}</p>

        <v-btn color="primary" @click="item.mostrarCantidad = true" v-if="!item.mostrarCantidad">
          Comprar
        </v-btn>

        <div v-if="item.mostrarCantidad" class="mt-2">
          <label for="cantidad">Cantidad:</label>
          <select v-model="item.cantidadSeleccionada">
            <option v-for="n in item.cantidadArticulo" :key="n" :value="n">{{ n }}</option>
          </select>

          <v-btn color="success" class="mt-2" @click="agregarAlCarrito(item)">
            Agregar al carrito
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import BackHomeUsuario from '../components/BackHomeUsuario.vue';
import Usuario from '../models/Usuario';

export default {
  components: {
    BackHomeUsuario
  },
  data() {
    return {
      usuarioLogueado: new Usuario(),
      articulos: []
    };
  },
  created() {
    this.obtenerUsuarioLogueado();
    this.fetchArticulos();
  },
  methods: {
    obtenerUsuarioLogueado() {
      const correo = localStorage.correo;

      if (!correo) {
        this.$router.push({ name: 'login' });
      } else {
        axios
          .get(`http://localhost:8000/api/v1/tienda/usuarioPorCorreo?correoUsuario=${correo}`)
          .then(response => {
            this.usuarioLogueado = response.data;
          })
          .catch(error => {
            console.log('Error al obtener el usuario:', error);
          });
      }
    },
    fetchArticulos() {
      axios
        .get('http://localhost:8000/api/v1/tienda/articulos')
        .then(response => {
          this.articulos = response.data.map(item => ({
            ...item,
            cantidadSeleccionada: 1,
            mostrarCantidad: false
          }));
        })
        .catch(error => {
          console.error('Error al recuperar artículos:', error);
        });
    },
    agregarAlCarrito(item) {
      const correoUsuario = localStorage.correo;

      if (!correoUsuario) {
        alert('Debes iniciar sesión para agregar al carrito.');
        this.$router.push({ name: 'login' });
        return;
      }

      const carrito = {
        correoUsuario: correoUsuario,
        idArticulo: item.idArticulo,
        cantidadArticulo: item.cantidadSeleccionada
      };

      axios
        .post('http://localhost:8000/api/v1/tienda/nuevoCarrito', carrito)
        .then(() => {
          item.mostrarCantidad = false;
          this.$root.$emit('animar-carrito');
        })
        .catch(error => {
          console.error('Error al agregar al carrito:', error);
          alert('No se pudo agregar el producto al carrito.');
        });
    }
  }
};
</script>

<style>
.articulos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.articulo-card {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.imagen-articulo {
  width: 100%;
  max-height: 150px;
  object-fit: contain;
  margin-bottom: 12px;
}

.encabezadoAdmin {
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
  text-align: center;
  color: white;
  margin-top: 16px;
}
</style>
