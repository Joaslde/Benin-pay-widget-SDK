import { createApp } from 'vue'
import App from './App.vue'

// Import du CSS en tant que chaîne brute pour l'injecter dans le Shadow DOM
// Note: Assure-toi que ton build génère bien un fichier style.css ou utilise ?inline
import styles from './style.css?inline' 

const BeninPay = {
  init(options) {
    const hostElement = document.getElementById(options.mountPlaceId);
    
    if (hostElement) {
      // 1. On crée un "Shadow Root" sur l'élément hôte
      // 'open' permet d'accéder au shadowRoot via JS si besoin
      const shadow = hostElement.attachShadow({ mode: 'open' });

      // 2. On crée un conteneur interne pour l'app Vue
      const appContainer = document.createElement('div');
      appContainer.id = 'beninpay-root';
      
      // 3. On crée une balise style propre au Shadow DOM
      const styleTag = document.createElement('style');
      styleTag.textContent = styles;

      // 4. On injecte le style et le conteneur dans le Shadow DOM
      // Ici, le style ne s'appliquera qu'à ce qu'il y a dans appContainer
      shadow.appendChild(styleTag);
      shadow.appendChild(appContainer);

      // 5. On monte l'application Vue sur le conteneur interne
      const app = createApp(App, {
        config: options
      });
      app.mount(appContainer);

    } else {
      console.error(`BeninPay: L'élément #${options.mountPlaceId} est introuvable.`);
    }
  }
}

window.BeninPay = BeninPay;
export default BeninPay;