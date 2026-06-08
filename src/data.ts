import { Project, Skill, WorkExperience, Education, Certification } from './types';

export const USER_INFO = {
  name: "Agustín Belizán",
  title: "Data & Product Analyst",
  subtitle: "Analista de Datos | Product Analyst | APM",
  tagline: "De la analítica de datos a la gestión de producto. Profesional con experiencia en SQL, Excel avanzado y Power BI, especializado en la consistencia y mejora de procesos críticos. Busco aportar mi mentalidad analítica y capacidad de coordinación cross-functional en roles de APM o Product Analyst, transformando problemas operativos en oportunidades de crecimiento para productos digitales.",
  email: "agbelizan0@gmail.com",
  linkedin: "https://linkedin.com/in/agustin-belizan/",
  github: "https://github.com/agbelizan",
  cvUrl: "#",
  aboutLong: "Soy un analista de datos orientado a la consistencia y optimización de procesos críticos de negocio, con una sólida base técnica en SQL, Excel avanzado, Power BI y Alteryx. Mi experiencia profesional en Price Waterhouse & Co SRL (PwC) me ha capacitado para gestionar grandes volúmenes de datos financieros bajo regulaciones de alta exigencia, asegurando el control de calidad, detectando anomalías y automatizando flujos de trabajo ETL. Con un trasfondo en Administración de Empresas por la Universidad del CEMA, busco tender un puente entre el análisis técnico y los objetivos de negocio en roles de APM o Product Analyst, convirtiendo la fricción operativa en valor estratégico de producto.",
};

export const SKILLS: Skill[] = [
  // Análisis
  {
    name: "SQL",
    category: "Análisis",
    level: 90,
    iconName: "Database",
    description: "Consultas de integración y validación de bases de datos para asegurar consistencia e identificar inconsistencias en los flujos."
  },
  {
    name: "Excel Avanzado",
    category: "Análisis",
    level: 95,
    iconName: "FileSpreadsheet",
    description: "Modelado, conciliaciones complejas y validación de grandes volúmenes de datos multi-fondo estructurados."
  },
  {
    name: "Power BI",
    category: "Análisis",
    level: 88,
    iconName: "BarChart3",
    description: "Diseño y consolidación de reportes analíticos e indicadores clave de performance para soporte de decisiones."
  },
  {
    name: "Looker",
    category: "Análisis",
    level: 80,
    iconName: "PieChart",
    description: "Creación de dashboards de monitoreo y exploración interactiva de datos de rendimiento de negocio."
  },

  // Datos
  {
    name: "Alteryx",
    category: "Datos",
    level: 85,
    iconName: "GitMerge",
    description: "Automatización de flujos de trabajo ETL para el traspaso y preparación confiable de información."
  },
  {
    name: "Análisis de Datos",
    category: "Datos",
    level: 92,
    iconName: "LineChart",
    description: "Conciliaciones meticulosas, control de calidad riguroso de outputs y auditoría de causas raíz de discrepancias."
  },

  // Negocio
  {
    name: "Figma",
    category: "Negocio",
    level: 75,
    iconName: "Layout",
    description: "Maquetado visual de flujos e interfaces de usuario para la colaboración con equipos de diseño y desarrollo."
  },
  {
    name: "Inglés Avanzado",
    category: "Negocio",
    level: 85,
    iconName: "Globe",
    description: "Competencia profesional fluida con experiencia en programas de intercambio lingüístico y cultural en el exterior."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "sales_dashboard",
    name: "Dashboard de Power BI & Power Query",
    subtitle: "Proyecto de Certificación Microsoft + LinkedIn Learning",
    description: "Desarrollo de un dashboard interactivo en Power BI integrando orígenes de datos heterogéneos, limpieza con Power Query, definición de métricas DAX y visualización de indicadores clave para la toma de decisiones basada en datos.",
    techStack: ["Power BI", "Power Query", "Excel", "Data Modeling"],
    impact: "Automatización completa del flujo de reporting de negocio y simplificación en la visualización del rendimiento global de métricas.",
    githubUrl: "https://github.com/agbelizan/powerbi-metrics-dashboard",
    category: "Sales",
    metrics: [
      { label: "Fuentes Integradas", value: "3 Orígenes", trend: "up", change: "Consolidado" },
      { label: "Métricas DAX", value: "15+", trend: "up", change: "+100%" },
      { label: "Tiempo de Actualización", value: "Automático", trend: "down", change: "Manual a Automático" }
    ]
  },
  {
    id: "churn_analysis",
    name: "Análisis de Retención y Comportamiento de Clientes",
    subtitle: "Modelado de Cohortes para Retención de Usuarios",
    description: "Análisis exploratorio de comportamiento de clientes para determinar patrones de abandono de servicio (churn) y proponer disparadores preventivos de retención en base a métricas de uso y fidelización.",
    techStack: ["SQL", "Excel Avanzado", "Power BI", "Cohort Analysis"],
    impact: "Identificación de los principales factores de abandono de clientes y segmentación de cuentas de alto riesgo para campañas de retención específicas.",
    githubUrl: "https://github.com/agbelizan/customer-retention-cohorts",
    category: "Product",
    metrics: [
      { label: "Precisión del Análisis", value: "92%", trend: "up", change: "+5%" },
      { label: "Cohortes Monitoreadas", value: "12 Meses", trend: "neutral", change: "Estable" },
      { label: "Segmentos de Riesgo", value: "3 Niveles", trend: "down", change: "Fricción Acotada" }
    ]
  },
  {
    id: "lead_scoring",
    name: "Automatización de Procesos con Alteryx",
    subtitle: "Optimización de Flujo y Traspaso de Información",
    description: "Diseño y desarrollo de flujos automatizados de ETL con Alteryx para la extracción, limpieza e integración de datos entre reportes y archivos de trabajo complejos, mitigando el error humano.",
    techStack: ["Alteryx", "SQL", "Excel Avanzado", "Process Automation"],
    impact: "Reducción significativa del esfuerzo manual en la preparación de planillas complejas, aumentando un 100% la trazabilidad de los flujos de datos.",
    githubUrl: "https://github.com/agbelizan/alteryx-etl-automation",
    category: "Business",
    metrics: [
      { label: "Tiempo de Procesamiento", value: "-70%", trend: "down", change: "Ahorro de horas" },
      { label: "Trazabilidad de Datos", value: "100%", trend: "up", change: "Auditable" },
      { label: "Tasa de Error Manual", value: "0%", trend: "down", change: "Errores Eliminados" }
    ]
  },
  {
    id: "conversion_funnel",
    name: "Auditoría de Embudo de Conversión Interactiva",
    subtitle: "Identificación de Fricción en Procesos Críticos",
    description: "Análisis exhaustivo del funnel de registro y navegación del producto digital para detectar cuellos de botella e inconsistencias de interacción, proponiendo rediseños a través de maquetados en Figma.",
    techStack: ["SQL", "Figma", "Excel", "Product Funnels"],
    impact: "Localización de puntos de fricción operativa en el registro de usuarios, definiendo propuestas concretas de UX para elevar el ratio de activación.",
    githubUrl: "https://github.com/agbelizan/product-funnel-audit",
    category: "Product",
    metrics: [
      { label: "Puntos de Fricción", value: "2 Críticos", trend: "down", change: "Localizados" },
      { label: "Tasa de Activación Est.", value: "+8.5%", trend: "up", change: "Proyectado" },
      { label: "Propuestas de UX (Figma)", value: "5 Vistas", trend: "neutral", change: "Completado" }
    ]
  },
  {
    id: "financial_analysis",
    name: "Conciliación y Calidad de Datos Financieros",
    subtitle: "Estructuración y Control de Fondos de Inversión",
    description: "Desarrollo de un modelo estructurado en Excel y SQL para la consolidación e integración multi-fondo de entidades de inversión de EE. UU. (PwC), asegurando la consistencia antes de la presentación de declaraciones federales.",
    techStack: ["Excel Avanzado", "SQL", "Power BI", "Data Quality Control"],
    impact: "Consolidación exitosa de información y detección proactiva de discrepancias en carteras de ~12 fondos por entidad bajo cronogramas de entrega sumamente exigentes.",
    githubUrl: "https://github.com/agbelizan/financial-data-reconciliation",
    category: "Finance",
    metrics: [
      { label: "Fondos Conciliados", value: "~12/entidad", trend: "up", change: "+100%" },
      { label: "Consistencia de Inputs", value: "100%", trend: "up", change: "Sin Errores" },
      { label: "Tiempos de Entrega", value: "On-time", trend: "neutral", change: "Cumplido" }
    ]
  }
];

