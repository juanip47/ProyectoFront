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
        width="55"
      />
       <v-app-bar-title @click="goToHome">H&S Super</v-app-bar-title>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ name: 'admin' });
    }
  }
}
</script>

<style>

</style>