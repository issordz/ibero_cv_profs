// Usuarios ficticios para el sistema de login y gestión de docentes

export const loginUsers = [
  {
    id: 1,
    email: 'admin@ibero.mx',
    password: 'admin123',
    name: 'Dr. Roberto García',
    role: 'admin',
    roleDisplay: 'Administrador del Sistema',
    avatar: 'RG',
    department: 'Administración'
  },
  {
    id: 2,
    email: 'a.martinez@ibero.mx',
    password: 'docente123',
    name: 'Dr. Alejandro Martínez',
    role: 'professor',
    roleDisplay: 'Profesor Titular',
    avatar: 'AM',
    department: 'Ingeniería',
    facultyId: 1
  },
  {
    id: 3,
    email: 's.rodriguez@ibero.mx',
    password: 'docente123',
    name: 'Sofía Rodríguez',
    role: 'professor',
    roleDisplay: 'Jefa de Departamento',
    avatar: 'SR',
    department: 'Artes y Humanidades',
    facultyId: 2
  },
  {
    id: 4,
    email: 'j.ramos@ibero.mx',
    password: 'docente123',
    name: 'Juan Ramos',
    role: 'professor',
    roleDisplay: 'Profesor Asociado',
    avatar: 'JR',
    department: 'Negocios',
    facultyId: 3
  }
]

export const facultyMembers = [
  {
    id: 1,
    employeeId: 'IB-2024-001',
    name: 'Dr. Alejandro Martínez',
    role: 'Profesor Titular',
    avatar: 'AM',
    avatarColor: 'bg-red-100 text-red-600',
    department: 'Ingeniería',
    departmentColor: 'bg-red-50 text-red-600',
    lastUpdate: '12 Oct, 2023',
    profileProgress: 85,
    email: 'a.martinez@ibero.mx',
    phone: '+52 (555) 123-4567',
    officeLocation: 'Edif. Ingeniería, Sala 301',
    orcidId: '0000-0001-2345-6789',
    linkedIn: 'linkedin.com/in/a-martinez',
    officeHours: 'Lun y Mié 10:00 - 12:00',
    summary: 'El Dr. Alejandro Martínez es Profesor Titular de Ingeniería con más de 20 años de experiencia en ingeniería estructural y construcción sostenible. Su investigación se centra en materiales de construcción innovadores y estructuras resistentes a sismos.'
  },
  {
    id: 2,
    employeeId: 'IB-2024-042',
    name: 'Sofía Rodríguez',
    role: 'Jefa de Departamento',
    avatar: 'SR',
    avatarColor: 'bg-purple-100 text-purple-600',
    department: 'Artes y Humanidades',
    departmentColor: 'bg-cyan-50 text-cyan-600',
    lastUpdate: '04 Nov, 2023',
    profileProgress: 100,
    email: 's.rodriguez@ibero.mx',
    phone: '+52 (555) 234-5678',
    officeLocation: 'Edif. Humanidades, Sala 205',
    orcidId: '0000-0002-3456-7890',
    linkedIn: 'linkedin.com/in/s-rodriguez',
    officeHours: 'Mar y Jue 14:00 - 16:00',
    summary: 'Sofía Rodríguez es Jefa del Departamento de Artes y Humanidades con experiencia en literatura latinoamericana contemporánea y estudios culturales.'
  },
  {
    id: 3,
    employeeId: 'IB-2024-089',
    name: 'Juan Ramos',
    role: 'Profesor Asociado',
    avatar: 'JR',
    avatarColor: 'bg-green-100 text-green-600',
    department: 'Negocios',
    departmentColor: 'bg-orange-50 text-orange-600',
    lastUpdate: '29 Oct, 2023',
    profileProgress: 45,
    email: 'j.ramos@ibero.mx',
    phone: '+52 (555) 345-6789',
    officeLocation: 'Escuela de Negocios, Sala 412',
    orcidId: '0000-0003-4567-8901',
    linkedIn: 'linkedin.com/in/j-ramos',
    officeHours: 'Mié y Vie 09:00 - 11:00',
    summary: 'Juan Ramos es Profesor Asociado especializado en negocios internacionales y estrategia corporativa con enfoque en mercados emergentes.'
  },
  {
    id: 4,
    employeeId: 'IB-2024-112',
    name: 'Carlos Slim V.',
    role: 'Profesor Visitante',
    avatar: 'CS',
    avatarColor: 'bg-blue-100 text-blue-600',
    department: 'Ciencias de la Salud',
    departmentColor: 'bg-emerald-50 text-emerald-600',
    lastUpdate: '15 Nov, 2023',
    profileProgress: 92,
    email: 'c.slim@ibero.mx',
    phone: '+52 (555) 456-7890',
    officeLocation: 'Edif. Ciencias de la Salud, Sala 108',
    orcidId: '0000-0004-5678-9012',
    linkedIn: 'linkedin.com/in/c-slim',
    officeHours: 'Lun y Jue 11:00 - 13:00',
    summary: 'Carlos Slim V. es Profesor Visitante en Ciencias de la Salud con experiencia en políticas de salud pública y gestión hospitalaria.'
  },
  {
    id: 5,
    employeeId: 'IB-2024-156',
    name: 'María Elena Torres',
    role: 'Profesora Titular',
    avatar: 'MT',
    avatarColor: 'bg-pink-100 text-pink-600',
    department: 'Derecho',
    departmentColor: 'bg-indigo-50 text-indigo-600',
    lastUpdate: '20 Nov, 2023',
    profileProgress: 78,
    email: 'm.torres@ibero.mx',
    phone: '+52 (555) 567-8901',
    officeLocation: 'Escuela de Derecho, Sala 215',
    orcidId: '0000-0005-6789-0123',
    linkedIn: 'linkedin.com/in/m-torres',
    officeHours: 'Mar y Vie 15:00 - 17:00',
    summary: 'María Elena Torres es Profesora Titular de Derecho especializada en derecho constitucional y derechos humanos con amplia experiencia en tribunales internacionales.'
  },
  {
    id: 6,
    employeeId: 'IB-2024-178',
    name: 'Dr. Fernando Vega',
    role: 'Profesor Investigador',
    avatar: 'FV',
    avatarColor: 'bg-yellow-100 text-yellow-600',
    department: 'Ciencias',
    departmentColor: 'bg-violet-50 text-violet-600',
    lastUpdate: '01 Dic, 2023',
    profileProgress: 67,
    email: 'f.vega@ibero.mx',
    phone: '+52 (555) 678-9012',
    officeLocation: 'Centro de Ciencias, Lab 302',
    orcidId: '0000-0006-7890-1234',
    linkedIn: 'linkedin.com/in/f-vega',
    officeHours: 'Lun y Mié 14:00 - 16:00',
    summary: 'El Dr. Fernando Vega es Profesor Investigador en Ciencias enfocado en biología molecular e ingeniería genética con múltiples patentes en biotecnología.'
  },
  {
    id: 7,
    employeeId: 'IB-2024-201',
    name: 'Ana Patricia Mendoza',
    role: 'Profesora Asistente',
    avatar: 'AM',
    avatarColor: 'bg-teal-100 text-teal-600',
    department: 'Psicología',
    departmentColor: 'bg-rose-50 text-rose-600',
    lastUpdate: '28 Nov, 2023',
    profileProgress: 55,
    email: 'a.mendoza@ibero.mx',
    phone: '+52 (555) 789-0123',
    officeLocation: 'Edif. Psicología, Sala 118',
    orcidId: '0000-0007-8901-2345',
    linkedIn: 'linkedin.com/in/a-mendoza',
    officeHours: 'Jue y Vie 10:00 - 12:00',
    summary: 'Ana Patricia Mendoza es Profesora Asistente de Psicología especializada en terapia cognitivo-conductual y salud mental adolescente.'
  },
  {
    id: 8,
    employeeId: 'IB-2024-234',
    name: 'Dr. Ricardo Fuentes',
    role: 'Profesor Titular',
    avatar: 'RF',
    avatarColor: 'bg-orange-100 text-orange-600',
    department: 'Arquitectura',
    departmentColor: 'bg-amber-50 text-amber-600',
    lastUpdate: '05 Dic, 2023',
    profileProgress: 88,
    email: 'r.fuentes@ibero.mx',
    phone: '+52 (555) 890-1234',
    officeLocation: 'Edif. Arquitectura, Estudio 405',
    orcidId: '0000-0008-9012-3456',
    linkedIn: 'linkedin.com/in/r-fuentes',
    officeHours: 'Mar y Mié 13:00 - 15:00',
    summary: 'El Dr. Ricardo Fuentes es Profesor Titular de Arquitectura con experiencia en diseño urbano sostenible y preservación histórica.'
  }
]

