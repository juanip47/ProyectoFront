<template></template>

<script>
export default {
  data() {
    return {
      
    }
  },
  created() {
    this.primeraRedireccion(this.correo)
  },
  methods: {
    primeraRedireccion(correo) {
      correo = localStorage.correo;

        if (correo == null) {
          this.$router.push({ name: 'login' })
        } else {
          this.$router.push({ name: 'admin' })
        }
    }
  },
}
</script>

<style scoped>

</style>
