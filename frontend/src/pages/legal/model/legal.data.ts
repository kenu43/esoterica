/**
 * Textos legales (Colombia). Marco: Ley 1480 de 2011 (Estatuto del Consumidor), Ley 1581 de 2012 y Decreto 1377 de 2013
 * (hoy compilado en el Decreto 1074 de 2015), Ley 527 de 1999 (comercio electrónico) y Ley 2300 de 2023 (derecho a no ser molestado).
 * La razón social y el NIT se muestran solo si se completan en `SITE.legal` (shared/config/site.ts).
 * Conviene que un abogado revise el texto final antes de darlo por definitivo.
 */
export interface LegalSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalDoc {
  slug: string
  title: string
  short: string
  description: string
  sections: LegalSection[]
}

export const LEGAL_UPDATED = '2 de octubre de 2026'

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: 'terminos-y-condiciones',
    title: 'Términos y condiciones',
    short: 'Cómo funciona la página, los precios y las compras',
    description: 'Condiciones de uso del sitio y de las compras que se cierran por WhatsApp en Universo Esotérico (Ibagué, Colombia).',
    sections: [
      {
        heading: '1. Quiénes somos',
        paragraphs: [
          'Universo Esotérico es un negocio familiar de Ibagué (Tolima, Colombia) con tres tiendas físicas: El Sortilegio, La Colonia y Loto & Nirvana. Este sitio web muestra nuestro catálogo, precios de referencia y canales de contacto.',
          'Al usar este sitio aceptas estos términos. Si no estás de acuerdo con alguno, te pedimos no usar el sitio ni hacer pedidos.',
        ],
      },
      {
        heading: '2. Esta página no es una tienda con pago en línea',
        paragraphs: [
          'En el sitio no se paga. La lista de consulta, los encargos y los formularios de contacto abren un chat de WhatsApp con el mensaje ya escrito. La venta se acuerda y se cierra por WhatsApp, por llamada o en nuestras tiendas.',
          'Un producto en la lista de consulta no es una compra ni una reserva: solo lo es cuando te confirmamos disponibilidad, precio final y forma de entrega, y tú aceptas.',
        ],
      },
      {
        heading: '3. Precios, disponibilidad e información de productos',
        bullets: [
          'Los precios están expresados en pesos colombianos (COP) y son de referencia. El precio final, la disponibilidad y el costo de envío se confirman por WhatsApp antes de cualquier pago.',
          'Cuando un producto aparece como "Precio a consultar" es porque su valor varía o aún no está fijado; te lo informamos al escribirnos.',
          'Las fotos son ilustrativas. Los productos artesanales, de resina, yeso, cera o hierbas pueden variar levemente en color, tamaño, aroma o acabado.',
          'Aunque revisamos el catálogo con cuidado, puede haber errores de digitación, de precio o de disponibilidad. Si ocurre, te avisaremos antes de cerrar la venta y podrás aceptar el valor correcto o desistir sin costo.',
        ],
      },
      {
        heading: '4. Formas de pago y entrega',
        paragraphs: [
          'Los medios de pago disponibles (efectivo en tienda, transferencia u otros) te los informamos por WhatsApp al confirmar tu pedido. Nunca te pediremos claves, códigos de seguridad ni datos completos de tarjetas por este sitio.',
          'Las condiciones de envío están en la Política de envíos y las de cambios y garantía en la Política de cambios, devoluciones y garantía.',
        ],
      },
      {
        heading: '5. Naturaleza de los productos y del contenido',
        paragraphs: [
          'Nuestros productos y contenidos (tarot, números de la suerte, consejos del guardián, glosario, artículos, el asesor Merlín) son de carácter espiritual, cultural y de entretenimiento. No garantizan resultados y no reemplazan la atención médica, psicológica, legal ni financiera de un profesional.',
          'Las lecturas y recomendaciones que ves en el sitio son orientativas. Las decisiones que tomes a partir de ellas son tuyas. Si estás pasando por una crisis emocional, busca apoyo profesional; en Colombia puedes llamar a la línea 106 (salud mental) o a la 123 en emergencias.',
          'Si usas velas, inciensos, aceites u otros productos con fuego o sustancias aromáticas, hazlo en un lugar ventilado, lejos de niños, mascotas y materiales inflamables, y nunca los dejes sin supervisión. Los productos de uso en el cuerpo (lociones, jabones, aceites) pueden producir reacciones: haz una prueba pequeña antes y suspende el uso si hay molestia.',
        ],
      },
      {
        heading: '6. Asesor virtual (Merlín)',
        paragraphs: [
          'Merlín es un asistente automatizado que sugiere productos del catálogo según lo que cuentes. Sus respuestas no son asesoría profesional ni una promesa de resultado. No escribas en el chat datos sensibles (documentos, claves, datos bancarios, salud).',
        ],
      },
      {
        heading: '7. Propiedad intelectual',
        paragraphs: [
          'Los textos, diseños, logotipos, ilustraciones y fotografías de este sitio son de Universo Esotérico o se usan con autorización de sus titulares. No puedes copiarlos, modificarlos ni usarlos con fines comerciales sin permiso por escrito.',
          'Si compartes enlaces de nuestros productos en redes sociales, estás invitado a hacerlo, citando siempre la fuente.',
        ],
      },
      {
        heading: '8. Uso adecuado del sitio',
        bullets: [
          'Debes ser mayor de edad (18 años) para hacer pedidos. Si eres menor, hazlo con acompañamiento de tu madre, padre o tutor.',
          'No uses el sitio para actividades ilícitas, para enviar contenido ofensivo o para intentar dañar su funcionamiento o su seguridad.',
          'Los enlaces a redes sociales o sitios de terceros (WhatsApp, Instagram, TikTok, Facebook, YouTube, mapas) se rigen por las políticas de esos terceros.',
        ],
      },
      {
        heading: '9. Responsabilidad',
        paragraphs: [
          'Hacemos lo posible para que el sitio esté disponible y la información sea correcta, pero no garantizamos que funcione sin interrupciones ni errores. En lo permitido por la ley, no respondemos por daños indirectos derivados del uso del sitio. Esto no afecta tus derechos como consumidor, que la ley colombiana protege y que no se limitan por estos términos.',
        ],
      },
      {
        heading: '10. Ley aplicable y reclamos',
        paragraphs: [
          'Estos términos se rigen por las leyes de la República de Colombia. Para peticiones, quejas, reclamos o sugerencias consulta la página de PQR. Como consumidor también puedes acudir a la Superintendencia de Industria y Comercio (sic.gov.co), autoridad de protección al consumidor.',
          'Podemos actualizar estos términos; la versión vigente siempre estará en esta página, con su fecha de actualización.',
        ],
      },
    ],
  },
  {
    slug: 'politica-de-privacidad',
    title: 'Política de tratamiento de datos personales',
    short: 'Qué datos tratamos, para qué y cuáles son tus derechos',
    description: 'Política de privacidad y tratamiento de datos personales de Universo Esotérico conforme a la Ley 1581 de 2012 de Colombia.',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        paragraphs: [
          'Universo Esotérico (tiendas El Sortilegio, La Colonia y Loto & Nirvana), Ibagué, Tolima, Colombia, es el responsable del tratamiento de tus datos personales, conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015) y demás normas que los modifiquen.',
          'Puedes contactarnos por WhatsApp o en cualquiera de nuestras tiendas; los datos aparecen en la página de Contacto.',
        ],
      },
      {
        heading: '2. Qué datos tratamos',
        bullets: [
          'Datos que tú nos das al escribirnos: nombre, número de WhatsApp, ciudad o dirección de entrega (si pides envío) y el contenido de tu consulta, encargo o mensaje.',
          'Datos que escribes en las secciones interactivas (tarot, números de la suerte, consejos): tu nombre o apodo y tu fecha de nacimiento. Se guardan únicamente en tu propio navegador para personalizar la lectura del día; no se envían a nuestros servidores.',
          'Datos técnicos y de uso (páginas vistas, tipo de dispositivo, navegador, ubicación aproximada) recogidos mediante cookies y herramientas de analítica como Google Analytics para Firebase, de forma agregada.',
          'No solicitamos datos sensibles (salud, orientación sexual, creencias, datos biométricos ni de menores). Te pedimos no enviarlos; si los compartes por iniciativa propia, solo los usaremos para atender tu solicitud.',
        ],
      },
      {
        heading: '3. Para qué usamos tus datos (finalidades)',
        bullets: [
          'Responder tus consultas, confirmar disponibilidad y precios, y gestionar pedidos, encargos y envíos.',
          'Coordinar el pago, la entrega o la recogida en tienda, y atender garantías, cambios o reclamos.',
          'Mejorar el sitio, medir qué contenidos y productos interesan y mantener su seguridad.',
          'Enviarte información comercial o promociones por WhatsApp solo si lo aceptas expresamente; puedes pedir que paremos en cualquier momento.',
        ],
      },
      {
        heading: '4. Autorización',
        paragraphs: [
          'Al escribirnos por WhatsApp o compartir tus datos en un formulario nos autorizas, de manera previa, expresa e informada, a tratarlos para las finalidades descritas. Puedes revocar esta autorización o pedir la supresión de tus datos cuando quieras, salvo que exista un deber legal o contractual que obligue a conservarlos.',
        ],
      },
      {
        heading: '5. Tus derechos como titular',
        bullets: [
          'Conocer, actualizar y rectificar tus datos personales.',
          'Solicitar prueba de la autorización que nos diste.',
          'Ser informado, cuando lo pidas, sobre el uso que les hemos dado.',
          'Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.',
          'Revocar la autorización y/o solicitar la supresión de tus datos cuando no se respeten los principios y garantías legales.',
          'Acceder de forma gratuita a tus datos personales que hayan sido objeto de tratamiento.',
        ],
      },
      {
        heading: '6. Cómo ejercer tus derechos',
        paragraphs: [
          'Escríbenos por WhatsApp o acércate a una de nuestras tiendas indicando tu nombre, el dato que quieres consultar, corregir o eliminar y cómo contactarte.',
          'Las consultas se responden en un máximo de diez (10) días hábiles; si no podemos hacerlo en ese plazo te informamos el motivo y la nueva fecha, que no superará cinco (5) días hábiles adicionales. Los reclamos se responden en un máximo de quince (15) días hábiles, prorrogables por ocho (8) días hábiles más, según la ley.',
          'Si tras este trámite no estás conforme, puedes presentar queja ante la Superintendencia de Industria y Comercio (sic.gov.co).',
        ],
      },
      {
        heading: '7. Con quién compartimos tus datos',
        paragraphs: [
          'No vendemos tus datos. Solo los compartimos cuando es necesario para prestar el servicio: empresas transportadoras (para enviar tu pedido), proveedores tecnológicos que alojan el sitio y miden su uso (Google/Firebase, Sanity), WhatsApp (Meta) como canal de conversación, y autoridades cuando la ley lo exija. Estos terceros tratan los datos según sus propias políticas y, cuando aplica, fuera de Colombia (transferencia internacional), con niveles adecuados de protección.',
        ],
      },
      {
        heading: '8. Seguridad y conservación',
        paragraphs: [
          'Aplicamos medidas razonables para proteger tus datos contra acceso no autorizado, pérdida o uso indebido. Los conservamos durante el tiempo necesario para las finalidades descritas y para cumplir obligaciones legales, contables y de garantía; después los eliminamos o anonimizamos.',
        ],
      },
      {
        heading: '9. Menores de edad',
        paragraphs: [
          'Este sitio no está dirigido a menores de 18 años y no recogemos conscientemente datos de ellos. Si eres madre, padre o tutor y crees que un menor nos dio datos, escríbenos y los eliminaremos.',
        ],
      },
      {
        heading: '10. Cambios a esta política',
        paragraphs: ['Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha de actualización.'],
      },
    ],
  },
  {
    slug: 'politica-de-envios',
    title: 'Política de envíos y entregas',
    short: 'Cobertura, costos, tiempos y revisión al recibir',
    description: 'Cómo enviamos tus pedidos de Universo Esotérico a Ibagué y toda Colombia: cobertura, costos, tiempos y qué hacer si llega con daños.',
    sections: [
      {
        heading: '1. Cobertura',
        paragraphs: [
          'Entregamos en Ibagué y enviamos a toda Colombia por empresas transportadoras. También puedes recoger tu pedido, sin costo de envío, en cualquiera de nuestras tiendas del centro de Ibagué.',
        ],
      },
      {
        heading: '2. Cómo se coordina un envío',
        bullets: [
          'Nos escribes por WhatsApp (o armas tu lista de consulta) y confirmamos disponibilidad y precio de los productos.',
          'Te indicamos el costo del envío, la transportadora y el tiempo estimado según tu ciudad. El costo se informa antes de que pagues; no se cobran valores ocultos.',
          'Una vez acordado y pagado el pedido, lo empacamos y te enviamos el número de guía para que hagas seguimiento.',
        ],
      },
      {
        heading: '3. Tiempos',
        paragraphs: [
          'Los tiempos dependen de la disponibilidad del producto, la ciudad de destino y la transportadora; por eso te los informamos en cada pedido. Son estimados y pueden variar por temporadas altas, clima, orden público u otras causas ajenas a nosotros. Los productos hechos por encargo tienen su propio plazo, que se acuerda al pedirlos.',
        ],
      },
      {
        heading: '4. Empaque',
        paragraphs: [
          'Empacamos con cuidado: las figuras, los frascos y los productos frágiles van protegidos. Algunos productos (aceites, lociones, velas con vidrio) requieren manejo especial; si necesitas que los empaquemos de determinada forma, avísanos al pedir.',
        ],
      },
      {
        heading: '5. Revisa tu pedido al recibirlo',
        bullets: [
          'Revisa que el paquete llegue sellado y sin golpes visibles antes de firmar.',
          'Si hay daños evidentes, no lo recibas o déjalo anotado en la guía y escríbenos de inmediato con fotos.',
          'Si notas un daño o una diferencia después de abrirlo, avísanos dentro de las 48 horas siguientes a la entrega, con fotos o un video del paquete y del producto, para ayudarte con el reclamo ante la transportadora y con la reposición.',
        ],
      },
      {
        heading: '6. Datos de entrega',
        paragraphs: [
          'Eres responsable de dar una dirección y un teléfono correctos. Si el envío se devuelve por datos errados o por no recibirlo, coordinaremos un nuevo envío y el costo adicional puede correr por tu cuenta.',
        ],
      },
    ],
  },
  {
    slug: 'cambios-devoluciones-y-garantia',
    title: 'Cambios, devoluciones, retracto y garantía',
    short: 'Tus derechos como consumidor y cómo ejercerlos',
    description: 'Política de cambios, devoluciones, derecho de retracto y garantía de Universo Esotérico conforme a la Ley 1480 de 2011 (Estatuto del Consumidor).',
    sections: [
      {
        heading: '1. Garantía legal',
        paragraphs: [
          'Todos nuestros productos tienen la garantía legal que establece la Ley 1480 de 2011: respondemos por la calidad, idoneidad y seguridad de lo que vendemos. Si un producto llega con un defecto de fabricación o no corresponde a lo que compraste, lo reparamos, lo cambiamos por otro igual o, si no es posible, te devolvemos el dinero.',
          'La garantía no cubre daños por mal uso, golpes o caídas, desgaste normal ni el consumo propio del producto (por ejemplo, una vela encendida).',
        ],
      },
      {
        heading: '2. Cómo pedir un cambio o hacer valer la garantía',
        bullets: [
          'Escríbenos por WhatsApp o acércate a una tienda con tu comprobante o conversación de compra.',
          'Cuéntanos qué pasó y envíanos fotos o un video del producto y del empaque.',
          'Revisamos tu caso y te respondemos en un máximo de 15 días hábiles. Si procede, te indicamos cómo se hace el cambio o la devolución.',
        ],
      },
      {
        heading: '3. Derecho de retracto (compras a distancia)',
        paragraphs: [
          'Si compraste a distancia (por WhatsApp, redes sociales o este sitio, sin ir a la tienda), puedes retractarte de la compra dentro de los cinco (5) días hábiles siguientes a la entrega del producto, sin necesidad de dar explicaciones, según el artículo 47 de la Ley 1480 de 2011.',
        ],
        bullets: [
          'El producto debe estar sin usar, en su empaque original y en las mismas condiciones en que lo recibiste.',
          'Escríbenos dentro del plazo indicando que ejerces el retracto. Los costos de transporte y demás gastos de la devolución corren por tu cuenta.',
          'Te devolvemos el dinero en un plazo máximo de treinta (30) días calendario desde que ejerces el derecho y recibimos el producto, por el mismo medio de pago que usaste, cuando sea posible.',
        ],
      },
      {
        heading: '4. Productos sin retracto ni cambio por gusto',
        paragraphs: ['De acuerdo con la ley, el derecho de retracto no aplica a:'],
        bullets: [
          'Productos hechos por encargo o personalizados según tus especificaciones (por ejemplo, velones preparados con tu nombre o petición, o figuras pedidas a tu medida).',
          'Productos de uso personal o que, por su naturaleza, no pueden devolverse o se deterioran con rapidez: lociones, aceites, jabones, productos de aseo corporal, hierbas, sahumerios y velas ya usados o con el sello roto.',
          'Productos consumidos o usados en todo o en parte.',
        ],
      },
      {
        heading: '5. Cambio por gusto en tienda física',
        paragraphs: [
          'Si compraste en una de nuestras tiendas y quieres cambiar por gusto o por otro tamaño, avísanos en los 5 días siguientes con el producto sin usar y en su empaque. Evaluaremos el cambio por otro producto de valor igual o similar; esta es una atención adicional de la casa y no una obligación legal de retracto, que aplica a ventas a distancia.',
        ],
      },
      {
        heading: '6. Producto equivocado, incompleto o dañado',
        paragraphs: [
          'Si recibes un producto distinto al pedido, incompleto o dañado, avísanos dentro de las 48 horas siguientes a la entrega con fotos o video. Lo reponemos o te devolvemos el dinero, sin costo para ti.',
        ],
      },
      {
        heading: '7. Pagos y reversión',
        paragraphs: [
          'Si pagaste por un medio electrónico y hubo fraude, operación no solicitada, producto no recibido, o este no corresponde a lo pedido, tienes derecho a solicitar la reversión del pago ante tu entidad financiera dentro de los cinco (5) días hábiles siguientes a que te enteres, conforme al artículo 51 de la Ley 1480 de 2011. Avísanos también para ayudarte.',
        ],
      },
      {
        heading: '8. Autoridad',
        paragraphs: ['Si no estás de acuerdo con la respuesta que recibas, puedes presentar tu reclamo ante la Superintendencia de Industria y Comercio (sic.gov.co).'],
      },
    ],
  },
  {
    slug: 'pqr',
    title: 'Peticiones, quejas, reclamos y sugerencias (PQR)',
    short: 'Cómo escribirnos si algo salió mal o quieres sugerir',
    description: 'Canales y plazos para peticiones, quejas, reclamos y sugerencias a Universo Esotérico, y cómo acudir a la Superintendencia de Industria y Comercio.',
    sections: [
      {
        heading: '1. Cómo presentar una PQR',
        paragraphs: ['Puedes escribirnos por cualquiera de estos canales; no necesitas un formato especial:'],
        bullets: [
          'WhatsApp: el botón verde del sitio o el número de la página de Contacto.',
          'En persona: en El Sortilegio, La Colonia o Loto & Nirvana (Carrera 3 y Carrera 5, centro de Ibagué).',
          'Llamada telefónica a las tiendas (números en Contacto).',
        ],
      },
      {
        heading: '2. Qué debe incluir',
        bullets: [
          'Tu nombre y un medio para contactarte (WhatsApp o teléfono).',
          'Qué compraste o qué pasó, y cuándo y en qué tienda o canal.',
          'Qué solicitas (explicación, cambio, devolución, corrección, etc.) y, si los tienes, fotos o comprobantes.',
        ],
      },
      {
        heading: '3. Cuánto tardamos en responder',
        paragraphs: [
          'Nos comprometemos a responder en un máximo de quince (15) días hábiles contados desde que recibimos tu solicitud. Si necesitamos más tiempo, te avisamos el motivo y la fecha en que responderemos. Las solicitudes sobre tus datos personales siguen los plazos de la Política de tratamiento de datos.',
        ],
      },
      {
        heading: '4. Si no quedas conforme',
        paragraphs: [
          'Puedes acudir a la Superintendencia de Industria y Comercio (SIC), autoridad nacional de protección al consumidor y de protección de datos personales: www.sic.gov.co. Te recomendamos hacerlo después de haber presentado tu reclamo con nosotros.',
        ],
      },
    ],
  },
  {
    slug: 'politica-de-cookies',
    title: 'Política de cookies y almacenamiento local',
    short: 'Qué guarda este sitio en tu dispositivo y cómo controlarlo',
    description: 'Qué cookies y almacenamiento local usa el sitio de Universo Esotérico y cómo puedes gestionarlos.',
    sections: [
      {
        heading: '1. Qué usamos',
        bullets: [
          'Almacenamiento local del navegador (necesario para el funcionamiento): tu lista de consulta, tema claro/oscuro, preferencia de música y volumen, y tus datos de las secciones de tarot y números de la suerte (para repetir la lectura del día). Se quedan en tu dispositivo.',
          'Analítica (Google Analytics para Firebase): mide de forma agregada qué páginas se visitan, el tipo de dispositivo y el uso general del sitio, para mejorarlo.',
          'Contenido de terceros: mapas, videos de YouTube, Vimeo o TikTok y enlaces a redes sociales pueden instalar sus propias cookies cuando los abres o los reproduces.',
        ],
      },
      {
        heading: '2. Cómo controlarlas',
        paragraphs: [
          'Puedes borrar el almacenamiento local y las cookies desde la configuración de tu navegador (Chrome, Safari, Firefox, Edge), bloquearlas o pedir que te avise cuando se instalen. Ten en cuenta que, si las bloqueas, partes del sitio (como tu lista de consulta o tu lectura del día) pueden no funcionar bien.',
          'Para desactivar la analítica de Google puedes usar el complemento oficial de inhabilitación de Google Analytics para tu navegador.',
        ],
      },
      {
        heading: '3. Más información',
        paragraphs: ['Para saber cómo tratamos tus datos personales, consulta la Política de tratamiento de datos personales.'],
      },
    ],
  },
]

export const getLegalDoc = (slug?: string) => LEGAL_DOCS.find((d) => d.slug === slug)