export const departments = [
  'Todos los departamentos',
  'Ingeniería',
  'Artes y Humanidades',
  'Negocios',
  'Ciencias de la Salud',
  'Derecho',
  'Ciencias',
  'Psicología',
  'Arquitectura'
]

export const statuses = [
  'Todos los estados',
  'Completo (100%)',
  'En progreso (50-99%)',
  'Incompleto (<50%)'
]

// Secciones del formulario de profesor con estado de completitud
export const formSections = [
  { id: 'datos-generales', label: 'Datos Generales', icon: 'User' },
  { id: 'informacion-academica', label: 'Información Académica', icon: 'GraduationCap' },
  { id: 'experiencia-laboral', label: 'Experiencia Laboral', icon: 'Briefcase' },
  { id: 'capacitaciones', label: 'Capacitaciones y Actualizaciones', icon: 'BookOpen' },
  { id: 'productos-academicos', label: 'Productos Académicos', icon: 'FileText' },
  { id: 'logros-profesionales', label: 'Logros Profesionales', icon: 'Award' },
  { id: 'organismos', label: 'Organismos', icon: 'Users' },
  { id: 'premios-distinciones', label: 'Premios y Distinciones', icon: 'Trophy' }
]

// Datos de ejemplo para relaciones one-to-many por facultyId
export const academicDegrees = {
  1: [
    { id: 1, degree: 'PhD in Structural Engineering', institution: 'MIT', year: 2005, country: 'USA' },
    { id: 2, degree: 'MSc in Civil Engineering', institution: 'UNAM', year: 2000, country: 'Mexico' },
    { id: 3, degree: 'BSc in Civil Engineering', institution: 'ITESM', year: 1998, country: 'Mexico' }
  ],
  2: [
    { id: 1, degree: 'PhD in Latin American Literature', institution: 'Universidad Complutense', year: 2010, country: 'Spain' },
    { id: 2, degree: 'MA in Cultural Studies', institution: 'UNAM', year: 2006, country: 'Mexico' }
  ],
  3: [
    { id: 1, degree: 'MBA', institution: 'Harvard Business School', year: 2015, country: 'USA' },
    { id: 2, degree: 'BSc in Business Administration', institution: 'IBERO', year: 2010, country: 'Mexico' }
  ]
}