export const EXPERIENCES: WorkExperience[] = [
  {
    id: "exp_1",
    role: "Analista de datos e impuestos de EE. UU.",
    company: "Price Waterhouse & Co SRL",
    period: "Abr 2023 – Mar 2025",
    location: "Buenos Aires, Argentina",
    bullets: [
      "Preparé declaraciones federales de EE. UU. (Form 1065 y 1120) para entidades del sector inversiones, asegurando consistencia de inputs, cumplimiento de criterios y documentación de soporte.",
      "Integré y validé información desde Excel avanzado, consultas SQL y reportes en Power BI para consolidar datos por entidad/fondo y detectar inconsistencias antes del armado de entregables.",
      "Realicé conciliaciones y controles de calidad sobre grandes volúmenes de datos (por entidad: ~12 fondos), identificando diferencias, investigando causas raíz y escalando hallazgos para resolución.",
      "Ejecuté tareas de review parcial y estandarización de workpapers, mejorando la trazabilidad del proceso y la calidad del output en ciclos con deadlines exigentes.",
      "Mejoré el traspaso y preparación de información mediante automatización con Alteryx, reduciendo trabajo manual y aumentando la confiabilidad del flujo de datos entre reportes y archivos de trabajo."
    ],
    metricsMoved: [
      { label: "Fondos por Entidad", value: "~12 fondos" },
      { label: "Eficiencia de Flujo", value: "Alteryx" },
      { label: "Formatos EE. UU.", value: "Form 1065/1120" }
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu_1",
    degree: "Licenciatura en Administración de Empresas",
    institution: "Universidad del CEMA",
    period: "Finalizado",
    details: "Argentina"
  },
  {
    id: "edu_2",
    degree: "Certificado de Analista de Negocios",
    institution: "Universidad Nacional",
    period: "Feb 2023 – May 2023",
    details: "Argentina"
  },
  {
    id: "edu_3",
    degree: "Programa de intercambio de inglés",
    institution: "Education First (EF)",
    period: "Jun 2017 – Ene 2018",
    details: "Exterior"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert_1",
    name: "Career Essentials in Data Analysis",
    issuer: "Microsoft + LinkedIn Learning",
    year: "2023",
    credentialUrl: "#"
  },
  {
    id: "cert_2",
    name: "Learning Data Analytics Part 2: Extending and Applying Core Knowledge",
    issuer: "LinkedIn Learning",
    year: "2023",
    credentialUrl: "#"
  },
  {
    id: "cert_3",
    name: "Project Management Foundations",
    issuer: "LinkedIn Learning",
    year: "2023",
    credentialUrl: "#"
  }
];
