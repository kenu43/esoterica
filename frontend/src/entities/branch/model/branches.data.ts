import type { Branch } from './types'

export const BRANCHES: Branch[] = [
  {
    id: 'el-sortilegio',
    name: 'El Sortilegio',
    foundedYear: 1981,
    specialty: 'Magia, santos y trabajos',
    description:
      'La casa donde empezó todo. Figuras de la Santa Muerte, San Judas Tadeo y la Virgen, velones preparados, tetragramatones y todo lo necesario para trabajos de protección, amor y dinero.',
    address: 'Carrera 3 #18-27',
    neighborhood: 'Centro',
    city: 'Ibagué',
    coords: { lat: 4.4401544, lng: -75.2353933 },
    mapsUrl: 'https://maps.app.goo.gl/X2Uek5LqmMztuNqj8',
    whatsapp: '573144778105',
    phone: '314 477 8105',
    hours: [
      { days: 'Lunes a sábado', hours: '9:00 a. m. – 6:00 p. m.' },
      { days: 'Domingo', hours: 'Cerrado' },
    ],
    image: '/images/products/figuras-tienda.webp',
    accent: 'mystic',
  },
  {
    id: 'la-colonia',
    name: 'La Colonia',
    foundedYear: 2004,
    specialty: 'Baños, riegos y limpiezas',
    description:
      'Baños de despojo, riegos abre caminos, esencias, aguas florida, sahumerios y hierbas para limpiar la casa, el negocio y el cuerpo de malas energías.',
    address: 'Carrera 3 #18-19',
    neighborhood: 'Centro',
    city: 'Ibagué',
    coords: { lat: 4.440207, lng: -75.2354543 },
    mapsUrl: 'https://maps.app.goo.gl/nbAo9Rp7nHcKnv9q7',
    whatsapp: '573003236179',
    phone: '300 323 6179',
    hours: [
      { days: 'Lunes a sábado', hours: '9:00 a. m. – 6:00 p. m.' },
      { days: 'Domingo', hours: 'Cerrado' },
    ],
    image: '/images/products/despojo.webp',
    accent: 'sage',
  },
  {
    id: 'loto-nirvana',
    name: 'Loto & Nirvana',
    foundedYear: 2023,
    specialty: 'Suerte, oriente y meditación',
    description:
      'Budas, Ganesha, cuencos tibetanos, duendes y amuletos de la suerte, pulseras de chakras e inciensos. La tienda más joven de la familia, pensada para la paz y la abundancia.',
    address: 'Carrera 5 #17-65',
    neighborhood: 'Centro',
    city: 'Ibagué',
    coords: { lat: 4.4429355, lng: -75.2346342 },
    mapsUrl: 'https://maps.app.goo.gl/2zEHYsFhUvovhhM48',
    whatsapp: '573144778105',
    phone: '314 477 8105',
    hours: [
      { days: 'Lunes a sábado', hours: '9:00 a. m. – 6:00 p. m.' },
      { days: 'Domingo', hours: 'Cerrado' },
    ],
    image: '/images/products/buda.webp',
    accent: 'gold',
  },
]
