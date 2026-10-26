/**
 * Textos de la web en español (idioma por defecto).
 * El archivo ca.ts debe tener exactamente la misma estructura: TypeScript avisa si falta algo.
 * Marcadores disponibles: {brand}, {kit}, {assembly}, {total}, {m2}, y los de cada sección.
 */

export const es = {
  locale: "es",
  langName: "Español",

  meta: {
    homeTitle: "Casas de hormigón celular en kit desde 700 €/m²",
    homeDescription:
      "Viviendas de hormigón celular en kit con planos y transporte incluidos desde 700 €/m², o con montaje desde 1.050 €/m². Calcula tu presupuesto orientativo en un minuto.",
    catalogTitle: "Modelos de casas en kit de hormigón celular",
    catalogDescription:
      "Modelos de una y dos plantas de 90 a 180 m². Precio del kit y del kit con montaje calculado por metro cuadrado, con alcance detallado.",
    modelTitle: "Casa {name} de {m2} m² en kit de hormigón celular",
    modelDescription:
      "{name}: {summary} Kit desde {kit} o {assembly} con montaje. Planos y transporte incluidos. Presupuesto orientativo al instante.",
    budgetTitle: "Calcula el precio de tu casa de hormigón celular",
    budgetDescription:
      "Configurador de presupuesto: elige modelo o superficie y modalidad (solo kit o kit con montaje) y obtén el desglose al momento, con exclusiones y descarga en PDF.",
    kitTitle: "Qué incluye el kit de vivienda de hormigón celular",
    kitDescription:
      "Qué está incluido, qué no y qué depende del estudio técnico en nuestros kits de casas de hormigón celular. Transparencia total antes de pedir presupuesto.",
    processTitle: "Cómo funciona la compra de tu casa en kit",
    processDescription:
      "Del modelo al kit en obra: selección, presupuesto, validación técnica, preparación, transporte y montaje opcional de tu casa de hormigón celular.",
    materialTitle: "Hormigón celular: qué es y por qué para tu vivienda",
    materialDescription:
      "Qué es el hormigón celular, cómo se fabrica y qué propiedades tiene el material, distinguiéndolas de las prestaciones finales de la vivienda.",
    contactTitle: "Solicita presupuesto de tu casa en kit",
    contactDescription:
      "Cuéntanos dónde quieres construir, la superficie y la modalidad. Revisamos tu caso y te enviamos un presupuesto detallado.",
    legalTitle: "Aviso legal",
    privacyTitle: "Política de privacidad",
    cookiesTitle: "Política de cookies",
    panelTitle: "Estado de la configuración",
  },

  nav: {
    home: "Inicio",
    models: "Viviendas",
    budget: "Presupuesto",
    kit: "Qué incluye",
    process: "Cómo funciona",
    material: "Hormigón celular",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skip: "Saltar al contenido",
    language: "Idioma",
    cta: "Calcular presupuesto",
  },

  common: {
    exploreModels: "Explorar viviendas",
    calculate: "Calcular mi presupuesto",
    viewHouse: "Ver vivienda",
    requestQuote: "Solicitar presupuesto",
    requestInfo: "Solicitar información",
    included: "Incluido",
    includedPl: "Incluidos",
    notIncluded: "No incluido",
    pending: "Pendiente de confirmar",
    optional: "Opcional",
    perM2: "€/m²",
    from: "desde",
    m2: "m²",
    floors1: "Una planta",
    floors2: "Dos plantas",
    bedrooms: "{n} dormitorios",
    bedroom: "{n} dormitorio",
    bathrooms: "{n} baños",
    bathroom: "{n} baño",
    proposal: "Propuesta orientativa",
    illustration: "Ilustración orientativa generada a partir de la geometría del modelo. No es una obra construida.",
    illustrationShort: "Ilustración orientativa",
    taxesNote: "Precios sin impuestos. Los impuestos aplicables se indicarán por separado en el presupuesto definitivo.",
    taxesConfirmed: "Precios sin impuestos. {taxName} ({rate} %) indicado por separado.",
    back: "Volver",
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
    seeAll: "Ver todos los modelos",
    seeScope: "Ver el alcance completo",
    kitOnly: "Solo kit",
    kitAssembly: "Kit + montaje",
  },

  pricing: {
    criterion: {
      pending:
        "Superficie presupuestada: el criterio de medición (construida, útil u otro) se confirmará en el presupuesto definitivo.",
      built: "Superficie presupuestada: superficie construida.",
      useful: "Superficie presupuestada: superficie útil.",
    },
    surfaceLabel: "Superficie presupuestada",
  },

  hero: {
    title: "Tu nueva casa empieza aquí.",
    subtitle:
      "Viviendas de hormigón celular en kit. Diseño, planos y transporte incluidos desde 700 €/m².",
    priceKit: "Kit con planos y transporte",
    priceAssembly: "Kit con montaje",
    scroll: "Seguir bajando",
    caption: "Modelo {name}, {m2} m². Ilustración orientativa.",
  },

  advantages: {
    title: "Una forma más ordenada de construir tu casa",
    intro:
      "Diseñamos viviendas completas y las suministramos como un sistema: piezas de hormigón celular definidas en los planos, preparadas para su montaje y transportadas hasta tu parcela.",
    items: [
      {
        title: "Arquitectura definida desde el principio",
        text: "Cada modelo parte de unos planos y una modulación concretos. Sabes qué casa compras antes de empezar.",
      },
      {
        title: "Precio por metro cuadrado, sin letra pequeña",
        text: "700 €/m² el kit, 1.050 €/m² con montaje. Lo que no está incluido, lo decimos con la misma claridad.",
      },
      {
        title: "Un material mineral y preciso",
        text: "El hormigón celular es ligero, se trabaja con exactitud y no es combustible. Las prestaciones finales dependen del proyecto completo.",
      },
      {
        title: "Tú eliges cuánto hacemos",
        text: "Recibe el kit y constrúyelo con tu equipo, o contrata nuestro montaje sobre el mismo kit.",
      },
    ],
    link: "Conocer el hormigón celular",
  },

  catalog: {
    title: "Viviendas",
    intro:
      "Cuatro puntos de partida, de una y dos plantas. Cada precio se calcula sobre la superficie presupuestada de la vivienda.",
    provisional:
      "Modelos de muestra: superficies, distribuciones e imágenes son orientativas y se sustituirán por los modelos comerciales definitivos.",
    kitPrice: "Kit",
    assemblyPrice: "Con montaje",
    activeMode: "Precios mostrados para",
    distribution: "Distribución orientativa",
    plan: "Plano de planta",
    customTitle: "¿Necesitas otra superficie?",
    customText: "El configurador calcula el precio para cualquier superficie entre {min} y {max} m².",
    customCta: "Calcular superficie personalizada",
  },

  model: {
    breadcrumbs: "Viviendas",
    gallery: "Vistas de la vivienda",
    views: {
      front: "Fachada principal",
      rear: "Perspectiva posterior",
      aerial: "Perspectiva elevada",
      plan: "Plano de planta",
    },
    specs: "Datos de la vivienda",
    surface: "Superficie presupuestada",
    storeys: "Plantas",
    program: "Programa",
    programPending: "Distribución pendiente de validación comercial",
    footprint: "Huella aproximada",
    rooms: "Estancias",
    roomsNote: "Superficies de estancias aproximadas, medidas a ejes y sin descontar tabiques.",
    groundFloor: "Planta baja",
    upperFloor: "Planta alta",
    calculator: "Calcula el precio de {name}",
    otherModels: "Otros modelos",
    highlights: "Claves del modelo",
  },

  rooms: {
    living: "Salón-comedor-cocina",
    kitchen: "Cocina",
    bedroom: "Dormitorio {n}",
    master: "Dormitorio principal",
    bath: "Baño {n}",
    toilet: "Aseo",
    hall: "Recibidor",
    corridor: "Paso",
    stair: "Escalera",
    laundry: "Lavadero",
    dressing: "Vestidor",
    study: "Estudio",
  },

  compare: {
    title: "Dos maneras de comprar el mismo kit",
    intro:
      "El kit es idéntico en las dos modalidades. La única diferencia es quién lo monta.",
    kit: {
      name: "Solo kit",
      text: "Para quien tiene constructor o quiere dirigir la obra. Recibes el kit, los planos y el transporte hasta la parcela.",
    },
    assembly: {
      name: "Kit + montaje",
      text: "Para quien prefiere un solo interlocutor para levantar la vivienda. El mismo kit, montado por nuestro equipo.",
      breakdown: "700 €/m² del kit + 350 €/m² de montaje",
    },
    rows: {
      kit: "Kit de hormigón celular",
      plans: "Planos",
      transport: "Transporte del kit",
      assembly: "Montaje del kit",
      finished: "Vivienda terminada / llave en mano",
    },
    example: "Ejemplo para {m2} m²",
    notTurnkey:
      "Ninguna de las dos modalidades es una vivienda terminada ni una construcción llave en mano.",
  },

  configurator: {
    title: "Calcula tu presupuesto",
    intro: "Cuatro pasos y el desglose al momento. Sin registros.",
    step1: "Elige un modelo o una superficie propia",
    step2: "Ajusta la superficie",
    step3: "Elige la modalidad",
    step4: "Tu presupuesto orientativo",
    custom: "Superficie personalizada",
    customHint: "Introduce los m² de tu proyecto",
    surfaceInput: "Superficie en m²",
    decrease: "Reducir superficie",
    increase: "Aumentar superficie",
    rangeError: "Introduce una superficie entre {min} y {max} m².",
    assemblyToggle: "Incluir montaje",
    assemblyHint: "+350 €/m²",
    concept: "Concepto",
    amount: "Importe",
    lineKit: "Kit de vivienda",
    linePlans: "Planos",
    lineTransport: "Transporte",
    lineAssembly: "Montaje",
    lineAssemblyOff: "Montaje (no seleccionado)",
    totalKit: "Total solo kit",
    totalAssembly: "Total con montaje",
    taxLine: "{taxName} ({rate} %)",
    totalWithTax: "Total con impuestos",
    perM2Result: "{price} €/m² × {m2} m²",
    disclaimer:
      "Presupuesto orientativo, sujeto a validación técnica y comercial. No constituye una oferta vinculante.",
    validity: "Validez orientativa: {days} días.",
    exclusionsTitle: "No incluido en este importe",
    pendingTitle: "Se confirma en el estudio técnico",
    request: "Solicitar este presupuesto",
    pdf: "Descargar PDF",
    pdfBusy: "Generando PDF…",
    pdfError: "No se pudo generar el PDF. Vuelve a intentarlo.",
    whatsapp: "Consultar por WhatsApp",
    model: "Modelo",
    mode: "Modalidad",
  },

  kit: {
    title: "Qué estás comprando",
    intro:
      "Un kit de construcción de hormigón celular con sus planos y su transporte, y la opción de que lo montemos. No es una vivienda terminada. Aquí está todo, partida por partida.",
    columns: {
      included: {
        title: "Incluido en el kit",
        text: "En las dos modalidades.",
      },
      assembly: {
        title: "Con la opción de montaje",
        text: "Solo si eliges kit + montaje.",
      },
      excluded: {
        title: "No incluido",
        text: "Ninguna modalidad incluye estas partidas.",
      },
      pending: {
        title: "Pendiente de confirmar",
        text: "Su inclusión y alcance se definirán en la ficha técnica y en el estudio de tu proyecto. Hasta entonces, no las consideres incluidas.",
      },
    },
    systemTitle: "Cómo se construye con el sistema",
    systemIntro:
      "Esquema general de una construcción con piezas de hormigón celular. Los componentes concretos de nuestro kit se detallarán en su ficha técnica.",
    systemLayers: [
      { title: "Planos y modulación", text: "La vivienda se define sobre una modulación que ordena las piezas, los huecos y las alturas." },
      { title: "Base según proyecto", text: "La cimentación o solera se dimensiona en el proyecto técnico según el terreno. Su inclusión está pendiente de confirmar." },
      { title: "Muros de piezas de hormigón celular", text: "Las piezas se colocan por hiladas, unidas habitualmente con mortero de capa fina." },
      { title: "Huecos y refuerzos", text: "Puertas y ventanas se resuelven con los elementos de refuerzo que defina el sistema." },
      { title: "Forjados y cubierta", text: "Su solución constructiva y su inclusión en el kit se confirmarán en la ficha técnica." },
    ],
    noClaims:
      "No atribuimos al kit prestaciones térmicas, acústicas, estructurales ni certificaciones concretas hasta disponer de sus fichas técnicas.",
  },

  process: {
    title: "Cómo funciona",
    intro: "De elegir tu casa a tenerla en la parcela, en seis pasos claros.",
    steps: [
      { title: "Selecciona tu vivienda", text: "Elige un modelo del catálogo o parte de la superficie que necesitas." },
      { title: "Personaliza superficie y modalidad", text: "Ajusta los metros cuadrados y decide si quieres solo el kit o el kit con montaje." },
      { title: "Recibe tu presupuesto", text: "Obtienes el desglose orientativo al momento y puedes descargarlo o enviárnoslo." },
      { title: "Validamos requisitos técnicos y proyecto", text: "Revisamos parcela, normativa y proyecto técnico, y confirmamos el alcance definitivo." },
      { title: "Preparamos el kit y el transporte", text: "Preparamos las piezas según los planos y organizamos la entrega en tu parcela." },
      { title: "Recibes el kit o lo montamos", text: "Construyes con tu equipo o nuestro equipo monta el kit, según la modalidad elegida." },
    ],
    stageLabels: ["Planos", "Replanteo", "Primeras hiladas", "Muros", "Huecos", "Estructura montada"],
    stageNote: "Secuencia esquemática. La cimentación, forjados y cubierta se definen en el proyecto técnico.",
    noDates:
      "Los plazos de cada fase dependen del proyecto, de las licencias y de la parcela. Te los indicaremos en el presupuesto definitivo.",
  },

  gallery: {
    title: "Galería",
    intro: "Alzados, vistas elevadas y plantas de los modelos. Todas las imágenes son ilustraciones orientativas.",
    open: "Ampliar imagen: {label}",
    dialog: "Galería ampliada",
    counter: "{i} de {n}",
  },

  material: {
    title: "Hormigón celular",
    lead:
      "Un material de construcción mineral, ligero y muy preciso. Aquí explicamos qué es y qué propiedades tiene, y por qué esas propiedades no son, por sí solas, las de tu casa.",
    whatTitle: "Qué es",
    whatText: [
      "El hormigón celular es un hormigón ligero con una estructura de pequeñas celdas de aire repartidas de forma uniforme. En su variante más habitual, el hormigón celular curado en autoclave, se fabrica con arena silícea, cemento, cal, agua y una pequeña cantidad de un agente expansivo que genera las burbujas.",
      "La masa se corta en bloques o paneles y se cura con vapor a presión. El resultado son piezas de densidad baja, dimensiones muy regulares y aspecto homogéneo.",
    ],
    distinctionTitle: "Material frente a edificio",
    distinctionText:
      "Las propiedades de un material no son las prestaciones de una vivienda. El comportamiento térmico, acústico, estructural o frente al fuego de tu casa dependerá del proyecto, del espesor de los muros, de las carpinterías, de los puentes térmicos, de la cubierta y de la ejecución. Las prestaciones concretas del kit se acreditarán con sus fichas técnicas.",
    labels: { material: "Propiedad del material", building: "En tu vivienda" },
    items: [
      {
        title: "Construcción racionalizada",
        material: "Piezas de formato grande y modulado, que reducen el número de unidades a colocar.",
        building: "La modulación de los planos ordena los huecos y los encuentros desde el principio.",
      },
      {
        title: "Eficiencia térmica",
        material: "Su estructura celular le da una conductividad térmica baja en comparación con los hormigones convencionales; el valor exacto depende de la densidad.",
        building: "La eficiencia real depende del espesor, del aislamiento complementario, de las carpinterías y de la orientación, y se calcula en el proyecto.",
      },
      {
        title: "Precisión dimensional",
        material: "Las piezas se fabrican con tolerancias reducidas, lo que permite juntas finas con mortero de capa fina.",
        building: "Muros más planos y regulares facilitan los trabajos posteriores, que dependerán de la ejecución en obra.",
      },
      {
        title: "Comportamiento frente al fuego",
        material: "Es un material mineral y, como tal, se clasifica habitualmente como no combustible.",
        building: "La resistencia al fuego de cada elemento se determina según el proyecto; la clasificación del producto suministrado constará en su documentación.",
      },
      {
        title: "Manipulación y montaje",
        material: "Su baja densidad hace las piezas más ligeras que otras de fábrica de tamaño similar y permite cortarlas con herramientas sencillas.",
        building: "Facilita el trabajo en obra; los medios necesarios dependen del formato de las piezas y de la parcela.",
      },
      {
        title: "Tiempos de ejecución",
        material: "Formatos grandes y juntas finas pueden reducir determinadas tareas de levantamiento de muros.",
        building: "El plazo total de una vivienda depende de licencias, cimentación, instalaciones y acabados. No prometemos plazos sin proyecto.",
      },
      {
        title: "Arquitectura y flexibilidad",
        material: "Se corta y se adapta con facilidad, lo que permite volúmenes, huecos y formas variadas.",
        building: "Los modelos son un punto de partida; cualquier cambio se estudia en el proyecto técnico.",
      },
    ],
    standardsTitle: "Normativa de referencia",
    standardsText:
      "Las piezas de hormigón celular curado en autoclave para fábricas se regulan en Europa mediante la norma UNE-EN 771-4, y su comportamiento al fuego se clasifica según la UNE-EN 13501-1. Las declaraciones de prestaciones del producto concreto se incorporarán a su ficha técnica.",
    cta: "Ver qué incluye el kit",
  },

  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Qué incluye exactamente el precio de 700 €/m²?",
        a: "El kit de construcción de hormigón celular según su ficha técnica, los planos de la vivienda y el transporte del kit. Si eliges kit + montaje (1.050 €/m²), se suma el montaje del mismo kit por 350 €/m².",
      },
      {
        q: "¿Es una casa llave en mano?",
        a: "No. No incluye instalación eléctrica, fontanería, baldosas, pavimentos ni revestimientos, ni ningún trabajo que no figure en el alcance del kit. Otras partidas, como cimentación, cubierta o carpinterías, están pendientes de confirmar y se definirán en tu presupuesto.",
      },
      {
        q: "¿Los precios incluyen impuestos?",
        a: "No. Todos los precios se muestran sin impuestos, que se indicarán por separado en el presupuesto definitivo.",
      },
      {
        q: "¿Sobre qué superficie se calcula el precio?",
        a: "Sobre la superficie presupuestada de la vivienda que aparece en cada modelo y en el configurador. El criterio de medición exacto se confirmará en el presupuesto definitivo.",
      },
      {
        q: "¿Necesito proyecto y licencia para construir?",
        a: "Sí. En España una vivienda requiere un proyecto técnico redactado por un técnico competente y la licencia municipal correspondiente. Los planos incluidos y el alcance del proyecto visado se detallarán en la ficha técnica y en tu presupuesto.",
      },
      {
        q: "¿Puedo montar el kit yo mismo o con mi constructor?",
        a: "Sí, esa es la modalidad de solo kit. La ejecución deberá ajustarse al proyecto técnico y contar con la dirección de obra que exija la normativa.",
      },
      {
        q: "¿Puedo cambiar la superficie o la distribución de un modelo?",
        a: "La superficie puedes ajustarla tú mismo en el configurador. Los cambios de distribución o de diseño se estudian caso por caso durante la validación técnica.",
      },
      {
        q: "¿Cuánto tarda la construcción?",
        a: "Depende de la parcela, las licencias, la cimentación y los trabajos posteriores al kit. No damos plazos sin conocer el proyecto; te los indicaremos en el presupuesto definitivo.",
      },
      {
        q: "¿A qué zonas llega el transporte?",
        a: "El transporte del kit está incluido. El ámbito geográfico, los accesos a la parcela y la descarga se confirman al validar tu proyecto.",
      },
    ],
  },

  contact: {
    title: "Solicita tu presupuesto",
    intro:
      "Cuéntanos dónde quieres construir y qué vivienda buscas. Revisamos tu caso y te respondemos con un presupuesto detallado.",
    fromConfigurator: "Hemos añadido los datos de tu presupuesto. Puedes cambiarlos.",
    fields: {
      name: "Nombre y apellidos",
      phone: "Teléfono",
      email: "Email",
      province: "Provincia donde quieres construir",
      provincePlaceholder: "Selecciona una provincia",
      model: "Modelo de interés",
      modelNone: "Aún no lo sé / superficie propia",
      surface: "Superficie aproximada (m²)",
      mode: "Modalidad",
      land: "¿Dispones ya de terreno?",
      landYes: "Sí",
      landNo: "No",
      landSearching: "Lo estoy buscando",
      message: "Mensaje (opcional)",
      messagePlaceholder: "Plazos que manejas, dudas sobre la parcela, cambios que te gustaría…",
      consent:
        "He leído la política de privacidad y acepto que {brand} trate mis datos para responder a esta solicitud.",
      privacyLink: "política de privacidad",
      honeypot: "Deja este campo vacío",
    },
    errors: {
      name: "Escribe tu nombre.",
      phone: "Escribe un teléfono válido, con al menos 9 cifras.",
      email: "Escribe un email válido.",
      province: "Selecciona la provincia.",
      surface: "Indica una superficie entre {min} y {max} m².",
      land: "Indica si dispones de terreno.",
      consent: "Necesitamos tu consentimiento para responderte.",
      captcha: "Completa la verificación antispam.",
    },
    review: "Revisar solicitud",
    reviewTitle: "Revisa tu solicitud",
    reviewIntro: "Esto es lo que vamos a recibir. Si todo es correcto, envíala.",
    edit: "Corregir datos",
    send: "Enviar solicitud",
    sending: "Enviando…",
    estimateTitle: "Presupuesto orientativo",
    success: {
      title: "Solicitud enviada",
      text: "La hemos recibido correctamente. Te contactaremos en {email} o en tu teléfono.",
      again: "Enviar otra solicitud",
    },
    error: {
      title: "No se ha podido enviar",
      text: "Ha fallado el envío. Comprueba tu conexión y vuelve a intentarlo.",
      validation: "Revisa los campos marcados.",
      rate: "Has enviado varias solicitudes seguidas. Espera unos minutos y vuelve a intentarlo.",
      spam: "No hemos podido verificar el envío. Recarga la página y vuelve a intentarlo.",
      retry: "Volver a intentarlo",
    },
    notConfigured: {
      title: "El envío online todavía no está activo",
      text: "Tu solicitud no se ha enviado: el formulario aún no está conectado al correo comercial. Puedes contactarnos directamente:",
      none: "Los datos de contacto directo se publicarán en breve.",
    },
    direct: "Contacto directo",
    phoneLabel: "Teléfono",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
  },

  stickyBar: {
    text: "Calcula el precio de tu casa",
    cta: "Calcular",
    info: "Información",
  },

  whatsapp: {
    button: "WhatsApp",
    general: "Hola, me interesan vuestras casas de hormigón celular en kit.",
    withEstimate:
      "Hola, me interesa {model}: {m2} m², modalidad {mode}. Presupuesto orientativo: {total} sin impuestos. ¿Podéis darme más información?",
    customModel: "una vivienda de superficie personalizada",
    devHint: "WhatsApp sin configurar: define NEXT_PUBLIC_WHATSAPP_NUMBER",
  },

  pdf: {
    title: "Presupuesto orientativo",
    date: "Fecha",
    reference: "Referencia",
    model: "Modelo",
    custom: "Superficie personalizada",
    surface: "Superficie presupuestada",
    mode: "Modalidad",
    breakdown: "Desglose",
    total: "Total sin impuestos",
    included: "Incluido",
    excluded: "No incluido",
    pending: "Pendiente de confirmar en el estudio técnico",
    footer: "Documento orientativo generado desde la web. No constituye una oferta vinculante.",
    filename: "presupuesto-orientativo",
  },

  footer: {
    claim: "Viviendas de hormigón celular en kit, con planos y transporte incluidos.",
    explore: "Explorar",
    company: "Información",
    legal: "Aviso legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    cookieSettings: "Configurar cookies",
    rights: "Todos los derechos reservados.",
    imagesNote: "Las imágenes de los modelos son ilustraciones orientativas.",
  },

  consent: {
    title: "Cookies",
    text: "Usamos almacenamiento técnico para que la web funcione. Con tu permiso, también usaremos analítica para saber qué modelos interesan más, sin datos personales en los eventos.",
    accept: "Aceptar analítica",
    reject: "Solo necesarias",
    more: "Más información",
  },

  notFound: {
    title: "Esta página no existe",
    text: "Puede que el enlace haya cambiado. Desde aquí puedes ver las viviendas o calcular tu presupuesto.",
  },

  legal: {
    pendingMark: "pendiente de completar",
    updated: "Última actualización",
    legalNotice: [
      {
        h: "Titular del sitio web",
        p: [
          "En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de que este sitio web es titularidad de {companyName}, con NIF {taxId} y domicilio en {registeredAddress}. Datos registrales: {registry}.",
          "Contacto: {email} · {phone}.",
        ],
      },
      {
        h: "Objeto",
        p: [
          "Este sitio web informa sobre los kits de vivienda de hormigón celular comercializados bajo la marca {brand} y permite calcular presupuestos orientativos y solicitar información.",
        ],
      },
      {
        h: "Carácter orientativo de la información",
        p: [
          "Los modelos, superficies, distribuciones, imágenes y presupuestos que aparecen en la web son orientativos. No constituyen una oferta vinculante. Las condiciones de cada suministro se recogerán en el presupuesto definitivo y en el contrato correspondiente.",
          "Las imágenes de los modelos son ilustraciones generadas a partir de su geometría y no representan obras construidas.",
        ],
      },
      {
        h: "Propiedad intelectual e industrial",
        p: [
          "Los contenidos de este sitio web, incluidos textos, diseños, ilustraciones y código, son titularidad de {companyName} o se usan con autorización. Queda prohibida su reproducción sin autorización expresa.",
        ],
      },
      {
        h: "Responsabilidad",
        p: [
          "El titular no se responsabiliza del uso que terceros hagan de la información publicada ni de los daños derivados de interrupciones técnicas ajenas a su control.",
        ],
      },
      {
        h: "Legislación aplicable",
        p: ["Este aviso legal se rige por la legislación española."],
      },
    ],
    privacy: [
      {
        h: "Responsable del tratamiento",
        p: [
          "{companyName}, NIF {taxId}, con domicilio en {registeredAddress}. Email de contacto para protección de datos: {privacyEmail}. Delegado de protección de datos: {dpoContact}.",
        ],
      },
      {
        h: "Qué datos tratamos y para qué",
        p: [
          "Cuando envías el formulario tratamos tu nombre, teléfono, email, provincia de construcción, superficie, modalidad, disponibilidad de terreno, mensaje y los datos del presupuesto orientativo, con la finalidad de responder a tu solicitud y elaborar un presupuesto.",
          "No usamos estos datos para enviarte comunicaciones comerciales distintas de la respuesta a tu solicitud sin tu consentimiento expreso.",
        ],
      },
      {
        h: "Base jurídica",
        p: [
          "La aplicación de medidas precontractuales a petición tuya (art. 6.1.b del RGPD) y tu consentimiento (art. 6.1.a del RGPD), que puedes retirar en cualquier momento.",
        ],
      },
      {
        h: "Destinatarios",
        p: [
          "No cedemos tus datos a terceros salvo obligación legal. Pueden acceder a ellos los proveedores que nos prestan servicios de alojamiento web, envío de correo y gestión comercial (CRM), como encargados del tratamiento y con las garantías exigidas por el RGPD. Proveedor de alojamiento: {hostingProvider}.",
        ],
      },
      {
        h: "Conservación",
        p: [
          "Conservamos los datos mientras se gestiona tu solicitud y, después, durante los plazos necesarios para atender posibles responsabilidades legales.",
        ],
      },
      {
        h: "Tus derechos",
        p: [
          "Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {privacyEmail}. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
        ],
      },
      {
        h: "Analítica",
        p: [
          "Si lo aceptas, medimos de forma agregada qué modelos se visitan y cómo se usa el configurador. Estos eventos no incluyen tu nombre, email, teléfono ni el contenido de tus mensajes.",
        ],
      },
    ],
    cookies: [
      {
        h: "Qué usamos",
        p: [
          "Esta web guarda en tu navegador, mediante almacenamiento local, tu decisión sobre cookies y la modalidad de presupuesto que has elegido. Es almacenamiento técnico necesario y no requiere consentimiento.",
        ],
      },
      {
        h: "Analítica (opcional)",
        p: [
          "Solo si pulsas «Aceptar analítica» cargamos Google Analytics 4, que instala cookies propias de analítica (por ejemplo, _ga) para medir visitas de forma agregada. Mientras no aceptes, no se carga ningún script de analítica.",
        ],
      },
      {
        h: "Verificación antispam",
        p: [
          "Si el formulario tiene activada la verificación de Cloudflare Turnstile, este servicio puede tratar información técnica de tu navegador con la única finalidad de evitar envíos automatizados.",
        ],
      },
      {
        h: "Cómo cambiar tu decisión",
        p: [
          "Puedes cambiar tu elección en cualquier momento desde el enlace «Configurar cookies» del pie de página o borrando los datos del sitio en tu navegador.",
        ],
      },
    ],
  },

  panel: {
    intro:
      "Página interna (no indexada) que resume qué datos están configurados y cuáles faltan antes de publicar. Los datos se editan en src/content.",
    ok: "Configurado",
    missing: "Pendiente",
    files: "Dónde se edita cada cosa",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof es>;
