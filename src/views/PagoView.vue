<template>
  <v-container class="form-container">
    <v-card class="form-card">
      <v-card-title class="text-center">Pago con Tarjeta</v-card-title>
      <v-card-text>
        <v-form v-model="formValido" ref="form" lazy-validation>
          <v-text-field
            v-model="tarjeta.numero"
            label="Número de Tarjeta"
            maxlength="16"
            class="input-small"
            :rules="[rules.requerido, rules.numeroLuhn]"
            required
          />

          <v-text-field
            v-model="tarjeta.nombreTitular"
            label="Nombre del Titular"
            class="input-small"
            :rules="[rules.requerido]"
            required
          />

          <v-text-field
            v-model="tarjeta.expiracion"
            label="Fecha de Expiración (MM/AA)"
            placeholder="MM/AA"
            maxlength="5"
            class="input-small"
            :rules="[rules.requerido, rules.expiracion]"
            required
            @input="formatearExpiracion"
          />

          <v-text-field
            v-model="tarjeta.cvv"
            :type="mostrarCVV ? 'text' : 'password'"
            label="CVV"
            maxlength="3"
            class="input-small"
            :append-icon="mostrarCVV ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="mostrarCVV = !mostrarCVV"
            :rules="[rules.requerido, rules.cvv]"
            required
          />

          <v-btn
            color="success"
            class="mt-4"
            :disabled="!formValido"
            @click="procesarPago"
          >
            Pagar
          </v-btn>
          <v-btn
            color="error"
            class="mt-4"
            @click="cancelarPago"
          >
            Cancelar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formValido: false,
      mostrarCVV: false,
      tarjeta: {
        nombreTitular: '',
        numero: '',
        expiracion: '',
        cvv: ''
      },
      rules: {
        requerido: v => !!v || 'Este campo es obligatorio',
        numeroLuhn: v =>
          /^\d{16}$/.test(v) && isValidLuhn(v) || 'Número inválido según algoritmo de Luhn',
        expiracion: v =>
          /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) || 'Formato MM/AA válido',
        cvv: v => /^\d{3}$/.test(v) || 'Debe tener 3 dígitos'
      }
    };
  },
  methods: {
    procesarPago() {
      if (this.$refs.form.validate()) {
        
      }
    },
    cancelarPago() {
        this.$router.push({ name: 'carrito' });
    },
    formatearExpiracion() {
      let val = this.tarjeta.expiracion.replace(/[^0-9]/g, '');
      if (val.length > 4) val = val.slice(0, 4);
      if (val.length >= 3) {
        val = val.slice(0, 2) + '/' + val.slice(2);
      }
      this.tarjeta.expiracion = val;
    }
  }
};

function isValidLuhn(numero) {
  let suma = 0;
  let alt = false;
  for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    suma += n;
    alt = !alt;
  }
  return suma % 10 === 0;
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* centra verticalmente */
}

.form-card {
  width: 320px;
  padding: 20px;
}

.input-small {
  max-width: 250px;
  margin: 0 auto;
}
</style>
