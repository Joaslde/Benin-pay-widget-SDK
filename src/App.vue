<template>
  <div class="beninpay-wrapper">
    <div class="card main-widget shadow-lg border-0">
      
      <div class="widget-header text-center text-white p-4 position-relative">
        <div class="close-btn">&times;</div>
        <h2 class="display-6 fw-bold mb-0">{{ config.amount }} * {{ config.currency || 'XOF' }}</h2>
        <p class="small opacity-75 mt-2">Frais de transaction inclus (*)</p>
      </div>

      <div class="card-body p-4">
        <PaymentForm 
          v-if="!paymentResult" 
          :config="config" 
          @payment-complete="handleResult" 
        />

        <div v-else class="text-center py-5 result-animation">
          <div :class="paymentResult.status === 'SUCCESS' ? 'text-success' : 'text-danger'">
            <div class="status-icon mb-3">
              {{ paymentResult.status === 'SUCCESS' ? '✓' : '✕' }}
            </div>
            <h3 class="fw-bold">{{ paymentResult.status === 'SUCCESS' ? 'Succès !' : 'Échec' }}</h3>
          </div>
          <p class="text-muted mt-2">{{ paymentResult.message }}</p>
          <button @click="paymentResult = null" class="btn btn-light mt-4 px-4 border">Retour</button>
        </div>
      </div>

      <div class="card-footer bg-white border-0 text-center pb-4">
        <div class="d-flex align-items-center justify-content-center gap-2">
          <span class="text-muted small">Sécurisé par</span>
          <span class="fw-bold text-primary">BeninPay</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PaymentForm from './components/PaymentForm.vue';

const props = defineProps(['config']); // vrai props pour widget

//test
// const props = defineProps({
//   config: {
//     type: Object,
//     default: () => ({
//       amount: 5000,
//       currency: 'XOF',
//       mountPlaceId: 'app',
//       onResult: (data) => console.log("Test Dev Mode:", data)
//     })
//   }
// });

const paymentResult = ref(null);

const handleResult = (payload) => {
  paymentResult.value = payload;
  if (props.config.onResult) {
    props.config.onResult(payload); // Envoi au développeur tiers
  }
};
</script>

<style scoped>
.beninpay-wrapper {
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding: 20px;
}
.main-widget {
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  overflow: hidden;
}
.widget-header {
  background: linear-gradient(135deg, #26c910 0%, #26c910 100%);
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.7;
}
.status-icon {
  font-size: 60px;
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  background: #f8fafc;
  margin: 0 auto;
}
.result-animation { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>