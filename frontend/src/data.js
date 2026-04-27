export const orgData = {
    title: "ORGANIGRAMA MUNICIPAL",
    top: {
        left: { text: "COMITÉ TÉCNICO ADMINISTRATIVO", greenBorder: true },
        center: { text: "ALCALDE" },
        right: { text: "CONCEJO" }
    },
    spine: [
        {
            left: [
                { text: "SECCION ASESORIA JURIDICA" },
                { text: "DEPARTAMENTO DE DEPORTES Y RECREACION" },
                { text: "DEPARTAMENTO DE INFORMATICA" },
                {
                    text: "DEPARTAMENTO DE CULTURA Y TURISMO",
                    bottom: [{ text: "BIBLIOTECA MUNICIPAL" }]
                },
                { text: "ADMINISTRADOR MUNICIPAL", isSpineNode: true }
            ],
            right: [
                { text: "JUZGADO POLICIA LOCAL", isSpineNode: true },
                { text: "SECRETARIO JUZGADO POLICIA LOCAL" }
            ]
        },
        {
            left: [
                { text: "SECCION TRANSPARENCIA" },
                { text: "OIRS" },
                { text: "OFICINA DE PARTES Y ARCHIVOS" },
                {
                    text: "SECRETARIO MUNICIPAL",
                    isSpineNode: true,
                    bottom: [{ text: "SECRETARIA CONCEJO" }]
                }
            ],
            right: [
                { text: "DIRECCION DE CONTROL", isSpineNode: true },
                { text: "AUDITORES" }
            ]
        },
        {
            left: [
                {
                    text: "SECPLAN",
                    isSpineNode: true,
                    bottom: [{ text: "ADQUISICIONES" }]
                }
            ],
            right: [
                { text: "DEPARTAMENTO RELACIONES PUBLICAS Y COMUNICACIONES", isSpineNode: true },
                { text: "OFICINA AUDIOVISUAL" }
            ]
        },
        {
            left: [],
            right: [
                { text: "GABINETE ALCALDIA", isSpineNode: true }
            ]
        }
    ],
    bottomRow: [
        { title: "DIRECCION DE TRANSITO", children: [] },
        {
            title: "DIRECCION DE OBRAS",
            children: ["SECCION OPERACIONES", "SECCION INSPECCION DE OBRAS", "OFICINA CONVENIO SII", "SECCION DE URBANISMO Y EDIFICACION"]
        },
        {
            title: "DIRECCION DE ADMINISTRACION Y FINANZAS",
            children: ["DEPTO. FINANZAS", "TESORERIA"]
        },
        {
            title: "DIRECCION DE DESARROLLO COMUNITARIO",
            children: ["DEPTO. ASISTENCIA SOCIAL", "SECCION ORG. COMUNITARIAS", "OFICINA DE VIVIENDA"]
        },
        {
            title: "DIRECCION DE GESTION DE PERSONAS",
            children: ["SECCION CAPACITACIONES", "SECCION DE BIENESTAR", "DEPARTAMENTO DE PREVENCION DE RIESGOS"]
        },
        {
            title: "DIRECCION DE RECURSOS HUMANOS",
            children: ["SECCION REMUNERACIONES", "DEPARTAMENTO DE MOVILIZACION"]
        },
        {
            title: "DIRECCION DE RENTAS Y PATENTES",
            children: ["DEPTO. INSPECCION Y COBRANZAS"]
        },
        {
            title: "DIRECCION DE INVENTARIOS Y SERVICIOS GENERALES",
            children: ["BODEGA MUNICIPAL"]
        },
        {
            title: "DIRECCION DE ASEO, ORNATO Y MEDIO AMBIENTE",
            children: ["SECCION DE ASEO", "SECCION DE ORNATO", "CENTRO VETERINARIO"]
        },
        {
            title: "DIRECCION DE SEGURIDAD",
            children: ["SENDA", "OPERADORES DE CAMARA DE TELEVIGILANCIA"]
        },
        { title: "DIRECCION DE GESTION DE RIESGOS DE DESASTRES", children: [] },
        { title: "DIRECCION DE EDUCACION", children: [] },
        { title: "DIRECCION DE SALUD", children: [] }
    ]
};

