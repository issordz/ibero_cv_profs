// ===========================================
// Datos dummy alineados al schema de BD
// ===========================================

// Helper: nombre completo desde datos_generales
export const getFullName = (f) =>
  `${f.nombres} ${f.apellidoPaterno}${f.apellidoMaterno ? ' ' + f.apellidoMaterno : ''}`

// Helper: iniciales para avatar
export const getInitials = (f) =>
  `${f.nombres.charAt(0)}${f.apellidoPaterno.charAt(0)}`

// ---- catalogo_instituciones (empresas, organismos generales) ----
export const catalogoInstituciones = [
  { idInstitucion: 1, nombreInstitucion: 'Empresa ABC' },
  { idInstitucion: 2, nombreInstitucion: 'Gobierno Federal' },
  { idInstitucion: 3, nombreInstitucion: 'Consultora XYZ' },
  { idInstitucion: 4, nombreInstitucion: 'Hospital General' },
  { idInstitucion: 5, nombreInstitucion: 'Deloitte México' },
  { idInstitucion: 6, nombreInstitucion: 'IBM México' },
]

// ---- catalogo_instituciones_educativas ----
export const catalogoInstitucionesEducativas = [
  { idInstitucionEducativa: 1, nombreInstitucion: 'Universidad Iberoamericana' },
  { idInstitucionEducativa: 2, nombreInstitucion: 'UNAM' },
  { idInstitucionEducativa: 3, nombreInstitucion: 'MIT' },
  { idInstitucionEducativa: 4, nombreInstitucion: 'IPN' },
  { idInstitucionEducativa: 5, nombreInstitucion: 'Tecnológico de Monterrey' },
  { idInstitucionEducativa: 6, nombreInstitucion: 'Stanford University' },
  { idInstitucionEducativa: 7, nombreInstitucion: 'Autodesk University' },
  { idInstitucionEducativa: 8, nombreInstitucion: 'Harvard University' },
  { idInstitucionEducativa: 9, nombreInstitucion: 'Universidad Complutense' },
  { idInstitucionEducativa: 10, nombreInstitucion: 'IPADE' },
  { idInstitucionEducativa: 11, nombreInstitucion: 'Amazon Web Services' },
]

// ---- catalogo_nivel_estudio ----
export const catalogoNivelEstudio = [
  { idNivelEstudio: 1, descNivelEstudio: 'Técnico Superior' },
  { idNivelEstudio: 2, descNivelEstudio: 'Licenciatura' },
  { idNivelEstudio: 3, descNivelEstudio: 'Especialidad' },
  { idNivelEstudio: 4, descNivelEstudio: 'Maestría' },
  { idNivelEstudio: 5, descNivelEstudio: 'Doctorado' },
  { idNivelEstudio: 6, descNivelEstudio: 'Postdoctorado' },
]

// ---- catalogo_paises ----
export const catalogoPaises = [
  { idPais: 1, nombrePais: 'México' },
  { idPais: 2, nombrePais: 'Estados Unidos' },
  { idPais: 3, nombrePais: 'España' },
  { idPais: 4, nombrePais: 'Canadá' },
  { idPais: 5, nombrePais: 'Reino Unido' },
  { idPais: 6, nombrePais: 'Alemania' },
  { idPais: 7, nombrePais: 'Francia' },
  { idPais: 8, nombrePais: 'Brasil' },
  { idPais: 9, nombrePais: 'Argentina' },
  { idPais: 10, nombrePais: 'Colombia' },
]

// ---- catalogo_tipo_curso ----
export const catalogoTipoCurso = [
  { idTipoCurso: 1, descTipoCurso: 'Presencial' },
  { idTipoCurso: 2, descTipoCurso: 'En línea' },
  { idTipoCurso: 3, descTipoCurso: 'Híbrido' },
]

