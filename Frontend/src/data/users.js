// ===========================================
// Datos dummy alineados al schema de BD
// ===========================================

// Helper: nombre completo desde datos_generales
export const getFullName = (f) =>
  `${f.nombres} ${f.apellidoPaterno}${f.apellidoMaterno ? ' ' + f.apellidoMaterno : ''}`

// Helper: iniciales para avatar
export const getInitials = (f) =>
  `${f.nombres.charAt(0)}${f.apellidoPaterno.charAt(0)}`

// ---- catalogo_instituciones ----
export const catalogoInstituciones = [
  { idInstitucion: 1, nombreInstitucion: 'Universidad Iberoamericana' },
  { idInstitucion: 2, nombreInstitucion: 'UNAM' },
  { idInstitucion: 3, nombreInstitucion: 'MIT' },
  { idInstitucion: 4, nombreInstitucion: 'PMI' },
  { idInstitucion: 5, nombreInstitucion: 'Colegio de Ingenieros' },
  { idInstitucion: 6, nombreInstitucion: 'Autodesk University' },
  { idInstitucion: 7, nombreInstitucion: 'IPN' },
  { idInstitucion: 8, nombreInstitucion: 'Tecnológico de Monterrey' },
  { idInstitucion: 9, nombreInstitucion: 'Stanford University' },
  { idInstitucion: 10, nombreInstitucion: 'Harvard Extension' },
  { idInstitucion: 11, nombreInstitucion: 'Universidad Complutense' },
  { idInstitucion: 12, nombreInstitucion: 'Deloitte México' },
  { idInstitucion: 13, nombreInstitucion: 'IBM México' },
  { idInstitucion: 14, nombreInstitucion: 'CONACYT' },
  { idInstitucion: 15, nombreInstitucion: 'ANUIES' },
  { idInstitucion: 16, nombreInstitucion: 'ICSE' },
  { idInstitucion: 17, nombreInstitucion: 'CACEI' },
  { idInstitucion: 18, nombreInstitucion: 'Academia Mexicana de Ingeniería' },
  { idInstitucion: 19, nombreInstitucion: 'American Society of Civil Engineers' },
  { idInstitucion: 20, nombreInstitucion: 'IPADE' },
  { idInstitucion: 21, nombreInstitucion: 'Amazon Web Services' },
]

// Helper: obtener nombre de institución por id
export const getInstitucionNombre = (id) => {
  const inst = catalogoInstituciones.find(i => i.idInstitucion === id)
  return inst ? inst.nombreInstitucion : ''
}

// ---- gestion_usuarios ----
export const loginUsers = [
  {
    id: 1,
    correo: 'admin@ibero.mx',
    password: 'admin123',
    role: 'admin',          // campo UI (no existe en schema)
    activo: true,
    // datos de presentación UI
    nombres: 'Roberto',
    apellidoPaterno: 'García',
    apellidoMaterno: 'Luna',
    puestoInstitucion: 'Administrador del Sistema',
    avatar: 'RG'
  },
  {
    id: 2,
    correo: 'a.martinez@ibero.mx',
    password: 'docente123',
    role: 'professor',
    activo: true,
    facultyId: 1,
    nombres: 'Ana',
    apellidoPaterno: 'Martínez',
    apellidoMaterno: 'López',
    puestoInstitucion: 'Profesora de Tiempo Completo',
    avatar: 'AM'
  },
  {
    id: 3,
    correo: 's.rodriguez@ibero.mx',
    password: 'docente123',
    role: 'professor',
    activo: true,
    facultyId: 2,
    nombres: 'Sergio',
    apellidoPaterno: 'Rodríguez',
    apellidoMaterno: 'Hernández',
    puestoInstitucion: 'Coordinador Académico',
    avatar: 'SR'
  },
  {
    id: 4,
    correo: 'j.ramos@ibero.mx',
    password: 'docente123',
    role: 'professor',
    activo: true,
    facultyId: 3,
    nombres: 'Juan',
    apellidoPaterno: 'Ramos',
    apellidoMaterno: 'García',
    puestoInstitucion: 'Profesor de Asignatura',
    avatar: 'JR'
  }
]

