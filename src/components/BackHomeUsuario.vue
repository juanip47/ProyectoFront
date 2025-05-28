<template>
  <v-app-bar app dark>
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

    <div class="carrito" @click="goToCarrito">
      <v-img
        ref="carritoImg"
        id="carrito-img"
        alt="Carrito"
        class="shrink mr-2"
        contain
        src="../assets/Carrito.png"
        transition="scale-transition"
        width="7.5vh"
      />
    </div>

    <div class="atras" @click="goBack">
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
  mounted() {
    this.$root.$on('animar-carrito', this.animarCarrito);
  },
  beforeDestroy() {
    this.$root.$off('animar-carrito', this.animarCarrito);
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'usuario' });
    },
    goBack() {
      window.history.go(-1);
    },
    goToCarrito() {
      this.$router.push( { name: 'carrito' } );
    },
    animarCarrito() {
      const carrito = this.$refs.carritoImg?.$el;
      if (carrito) {
        carrito.classList.add('carrito-animado');
        setTimeout(() => {
          carrito.classList.remove('carrito-animado');
        }, 300); // Tiempo debe coincidir con la duración en CSS
      }
    }
  }
}
</script>

<style scoped>
.atras {
  margin-left: 2vw;
}
.carrito {
  margin-left: 78vw;
}

/* Animación carrito */
#carrito-img {
  transition: transform 0.3s ease;
}

.carrito-animado {
  transform: scale(0.6);
}
</style>