// ---- catalogo_capacitacion (tipo de capacitación) ----
export const catalogoCapacitacion = [
  { idTipoCapacitacion: 1, descTipoCapacitacion: 'Curso' },
  { idTipoCapacitacion: 2, descTipoCapacitacion: 'Diplomado' },
  { idTipoCapacitacion: 3, descTipoCapacitacion: 'Taller' },
  { idTipoCapacitacion: 4, descTipoCapacitacion: 'Seminario' },
  { idTipoCapacitacion: 5, descTipoCapacitacion: 'Certificación' },
  { idTipoCapacitacion: 6, descTipoCapacitacion: 'Congreso' },
]

// ---- catalogo_experiencia_laboral (tipo) ----
export const catalogoExperienciaLaboral = [
  { idTipoExperiencia: 1, descTipoExperiencia: 'Docencia' },
  { idTipoExperiencia: 2, descTipoExperiencia: 'Investigación' },
  { idTipoExperiencia: 3, descTipoExperiencia: 'Industria' },
  { idTipoExperiencia: 4, descTipoExperiencia: 'Consultoría' },
  { idTipoExperiencia: 5, descTipoExperiencia: 'Gobierno' },
]

// ---- catalogo_organismos ----
export const catalogoOrganismos = [
  { idOrganismo: 1, nombreOrganismo: 'PMI' },
  { idOrganismo: 2, nombreOrganismo: 'Colegio de Ingenieros' },
  { idOrganismo: 3, nombreOrganismo: 'IEEE' },
  { idOrganismo: 4, nombreOrganismo: 'ACM' },
  { idOrganismo: 5, nombreOrganismo: 'CONACYT' },
  { idOrganismo: 6, nombreOrganismo: 'Academia Mexicana de Ingeniería' },
  { idOrganismo: 7, nombreOrganismo: 'American Society of Civil Engineers' },
  { idOrganismo: 8, nombreOrganismo: 'ANUIES' },
  { idOrganismo: 9, nombreOrganismo: 'CACEI' },
]

// ---- catalogo_puesto_institucional ----
export const catalogoPuestoInstitucional = [
  { idPuesto: 1, descPuesto: 'Profesor de Tiempo Completo' },
  { idPuesto: 2, descPuesto: 'Profesor de Asignatura' },
  { idPuesto: 3, descPuesto: 'Coordinador Académico' },
  { idPuesto: 4, descPuesto: 'Director de Departamento' },
  { idPuesto: 5, descPuesto: 'Investigador' },
]

// ---- Helpers para obtener nombres por id ----
export const getInstitucionNombre = (id) => {
  const inst = catalogoInstituciones.find(i => i.idInstitucion === id)
  return inst ? inst.nombreInstitucion : ''
}

export const getInstitucionEducativaNombre = (id) => {
  const inst = catalogoInstitucionesEducativas.find(i => i.idInstitucionEducativa === id)
  return inst ? inst.nombreInstitucion : ''
}

export const getNivelEstudioNombre = (id) => {
  const n = catalogoNivelEstudio.find(i => i.idNivelEstudio === id)
  return n ? n.descNivelEstudio : ''
}

export const getTipoCapacitacionNombre = (id) => {
  const t = catalogoCapacitacion.find(i => i.idTipoCapacitacion === id)
  return t ? t.descTipoCapacitacion : ''
}

export const getTipoCursoNombre = (id) => {
  const t = catalogoTipoCurso.find(i => i.idTipoCurso === id)
  return t ? t.descTipoCurso : ''
}

export const getTipoExperienciaNombre = (id) => {
  const t = catalogoExperienciaLaboral.find(i => i.idTipoExperiencia === id)
  return t ? t.descTipoExperiencia : ''
}

export const getOrganismoNombre = (id) => {
  const o = catalogoOrganismos.find(i => i.idOrganismo === id)
  return o ? o.nombreOrganismo : ''
}

export const getPaisNombre = (id) => {
  const p = catalogoPaises.find(i => i.idPais === id)
  return p ? p.nombrePais : ''
}

