/**
 * Ciudades de Colombia para los formularios (capitales, ciudades principales
 * y municipios del Tolima, que es donde está la mayoría de clientes).
 */
const TOLIMA = [
  'Ibagué', 'Espinal', 'Melgar', 'Honda', 'Chaparral', 'Líbano', 'Mariquita', 'Flandes', 'Guamo',
  'Purificación', 'Fresno', 'Lérida', 'Armero-Guayabal', 'Venadillo', 'Cajamarca', 'Rovira',
  'Saldaña', 'Natagaima', 'Ortega', 'Coyaima', 'Planadas', 'Rioblanco', 'Alvarado', 'Piedras',
  'Coello', 'San Luis', 'Carmen de Apicalá', 'Icononzo', 'Ambalema', 'Ataco',
]

const PRINCIPALES = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira',
  'Santa Marta', 'Manizales', 'Villavicencio', 'Pasto', 'Montería', 'Neiva', 'Armenia', 'Valledupar',
  'Sincelejo', 'Popayán', 'Tunja', 'Florencia', 'Riohacha', 'Yopal', 'Quibdó', 'Arauca',
  'San Andrés', 'Leticia', 'Mocoa', 'San José del Guaviare', 'Puerto Carreño', 'Inírida', 'Mitú',
  'Soacha', 'Bello', 'Itagüí', 'Envigado', 'Soledad', 'Palmira', 'Buenaventura', 'Tuluá',
  'Cartago', 'Buga', 'Girardot', 'Fusagasugá', 'Zipaquirá', 'Facatativá', 'Chía', 'Mosquera',
  'Madrid', 'Funza', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'Dosquebradas',
  'Santa Rosa de Cabal', 'Rionegro', 'Apartadó', 'Turbo', 'Sogamoso', 'Duitama', 'Ocaña',
  'Magangué', 'Lorica', 'Ipiales', 'Tumaco', 'Pitalito', 'Garzón', 'La Dorada', 'Aguachica',
  'Maicao', 'Calarcá', 'Jamundí', 'Yumbo', 'Caucasia', 'Sabanalarga', 'Malambo',
]

export const COLOMBIA_CITIES: string[] = [
  ...TOLIMA,
  ...PRINCIPALES.filter((c) => !TOLIMA.includes(c)).sort((a, b) => a.localeCompare(b, 'es')),
  'Otra ciudad',
]
