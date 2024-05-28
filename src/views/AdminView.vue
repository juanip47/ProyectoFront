<template>
    <v-container>
        <BackHome/>
        
        <h2 class="encabezadoAdmin">Bienvenido {{ usuarioLogueado.nombreUsuario }}</h2>
        <v-row>
            <v-card @click="irGestionInventario" class="carta">
                <v-card-text>
                    <v-img
                        alt="Imagen de almacén"
                        class="shrink mr-2"
                        contain
                        src="../assets/Almacen.jpg"
                        transition="scale-transition"
                        width="200"
                    />
                </v-card-text>
                <v-card-actions>Gestionar Inventario</v-card-actions>
            </v-card>

        <v-card @click="irGestionSecciones" class="carta">
            <v-card-text>
                    <v-img
                        alt="Imagen de almacén"
                        class="shrink mr-2"
                        contain
                        src="../assets/Secciones.jpg"
                        transition="scale-transition"
                        width="200"
                    />
                </v-card-text>
                <v-card-actions>Gestionar Secciones</v-card-actions>
            </v-card>

            <v-card  @click="irGestionUsuarios" class="carta">
                <v-card-text>
                    <v-img
                        alt="Imagen de almacén"
                        class="shrink mr-2"
                        contain
                        src="../assets/UsuarioDefault.jpg"
                        transition="scale-transition"
                        width="200"
                    />
                </v-card-text>
                <v-card-actions>Gestionar Usuarios</v-card-actions>
            </v-card>

            <v-card  @click="irGestionProveedores" class="carta2">
                <v-card-text>
                    <v-img
                        alt="Imagen de los proveedores"
                        class="shrink mr-2"
                        contain
                        src="../assets/Proveedores.jpg"
                        transition="scale-transition"
                        width="200"
                    />
                </v-card-text>
                <v-card-actions>Gestionar Proveedores</v-card-actions>
            </v-card>

            <v-card  @click="cerrarSesion" class="carta2">
                <v-card-text>
                    <v-img
                        alt="Imagen de LogOut"
                        class="shrink mr-2"
                        contain
                        src="../assets/LogOut.jpg"
                        transition="scale-transition"
                        width="200"
                    />
                </v-card-text>
                <v-card-actions>Cerrar Sesión</v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import BackHome from '../components/BackHome.vue'
import Usuario from '../models/Usuario'
import axios from 'axios';
export default {
    components: {
        BackHome
    },
    data() {
        return{
            usuarioLogueado: new Usuario()
        };
    },
    created() {
        this.obtenerUsuarioLogueado(this.correo);
    },
    mounted() {
        
    },
    methods: {
        obtenerUsuarioLogueado(correo) {
            correo = localStorage.correo;
            axios.get(`http://localhost:8000/api/v1/tienda/usuarioPorCorreo?correoUsuario=${correo}`)
                .then(response => {
                    this.usuarioLogueado = response.data
                })
                .catch(error => {
                    console.log('Error al obtener el usuario:', error)
                })
        },
        cerrarSesion() {
            localStorage.removeItem('correo')
            this.$router.push({ name: 'login' })
        },
        irGestionInventario() {
            this.$router.push({ name: 'articulos' })
        },
        irGestionSecciones() {
            this.$router.push({ name: 'secciones' })
        },
        irGestionUsuarios() {
            this.$router.push({ name: 'usuarios' })
        },
        irGestionProveedores() {
            this.$router.push({ name: 'marcas' })
        }
    }
}
</script>

<style>
.encabezadoAdmin{
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    text-align: center;
}
.carta{
    width: 20%;
    margin: 5% 6.5% 2% 6.5%;
}
.carta2{
    width: 20%;
    margin: 5% 0 2% 20%;
}
</style>