// ---- gestion_usuarios ----
export const loginUsers = [
  {
    id: 1,
    correo: 'admin@ibero.mx',
    contrasena: 'admin123',
    role: 'admin',
    activo: 1,
    nombres: 'Roberto',
    apellidoPaterno: 'García',
    apellidoMaterno: 'Luna',
    puestoInstitucional: 'Administrador del Sistema',
    avatar: 'RG'
  },
  {
    id: 2,
    correo: 'a.martinez@ibero.mx',
    contrasena: 'docente123',
    role: 'professor',
    activo: 1,
    facultyId: 'PROF000001',
    nombres: 'Ana',
    apellidoPaterno: 'Martínez',
    apellidoMaterno: 'López',
    puestoInstitucional: 'Profesora de Tiempo Completo',
    avatar: 'AM'
  },
  {
    id: 3,
    correo: 's.rodriguez@ibero.mx',
    contrasena: 'docente123',
    role: 'professor',
    activo: 1,
    facultyId: 'PROF000002',
    nombres: 'Sergio',
    apellidoPaterno: 'Rodríguez',
    apellidoMaterno: 'Hernández',
    puestoInstitucional: 'Coordinador Académico',
    avatar: 'SR'
  },
  {
    id: 4,
    correo: 'j.ramos@ibero.mx',
    contrasena: 'docente123',
    role: 'professor',
    activo: 1,
    facultyId: 'PROF000003',
    nombres: 'Juan',
    apellidoPaterno: 'Ramos',
    apellidoMaterno: 'García',
    puestoInstitucional: 'Profesor de Asignatura',
    avatar: 'JR'
  }
]

