import { createApp } from 'vue'
import App from './App.vue'

const BeninPay = {
  init(options) {
    const mountPoint = document.getElementById(options.mountPlaceId);
    
    if (mountPoint) {
      // On injecte les props directement dans l'app Vue
      const app = createApp(App, {
        config: options
      });
      app.mount(mountPoint);
    } else {
      console.error(`BeninPay: L'élément #${options.mountPlaceId} est introuvable.`);
    }
  }
}

window.BeninPay = BeninPay;
export default BeninPay;