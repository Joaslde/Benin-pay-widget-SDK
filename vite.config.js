import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// Importation du plugin d'injection CSS
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
    // Ce plugin intercepte tout le CSS généré (y compris celui des .vue) 
    // et l'injecte dynamiquement via un script dans le <head> au runtime.
    cssInjectedByJsPlugin(),
  ],
  build: {
    // Désactive la séparation du CSS pour qu'il soit traité comme un seul flux
    cssCodeSplit: false,
    lib: {
      // Point d'entrée de  l'SDK
      entry: path.resolve(__dirname, 'src/lib-main.js'),
      name: 'BeninPay',
      fileName: () => `widget.js`,
      formats: ['umd'] // Format universel compatible script tags et modules
    },
    rollupOptions: {
      // On veut que Vue soit inclus dans widget.js pour qu'il soit autonome.
      external: [], 
      output: {
        // Supprime les dépendances globales pour un fichier 100% autonome
        globals: {}
      }
    }
  },
  
  // ⚡ FIX pour l'erreur "process is not defined"
  define: {
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify('production')
  }
})