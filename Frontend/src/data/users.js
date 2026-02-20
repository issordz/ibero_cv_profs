// ===========================================
// Datos dummy alineados al schema de BD
// ===========================================

// Helper: nombre completo desde datos_generales
export const getFullName = (f) =>
  `${f.nombres} ${f.apellidoPaterno}${f.apellidoMaterno ? ' ' + f.apellidoMaterno : ''}`

// Helper: iniciales para avatar
export const getInitials = (f) =>
  `${f.nombres.charAt(0)}${f.apellidoPaterno.charAt(0)}`

// ---- usuarios_portal ----
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
    edad: 45,
    correoElectronico: 'a.martinez@ibero.mx',
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
    edad: 50,
    correoElectronico: 's.rodriguez@ibero.mx',
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
    edad: 40,
    correoElectronico: 'j.ramos@ibero.mx',
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
    edad: 47,
    correoElectronico: 'm.torres@ibero.mx',
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
    edad: 43,
    correoElectronico: 'f.vega@ibero.mx',
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
    edad: 35,
    correoElectronico: 'a.mendoza@ibero.mx',
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
    edad: 49,
    correoElectronico: 'r.fuentes@ibero.mx',
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
    edad: 55,
    correoElectronico: 'c.slim@ibero.mx',
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
  { id: 'capacitaciones', label: 'Capacitación', icon: 'BookOpen' },
  { id: 'logros-profesionales', label: 'Logros Profesionales', icon: 'Award' },
  { id: 'organismos', label: 'Organismos', icon: 'Users' },
  { id: 'premios-distinciones', label: 'Premios y Distinciones', icon: 'Trophy' },
  { id: 'productos-academicos', label: 'Productos Académicos', icon: 'FileText' },
  { id: 'actualizacion', label: 'Actualización', icon: 'RefreshCw' }
]

// ---- estudios_academicos ----
export const estudiosAcademicos = {
  1: [
    { id: 1, tituloEstudio: 'Doctorado en Ingeniería Estructural', nivelEstudios: 'Doctorado', institucion: 'MIT', pais: 'EUA', anioObtencion: 2005, cedula: '12345678' },
    { id: 2, tituloEstudio: 'Maestría en Ingeniería Civil', nivelEstudios: 'Maestría', institucion: 'UNAM', pais: 'México', anioObtencion: 2000, cedula: '87654321' },
    { id: 3, tituloEstudio: 'Licenciatura en Ingeniería Civil', nivelEstudios: 'Licenciatura', institucion: 'ITESM', pais: 'México', anioObtencion: 1998, cedula: '11223344' }
  ],
  2: [
    { id: 1, tituloEstudio: 'Maestría en Administración', nivelEstudios: 'Maestría', institucion: 'Universidad Complutense', pais: 'España', anioObtencion: 2010, cedula: '55667788' },
    { id: 2, tituloEstudio: 'Licenciatura en Administración', nivelEstudios: 'Licenciatura', institucion: 'UNAM', pais: 'México', anioObtencion: 2006, cedula: '99001122' }
  ],
  3: [
    { id: 1, tituloEstudio: 'Maestría en Sistemas Computacionales', nivelEstudios: 'Maestría', institucion: 'IBERO', pais: 'México', anioObtencion: 2015, cedula: '33445566' },
    { id: 2, tituloEstudio: 'Ingeniería en Sistemas', nivelEstudios: 'Licenciatura', institucion: 'IBERO', pais: 'México', anioObtencion: 2010, cedula: '77889900' }
  ]
}

// ---- experiencia_laboral ----
export const experienciaLaboral = {
  1: [
    { id: 1, actividadPuesto: 'Profesora de Tiempo Completo', organizacionEmpresa: 'Universidad Iberoamericana', inicioMesAnio: 'Ago 2010', finMesAnio: 'Actual', escolar: true, disenoIngenieril: true, nivelExperiencia: 'Senior' },
    { id: 2, actividadPuesto: 'Investigadora Asociada', organizacionEmpresa: 'MIT', inicioMesAnio: 'Ene 2005', finMesAnio: 'Jul 2010', escolar: true, disenoIngenieril: false, nivelExperiencia: 'Intermedio' }
  ],
  2: [
    { id: 1, actividadPuesto: 'Coordinador Académico', organizacionEmpresa: 'Universidad Iberoamericana', inicioMesAnio: 'Ene 2015', finMesAnio: 'Actual', escolar: true, disenoIngenieril: false, nivelExperiencia: 'Senior' },
    { id: 2, actividadPuesto: 'Consultor de Gestión', organizacionEmpresa: 'Deloitte México', inicioMesAnio: 'Mar 2010', finMesAnio: 'Dic 2014', escolar: false, disenoIngenieril: false, nivelExperiencia: 'Intermedio' }
  ],
  3: [
    { id: 1, actividadPuesto: 'Profesor de Asignatura', organizacionEmpresa: 'Universidad Iberoamericana', inicioMesAnio: 'Ago 2018', finMesAnio: 'Actual', escolar: true, disenoIngenieril: false, nivelExperiencia: 'Junior' },
    { id: 2, actividadPuesto: 'Desarrollador de Software Sr.', organizacionEmpresa: 'IBM México', inicioMesAnio: 'Feb 2012', finMesAnio: 'Jul 2018', escolar: false, disenoIngenieril: true, nivelExperiencia: 'Senior' }
  ]
}

