<template>
    <div class="operator-section mb-4">
      <label class="form-label fw-bold text-secondary small text-uppercase">Opérateur</label>
      <div class="d-flex justify-content-between align-items-center gap-2">
        <div 
          v-for="op in operators" 
          :key="op.name" 
          class="operator-item flex-fill"
          @click="$emit('update:modelValue', op.name)"
        >
          <div 
            class="operator-card"
            :class="{ 'active': modelValue === op.name }"
          >
            <div class="logo-wrapper">
              <img :src="op.logo" :alt="op.name" class="operator-logo">
            </div>
            <span class="operator-name">{{ op.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['modelValue']);
  defineEmits(['update:modelValue']);
  
  const operators = [
    { name: 'MTN', logo: 'https://cmmb.bj/storage/transfert/mtn.png' },
    { name: 'MOOV', logo: 'https://sckaler.cloud/moov.svg' },
    { name: 'CELTIIS', logo: 'https://sckaler.cloud/celtis.svg' }
  ];
  </script>
  
  <style scoped>
  .operator-card {
    border: 2px solid #f1f5f9;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background: white;
  }
  .operator-card:hover { border-color: #cbd5e1; }
  .operator-card.active {
    border-color: #26c910;
    background-color: #eff6ff;
  }
  .logo-wrapper {
    width: 50px;
    height: 50px;
    margin: 0 auto 5px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }
  .operator-logo { width: 100%; height: 100%; object-fit: cover; }
  .operator-name { font-size: 0.75rem; font-weight: 700; color: #475569; }
  .operator-card.active .operator-name { color: #26c910; }
  </style>