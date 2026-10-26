import type { Dictionary } from "./es";

/** Textos en català. Ha de tenir la mateixa estructura que es.ts. */
export const ca: Dictionary = {
  locale: "ca",
  langName: "Català",

  meta: {
    homeTitle: "Cases de formigó cel·lular en kit des de 700 €/m²",
    homeDescription:
      "Habitatges de formigó cel·lular en kit amb plànols i transport inclosos des de 700 €/m², o amb muntatge des de 1.050 €/m². Calcula el teu pressupost orientatiu en un minut.",
    catalogTitle: "Models de cases en kit de formigó cel·lular",
    catalogDescription:
      "Models d'una i dues plantes de 90 a 180 m². Preu del kit i del kit amb muntatge calculat per metre quadrat, amb abast detallat.",
    modelTitle: "Casa {name} de {m2} m² en kit de formigó cel·lular",
    modelDescription:
      "{name}: {summary} Kit des de {kit} o {assembly} amb muntatge. Plànols i transport inclosos. Pressupost orientatiu a l'instant.",
    budgetTitle: "Calcula el preu de la teva casa de formigó cel·lular",
    budgetDescription:
      "Configurador de pressupost: tria model o superfície i modalitat (només kit o kit amb muntatge) i obtén el desglossament a l'instant, amb exclusions i descàrrega en PDF.",
    kitTitle: "Què inclou el kit d'habitatge de formigó cel·lular",
    kitDescription:
      "Què hi ha inclòs, què no i què depèn de l'estudi tècnic als nostres kits de cases de formigó cel·lular. Transparència total abans de demanar pressupost.",
    processTitle: "Com funciona la compra de la teva casa en kit",
    processDescription:
      "Del model al kit a l'obra: selecció, pressupost, validació tècnica, preparació, transport i muntatge opcional de la teva casa de formigó cel·lular.",
    materialTitle: "Formigó cel·lular: què és i per què per al teu habitatge",
    materialDescription:
      "Què és el formigó cel·lular, com es fabrica i quines propietats té el material, distingint-les de les prestacions finals de l'habitatge.",
    contactTitle: "Demana pressupost de la teva casa en kit",
    contactDescription:
      "Explica'ns on vols construir, la superfície i la modalitat. Revisem el teu cas i t'enviem un pressupost detallat.",
    legalTitle: "Avís legal",
    privacyTitle: "Política de privacitat",
    cookiesTitle: "Política de galetes",
    panelTitle: "Estat de la configuració",
  },

  nav: {
    home: "Inici",
    models: "Habitatges",
    budget: "Pressupost",
    kit: "Què inclou",
    process: "Com funciona",
    material: "Formigó cel·lular",
    contact: "Contacte",
    openMenu: "Obrir el menú",
    closeMenu: "Tancar el menú",
    skip: "Saltar al contingut",
    language: "Idioma",
    cta: "Calcular pressupost",
  },

  common: {
    exploreModels: "Explorar habitatges",
    calculate: "Calcular el meu pressupost",
    viewHouse: "Veure l'habitatge",
    requestQuote: "Demanar pressupost",
    requestInfo: "Demanar informació",
    included: "Inclòs",
    includedPl: "Inclosos",
    notIncluded: "No inclòs",
    pending: "Pendent de confirmar",
    optional: "Opcional",
    perM2: "€/m²",
    from: "des de",
    m2: "m²",
    floors1: "Una planta",
    floors2: "Dues plantes",
    bedrooms: "{n} dormitoris",
    bedroom: "{n} dormitori",
    bathrooms: "{n} banys",
    bathroom: "{n} bany",
    proposal: "Proposta orientativa",
    illustration: "Il·lustració orientativa generada a partir de la geometria del model. No és una obra construïda.",
    illustrationShort: "Il·lustració orientativa",
    taxesNote: "Preus sense impostos. Els impostos aplicables s'indicaran per separat al pressupost definitiu.",
    taxesConfirmed: "Preus sense impostos. {taxName} ({rate} %) indicat per separat.",
    back: "Tornar",
    close: "Tancar",
    previous: "Anterior",
    next: "Següent",
    seeAll: "Veure tots els models",
    seeScope: "Veure l'abast complet",
    kitOnly: "Només kit",
    kitAssembly: "Kit + muntatge",
  },

  pricing: {
    criterion: {
      pending:
        "Superfície pressupostada: el criteri de mesura (construïda, útil o un altre) es confirmarà al pressupost definitiu.",
      built: "Superfície pressupostada: superfície construïda.",
      useful: "Superfície pressupostada: superfície útil.",
    },
    surfaceLabel: "Superfície pressupostada",
  },

  hero: {
    title: "La teva nova casa comença aquí.",
    subtitle:
      "Habitatges de formigó cel·lular en kit. Disseny, plànols i transport inclosos des de 700 €/m².",
    priceKit: "Kit amb plànols i transport",
    priceAssembly: "Kit amb muntatge",
    scroll: "Continuar baixant",
    caption: "Model {name}, {m2} m². Il·lustració orientativa.",
  },

  advantages: {
    title: "Una manera més ordenada de construir la teva casa",
    intro:
      "Dissenyem habitatges complets i els subministrem com un sistema: peces de formigó cel·lular definides als plànols, preparades per al muntatge i transportades fins a la teva parcel·la.",
    items: [
      {
        title: "Arquitectura definida des del principi",
        text: "Cada model parteix d'uns plànols i una modulació concrets. Saps quina casa compres abans de començar.",
      },
      {
        title: "Preu per metre quadrat, sense lletra petita",
        text: "700 €/m² el kit, 1.050 €/m² amb muntatge. El que no hi és inclòs, ho diem amb la mateixa claredat.",
      },
      {
        title: "Un material mineral i precís",
        text: "El formigó cel·lular és lleuger, es treballa amb exactitud i no és combustible. Les prestacions finals depenen del projecte complet.",
      },
      {
        title: "Tu tries quant fem",
        text: "Rep el kit i construeix-lo amb el teu equip, o contracta el nostre muntatge sobre el mateix kit.",
      },
    ],
    link: "Conèixer el formigó cel·lular",
  },

  catalog: {
    title: "Habitatges",
    intro:
      "Quatre punts de partida, d'una i dues plantes. Cada preu es calcula sobre la superfície pressupostada de l'habitatge.",
    provisional:
      "Models de mostra: superfícies, distribucions i imatges són orientatives i se substituiran pels models comercials definitius.",
    kitPrice: "Kit",
    assemblyPrice: "Amb muntatge",
    activeMode: "Preus mostrats per a",
    distribution: "Distribució orientativa",
    plan: "Plànol de planta",
    customTitle: "Necessites una altra superfície?",
    customText: "El configurador calcula el preu per a qualsevol superfície entre {min} i {max} m².",
    customCta: "Calcular superfície personalitzada",
  },

  model: {
    breadcrumbs: "Habitatges",
    gallery: "Vistes de l'habitatge",
    views: {
      front: "Façana principal",
      rear: "Perspectiva posterior",
      aerial: "Perspectiva elevada",
      plan: "Plànol de planta",
    },
    specs: "Dades de l'habitatge",
    surface: "Superfície pressupostada",
    storeys: "Plantes",
    program: "Programa",
    programPending: "Distribució pendent de validació comercial",
    footprint: "Petjada aproximada",
    rooms: "Estances",
    roomsNote: "Superfícies d'estances aproximades, mesurades a eixos i sense descomptar envans.",
    groundFloor: "Planta baixa",
    upperFloor: "Planta alta",
    calculator: "Calcula el preu de {name}",
    otherModels: "Altres models",
    highlights: "Claus del model",
  },

  rooms: {
    living: "Sala-menjador-cuina",
    kitchen: "Cuina",
    bedroom: "Dormitori {n}",
    master: "Dormitori principal",
    bath: "Bany {n}",
    toilet: "Lavabo",
    hall: "Rebedor",
    corridor: "Pas",
    stair: "Escala",
    laundry: "Safareig",
    dressing: "Vestidor",
    study: "Estudi",
  },

  compare: {
    title: "Dues maneres de comprar el mateix kit",
    intro: "El kit és idèntic a les dues modalitats. L'única diferència és qui el munta.",
    kit: {
      name: "Només kit",
      text: "Per a qui té constructor o vol dirigir l'obra. Reps el kit, els plànols i el transport fins a la parcel·la.",
    },
    assembly: {
      name: "Kit + muntatge",
      text: "Per a qui prefereix un sol interlocutor per aixecar l'habitatge. El mateix kit, muntat pel nostre equip.",
      breakdown: "700 €/m² del kit + 350 €/m² de muntatge",
    },
    rows: {
      kit: "Kit de formigó cel·lular",
      plans: "Plànols",
      transport: "Transport del kit",
      assembly: "Muntatge del kit",
      finished: "Habitatge acabat / clau en mà",
    },
    example: "Exemple per a {m2} m²",
    notTurnkey:
      "Cap de les dues modalitats és un habitatge acabat ni una construcció clau en mà.",
  },

  configurator: {
    title: "Calcula el teu pressupost",
    intro: "Quatre passos i el desglossament a l'instant. Sense registres.",
    step1: "Tria un model o una superfície pròpia",
    step2: "Ajusta la superfície",
    step3: "Tria la modalitat",
    step4: "El teu pressupost orientatiu",
    custom: "Superfície personalitzada",
    customHint: "Introdueix els m² del teu projecte",
    surfaceInput: "Superfície en m²",
    decrease: "Reduir la superfície",
    increase: "Augmentar la superfície",
    rangeError: "Introdueix una superfície entre {min} i {max} m².",
    assemblyToggle: "Incloure muntatge",
    assemblyHint: "+350 €/m²",
    concept: "Concepte",
    amount: "Import",
    lineKit: "Kit d'habitatge",
    linePlans: "Plànols",
    lineTransport: "Transport",
    lineAssembly: "Muntatge",
    lineAssemblyOff: "Muntatge (no seleccionat)",
    totalKit: "Total només kit",
    totalAssembly: "Total amb muntatge",
    taxLine: "{taxName} ({rate} %)",
    totalWithTax: "Total amb impostos",
    perM2Result: "{price} €/m² × {m2} m²",
    disclaimer:
      "Pressupost orientatiu, subjecte a validació tècnica i comercial. No constitueix una oferta vinculant.",
    validity: "Validesa orientativa: {days} dies.",
    exclusionsTitle: "No inclòs en aquest import",
    pendingTitle: "Es confirma a l'estudi tècnic",
    request: "Demanar aquest pressupost",
    pdf: "Descarregar PDF",
    pdfBusy: "Generant el PDF…",
    pdfError: "No s'ha pogut generar el PDF. Torna-ho a provar.",
    whatsapp: "Consultar per WhatsApp",
    model: "Model",
    mode: "Modalitat",
  },

  kit: {
    title: "Què estàs comprant",
    intro:
      "Un kit de construcció de formigó cel·lular amb els seus plànols i el seu transport, i l'opció que el muntem. No és un habitatge acabat. Aquí ho tens tot, partida per partida.",
    columns: {
      included: { title: "Inclòs al kit", text: "A les dues modalitats." },
      assembly: { title: "Amb l'opció de muntatge", text: "Només si tries kit + muntatge." },
      excluded: { title: "No inclòs", text: "Cap modalitat inclou aquestes partides." },
      pending: {
        title: "Pendent de confirmar",
        text: "La seva inclusió i abast es definiran a la fitxa tècnica i a l'estudi del teu projecte. Fins aleshores, no les consideris incloses.",
      },
    },
    systemTitle: "Com es construeix amb el sistema",
    systemIntro:
      "Esquema general d'una construcció amb peces de formigó cel·lular. Els components concrets del nostre kit es detallaran a la seva fitxa tècnica.",
    systemLayers: [
      { title: "Plànols i modulació", text: "L'habitatge es defineix sobre una modulació que ordena les peces, els buits i les altures." },
      { title: "Base segons projecte", text: "La fonamentació o solera es dimensiona al projecte tècnic segons el terreny. La seva inclusió està pendent de confirmar." },
      { title: "Murs de peces de formigó cel·lular", text: "Les peces es col·loquen per filades, unides habitualment amb morter de capa fina." },
      { title: "Buits i reforços", text: "Portes i finestres es resolen amb els elements de reforç que defineixi el sistema." },
      { title: "Forjats i coberta", text: "La seva solució constructiva i la seva inclusió al kit es confirmaran a la fitxa tècnica." },
    ],
    noClaims:
      "No atribuïm al kit prestacions tèrmiques, acústiques, estructurals ni certificacions concretes fins a disposar de les seves fitxes tècniques.",
  },

  process: {
    title: "Com funciona",
    intro: "De triar la teva casa a tenir-la a la parcel·la, en sis passos clars.",
    steps: [
      { title: "Selecciona el teu habitatge", text: "Tria un model del catàleg o parteix de la superfície que necessites." },
      { title: "Personalitza superfície i modalitat", text: "Ajusta els metres quadrats i decideix si vols només el kit o el kit amb muntatge." },
      { title: "Rep el teu pressupost", text: "Obtens el desglossament orientatiu a l'instant i pots descarregar-lo o enviar-nos-el." },
      { title: "Validem requisits tècnics i projecte", text: "Revisem parcel·la, normativa i projecte tècnic, i confirmem l'abast definitiu." },
      { title: "Preparem el kit i el transport", text: "Preparem les peces segons els plànols i organitzem el lliurament a la teva parcel·la." },
      { title: "Reps el kit o el muntem", text: "Construeixes amb el teu equip o el nostre equip munta el kit, segons la modalitat triada." },
    ],
    stageLabels: ["Plànols", "Replantejament", "Primeres filades", "Murs", "Buits", "Estructura muntada"],
    stageNote: "Seqüència esquemàtica. La fonamentació, els forjats i la coberta es defineixen al projecte tècnic.",
    noDates:
      "Els terminis de cada fase depenen del projecte, de les llicències i de la parcel·la. T'els indicarem al pressupost definitiu.",
  },

  gallery: {
    title: "Galeria",
    intro: "Alçats, vistes elevades i plantes dels models. Totes les imatges són il·lustracions orientatives.",
    open: "Ampliar la imatge: {label}",
    dialog: "Galeria ampliada",
    counter: "{i} de {n}",
  },

  material: {
    title: "Formigó cel·lular",
    lead:
      "Un material de construcció mineral, lleuger i molt precís. Aquí expliquem què és i quines propietats té, i per què aquestes propietats no són, per si soles, les de la teva casa.",
    whatTitle: "Què és",
    whatText: [
      "El formigó cel·lular és un formigó lleuger amb una estructura de petites cel·les d'aire repartides de manera uniforme. En la seva variant més habitual, el formigó cel·lular curat en autoclau, es fabrica amb sorra silícia, ciment, calç, aigua i una petita quantitat d'un agent expansiu que genera les bombolles.",
      "La massa es talla en blocs o panells i es cura amb vapor a pressió. El resultat són peces de densitat baixa, dimensions molt regulars i aspecte homogeni.",
    ],
    distinctionTitle: "Material davant d'edifici",
    distinctionText:
      "Les propietats d'un material no són les prestacions d'un habitatge. El comportament tèrmic, acústic, estructural o davant del foc de la teva casa dependrà del projecte, del gruix dels murs, de les fusteries, dels ponts tèrmics, de la coberta i de l'execució. Les prestacions concretes del kit s'acreditaran amb les seves fitxes tècniques.",
    labels: { material: "Propietat del material", building: "Al teu habitatge" },
    items: [
      {
        title: "Construcció racionalitzada",
        material: "Peces de format gran i modulat, que redueixen el nombre d'unitats a col·locar.",
        building: "La modulació dels plànols ordena els buits i les trobades des del principi.",
      },
      {
        title: "Eficiència tèrmica",
        material: "La seva estructura cel·lular li dona una conductivitat tèrmica baixa en comparació amb els formigons convencionals; el valor exacte depèn de la densitat.",
        building: "L'eficiència real depèn del gruix, de l'aïllament complementari, de les fusteries i de l'orientació, i es calcula al projecte.",
      },
      {
        title: "Precisió dimensional",
        material: "Les peces es fabriquen amb toleràncies reduïdes, cosa que permet juntes fines amb morter de capa fina.",
        building: "Murs més plans i regulars faciliten els treballs posteriors, que dependran de l'execució a l'obra.",
      },
      {
        title: "Comportament davant del foc",
        material: "És un material mineral i, com a tal, es classifica habitualment com a no combustible.",
        building: "La resistència al foc de cada element es determina segons el projecte; la classificació del producte subministrat constarà a la seva documentació.",
      },
      {
        title: "Manipulació i muntatge",
        material: "La seva baixa densitat fa les peces més lleugeres que altres de fàbrica de mida similar i permet tallar-les amb eines senzilles.",
        building: "Facilita la feina a l'obra; els mitjans necessaris depenen del format de les peces i de la parcel·la.",
      },
      {
        title: "Temps d'execució",
        material: "Formats grans i juntes fines poden reduir determinades tasques d'aixecament de murs.",
        building: "El termini total d'un habitatge depèn de llicències, fonamentació, instal·lacions i acabats. No prometem terminis sense projecte.",
      },
      {
        title: "Arquitectura i flexibilitat",
        material: "Es talla i s'adapta amb facilitat, cosa que permet volums, buits i formes variades.",
        building: "Els models són un punt de partida; qualsevol canvi s'estudia al projecte tècnic.",
      },
    ],
    standardsTitle: "Normativa de referència",
    standardsText:
      "Les peces de formigó cel·lular curat en autoclau per a fàbriques es regulen a Europa mitjançant la norma UNE-EN 771-4, i el seu comportament davant del foc es classifica segons la UNE-EN 13501-1. Les declaracions de prestacions del producte concret s'incorporaran a la seva fitxa tècnica.",
    cta: "Veure què inclou el kit",
  },

  faq: {
    title: "Preguntes freqüents",
    items: [
      {
        q: "Què inclou exactament el preu de 700 €/m²?",
        a: "El kit de construcció de formigó cel·lular segons la seva fitxa tècnica, els plànols de l'habitatge i el transport del kit. Si tries kit + muntatge (1.050 €/m²), s'hi suma el muntatge del mateix kit per 350 €/m².",
      },
      {
        q: "És una casa clau en mà?",
        a: "No. No inclou instal·lació elèctrica, lampisteria, rajoles, paviments ni revestiments, ni cap treball que no figuri a l'abast del kit. Altres partides, com la fonamentació, la coberta o les fusteries, estan pendents de confirmar i es definiran al teu pressupost.",
      },
      {
        q: "Els preus inclouen impostos?",
        a: "No. Tots els preus es mostren sense impostos, que s'indicaran per separat al pressupost definitiu.",
      },
      {
        q: "Sobre quina superfície es calcula el preu?",
        a: "Sobre la superfície pressupostada de l'habitatge que apareix a cada model i al configurador. El criteri de mesura exacte es confirmarà al pressupost definitiu.",
      },
      {
        q: "Necessito projecte i llicència per construir?",
        a: "Sí. A Espanya un habitatge requereix un projecte tècnic redactat per un tècnic competent i la llicència municipal corresponent. Els plànols inclosos i l'abast del projecte visat es detallaran a la fitxa tècnica i al teu pressupost.",
      },
      {
        q: "Puc muntar el kit jo mateix o amb el meu constructor?",
        a: "Sí, aquesta és la modalitat de només kit. L'execució s'haurà d'ajustar al projecte tècnic i comptar amb la direcció d'obra que exigeixi la normativa.",
      },
      {
        q: "Puc canviar la superfície o la distribució d'un model?",
        a: "La superfície la pots ajustar tu mateix al configurador. Els canvis de distribució o de disseny s'estudien cas per cas durant la validació tècnica.",
      },
      {
        q: "Quant triga la construcció?",
        a: "Depèn de la parcel·la, les llicències, la fonamentació i els treballs posteriors al kit. No donem terminis sense conèixer el projecte; te'ls indicarem al pressupost definitiu.",
      },
      {
        q: "A quines zones arriba el transport?",
        a: "El transport del kit hi és inclòs. L'àmbit geogràfic, els accessos a la parcel·la i la descàrrega es confirmen en validar el teu projecte.",
      },
    ],
  },

  contact: {
    title: "Demana el teu pressupost",
    intro:
      "Explica'ns on vols construir i quin habitatge busques. Revisem el teu cas i et responem amb un pressupost detallat.",
    fromConfigurator: "Hem afegit les dades del teu pressupost. Les pots canviar.",
    fields: {
      name: "Nom i cognoms",
      phone: "Telèfon",
      email: "Correu electrònic",
      province: "Província on vols construir",
      provincePlaceholder: "Selecciona una província",
      model: "Model d'interès",
      modelNone: "Encara no ho sé / superfície pròpia",
      surface: "Superfície aproximada (m²)",
      mode: "Modalitat",
      land: "Ja disposes de terreny?",
      landYes: "Sí",
      landNo: "No",
      landSearching: "L'estic buscant",
      message: "Missatge (opcional)",
      messagePlaceholder: "Terminis que tens en ment, dubtes sobre la parcel·la, canvis que t'agradarien…",
      consent:
        "He llegit la política de privacitat i accepto que {brand} tracti les meves dades per respondre aquesta sol·licitud.",
      privacyLink: "política de privacitat",
      honeypot: "Deixa aquest camp buit",
    },
    errors: {
      name: "Escriu el teu nom.",
      phone: "Escriu un telèfon vàlid, amb almenys 9 xifres.",
      email: "Escriu un correu electrònic vàlid.",
      province: "Selecciona la província.",
      surface: "Indica una superfície entre {min} i {max} m².",
      land: "Indica si disposes de terreny.",
      consent: "Necessitem el teu consentiment per respondre't.",
      captcha: "Completa la verificació antispam.",
    },
    review: "Revisar la sol·licitud",
    reviewTitle: "Revisa la teva sol·licitud",
    reviewIntro: "Això és el que rebrem. Si tot és correcte, envia-la.",
    edit: "Corregir les dades",
    send: "Enviar la sol·licitud",
    sending: "Enviant…",
    estimateTitle: "Pressupost orientatiu",
    success: {
      title: "Sol·licitud enviada",
      text: "L'hem rebuda correctament. Et contactarem a {email} o al teu telèfon.",
      again: "Enviar una altra sol·licitud",
    },
    error: {
      title: "No s'ha pogut enviar",
      text: "Ha fallat l'enviament. Comprova la connexió i torna-ho a provar.",
      validation: "Revisa els camps marcats.",
      rate: "Has enviat diverses sol·licituds seguides. Espera uns minuts i torna-ho a provar.",
      spam: "No hem pogut verificar l'enviament. Recarrega la pàgina i torna-ho a provar.",
      retry: "Tornar-ho a provar",
    },
    notConfigured: {
      title: "L'enviament en línia encara no està actiu",
      text: "La teva sol·licitud no s'ha enviat: el formulari encara no està connectat al correu comercial. Pots contactar-nos directament:",
      none: "Les dades de contacte directe es publicaran aviat.",
    },
    direct: "Contacte directe",
    phoneLabel: "Telèfon",
    emailLabel: "Correu electrònic",
    whatsappLabel: "WhatsApp",
  },

  stickyBar: {
    text: "Calcula el preu de la teva casa",
    cta: "Calcular",
    info: "Informació",
  },

  whatsapp: {
    button: "WhatsApp",
    general: "Hola, m'interessen les vostres cases de formigó cel·lular en kit.",
    withEstimate:
      "Hola, m'interessa {model}: {m2} m², modalitat {mode}. Pressupost orientatiu: {total} sense impostos. Em podeu donar més informació?",
    customModel: "un habitatge de superfície personalitzada",
    devHint: "WhatsApp sense configurar: defineix NEXT_PUBLIC_WHATSAPP_NUMBER",
  },

  pdf: {
    title: "Pressupost orientatiu",
    date: "Data",
    reference: "Referència",
    model: "Model",
    custom: "Superfície personalitzada",
    surface: "Superfície pressupostada",
    mode: "Modalitat",
    breakdown: "Desglossament",
    total: "Total sense impostos",
    included: "Inclòs",
    excluded: "No inclòs",
    pending: "Pendent de confirmar a l'estudi tècnic",
    footer: "Document orientatiu generat des del web. No constitueix una oferta vinculant.",
    filename: "pressupost-orientatiu",
  },

  footer: {
    claim: "Habitatges de formigó cel·lular en kit, amb plànols i transport inclosos.",
    explore: "Explorar",
    company: "Informació",
    legal: "Avís legal",
    privacy: "Privacitat",
    cookies: "Galetes",
    cookieSettings: "Configurar galetes",
    rights: "Tots els drets reservats.",
    imagesNote: "Les imatges dels models són il·lustracions orientatives.",
  },

  consent: {
    title: "Galetes",
    text: "Fem servir emmagatzematge tècnic perquè el web funcioni. Amb el teu permís, també farem servir analítica per saber quins models interessen més, sense dades personals als esdeveniments.",
    accept: "Acceptar l'analítica",
    reject: "Només les necessàries",
    more: "Més informació",
  },

  notFound: {
    title: "Aquesta pàgina no existeix",
    text: "Potser l'enllaç ha canviat. Des d'aquí pots veure els habitatges o calcular el teu pressupost.",
  },

  legal: {
    pendingMark: "pendent de completar",
    updated: "Darrera actualització",
    legalNotice: [
      {
        h: "Titular del lloc web",
        p: [
          "En compliment de l'article 10 de la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), s'informa que aquest lloc web és titularitat de {companyName}, amb NIF {taxId} i domicili a {registeredAddress}. Dades registrals: {registry}.",
          "Contacte: {email} · {phone}.",
        ],
      },
      {
        h: "Objecte",
        p: [
          "Aquest lloc web informa sobre els kits d'habitatge de formigó cel·lular comercialitzats sota la marca {brand} i permet calcular pressupostos orientatius i demanar informació.",
        ],
      },
      {
        h: "Caràcter orientatiu de la informació",
        p: [
          "Els models, superfícies, distribucions, imatges i pressupostos que apareixen al web són orientatius. No constitueixen una oferta vinculant. Les condicions de cada subministrament es recolliran al pressupost definitiu i al contracte corresponent.",
          "Les imatges dels models són il·lustracions generades a partir de la seva geometria i no representen obres construïdes.",
        ],
      },
      {
        h: "Propietat intel·lectual i industrial",
        p: [
          "Els continguts d'aquest lloc web, inclosos textos, dissenys, il·lustracions i codi, són titularitat de {companyName} o s'utilitzen amb autorització. Queda prohibida la seva reproducció sense autorització expressa.",
        ],
      },
      {
        h: "Responsabilitat",
        p: [
          "El titular no es responsabilitza de l'ús que terceres persones facin de la informació publicada ni dels danys derivats d'interrupcions tècniques alienes al seu control.",
        ],
      },
      {
        h: "Legislació aplicable",
        p: ["Aquest avís legal es regeix per la legislació espanyola."],
      },
    ],
    privacy: [
      {
        h: "Responsable del tractament",
        p: [
          "{companyName}, NIF {taxId}, amb domicili a {registeredAddress}. Correu de contacte per a protecció de dades: {privacyEmail}. Delegat de protecció de dades: {dpoContact}.",
        ],
      },
      {
        h: "Quines dades tractem i per a què",
        p: [
          "Quan envies el formulari tractem el teu nom, telèfon, correu electrònic, província de construcció, superfície, modalitat, disponibilitat de terreny, missatge i les dades del pressupost orientatiu, amb la finalitat de respondre la teva sol·licitud i elaborar un pressupost.",
          "No fem servir aquestes dades per enviar-te comunicacions comercials diferents de la resposta a la teva sol·licitud sense el teu consentiment exprés.",
        ],
      },
      {
        h: "Base jurídica",
        p: [
          "L'aplicació de mesures precontractuals a petició teva (art. 6.1.b del RGPD) i el teu consentiment (art. 6.1.a del RGPD), que pots retirar en qualsevol moment.",
        ],
      },
      {
        h: "Destinataris",
        p: [
          "No cedim les teves dades a tercers excepte per obligació legal. Hi poden accedir els proveïdors que ens presten serveis d'allotjament web, enviament de correu i gestió comercial (CRM), com a encarregats del tractament i amb les garanties que exigeix el RGPD. Proveïdor d'allotjament: {hostingProvider}.",
        ],
      },
      {
        h: "Conservació",
        p: [
          "Conservem les dades mentre es gestiona la teva sol·licitud i, després, durant els terminis necessaris per atendre possibles responsabilitats legals.",
        ],
      },
      {
        h: "Els teus drets",
        p: [
          "Pots exercir els drets d'accés, rectificació, supressió, oposició, limitació i portabilitat escrivint a {privacyEmail}. També pots presentar una reclamació davant l'Agència Espanyola de Protecció de Dades (www.aepd.es).",
        ],
      },
      {
        h: "Analítica",
        p: [
          "Si ho acceptes, mesurem de manera agregada quins models es visiten i com es fa servir el configurador. Aquests esdeveniments no inclouen el teu nom, correu, telèfon ni el contingut dels teus missatges.",
        ],
      },
    ],
    cookies: [
      {
        h: "Què fem servir",
        p: [
          "Aquest web desa al teu navegador, mitjançant emmagatzematge local, la teva decisió sobre galetes i la modalitat de pressupost que has triat. És emmagatzematge tècnic necessari i no requereix consentiment.",
        ],
      },
      {
        h: "Analítica (opcional)",
        p: [
          "Només si prems «Acceptar l'analítica» carreguem Google Analytics 4, que instal·la galetes pròpies d'analítica (per exemple, _ga) per mesurar visites de manera agregada. Mentre no acceptis, no es carrega cap script d'analítica.",
        ],
      },
      {
        h: "Verificació antispam",
        p: [
          "Si el formulari té activada la verificació de Cloudflare Turnstile, aquest servei pot tractar informació tècnica del teu navegador amb l'única finalitat d'evitar enviaments automatitzats.",
        ],
      },
      {
        h: "Com canviar la teva decisió",
        p: [
          "Pots canviar la teva elecció en qualsevol moment des de l'enllaç «Configurar galetes» del peu de pàgina o esborrant les dades del lloc al navegador.",
        ],
      },
    ],
  },

  panel: {
    intro:
      "Pàgina interna (no indexada) que resumeix quines dades estan configurades i quines falten abans de publicar. Les dades s'editen a src/content.",
    ok: "Configurat",
    missing: "Pendent",
    files: "On s'edita cada cosa",
  },
};
