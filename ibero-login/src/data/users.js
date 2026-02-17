// Usuarios ficticios para el sistema de login y gestión de docentes

export const loginUsers = [
  {
    id: 1,
    email: 'admin@ibero.mx',
    password: 'admin123',
    name: 'Dr. Roberto García',
    role: 'admin',
    roleDisplay: 'System Administrator',
    avatar: 'RG',
    department: 'Administration'
  },
  {
    id: 2,
    email: 'a.martinez@ibero.mx',
    password: 'docente123',
    name: 'Dr. Alejandro Martínez',
    role: 'professor',
    roleDisplay: 'Senior Professor',
    avatar: 'AM',
    department: 'Engineering',
    facultyId: 1
  },
  {
    id: 3,
    email: 's.rodriguez@ibero.mx',
    password: 'docente123',
    name: 'Sofía Rodríguez',
    role: 'professor',
    roleDisplay: 'Department Head',
    avatar: 'SR',
    department: 'Arts & Humanities',
    facultyId: 2
  },
  {
    id: 4,
    email: 'j.ramos@ibero.mx',
    password: 'docente123',
    name: 'Juan Ramos',
    role: 'professor',
    roleDisplay: 'Associate Professor',
    avatar: 'JR',
    department: 'Business',
    facultyId: 3
  }
]