// ---- datos_generales (id_profesor = VARCHAR(10) employee number) ----
export const facultyMembers = [
  {
    idProfesor: 'PROF000001',
    nombres: 'Ana',
    apellidoPaterno: 'Martínez',
    apellidoMaterno: 'López',
    fechaDeNacimiento: '1980-03-15',
    puestoInstitucional: 'Profesora de Tiempo Completo',
    resumenProfesional: 'Doctora en Ingeniería con más de 15 años de experiencia en docencia e investigación en el área de estructuras y construcción sostenible.',
    activo: 1,
    fechaCarga: '2023-08-15',
    fechaActualizacion: '2024-10-12',
    avatar: 'AM',
    avatarColor: 'bg-red-100 text-red-600'
  },
  {
    idProfesor: 'PROF000002',
    nombres: 'Sergio',
    apellidoPaterno: 'Rodríguez',
    apellidoMaterno: 'Hernández',
    fechaDeNacimiento: '1975-07-22',
    puestoInstitucional: 'Coordinador Académico',
    resumenProfesional: 'Maestro en Administración con experiencia en gestión académica y proyectos de vinculación interinstitucional.',
    activo: 1,
    fechaCarga: '2022-01-10',
    fechaActualizacion: '2024-11-04',
    avatar: 'SR',
    avatarColor: 'bg-purple-100 text-purple-600'
  },
  {
    idProfesor: 'PROF000003',
    nombres: 'Juan',
    apellidoPaterno: 'Ramos',
    apellidoMaterno: 'García',
    fechaDeNacimiento: '1985-11-10',
    puestoInstitucional: 'Profesor de Asignatura',
    resumenProfesional: 'Ingeniero en Sistemas con especialidad en desarrollo de software y bases de datos.',
    activo: 1,
    fechaCarga: '2023-03-20',
    fechaActualizacion: '2024-10-29',
    avatar: 'JR',
    avatarColor: 'bg-green-100 text-green-600'
  },
  {
    idProfesor: 'PROF000004',
    nombres: 'María Elena',
    apellidoPaterno: 'Torres',
    apellidoMaterno: 'Vega',
    fechaDeNacimiento: '1978-06-05',
    puestoInstitucional: 'Profesora Titular',
    resumenProfesional: 'Especialista en derecho constitucional y derechos humanos con amplia experiencia en tribunales internacionales.',
    activo: 1,
    fechaCarga: '2021-09-01',
    fechaActualizacion: '2024-11-15',
    avatar: 'MT',
    avatarColor: 'bg-pink-100 text-pink-600'
  },
  {
    idProfesor: 'PROF000005',
    nombres: 'Fernando',
    apellidoPaterno: 'Vega',
    apellidoMaterno: 'Ruiz',
    fechaDeNacimiento: '1982-02-18',
    puestoInstitucional: 'Profesor Investigador',
    resumenProfesional: 'Profesor Investigador enfocado en biología molecular e ingeniería genética con múltiples patentes.',
    activo: 1,
    fechaCarga: '2020-06-15',
    fechaActualizacion: '2024-12-01',
    avatar: 'FV',
    avatarColor: 'bg-yellow-100 text-yellow-600'
  },
  {
    idProfesor: 'PROF000006',
    nombres: 'Ana Patricia',
    apellidoPaterno: 'Mendoza',
    apellidoMaterno: 'Flores',
    fechaDeNacimiento: '1990-09-25',
    puestoInstitucional: 'Profesora Asistente',
    resumenProfesional: 'Especializada en terapia cognitivo-conductual y salud mental adolescente.',
    activo: 1,
    fechaCarga: '2023-01-15',
    fechaActualizacion: '2024-11-28',
    avatar: 'AP',
    avatarColor: 'bg-teal-100 text-teal-600'
  },
  {
    idProfesor: 'PROF000007',
    nombres: 'Ricardo',
    apellidoPaterno: 'Fuentes',
    apellidoMaterno: 'Morales',
    fechaDeNacimiento: '1976-12-03',
    puestoInstitucional: 'Profesor Titular',
    resumenProfesional: 'Profesor de Arquitectura con experiencia en diseño urbano sostenible y preservación histórica.',
    activo: 1,
    fechaCarga: '2019-08-20',
    fechaActualizacion: '2024-12-05',
    avatar: 'RF',
    avatarColor: 'bg-orange-100 text-orange-600'
  },
  {
    idProfesor: 'PROF000008',
    nombres: 'Carlos',
    apellidoPaterno: 'Slim',
    apellidoMaterno: 'Velázquez',
    fechaDeNacimiento: '1970-04-12',
    puestoInstitucional: 'Profesor Visitante',
    resumenProfesional: 'Profesor Visitante con experiencia en políticas de salud pública y gestión hospitalaria.',
    activo: 1,
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

// ---- estudios_academicos (uses idNivelEstudio FK, idInstitucionEducativa FK) ----
export const estudiosAcademicos = {
  'PROF000001': [
    { id: 1, idNivelEstudio: 5, tituloEstudio: 'Doctorado en Ingeniería Estructural', idInstitucionEducativa: 3, pais: 'Estados Unidos', anioObtencion: 2005, cedula: '12345678' },
    { id: 2, idNivelEstudio: 4, tituloEstudio: 'Maestría en Ingeniería Civil', idInstitucionEducativa: 2, pais: 'México', anioObtencion: 2000, cedula: '87654321' },
    { id: 3, idNivelEstudio: 2, tituloEstudio: 'Licenciatura en Ingeniería Civil', idInstitucionEducativa: 5, pais: 'México', anioObtencion: 1998, cedula: '11223344' }
  ],
  'PROF000002': [
    { id: 1, idNivelEstudio: 4, tituloEstudio: 'Maestría en Administración', idInstitucionEducativa: 9, pais: 'España', anioObtencion: 2010, cedula: '55667788' },
    { id: 2, idNivelEstudio: 2, tituloEstudio: 'Licenciatura en Administración', idInstitucionEducativa: 2, pais: 'México', anioObtencion: 2006, cedula: '99001122' }
  ],
  'PROF000003': [
    { id: 1, idNivelEstudio: 4, tituloEstudio: 'Maestría en Sistemas Computacionales', idInstitucionEducativa: 1, pais: 'México', anioObtencion: 2015, cedula: '33445566' },
    { id: 2, idNivelEstudio: 2, tituloEstudio: 'Ingeniería en Sistemas', idInstitucionEducativa: 1, pais: 'México', anioObtencion: 2010, cedula: '77889900' }
  ]
}

// ---- experiencia_laboral (uses idInstitucion FK general, idTipoExperiencia FK) ----
export const experienciaLaboral = {
  'PROF000001': [
    { id: 1, actividadPuesto: 'Profesora de Tiempo Completo', idInstitucion: 1, inicioMesAnio: 'Ago 2010', finMesAnio: 'Actual', idTipoExperiencia: 1, nivelExperiencia: 'Senior' },
    { id: 2, actividadPuesto: 'Investigadora Asociada', idInstitucion: 3, inicioMesAnio: 'Ene 2005', finMesAnio: 'Jul 2010', idTipoExperiencia: 2, nivelExperiencia: 'Intermedio' }
  ],
  'PROF000002': [
    { id: 1, actividadPuesto: 'Coordinador Académico', idInstitucion: 1, inicioMesAnio: 'Ene 2015', finMesAnio: 'Actual', idTipoExperiencia: 1, nivelExperiencia: 'Senior' },
    { id: 2, actividadPuesto: 'Consultor de Gestión', idInstitucion: 5, inicioMesAnio: 'Mar 2010', finMesAnio: 'Dic 2014', idTipoExperiencia: 4, nivelExperiencia: 'Intermedio' }
  ],
  'PROF000003': [
    { id: 1, actividadPuesto: 'Profesor de Asignatura', idInstitucion: 1, inicioMesAnio: 'Ago 2018', finMesAnio: 'Actual', idTipoExperiencia: 1, nivelExperiencia: 'Junior' },
    { id: 2, actividadPuesto: 'Desarrollador de Software Sr.', idInstitucion: 6, inicioMesAnio: 'Feb 2012', finMesAnio: 'Jul 2018', idTipoExperiencia: 3, nivelExperiencia: 'Senior' }
  ]
}

// ---- capacitacion_actualizacion (uses idTipoCapacitacion FK, idInstitucionEducativa FK, idTipoCurso FK) ----
export const capacitacionActualizacion = {
  'PROF000001': [
    { id: 1, nombreCapacitacion: 'Diplomado en Docencia Universitaria', idTipoCapacitacion: 2, idInstitucionEducativa: 2, pais: 'México', anioObtencion: 2022, horas: 120, idTipoCurso: 1, vigencia: 'Permanente' },
    { id: 2, nombreCapacitacion: 'Certificación en Gestión de Proyectos', idTipoCapacitacion: 5, idInstitucionEducativa: 3, pais: 'Estados Unidos', anioObtencion: 2020, horas: 80, idTipoCurso: 2, vigencia: '2025' },
    { id: 3, nombreCapacitacion: 'Seminario de Nuevas Tecnologías en Ingeniería', idTipoCapacitacion: 4, idInstitucionEducativa: 4, pais: 'México', anioObtencion: 2023, horas: 20, idTipoCurso: 1, vigencia: null },
    { id: 4, nombreCapacitacion: 'Curso de BIM Avanzado', idTipoCapacitacion: 1, idInstitucionEducativa: 7, pais: 'Estados Unidos', anioObtencion: 2022, horas: 40, idTipoCurso: 2, vigencia: null }
  ],
  'PROF000002': [
    { id: 1, nombreCapacitacion: 'Taller de Liderazgo Académico', idTipoCapacitacion: 3, idInstitucionEducativa: 8, pais: 'Estados Unidos', anioObtencion: 2021, horas: 40, idTipoCurso: 1, vigencia: 'Permanente' },
    { id: 2, nombreCapacitacion: 'Workshop en Gestión del Cambio Organizacional', idTipoCapacitacion: 3, idInstitucionEducativa: 10, pais: 'México', anioObtencion: 2023, horas: 16, idTipoCurso: 3, vigencia: null }
  ],
  'PROF000003': [
    { id: 1, nombreCapacitacion: 'Certificación AWS Cloud Practitioner', idTipoCapacitacion: 5, idInstitucionEducativa: 11, pais: 'Estados Unidos', anioObtencion: 2024, horas: 60, idTipoCurso: 2, vigencia: null }
  ]
}

// ---- logros_profesionales (uses idInstitucion FK general) ----
export const logrosProfesionales = {
  'PROF000001': [
    { id: 1, descLogro: 'Publicación de 15 artículos en revistas indexadas JCR en el área de ingeniería estructural.', idInstitucion: 1, anioObtencion: 2022 },
    { id: 2, descLogro: 'Dirección de 8 tesis doctorales concluidas exitosamente.', idInstitucion: 1, anioObtencion: 2023 }
  ],
  'PROF000002': [
    { id: 1, descLogro: 'Implementación del programa de vinculación interinstitucional con 5 universidades internacionales.', idInstitucion: 1, anioObtencion: 2021 }
  ],
  'PROF000003': [
    { id: 1, descLogro: 'Implementación del sistema de gestión académica integral.', idInstitucion: 1, anioObtencion: 2020 },
    { id: 2, descLogro: 'Coordinación de la acreditación de 5 programas académicos.', idInstitucion: 3, anioObtencion: 2023 }
  ]
}

// ---- organismos (uses idOrganismo FK) ----
export const organismos = {
  'PROF000001': [
    { id: 1, idOrganismo: 6, anioInicio: 2015, anioFin: null, nivelExperiencia: 'Miembro Titular' },
    { id: 2, idOrganismo: 7, anioInicio: 2008, anioFin: null, nivelExperiencia: 'Fellow' }
  ],
  'PROF000002': [
    { id: 1, idOrganismo: 8, anioInicio: 2018, anioFin: null, nivelExperiencia: 'Representante Institucional' }
  ],
  'PROF000003': []
}

// ---- premios_distinciones (no institution FK) ----
export const premiosDistinciones = {
  'PROF000001': [
    { id: 1, descPremio: 'Premio de Innovación Tecnológica Educativa.', anioObtencion: 2023 },
    { id: 2, descPremio: 'Best Paper Award - International Conference on Structural Engineering.', anioObtencion: 2021 }
  ],
  'PROF000002': [
    { id: 1, descPremio: 'Reconocimiento a la Gestión Académica de Excelencia.', anioObtencion: 2023 }
  ],
  'PROF000003': []
}

// ---- productos_academicos (uses idInstitucionEducativa FK) ----
export const productosAcademicos = {
  'PROF000001': [
    { id: 1, descripcionProductoAcademico: 'Materiales de construcción resistentes a sismos: Revisión exhaustiva. Journal of Structural Engineering.', idInstitucionEducativa: 1, anioProducto: 2023 },
    { id: 2, descripcionProductoAcademico: 'Prácticas de construcción sostenible en América Latina. Construction and Building Materials.', idInstitucionEducativa: 1, anioProducto: 2022 },
    { id: 3, descripcionProductoAcademico: 'Enfoques innovadores para diseño sísmico. Engineering Structures.', idInstitucionEducativa: 3, anioProducto: 2021 }
  ],
  'PROF000002': [
    { id: 1, descripcionProductoAcademico: 'Gestión académica en universidades iberoamericanas. Revista de Educación Superior.', idInstitucionEducativa: 1, anioProducto: 2023 }
  ],
  'PROF000003': []
}

// Estado de completitud de secciones por idProfesor
export const sectionStatus = {
  'PROF000001': {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitacion-actualizacion': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'complete',
    'premios-distinciones': 'complete',
    'productos-academicos': 'complete'
  },
  'PROF000002': {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitacion-actualizacion': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'complete',
    'premios-distinciones': 'complete',
    'productos-academicos': 'complete'
  },
  'PROF000003': {
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
