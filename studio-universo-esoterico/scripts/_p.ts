import { getCliClient } from 'sanity/cli'
const c = getCliClient({ apiVersion: '2025-02-19' })
await c.patch('category-bisuteria').set({ icon: 'medal' }).commit()
await c.patch('product-ejemplo-santa-muerte-nina-blanca').set({
  specs: [
    { _key: 's1', _type: 'productSpec', label: 'Altura', value: '20 cm' },
    { _key: 's2', _type: 'productSpec', label: 'Material', value: 'Resina decorada a mano' },
    { _key: 's3', _type: 'productSpec', label: 'Incluye', value: 'Oración impresa' },
  ],
  warning: 'Si la acompañas con velas, ponlas a distancia y nunca las dejes encendidas sin supervisión.',
}).commit()
console.log('ok')