export const facultyMembers = [
  {
    id: 1,
    employeeId: 'IB-2024-001',
    name: 'Dr. Alejandro Martínez',
    role: 'Senior Professor',
    avatar: 'AM',
    avatarColor: 'bg-red-100 text-red-600',
    department: 'Engineering',
    departmentColor: 'bg-red-50 text-red-600',
    lastUpdate: 'Oct 12, 2023',
    profileProgress: 85,
    email: 'a.martinez@ibero.mx',
    phone: '+52 (555) 123-4567',
    officeLocation: 'Engineering Bldg, Room 301',
    orcidId: '0000-0001-2345-6789',
    linkedIn: 'linkedin.com/in/a-martinez',
    officeHours: 'Mon & Wed 10:00 - 12:00',
    summary: 'Dr. Alejandro Martínez is a Senior Professor of Engineering with over 20 years of experience in structural engineering and sustainable construction. His research focuses on innovative building materials and earthquake-resistant structures.'
  },
  {
    id: 2,
    employeeId: 'IB-2024-042',
    name: 'Sofía Rodríguez',
    role: 'Department Head',
    avatar: 'SR',
    avatarColor: 'bg-purple-100 text-purple-600',
    department: 'Arts & Humanities',
    departmentColor: 'bg-cyan-50 text-cyan-600',
    lastUpdate: 'Nov 04, 2023',
    profileProgress: 100,
    email: 's.rodriguez@ibero.mx',
    phone: '+52 (555) 234-5678',
    officeLocation: 'Humanities Bldg, Room 205',
    orcidId: '0000-0002-3456-7890',
    linkedIn: 'linkedin.com/in/s-rodriguez',
    officeHours: 'Tue & Thu 14:00 - 16:00',
    summary: 'Sofía Rodríguez is the Department Head of Arts & Humanities with expertise in contemporary Latin American literature and cultural studies.'
  },
  {
    id: 3,
    employeeId: 'IB-2024-089',
    name: 'Juan Ramos',
    role: 'Associate Professor',
    avatar: 'JR',
    avatarColor: 'bg-green-100 text-green-600',
    department: 'Business',
    departmentColor: 'bg-orange-50 text-orange-600',
    lastUpdate: 'Oct 29, 2023',
    profileProgress: 45,
    email: 'j.ramos@ibero.mx',
    phone: '+52 (555) 345-6789',
    officeLocation: 'Business School, Room 412',
    orcidId: '0000-0003-4567-8901',
    linkedIn: 'linkedin.com/in/j-ramos',
    officeHours: 'Wed & Fri 09:00 - 11:00',
    summary: 'Juan Ramos is an Associate Professor specializing in international business and corporate strategy with a focus on emerging markets.'
  },
  {
    id: 4,
    employeeId: 'IB-2024-112',
    name: 'Carlos Slim V.',
    role: 'Visiting Professor',
    avatar: 'CS',
    avatarColor: 'bg-blue-100 text-blue-600',
    department: 'Health Sciences',
    departmentColor: 'bg-emerald-50 text-emerald-600',
    lastUpdate: 'Nov 15, 2023',
    profileProgress: 92,
    email: 'c.slim@ibero.mx',
    phone: '+52 (555) 456-7890',
    officeLocation: 'Health Sciences Bldg, Room 108',
    orcidId: '0000-0004-5678-9012',
    linkedIn: 'linkedin.com/in/c-slim',
    officeHours: 'Mon & Thu 11:00 - 13:00',
    summary: 'Carlos Slim V. is a Visiting Professor in Health Sciences with expertise in public health policy and healthcare management.'
  },
  {
    id: 5,
    employeeId: 'IB-2024-156',
    name: 'María Elena Torres',
    role: 'Full Professor',
    avatar: 'MT',
    avatarColor: 'bg-pink-100 text-pink-600',
    department: 'Law',
    departmentColor: 'bg-indigo-50 text-indigo-600',
    lastUpdate: 'Nov 20, 2023',
    profileProgress: 78,
    email: 'm.torres@ibero.mx',
    phone: '+52 (555) 567-8901',
    officeLocation: 'Law School, Room 215',
    orcidId: '0000-0005-6789-0123',
    linkedIn: 'linkedin.com/in/m-torres',
    officeHours: 'Tue & Fri 15:00 - 17:00',
    summary: 'María Elena Torres is a Full Professor of Law specializing in constitutional law and human rights with extensive experience in international tribunals.'
  },
  {
    id: 6,
    employeeId: 'IB-2024-178',
    name: 'Dr. Fernando Vega',
    role: 'Research Professor',
    avatar: 'FV',
    avatarColor: 'bg-yellow-100 text-yellow-600',
    department: 'Sciences',
    departmentColor: 'bg-violet-50 text-violet-600',
    lastUpdate: 'Dec 01, 2023',
    profileProgress: 67,
    email: 'f.vega@ibero.mx',
    phone: '+52 (555) 678-9012',
    officeLocation: 'Science Center, Lab 302',
    orcidId: '0000-0006-7890-1234',
    linkedIn: 'linkedin.com/in/f-vega',
    officeHours: 'Mon & Wed 14:00 - 16:00',
    summary: 'Dr. Fernando Vega is a Research Professor in Sciences focusing on molecular biology and genetic engineering with multiple patents in biotechnology.'
  },
  {
    id: 7,
    employeeId: 'IB-2024-201',
    name: 'Ana Patricia Mendoza',
    role: 'Assistant Professor',
    avatar: 'AM',
    avatarColor: 'bg-teal-100 text-teal-600',
    department: 'Psychology',
    departmentColor: 'bg-rose-50 text-rose-600',
    lastUpdate: 'Nov 28, 2023',
    profileProgress: 55,
    email: 'a.mendoza@ibero.mx',
    phone: '+52 (555) 789-0123',
    officeLocation: 'Psychology Bldg, Room 118',
    orcidId: '0000-0007-8901-2345',
    linkedIn: 'linkedin.com/in/a-mendoza',
    officeHours: 'Thu & Fri 10:00 - 12:00',
    summary: 'Ana Patricia Mendoza is an Assistant Professor of Psychology specializing in cognitive behavioral therapy and adolescent mental health.'
  },
  {
    id: 8,
    employeeId: 'IB-2024-234',
    name: 'Dr. Ricardo Fuentes',
    role: 'Senior Professor',
    avatar: 'RF',
    avatarColor: 'bg-orange-100 text-orange-600',
    department: 'Architecture',
    departmentColor: 'bg-amber-50 text-amber-600',
    lastUpdate: 'Dec 05, 2023',
    profileProgress: 88,
    email: 'r.fuentes@ibero.mx',
    phone: '+52 (555) 890-1234',
    officeLocation: 'Architecture Bldg, Studio 405',
    orcidId: '0000-0008-9012-3456',
    linkedIn: 'linkedin.com/in/r-fuentes',
    officeHours: 'Tue & Wed 13:00 - 15:00',
    summary: 'Dr. Ricardo Fuentes is a Senior Professor of Architecture with expertise in sustainable urban design and historic preservation.'
  }
]

export const departments = [
  'All Departments',
  'Engineering',
  'Arts & Humanities',
  'Business',
  'Health Sciences',
  'Law',
  'Sciences',
  'Psychology',
  'Architecture'
]

export const statuses = [
  'All Statuses',
  'Complete (100%)',
  'In Progress (50-99%)',
  'Incomplete (<50%)'
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