/* ────────────────────────────────────────────
   DIRECTORES  –  editable sin backend
   Campos opcionales:
     name   → nombre completo (null = "Sin asignar")
     email  → correo institucional (null = no se muestra)
     photo  → ruta relativa a /public  ej: "/fotos/alcalde.jpg"
              (null = se muestra avatar con iniciales)
   ──────────────────────────────────────────── */
export const nodeDirectors = {
    "ALCALDE": { role: "Alcalde", name: "Yamil Ethit Romero", email: "alcalde@munisantacruz.cl", photo: null },
    "ADMINISTRADOR MUNICIPAL": { role: "Administrador Municipal", name: "Karina Catalan Jorquera", email: "administrador@munisantacruz.cl", photo: null },
    "SECRETARIO MUNICIPAL": { role: "Secretario Municipal", name: "Mauricio Toledo Espinosa", email: "mauricio.toledo@munisantacruz.cl", photo: null },
    "SECRETARIA CONCEJO": { role: "Secretaria Concejo", name: "Leslie Dias", email: "secretaria.concejo@munisantacruz.cl", photo: null },
    "OFICINA DE PARTES Y ARCHIVOS": { role: "Gestión Documental", name: "Oficina de Partes", email: "partes@munisantacruz.cl", photo: null },
    "OIRS": { role: "Información y Reclamos", name: "OIRS", email: "oirs@munisantacruz.cl", photo: null },
    "SECCION TRANSPARENCIA": { role: "Transparencia Municipal", name: "Transparencia", email: "transparencia@munisantacruz.cl", photo: null },
    "DIRECCION DE CONTROL": { role: "Director de Control", name: "Mauricio Rojas Roman", email: "control@munisantacruz.cl", photo: null },
    "JUZGADO POLICIA LOCAL": { role: "Juez Policía Local", name: "Rafael Gonzalez Zamorano", email: "juzgado@munisantacruz.cl", photo: null },
    "DIRECCION DE TRANSITO": { role: "Director de Tránsito", name: "Pablo Lizama Carreño", email: "transito@munisantacruz.cl", photo: null },
    "DIRECCION DE OBRAS": { role: "Director de Obras Municipal", name: "Carlos Rojas Contreras", email: "obras@munisantacruz.cl", photo: null },
    "OFICINA CONVENIO SII": { role: "Encargada Convenio SII", name: "Maria Elba", email: "sii@munisantacruz.cl", photo: null },
    "DIRECCION DE ADMINISTRACION Y FINANZAS": { role: "Director Administración y Finanzas", name: "Maria Piña Peña", email: "daf@munisantacruz.cl", photo: null },
    "DEPTO. FINANZAS": { role: "Jefe de Finanzas", name: "Eduardo Nuñez Vera", email: "finanzas@munisantacruz.cl", photo: null },
    "TESORERIA": { role: "Jefe Tesorería", name: "Marta Muñoz Farias", email: "tesoreria@munisantacruz.cl", photo: null },
    "ADQUISICIONES": { role: "Jefe Adquisiciones", name: "Inés Amalia Gutierrez", email: "adquisiciones@munisantacruz.cl", photo: null },
    "BODEGA MUNICIPAL": { role: "Encargado Bodega", name: "Bodega Municipal", email: "bodega@munisantacruz.cl", photo: null },
    "DIRECCION DE DESARROLLO COMUNITARIO": { role: "Director DIDECO", name: "Gabriela Mora Meneses", email: "dideco@munisantacruz.cl", photo: null },
    "DEPTO. ASISTENCIA SOCIAL": { role: "Jefe Asistencia Social", name: "Paulina", email: "social@munisantacruz.cl", photo: null },
    "SECCION ORG. COMUNITARIAS": { role: "Organizaciones Comunitarias", name: "Joselyn Varas", email: "organizaciones.comunitarias@munisantacruz.cl", photo: null },
    "OFICINA DE VIVIENDA": { role: "Jefe Oficina Vivienda", name: "Luis Morales", email: "vivienda@munisantacruz.cl", photo: null },
    "DIRECCION DE GESTION DE PERSONAS": { role: "Director Gestión de Personas", name: "Evelyn Valdes Valderrama", email: "gestiondepersonas@munisantacruz.cl", photo: null },
    "SECCION CAPACITACIONES": { role: "Sección Capacitación", name: "Capacitación", email: "capacitacion@munisantacruz.cl", photo: null },
    "SECCION DE BIENESTAR": { role: "Sección Bienestar", name: "Bienestar", email: "bienestar@munisantacruz.cl", photo: null },
    "DEPARTAMENTO DE PREVENCION DE RIESGOS": { role: "Prevención de Riesgos", name: "Prevención", email: "prevencion@munisantacruz.cl", photo: null },
    "DIRECCION DE RECURSOS HUMANOS": { role: "Recursos Humanos", name: "Dirección RRHH", email: "rrhh@munisantacruz.cl", photo: null },
    "SECCION REMUNERACIONES": { role: "Remuneraciones", name: "Carlos Lagos", email: "remuneraciones@munisantacruz.cl", photo: null },
    "DEPARTAMENTO DE MOVILIZACION": { role: "Movilización", name: "Patricio Contreras", email: "movilizacion@munisantacruz.cl", photo: null },
    "DIRECCION DE RENTAS Y PATENTES": { role: "Director Rentas y Patentes", name: "Gonzalo Cortes Molina", email: "rentas@munisantacruz.cl", photo: null },
    "DEPTO. INSPECCION Y COBRANZAS": { role: "Inspección y Cobranzas", name: "Virginia Becerra Ahumada", email: "cobranzas@munisantacruz.cl", photo: null },
    "DIRECCION DE INVENTARIOS Y SERVICIOS GENERALES": { role: "Director Inventario y Servicios", name: "Alexis Pinto", email: "servicios@munisantacruz.cl", photo: null },
    "DIRECCION DE ASEO, ORNATO Y MEDIO AMBIENTE": { role: "Director Aseo y Ornato", name: "Nestro Bravo Salas", email: "aseo.ornato@munisantacruz.cl", photo: null },
    "CENTRO VETERINARIO": { role: "Atención Veterinaria", name: "Centro Veterinario", email: "veterinaria@munisantacruz.cl", photo: null },
    "DIRECCION DE SEGURIDAD": { role: "Director Seguridad Pública", name: "Allan Galdames Gonzalez", email: "seguridad@munisantacruz.cl", photo: null },
    "SENDA": { role: "Prevención Drogas", name: "SENDA Previene", email: "senda@munisantacruz.cl", photo: null },
    "OPERADORES DE CAMARA DE TELEVIGILANCIA": { role: "Sala de Cámaras", name: "Televigilancia", email: "camaras@munisantacruz.cl", photo: null },
    "DIRECCION DE SALUD": { role: "Director de Salud Municipal", name: "Marta Fierro Cabello", email: "directorsalud@munisantacruz.cl", photo: null },
    "DIRECCION DE EDUCACION": { role: "Director de Educación Municipal", name: "Sergio Correa", email: "educacion@munisantacruz.cl", photo: null },
    "DEPARTAMENTO DE INFORMATICA": { role: "Jefe de Informática", name: "Jaime Ordenes Peña", email: "informatica@munisantacruz.cl", photo: null },
    "DEPARTAMENTO DE DEPORTES Y RECREACION": { role: "Jefe Deporte y Recreación", name: "Sergio Farfan Guzman", email: "deportes@munisantacruz.cl", photo: null },
    "SECCION ASESORIA JURIDICA": { role: "Asesoría Legal", name: "Sección Asesorías Jurídicas", email: "juridico@munisantacruz.cl", photo: null },
    "DEPARTAMENTO RELACIONES PUBLICAS Y COMUNICACIONES": { role: "Jefe Relaciones Públicas", name: "Nataly Huaracan Diaz", email: "comunicaciones@munisantacruz.cl", photo: null },
    "DEPARTAMENTO DE CULTURA Y TURISMO": { role: "Encargada Oficina Cultura, Turismo y Biblioteca", name: "Luis Caceres", email: "cultura.turismo@munisantacruz.cl", photo: null },
    "BIBLIOTECA MUNICIPAL": { role: "Biblioteca Municipal", name: "Luis Caceres", email: "cultura.turismo@munisantacruz.cl", photo: null },
};

