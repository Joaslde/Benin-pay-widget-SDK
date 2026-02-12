import { createApp } from 'vue'
import App from './App.vue'

const BeninPay = {
  // Stocke les instances actives pour cleanup
  activeInstances: new Map(),

  init(options) {
    const mountPoint = document.getElementById(options.mountPlaceId);
    
    if (!mountPoint) {
      console.error(`BeninPay: L'élément #${options.mountPlaceId} est introuvable.`);
      return;
    }

    // Cleanup instance précédente si elle existe
    if (this.activeInstances.has(options.mountPlaceId)) {
      this.destroy(options.mountPlaceId);
    }

    // Wrapper pour isoler les styles (évite les conflits React)
    const wrapper = document.createElement('div');
    wrapper.className = 'beninpay-widget-root';
    wrapper.style.cssText = 'all: initial; display: block;'; // Reset CSS
    mountPoint.appendChild(wrapper);

    // Créer l'app Vue
    const app = createApp(App, {
      config: options
    });

    app.mount(wrapper);

    // Stocker l'instance pour cleanup futur
    this.activeInstances.set(options.mountPlaceId, {
      app,
      wrapper,
      mountPoint
    });

    return {
      destroy: () => this.destroy(options.mountPlaceId)
    };
  },

  // Méthode pour nettoyer proprement
  destroy(mountPlaceId) {
    const instance = this.activeInstances.get(mountPlaceId);
    if (instance) {
      instance.app.unmount();
      instance.wrapper.remove();
      this.activeInstances.delete(mountPlaceId);
    }
  }
}

window.BeninPay = BeninPay;
export default BeninPay;