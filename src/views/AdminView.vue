<template>
    <v-container>
        <BackHome/>

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

            <v-card  @click="irGestionProveedores" class="carta">
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
        </v-row>
    </v-container>
</template>

<script>
import BackHome from '../components/BackHome.vue'
export default {
    components: {
        BackHome
    },
    data() {
        return{ };
    }, 
    created() {

    },
    methods: {
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
.carta{
    width: 20%;
    margin: 5% 6.5% 2% 6.5%;
}
</style>