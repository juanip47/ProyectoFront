<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="20" sm="10" md="6">
        <v-card>
          <v-card-title class="headline encabezado">Crear Artículo</v-card-title>
          <div class="erroresArticulos" v-if="errores.length">
            <ul>
              <li v-for="error in errores" :key="error">{{ error }}</li>
            </ul>
          </div>
          <v-card-text>
            <v-form @submit.prevent="confirmarCreacionArticulo">
              <div class="hijos">
                <label for="descripcion">Descripción:</label>
                <input
                  v-model="articulo.descripcionArticulo"
                  type="text"
                  class="form-control"
                  id="descripcion"
                  required
                >
              </div>
              <div class="hijos">
                <label for="cantidad">Cantidad:</label>
                <input
                  v-model.number="articulo.cantidadArticulo"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  required
                  min="0"
                >
              </div>
              <div class="hijos">
                <label for="precio">Precio:</label>
                <input
                  v-model.number="articulo.precioArticulo"
                  type="number"
                  class="form-control"
                  id="precio"
                  required
                  min="0"
                >
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
                :disabled="errores.length > 0"
              >Crear</v-btn>
              <v-btn  
                class="cancelar"
                color="error"
                @click="cancelarCreacionArticulo"
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
        },
        marca: {
          idMarca: null,
          nombreMarca: ""
        }
      },
      secciones: [],
      marcas: [],
      errores: []
    };
  },
  created() {
    this.obtenerSecciones();
    this.obtenerProveedores();
  },
  methods: {
    confirmarCreacionArticulo() {
      const nuevosErrores = new Set();

      if (!this.articulo.descripcionArticulo.trim()) {
        nuevosErrores.add('La descripción es obligatoria');
      }

      if (this.articulo.cantidadArticulo === null || this.articulo.cantidadArticulo < 0) {
        nuevosErrores.add('La cantidad tiene que ser mayor o igual a 0');
      }

      if (this.articulo.precioArticulo === null || this.articulo.precioArticulo < 0) {
        nuevosErrores.add('El precio tiene que ser mayor o igual a 0');
      }

      if (!this.articulo.seccion.idSeccion) {
        nuevosErrores.add('Debe seleccionar una sección');
      }

      if (!this.articulo.marca.idMarca) {
        nuevosErrores.add('Debe seleccionar una marca');
      }

      this.errores = Array.from(nuevosErrores);

      if (this.errores.length === 0) {
        axios.post('http://localhost:8000/api/v1/tienda/nuevoArticulo', this.articulo)
          .then(response => {
            this.$router.push({ name: 'articulos' });
            window.alert(response.data);
          })
          .catch(error => {
            console.error('Error al crear el nuevo artículo:', error);
            if (error.toString().includes('500')) {
              window.alert('El artículo ya existe');
            }
          });
      }
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
    cancelarCreacionArticulo() {
      this.$router.push({ name: 'articulos' });
    }
  },
  watch: {
    'articulo.descripcionArticulo'(nuevoValor) {
      if (nuevoValor.trim()) {
        this.errores = this.errores.filter(err => err !== 'La descripción es obligatoria');
      }
    },
    'articulo.cantidadArticulo'(nuevoValor) {
      if (nuevoValor !== null && nuevoValor >= 0) {
        this.errores = this.errores.filter(err => err !== 'La cantidad tiene que ser mayor o igual a 0');
      }
    },
    'articulo.precioArticulo'(nuevoValor) {
      if (nuevoValor !== null && nuevoValor >= 0) {
        this.errores = this.errores.filter(err => err !== 'El precio tiene que ser mayor o igual a 0');
      }
    },
    'articulo.seccion.idSeccion'(nuevoValor) {
      if (nuevoValor) {
        this.errores = this.errores.filter(err => err !== 'Debe seleccionar una sección');
      }
    },
    'articulo.marca.idMarca'(nuevoValor) {
      if (nuevoValor) {
        this.errores = this.errores.filter(err => err !== 'Debe seleccionar una marca');
      }
    }
  }
};
</script>

<style>
.encabezado {
  display: flex;
  justify-content: center;
  color: red;
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
}
.erroresArticulos {
  text-align: center;
  color: red;
}
.hijos {
  margin-top: 2%;
  text-align: center;
}
</style>