// ---- capacitacion ----
export const capacitaciones = {
  1: [
    { id: 1, tipoCapacitacion: 'Diplomado', institucion: 'UNAM', pais: 'México', anioObtencion: 2022, horas: 120, vigencia: 'Permanente' },
    { id: 2, tipoCapacitacion: 'Certificación PMP', institucion: 'PMI', pais: 'EUA', anioObtencion: 2020, horas: 80, vigencia: '2025' }
  ],
  2: [
    { id: 1, tipoCapacitacion: 'Taller de Liderazgo Académico', institucion: 'Harvard Extension', pais: 'EUA', anioObtencion: 2021, horas: 40, vigencia: 'Permanente' }
  ],
  3: []
}

// ---- logros_profesionales ----
export const logrosProfesionales = {
  1: [
    { id: 1, descLogro: 'Publicación de 15 artículos en revistas indexadas JCR en el área de ingeniería estructural.', institucion: 'Universidad Iberoamericana', anioObtencion: 2022 },
    { id: 2, descLogro: 'Dirección de 8 tesis doctorales concluidas exitosamente.', institucion: 'Universidad Iberoamericana', anioObtencion: 2023 }
  ],
  2: [
    { id: 1, descLogro: 'Implementación del programa de vinculación interinstitucional con 5 universidades internacionales.', institucion: 'Universidad Iberoamericana', anioObtencion: 2021 }
  ],
  3: [
    { id: 1, descLogro: 'Implementación del sistema de gestión académica integral.', institucion: 'Universidad Iberoamericana', anioObtencion: 2020 },
    { id: 2, descLogro: 'Coordinación de la acreditación de 5 programas académicos.', institucion: 'CACEI', anioObtencion: 2023 }
  ]
}

// ---- organismos ----
export const organismos = {
  1: [
    { id: 1, organismo: 'Academia Mexicana de Ingeniería', anioInicio: 2015, anioFin: null, nivelExperiencia: 'Miembro Titular' },
    { id: 2, organismo: 'American Society of Civil Engineers', anioInicio: 2008, anioFin: null, nivelExperiencia: 'Fellow' }
  ],
  2: [
    { id: 1, organismo: 'Asociación Nacional de Universidades (ANUIES)', anioInicio: 2018, anioFin: null, nivelExperiencia: 'Representante Institucional' }
  ],
  3: []
}

// ---- premios_distinciones ----
export const premiosDistinciones = {
  1: [
    { id: 1, descPremio: 'Premio de Innovación Tecnológica Educativa.', institucion: 'CONACYT', anioObtencion: 2023 },
    { id: 2, descPremio: 'Best Paper Award - International Conference on Structural Engineering.', institucion: 'ICSE', anioObtencion: 2021 }
  ],
  2: [
    { id: 1, descPremio: 'Reconocimiento a la Gestión Académica de Excelencia.', institucion: 'ANUIES', anioObtencion: 2023 }
  ],
  3: []
}

// ---- productos_academicos ----
export const productosAcademicos = {
  1: [
    { id: 1, idPublicacion: 'DOI-2023-001', descripcionPublicacion: 'Materiales de construcción resistentes a sismos: Revisión exhaustiva. Journal of Structural Engineering, 2023.' },
    { id: 2, idPublicacion: 'DOI-2022-045', descripcionPublicacion: 'Prácticas de construcción sostenible en América Latina. Construction and Building Materials, 2022.' },
    { id: 3, idPublicacion: 'ISBN-2021-112', descripcionPublicacion: 'Enfoques innovadores para diseño sísmico. Engineering Structures, 2021.' }
  ],
  2: [
    { id: 1, idPublicacion: 'DOI-2023-015', descripcionPublicacion: 'Gestión académica en universidades iberoamericanas. Revista de Educación Superior, 2023.' }
  ],
  3: []
}

// ---- actualizacion ----
export const actualizaciones = {
  1: [
    { id: 1, nombreActualizacion: 'Seminario de Nuevas Tecnologías en Ingeniería', tipoActualizacion: 'Seminario', institucion: 'Colegio de Ingenieros', pais: 'México', horas: 20 },
    { id: 2, nombreActualizacion: 'Curso de BIM Avanzado', tipoActualizacion: 'Curso', institucion: 'Autodesk University', pais: 'EUA', horas: 40 }
  ],
  2: [
    { id: 1, nombreActualizacion: 'Workshop en Gestión del Cambio Organizacional', tipoActualizacion: 'Taller', institucion: 'IPADE', pais: 'México', horas: 16 }
  ],
  3: [
    { id: 1, nombreActualizacion: 'Certificación AWS Cloud Practitioner', tipoActualizacion: 'Certificación', institucion: 'Amazon Web Services', pais: 'EUA', horas: 60 }
  ]
}

// Estado de completitud de secciones por facultyId
export const sectionStatus = {
  1: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitaciones': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'complete',
    'premios-distinciones': 'complete',
    'productos-academicos': 'complete',
    'actualizacion': 'complete'
  },
  2: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitaciones': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'complete',
    'premios-distinciones': 'complete',
    'productos-academicos': 'complete',
    'actualizacion': 'pending'
  },
  3: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitaciones': 'pending',
    'logros-profesionales': 'complete',
    'organismos': 'pending',
    'premios-distinciones': 'pending',
    'productos-academicos': 'pending',
    'actualizacion': 'complete'
  }
}