// ---- datos_generales ----
export const facultyMembers = [
  {
    id: 1,
    nombres: 'Ana',
    apellidoPaterno: 'Martínez',
    apellidoMaterno: 'López',
    fechaNacimiento: '1980-03-15',
    puestoInstitucion: 'Profesora de Tiempo Completo',
    resumenProfesional: 'Doctora en Ingeniería con más de 15 años de experiencia en docencia e investigación en el área de estructuras y construcción sostenible.',
    activo: true,
    fechaCarga: '2023-08-15',
    fechaActualizacion: '2024-10-12',
    avatar: 'AM',
    avatarColor: 'bg-red-100 text-red-600'
  },
  {
    id: 2,
    nombres: 'Sergio',
    apellidoPaterno: 'Rodríguez',
    apellidoMaterno: 'Hernández',
    fechaNacimiento: '1975-07-22',
    puestoInstitucion: 'Coordinador Académico',
    resumenProfesional: 'Maestro en Administración con experiencia en gestión académica y proyectos de vinculación interinstitucional.',
    activo: true,
    fechaCarga: '2022-01-10',
    fechaActualizacion: '2024-11-04',
    avatar: 'SR',
    avatarColor: 'bg-purple-100 text-purple-600'
  },
  {
    id: 3,
    nombres: 'Juan',
    apellidoPaterno: 'Ramos',
    apellidoMaterno: 'García',
    fechaNacimiento: '1985-11-10',
    puestoInstitucion: 'Profesor de Asignatura',
    resumenProfesional: 'Ingeniero en Sistemas con especialidad en desarrollo de software y bases de datos.',
    activo: true,
    fechaCarga: '2023-03-20',
    fechaActualizacion: '2024-10-29',
    avatar: 'JR',
    avatarColor: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    nombres: 'María Elena',
    apellidoPaterno: 'Torres',
    apellidoMaterno: 'Vega',
    fechaNacimiento: '1978-06-05',
    puestoInstitucion: 'Profesora Titular',
    resumenProfesional: 'Especialista en derecho constitucional y derechos humanos con amplia experiencia en tribunales internacionales.',
    activo: true,
    fechaCarga: '2021-09-01',
    fechaActualizacion: '2024-11-15',
    avatar: 'MT',
    avatarColor: 'bg-pink-100 text-pink-600'
  },
  {
    id: 5,
    nombres: 'Fernando',
    apellidoPaterno: 'Vega',
    apellidoMaterno: 'Ruiz',
    fechaNacimiento: '1982-02-18',
    puestoInstitucion: 'Profesor Investigador',
    resumenProfesional: 'Profesor Investigador enfocado en biología molecular e ingeniería genética con múltiples patentes.',
    activo: true,
    fechaCarga: '2020-06-15',
    fechaActualizacion: '2024-12-01',
    avatar: 'FV',
    avatarColor: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 6,
    nombres: 'Ana Patricia',
    apellidoPaterno: 'Mendoza',
    apellidoMaterno: 'Flores',
    fechaNacimiento: '1990-09-25',
    puestoInstitucion: 'Profesora Asistente',
    resumenProfesional: 'Especializada en terapia cognitivo-conductual y salud mental adolescente.',
    activo: true,
    fechaCarga: '2023-01-15',
    fechaActualizacion: '2024-11-28',
    avatar: 'AP',
    avatarColor: 'bg-teal-100 text-teal-600'
  },
  {
    id: 7,
    nombres: 'Ricardo',
    apellidoPaterno: 'Fuentes',
    apellidoMaterno: 'Morales',
    fechaNacimiento: '1976-12-03',
    puestoInstitucion: 'Profesor Titular',
    resumenProfesional: 'Profesor de Arquitectura con experiencia en diseño urbano sostenible y preservación histórica.',
    activo: true,
    fechaCarga: '2019-08-20',
    fechaActualizacion: '2024-12-05',
    avatar: 'RF',
    avatarColor: 'bg-orange-100 text-orange-600'
  },
  {
    id: 8,
    nombres: 'Carlos',
    apellidoPaterno: 'Slim',
    apellidoMaterno: 'Velázquez',
    fechaNacimiento: '1970-04-12',
    puestoInstitucion: 'Profesor Visitante',
    resumenProfesional: 'Profesor Visitante con experiencia en políticas de salud pública y gestión hospitalaria.',
    activo: true,
    fechaCarga: '2023-06-01',
    fechaActualizacion: '2024-11-15',
    avatar: 'CS',
    avatarColor: 'bg-blue-100 text-blue-600'
  }
]

// Filtros de estado para directorio
export const statuses = [
  'Todos los estados',
  'Activo',
  'Inactivo'
]

// Secciones del formulario de profesor
export const formSections = [
  { id: 'datos-generales', label: 'Datos Generales', icon: 'User' },
  { id: 'informacion-academica', label: 'Estudios Académicos', icon: 'GraduationCap' },
  { id: 'experiencia-laboral', label: 'Experiencia Laboral', icon: 'Briefcase' },
  { id: 'capacitacion-actualizacion', label: 'Capacitación / Actualización', icon: 'BookOpen' },
  { id: 'logros-profesionales', label: 'Logros Profesionales', icon: 'Award' },
  { id: 'organismos', label: 'Organismos', icon: 'Users' },
  { id: 'premios-distinciones', label: 'Premios y Distinciones', icon: 'Trophy' },
  { id: 'productos-academicos', label: 'Productos Académicos', icon: 'FileText' }
]

