/**
 * Punto de entrada de Cloud Functions.
 * Cada módulo expone sus funciones desde su capa de infraestructura.
 */
export { sendRequest } from './modules/requests/infrastructure/http.js'
