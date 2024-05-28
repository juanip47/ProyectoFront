<template>
  <v-container>
    <v-row justify="center">
        <v-col cols="20" sm="10" md="6">
            <v-card>
                <v-card-title class="headline encabezadoLogin">
                    <v-img
                        alt="H&S Super Logo"
                        class="shrink mr-2"
                        contain
                        src="../assets/Logo H&S Super.png"
                        transition="scale-transition"
                        width="60"
                    />
                </v-card-title>
                <div class="erroresLogin">
                    <p v-if="errores.length">
                        <ul>
                            <li v-for="error in errores" :key="error">{{ error }}</li>
                        </ul>
                    </p>
                </div>
                <v-card-text>
                    <v-form>
                        <div class="hijosLogin">
                            <label for="correo">Correo:</label>
                            <input v-model="correo" type="text" class="form-control" id="correo" required>
                        </div>
                        <div class="hijosLogin">
                            <label for="contrasenia">Contraseña:</label>
                            <input v-model="contrasenia" type="password" class="form-control" id="contrasenia" required>
                        </div>
                        <v-btn 
                            class="submitLogin"
                            @click="validarLoginUsuario"
                        >Continuar</v-btn>
                        <br/>
                        <button 
                            class="crearUsuarioLogin"
                            @click="crearUsuario"
                        >¿No tienes cuenta? Crea una aquí</button>
                    </v-form>
                    
                    <div class="btn-cont">
                        <div id="google-login-btn" v-google-identity-login-btn="{ clientId }">
                            Continuar con google
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import BackHome from '../components/BackHome.vue';
import Usuario from '../models/Usuario';
import GoogleSignInButton from 'vue-google-identity-login-btn';

export default {
    components: {
        BackHome,
    },
    directives: {
        GoogleSignInButton
    },
    data() {
        return {
            correo: "",
            contrasenia: "",
            usuarioComprobar: new Usuario(),
            errores: [],
            clientId: '970960317167-7sert4gccigpvc9bnj76gafns1jdvrjv.apps.googleusercontent.com'
        }
    },
    created() {
        
    },
    methods: {
        validarLoginUsuario() {
            axios.get(`http://localhost:8000/api/v1/tienda/usuarioPorCorreo?correoUsuario=${this.correo}`)
                .then(response => {
                    this.usuarioComprobar = response.data
                    if (this.usuarioComprobar.contraseniaUsuario == this.contrasenia) {
                        this.errorValidacion = false
                        this.$router.push({ name: 'admin' });
                    } else {
                        this.errores = []

                        if (!this.contrasenia) {
                            this.errores.push('Contraseña requerido')
                        } else {
                            this.errores.push('Contraseña incorrecta')
                        }
                    }
                })
                .catch(error => {
                    console.log('Error al obtener el usuario:', error)
                    this.errores = []

                    if (!this.correo) {
                        this.errores.push('Correo requerido')
                    } else {
                        this.errores.push('No existe usuario con este correo')
                    }

                    if (!this.contrasenia) {
                        this.errores.push('Contraseña requerido')
                    }
                })
        },
        crearUsuario() {
            this.$router.push({ name: 'crearUsuario' });
        },
        onGoogleAuthSuccess (jwtCredentials) {
            console.log(jwtCredentials);
            const profileData = JSON.parse( atob(jwtCredentials.split('.')[1]) );
            const { name, picture, email } = profileData;
            console.table({ name, picture, email });
        }
    }
}
</script>

<style>
.v-main{
    background: -webkit-linear-gradient(360deg, #3d8c93,#5fcdca);
    background: linear-gradient(360deg, #3d8c93,#5fcdca);
}
.encabezadoLogin{
    display: flex;
    justify-content: center;
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    margin-top: 20%;
}
.hijosLogin{
    margin-top: 2%;
    text-align: center;
}
.submitLogin{
    font-family: 'Times New Roman', Times, serif;
    font-style: italic;
    border-radius: 5%;
    margin: 5% 0 0 38.5%; 
}
.crearUsuarioLogin{
    font-family: 'Times New Roman', Times, serif;
    color: blue;
    font-style: italic;
    font-weight: bold;
    font-style: italic;
    margin: 3% 0 0 33%;    
}
.erroresLogin{
    text-align: center;
    color: red;
}
label{
    margin-right: 2.5%;
}
ul{
    list-style: none;
}

.btn-cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
}
.btn-cont > div {
  text-align: center;
}
</style>