// ---- estudios_academicos ----
export const estudiosAcademicos = {
  1: [
    { id: 1, nivelEstudio: 'Doctorado', tituloEstudio: 'Doctorado en Ingeniería Estructural', idInstitucion: 3, pais: 'EUA', anioObtencion: 2005, cedula: '12345678' },
    { id: 2, nivelEstudio: 'Maestría', tituloEstudio: 'Maestría en Ingeniería Civil', idInstitucion: 2, pais: 'México', anioObtencion: 2000, cedula: '87654321' },
    { id: 3, nivelEstudio: 'Licenciatura', tituloEstudio: 'Licenciatura en Ingeniería Civil', idInstitucion: 8, pais: 'México', anioObtencion: 1998, cedula: '11223344' }
  ],
  2: [
    { id: 1, nivelEstudio: 'Maestría', tituloEstudio: 'Maestría en Administración', idInstitucion: 11, pais: 'España', anioObtencion: 2010, cedula: '55667788' },
    { id: 2, nivelEstudio: 'Licenciatura', tituloEstudio: 'Licenciatura en Administración', idInstitucion: 2, pais: 'México', anioObtencion: 2006, cedula: '99001122' }
  ],
  3: [
    { id: 1, nivelEstudio: 'Maestría', tituloEstudio: 'Maestría en Sistemas Computacionales', idInstitucion: 1, pais: 'México', anioObtencion: 2015, cedula: '33445566' },
    { id: 2, nivelEstudio: 'Licenciatura', tituloEstudio: 'Ingeniería en Sistemas', idInstitucion: 1, pais: 'México', anioObtencion: 2010, cedula: '77889900' }
  ]
}

// ---- experiencia_laboral ----
export const experienciaLaboral = {
  1: [
    { id: 1, actividadPuesto: 'Profesora de Tiempo Completo', idInstitucion: 1, inicioMesAnio: 'Ago 2010', finMesAnio: 'Actual', tipoExperiencia: 'Académica', nivelExperiencia: 'Senior' },
    { id: 2, actividadPuesto: 'Investigadora Asociada', idInstitucion: 3, inicioMesAnio: 'Ene 2005', finMesAnio: 'Jul 2010', tipoExperiencia: 'Académica', nivelExperiencia: 'Intermedio' }
  ],
  2: [
    { id: 1, actividadPuesto: 'Coordinador Académico', idInstitucion: 1, inicioMesAnio: 'Ene 2015', finMesAnio: 'Actual', tipoExperiencia: 'Académica', nivelExperiencia: 'Senior' },
    { id: 2, actividadPuesto: 'Consultor de Gestión', idInstitucion: 12, inicioMesAnio: 'Mar 2010', finMesAnio: 'Dic 2014', tipoExperiencia: 'Profesional', nivelExperiencia: 'Intermedio' }
  ],
  3: [
    { id: 1, actividadPuesto: 'Profesor de Asignatura', idInstitucion: 1, inicioMesAnio: 'Ago 2018', finMesAnio: 'Actual', tipoExperiencia: 'Académica', nivelExperiencia: 'Junior' },
    { id: 2, actividadPuesto: 'Desarrollador de Software Sr.', idInstitucion: 13, inicioMesAnio: 'Feb 2012', finMesAnio: 'Jul 2018', tipoExperiencia: 'Ingenieril', nivelExperiencia: 'Senior' }
  ]
}

// ---- capacitacion_actualizacion ----
export const capacitacionActualizacion = {
  1: [
    { id: 1, nombreCapacitacion: 'Diplomado en Docencia Universitaria', tipoCapacitacion: 'Diplomado', idInstitucion: 2, pais: 'México', anioObtencion: 2022, horas: 120, tipTipoCurso: 'Capacitación', vigencia: 'Permanente' },
    { id: 2, nombreCapacitacion: 'Certificación en Gestión de Proyectos', tipoCapacitacion: 'Certificación PMP', idInstitucion: 4, pais: 'EUA', anioObtencion: 2020, horas: 80, tipTipoCurso: 'Capacitación', vigencia: '2025' },
    { id: 3, nombreCapacitacion: 'Seminario de Nuevas Tecnologías en Ingeniería', tipoCapacitacion: 'Seminario', idInstitucion: 5, pais: 'México', anioObtencion: 2023, horas: 20, tipTipoCurso: 'Actualización', vigencia: null },
    { id: 4, nombreCapacitacion: 'Curso de BIM Avanzado', tipoCapacitacion: 'Curso', idInstitucion: 6, pais: 'EUA', anioObtencion: 2022, horas: 40, tipTipoCurso: 'Actualización', vigencia: null }
  ],
  2: [
    { id: 1, nombreCapacitacion: 'Taller de Liderazgo Académico', tipoCapacitacion: 'Taller', idInstitucion: 10, pais: 'EUA', anioObtencion: 2021, horas: 40, tipTipoCurso: 'Capacitación', vigencia: 'Permanente' },
    { id: 2, nombreCapacitacion: 'Workshop en Gestión del Cambio Organizacional', tipoCapacitacion: 'Taller', idInstitucion: 20, pais: 'México', anioObtencion: 2023, horas: 16, tipTipoCurso: 'Actualización', vigencia: null }
  ],
  3: [
    { id: 1, nombreCapacitacion: 'Certificación AWS Cloud Practitioner', tipoCapacitacion: 'Certificación', idInstitucion: 21, pais: 'EUA', anioObtencion: 2024, horas: 60, tipTipoCurso: 'Actualización', vigencia: null }
  ]
}