export const publications = {
  1: [
    { id: 1, title: 'Earthquake-Resistant Building Materials: A Comprehensive Review', journal: 'Journal of Structural Engineering', year: 2023, doi: '10.1234/jse.2023.001' },
    { id: 2, title: 'Sustainable Construction Practices in Latin America', journal: 'Construction and Building Materials', year: 2022, doi: '10.1234/cbm.2022.045' },
    { id: 3, title: 'Innovative Approaches to Seismic Design', journal: 'Engineering Structures', year: 2021, doi: '10.1234/es.2021.112' }
  ],
  2: [
    { id: 1, title: 'Contemporary Mexican Literature: Trends and Perspectives', journal: 'Latin American Literary Review', year: 2023, doi: '10.1234/lalr.2023.015' },
    { id: 2, title: 'Cultural Identity in Post-Modern Fiction', journal: 'Hispanic Studies Quarterly', year: 2022, doi: '10.1234/hsq.2022.089' }
  ],
  3: []
}

export const projects = {
  1: [
    { id: 1, title: 'Smart Building Materials Research', role: 'Principal Investigator', startDate: '2022-01', endDate: '2025-12', funding: '$500,000 USD', status: 'Active' },
    { id: 2, title: 'Urban Resilience Initiative', role: 'Co-Investigator', startDate: '2021-06', endDate: '2024-06', funding: '$250,000 USD', status: 'Active' }
  ],
  2: [
    { id: 1, title: 'Digital Humanities Archive', role: 'Director', startDate: '2023-01', endDate: '2026-12', funding: '$150,000 USD', status: 'Active' }
  ],
  3: []
}

export const awards = {
  1: [
    { id: 1, title: 'Excellence in Engineering Research', organization: 'Mexican Academy of Engineering', year: 2022 },
    { id: 2, title: 'Best Paper Award', organization: 'International Conference on Structural Engineering', year: 2021 }
  ],
  2: [
    { id: 1, title: 'National Literature Prize', organization: 'CONACULTA', year: 2020 }
  ],
  3: []
}

export const teachingCourses = {
  1: [
    { id: 1, code: 'ING-501', name: 'Advanced Structural Analysis', semester: 'Fall 2023', students: 25 },
    { id: 2, code: 'ING-302', name: 'Materials Science', semester: 'Fall 2023', students: 40 },
    { id: 3, code: 'ING-601', name: 'Earthquake Engineering Seminar', semester: 'Spring 2024', students: 15 }
  ],
  2: [
    { id: 1, code: 'HUM-401', name: 'Contemporary Latin American Literature', semester: 'Fall 2023', students: 30 },
    { id: 2, code: 'HUM-502', name: 'Cultural Studies Methodology', semester: 'Spring 2024', students: 20 }
  ],
  3: [
    { id: 1, code: 'BUS-301', name: 'International Business Strategy', semester: 'Fall 2023', students: 45 }
  ]
}

export const languages = {
  1: [
    { id: 1, language: 'Spanish', level: 'Native' },
    { id: 2, language: 'English', level: 'Fluent (C2)' },
    { id: 3, language: 'German', level: 'Intermediate (B1)' }
  ],
  2: [
    { id: 1, language: 'Spanish', level: 'Native' },
    { id: 2, language: 'English', level: 'Fluent (C1)' },
    { id: 3, language: 'French', level: 'Advanced (B2)' }
  ],
  3: [
    { id: 1, language: 'Spanish', level: 'Native' },
    { id: 2, language: 'English', level: 'Fluent (C2)' }
  ]
}

// Estado de completitud de secciones por facultyId
export const sectionStatus = {
  1: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'pending',
    'capacitaciones': 'complete',
    'productos-academicos': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'pending',
    'premios-distinciones': 'pending'
  },
  2: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'complete',
    'capacitaciones': 'complete',
    'productos-academicos': 'complete',
    'logros-profesionales': 'complete',
    'organismos': 'complete',
    'premios-distinciones': 'complete'
  },
  3: {
    'datos-generales': 'complete',
    'informacion-academica': 'complete',
    'experiencia-laboral': 'pending',
    'capacitaciones': 'pending',
    'productos-academicos': 'pending',
    'logros-profesionales': 'pending',
    'organismos': 'pending',
    'premios-distinciones': 'pending'
  }
}
