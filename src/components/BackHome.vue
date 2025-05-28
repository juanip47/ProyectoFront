<template>
  <v-app-bar
    app
    dark
  >
    <div class="d-flex align-center" @click="goToHome">
      <v-img
        alt="H&S Super Logo"
        class="shrink mr-2"
        contain
        src="../assets/Logo H&S Super.png"
        transition="scale-transition"
        width="7.5vh"
      />
       <v-app-bar-title @click="goToHome">H&S</v-app-bar-title>
    </div>
    <div class="atrasAdmin" @click="goBack">
      <v-img
        alt="Atrás"
        class="shrink mr-2"
        contain
        src="../assets/Flecha Atras.png"
        transition="scale-transition"
        width="7.5vh"
      />
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ name: 'admin' });
    },
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style>
.atrasAdmin{
  margin-left: 85vw;
}
</style>