// ---- logros_profesionales ----
export const logrosProfesionales = {
  1: [
    { id: 1, descLogro: 'Publicación de 15 artículos en revistas indexadas JCR en el área de ingeniería estructural.', idInstitucion: 1, anioObtencion: 2022 },
    { id: 2, descLogro: 'Dirección de 8 tesis doctorales concluidas exitosamente.', idInstitucion: 1, anioObtencion: 2023 }
  ],
  2: [
    { id: 1, descLogro: 'Implementación del programa de vinculación interinstitucional con 5 universidades internacionales.', idInstitucion: 1, anioObtencion: 2021 }
  ],
  3: [
    { id: 1, descLogro: 'Implementación del sistema de gestión académica integral.', idInstitucion: 1, anioObtencion: 2020 },
    { id: 2, descLogro: 'Coordinación de la acreditación de 5 programas académicos.', idInstitucion: 17, anioObtencion: 2023 }
  ]
}

// ---- organismos ----
export const organismos = {
  1: [
    { id: 1, idInstitucion: 18, anioInicio: 2015, anioFin: null, nivelExperiencia: 'Miembro Titular' },
    { id: 2, idInstitucion: 19, anioInicio: 2008, anioFin: null, nivelExperiencia: 'Fellow' }
  ],
  2: [
    { id: 1, idInstitucion: 15, anioInicio: 2018, anioFin: null, nivelExperiencia: 'Representante Institucional' }
  ],
  3: []
}

// ---- premios_distinciones ----
export const premiosDistinciones = {
  1: [
    { id: 1, descPremio: 'Premio de Innovación Tecnológica Educativa.', idInstitucion: 14, anioObtencion: 2023 },
    { id: 2, descPremio: 'Best Paper Award - International Conference on Structural Engineering.', idInstitucion: 16, anioObtencion: 2021 }
  ],
  2: [
    { id: 1, descPremio: 'Reconocimiento a la Gestión Académica de Excelencia.', idInstitucion: 15, anioObtencion: 2023 }
  ],
  3: []
}

// ---- productos_academicos ----
export const productosAcademicos = {
  1: [
    { id: 1, idPublicacion: 'DOI-2023-001', descripcionPublicacion: 'Materiales de construcción resistentes a sismos: Revisión exhaustiva. Journal of Structural Engineering.', idInstitucion: 1, anioProducto: 2023 },
    { id: 2, idPublicacion: 'DOI-2022-045', descripcionPublicacion: 'Prácticas de construcción sostenible en América Latina. Construction and Building Materials.', idInstitucion: 1, anioProducto: 2022 },
    { id: 3, idPublicacion: 'ISBN-2021-112', descripcionPublicacion: 'Enfoques innovadores para diseño sísmico. Engineering Structures.', idInstitucion: 3, anioProducto: 2021 }
  ],
  2: [
    { id: 1, idPublicacion: 'DOI-2023-015', descripcionPublicacion: 'Gestión académica en universidades iberoamericanas. Revista de Educación Superior.', idInstitucion: 1, anioProducto: 2023 }
  ],
  3: []
}

// Estado de completitud de secciones por facultyId
export const sectionStatus = {
  1: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitacion-actualizacion': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'complete',
    'premios-distinciones': 'complete',
    'productos-academicos': 'complete'
  },
  2: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitacion-actualizacion': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'complete',
    'premios-distinciones': 'complete',
    'productos-academicos': 'complete'
  },
  3: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitacion-actualizacion': 'pending',
    'logros-profesionales': 'complete',
    'organismos': 'pending',
    'premios-distinciones': 'pending',
    'productos-academicos': 'pending'
  }
}