/* ────────────────────────────────────────────
   NODOS CON MÚLTIPLES MIEMBROS
   Para órganos colegiados (Concejo, Comités, etc.)
   institutionEmail → correo general del órgano
   members          → lista de integrantes
   ──────────────────────────────────────────── */
export const nodeMembers = {
    "CONCEJO": {
        institutionEmail: "concejo@munisantacruz.cl",
        members: [
            { name: "Juan Dutzan",       role: "Concejal", email: "juan.dutzan@munisantacruz.cl",       photo: null },
            { name: "Yasna Mancilla",    role: "Concejal", email: "yasna.mancilla@munisantacruz.cl",    photo: null },
            { name: "Luis Mella",        role: "Concejal", email: "luis.mella@munisantacruz.cl",        photo: null },
            { name: "Rosita Slack",      role: "Concejal", email: "rosita.slack@munisantacruz.cl",      photo: null },
            { name: "Luis Piña",         role: "Concejal", email: "luis.piña@munisantacruz.cl",         photo: null },
            { name: "Rossana Gonzalez",  role: "Concejal", email: "rossana.gonzalez@munisantacruz.cl",  photo: null },
        ]
    }
};

/* ────────────────────────────────────────────
   DESCRIPCIONES  –  una por cada nodo
   ──────────────────────────────────────────── */
