<template>
    <form @submit.prevent="handleSubmit">
      <div class="row g-3">
        <div class="col-6">
          <label class="form-label fw-bold small">Prénom</label>
          <input v-model="form.firstname" type="text" class="form-control custom-input" placeholder="John" required>
        </div>
        <div class="col-6">
          <label class="form-label fw-bold small">Nom</label>
          <input v-model="form.lastname" type="text" class="form-control custom-input" placeholder="Doe" required>
        </div>
      </div>
  
      <div class="my-3">
        <label class="form-label fw-bold small">Email</label>
        <input v-model="form.email" type="email" class="form-control custom-input" placeholder="john@example.com" required>
      </div>
  
      <OperatorSelector v-model="form.operator" />
  
      <div class="mb-4">
        <label class="form-label fw-bold small">Compte Mobile Money</label>
        <div class="input-group">
          <span class="input-group-text bg-light border-end-0">
            <img src="https://flagcdn.com/w20/bj.png" width="20" class="me-2"> +229
          </span>
          <input v-model="form.phone" type="tel" class="form-control custom-input border-start-0" placeholder="97000001" required>
        </div>
        <div class="form-text text-muted small mt-1">Utilisez un numéro sandbox (ex: 97000001)</div>
      </div>
  
      <button type="submit" class="btn btn-primary w-100 py-3 fw-bold pay-button" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        {{ loading ? 'Traitement en cours...' : `Payer ${form.amount} ${form.currency}` }}
      </button>
    </form>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { catching } from '../api/client';
  import OperatorSelector from './OperatorSelector.vue';
  
  const props = defineProps(['config']);
  const emit = defineEmits(['payment-complete']);
  const loading = ref(false);
  
  const form = reactive({
    amount: props.config.amount,
    currency: props.config.currency || 'XOF',
    firstname: '',
    lastname: '',
    email: '',
    operator: 'MTN',
    phone: ''
  });
  
  const handleSubmit = async () => {
    loading.value = true;
    const response = await catching(form);
    loading.value = false;
    emit('payment-complete', response);
  };
  </script>
  
  <style scoped>
  .custom-input {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    font-size: 0.95rem;
  }
  .custom-input:focus {
    border-color: #26c910;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  .pay-button {
    background-color: #26c910;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    transition: transform 0.1s;
  }
  .pay-button:active { transform: scale(0.98); }
  .input-group-text { border-radius: 8px 0 0 8px; border: 1px solid #e2e8f0; font-weight: 600; }
  </style>