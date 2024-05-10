<template>
    <v-container>
        <BackHome/>

        <v-row>
            <v-card class="carta" @click="irGestionInventario">
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

        <v-card class="carta" @click="irGestionSecciones">
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

        <v-card class="carta">
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

    }, 
    created() {

    },
    methods: {
        irGestionInventario() {
            this.$router.push({ name: 'articulos' })
        },
        irGestionSecciones() {
            this.$router.push({ name: 'secciones' })
        }
    }
}
</script>

<style>
.carta{
    width: 20%;
    margin: 13% 6.5% 0 6.5%;
}
</style>