export const nodeDescriptions = {
    "ORGANIGRAMA MUNICIPAL": "Estructura jerárquica general de la Ilustre Municipalidad de Santa Cruz.",
    "COMITÉ TÉCNICO ADMINISTRATIVO": "Instancia asesora y de coordinación estratégica para la gestión municipal y asesoramiento del Alcalde.",
    "ALCALDE": "Máxima autoridad de la municipalidad, encargado de la administración y representación legal de la comuna de Santa Cruz.",
    "CONCEJO": "Órgano normativo, resolutivo y fiscalizador, encargado de hacer efectiva la participación de la comunidad local.",

    "SECCION ASESORIA JURIDICA": "Asesora al Alcalde y demás unidades en materias legales para asegurar la estricta legalidad de los actos municipales.",
    "DEPARTAMENTO DE DEPORTES Y RECREACION": "Promueve, organiza y apoya el desarrollo de actividades deportivas y recreativas en toda la comuna.",
    "DEPARTAMENTO DE INFORMATICA": "Gestiona, desarrolla y mantiene los sistemas informáticos, redes y el equipamiento tecnológico de la municipalidad.",
    "DEPARTAMENTO DE CULTURA Y TURISMO": "Fomenta el desarrollo cultural, la protección patrimonial y potencia la actividad turística en Santa Cruz.",
    "BIBLIOTECA MUNICIPAL": "Provee acceso libre a la información, fomento lector y genera espacios culturales para toda la comunidad.",
    "ADMINISTRADOR MUNICIPAL": "Colabora directamente con el Alcalde en las tareas de coordinación y gestión permanente de todas las direcciones.",

    "JUZGADO POLICIA LOCAL": "Administra justicia en materias de faltas, Ley de Tránsito y diversas infracciones de competencia local.",
    "SECRETARIO JUZGADO POLICIA LOCAL": "Ministro de fe del Juzgado, encargado de certificar las resoluciones y la administración interna del tribunal.",

    "SECCION TRANSPARENCIA": "Asegura el cumplimiento de la Ley de Transparencia, gestionando y facilitando el acceso a la información pública ciudadana.",
    "OIRS": "Oficina de Informaciones, Reclamos y Sugerencias — canal principal de atención, derivación y respuesta ciudadana directa.",
    "OFICINA DE PARTES Y ARCHIVOS": "Encargada de recibir, clasificar, despachar y archivar toda la documentación oficial del municipio.",
    "SECRETARIO MUNICIPAL": "Ministro de fe de las actuaciones municipales, encargado de certificar decretos y actuar como secretario del Concejo.",
    "SECRETARIA CONCEJO": "Brinda apoyo administrativo y operativo directo a las labores de los Concejales y del Concejo Municipal.",

    "DIRECCION DE CONTROL": "Audita y fiscaliza la legalidad de las actuaciones municipales y controla el correcto uso de los recursos públicos.",
    "AUDITORES": "Profesionales encargados de planificar y ejecutar las auditorías internas bajo mandato de la Dirección de Control.",

    "SECPLAN": "Secretaría Comunal de Planificación, responsable del diseño, evaluación de proyectos y planificación del desarrollo comunal.",
    "ADQUISICIONES": "Unidad encargada de ejecutar y transparentar todos los procesos de compras y contrataciones públicas de la municipalidad.",

    "DEPARTAMENTO RELACIONES PUBLICAS Y COMUNICACIONES": "Gestiona la comunicación institucional, protocolo, relaciones con los medios y la difusión de las actividades municipales.",
    "OFICINA AUDIOVISUAL": "Encargada del registro fotográfico, audiovisual y la producción técnica del material comunicacional municipal.",

    "GABINETE ALCALDIA": "Equipo de apoyo directo y asesoría de confianza del Alcalde, encargado de su agenda y vinculación.",

    "DIRECCION DE TRANSITO": "Otorga licencias, permisos de circulación y gestiona la señalización y el ordenamiento del tránsito comunal.",
    "DIRECCION DE OBRAS": "Regula, aprueba y fiscaliza las construcciones y el desarrollo urbano integral de la comuna.",
    "SECCION OPERACIONES": "Ejecuta trabajos directos de mantención, reparaciones menores y apoyo logístico en el espacio público.",
    "SECCION INSPECCION DE OBRAS": "Fiscaliza en terreno el estricto cumplimiento de las normativas de construcción y urbanismo.",
    "OFICINA CONVENIO SII": "Mantiene actualizado el catastro de propiedades de la comuna en coordinación con el Servicio de Impuestos Internos.",
    "SECCION DE URBANISMO Y EDIFICACION": "Revisa y aprueba técnicamente los proyectos de edificación, loteos y obras de urbanización.",

    "DIRECCION DE ADMINISTRACION Y FINANZAS": "Administra estratégicamente los recursos financieros, patrimoniales y contables de la municipalidad de manera eficiente.",
    "DEPTO. FINANZAS": "Ejecuta el presupuesto municipal, la contabilidad y mantiene el control financiero de los ingresos y gastos.",
    "TESORERIA": "Recauda diariamente los ingresos municipales, custodia los fondos y ejecuta los pagos correspondientes a proveedores.",

    "DIRECCION DE DESARROLLO COMUNITARIO": "Promueve de forma integral el desarrollo social, económico, cultural y organizativo de los habitantes de la comuna.",
    "DEPTO. ASISTENCIA SOCIAL": "Brinda apoyo, orientación y ayuda concreta a personas y familias que se encuentran en situación de vulnerabilidad.",
    "SECCION ORG. COMUNITARIAS": "Fomenta la participación ciudadana y apoya legal y técnicamente a las organizaciones sociales y juntas de vecinos.",
    "OFICINA DE VIVIENDA": "Asesora, acompaña y gestiona postulaciones a diversos subsidios habitacionales para familias de la comunidad.",

    "DIRECCION DE GESTION DE PERSONAS": "Atrae, administra y desarrolla el talento humano y promueve un buen clima laboral para los funcionarios municipales.",
    "SECCION CAPACITACIONES": "Diseña y gestiona programas de perfeccionamiento y formación continua para el desarrollo de los funcionarios.",
    "SECCION DE BIENESTAR": "Administra los beneficios y prestaciones sociales orientados a mejorar la calidad de vida integral de los trabajadores.",
    "DEPARTAMENTO DE PREVENCION DE RIESGOS": "Promueve una cultura de seguridad laboral y previene proactivamente accidentes y enfermedades profesionales.",

    "DIRECCION DE RECURSOS HUMANOS": "Gestiona los contratos, control de asistencia, permisos legales y asegura el cumplimiento normativo del personal.",
    "SECCION REMUNERACIONES": "Calcula y ejecuta oportunamente el pago de sueldos, bonos e imposiciones legales de los funcionarios.",
    "DEPARTAMENTO DE MOVILIZACION": "Administra, mantiene operativa y controla eficientemente la flota de vehículos y conductores municipales.",

    "DIRECCION DE RENTAS Y PATENTES": "Gestiona y fiscaliza rigurosamente el cálculo y cobro de patentes comerciales, industriales, profesionales y derechos.",
    "DEPTO. INSPECCION Y COBRANZAS": "Fiscaliza en terreno el pago oportuno de patentes y asegura el cumplimiento de las normativas comerciales comunales.",

    "DIRECCION DE INVENTARIOS Y SERVICIOS GENERALES": "Administra el resguardo de los bienes muebles e inmuebles y provee los servicios básicos de mantención del edificio municipal.",
    "BODEGA MUNICIPAL": "Recepciona, clasifica, almacena y distribuye estratégicamente los materiales y suministros de toda la municipalidad.",

    "DIRECCION DE ASEO, ORNATO Y MEDIO AMBIENTE": "Mantiene la limpieza pública, preserva las áreas verdes y diseña políticas de sustentabilidad ambiental para la comuna.",
    "SECCION DE ASEO": "Planifica y supervisa la recolección de residuos sólidos domiciliarios y la limpieza de las calles.",
    "SECCION DE ORNATO": "Encargada del diseño, mantención y cuidado diario de parques, plazas, jardines y todas las áreas verdes públicas.",
    "CENTRO VETERINARIO": "Brinda atención clínica veterinaria primaria y fomenta activamente programas de tenencia responsable de mascotas.",

    "DIRECCION DE SEGURIDAD": "Coordina e implementa acciones preventivas orientadas a mejorar la seguridad pública y fortalecer la convivencia vecinal.",
    "SENDA": "Implementa programas locales e interviene para la prevención y rehabilitación del consumo problemático de drogas y alcohol.",
    "OPERADORES DE CAMARA DE TELEVIGILANCIA": "Monitorean constantemente la red de cámaras de seguridad para prevenir delitos y coordinar en tiempo real con las policías.",

    "DIRECCION DE GESTION DE RIESGOS DE DESASTRES": "Planifica estratégicamente y coordina acciones de prevención, mitigación y respuesta ante emergencias climáticas y catástrofes.",
    "DIRECCION DE EDUCACION": "Administra de forma integral el sistema de educación pública municipal, escuelas rurales y liceos.",
    "DIRECCION DE SALUD": "Gestiona operativamente la red de atención primaria de salud municipal, incluyendo CESFAM, CECOSF y Postas de Salud Rural."
};
