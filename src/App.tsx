import { useState, useEffect, FormEvent } from 'react';
import { 
  USER_INFO, 
  PROJECTS, 
  SKILLS, 
  EXPERIENCES, 
  EDUCATION, 
  CERTIFICATIONS 
} from './data';
import * as Icons from 'lucide-react';
import { 
  SalesSimulator, 
  ChurnSimulator, 
  LeadScoringSimulator, 
  FunnelSimulator, 
  RunwaySimulator 
} from './components/ProjectSimulator';
import DataConstellation from './components/DataConstellation';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [expandedDemo, setExpandedDemo] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Contact form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  
  // CV modal state
  const [isCVMopen, setIsCVMopen] = useState(false);

  // Apply dark mode className dynamically
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Filter projects by category
  const filteredProjects = PROJECTS.filter(project => {
    if (activeTab === 'All') return true;
    return project.category.toLowerCase() === activeTab.toLowerCase();
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
    }, 1800);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setFormStatus('idle');
  };

  // Helper to render dynamic icons correctly
  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  // Helper to render the active simulator inside project cards
  const renderProjectSimulator = (projectId: string) => {
    switch (projectId) {
      case 'sales_dashboard':
        return <SalesSimulator />;
      case 'churn_analysis':
        return <ChurnSimulator />;
      case 'lead_scoring':
        return <LeadScoringSimulator />;
      case 'conversion_funnel':
        return <FunnelSimulator />;
      case 'financial_analysis':
        return <RunwaySimulator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark font-sans selection:bg-brand-primary/20 transition-colors duration-300">
      
      {/* HEADER & STICKY NAV */}
      <header className="sticky top-0 z-40 w-full bg-white/50 dark:bg-brand-bg-dark/50 backdrop-blur-md border-b border-[#1F4E5F]/10 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5" id="nav-brand-logo">
            <div className="w-8 h-8 bg-[#1F4E5F] dark:bg-sky-500 rounded-lg flex items-center justify-center shadow-md shadow-[#1F4E5F]/10">
              <div className="w-4 h-4 border-2 border-white dark:border-slate-900 rounded-sm rotate-45 animate-pulse"></div>
            </div>
            <span className="font-black tracking-tight text-xl uppercase text-[#2D3748] dark:text-sky-305 bg-clip-text">
              {USER_INFO.name.split(' ')[0]}.ANALYTICS
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-[#2D3748]/60 dark:text-slate-300/60" aria-label="Nivel superior">
            <a href="#about" className="hover:text-[#1F4E5F] dark:hover:text-sky-300 border-b-2 border-transparent hover:border-[#1F4E5F] dark:hover:border-sky-300 py-1 transition-all">Sobre Mí</a>
            <a href="#skills" className="hover:text-[#1F4E5F] dark:hover:text-sky-300 border-b-2 border-transparent hover:border-[#1F4E5F] dark:hover:border-sky-300 py-1 transition-all">Habilidades</a>
            <a href="#projects" className="hover:text-[#1F4E5F] dark:hover:text-sky-300 border-b-2 border-transparent hover:border-[#1F4E5F] dark:hover:border-sky-300 py-1 transition-all">Proyectos</a>
            <a href="#certifications" className="hover:text-[#1F4E5F] dark:hover:text-sky-300 border-b-2 border-transparent hover:border-[#1F4E5F] dark:hover:border-sky-300 py-1 transition-all">Educación</a>
            <a href="#contact" className="hover:text-[#1F4E5F] dark:hover:text-sky-300 border-b-2 border-transparent hover:border-[#1F4E5F] dark:hover:border-sky-300 py-1 transition-all">Contacto</a>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Color mode toggle */}
            <button 
              id="theme-toggler"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              aria-label="Alternar modo oscuro"
            >
              {theme === 'light' ? (
                <Icons.Moon className="w-4 h-4" />
              ) : (
                <Icons.Sun className="w-4 h-4" />
              )}
            </button>

            <a 
              href="#contact" 
              className="hidden sm:inline-flex text-xs font-bold px-3.5 py-2 rounded-lg bg-[#1F4E5F] text-white hover:bg-[#15343F] shadow-sm transition"
              id="header-cta-contact"
            >
              Contacto
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F4E5F]/10 dark:bg-sky-400/10 border border-[#1F4E5F]/20 dark:border-sky-400/20">
              <span className="w-2 h-2 rounded-full bg-[#5B7C6D] dark:bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1F4E5F] dark:text-sky-300">
                Disponible para Consultas & Contrataciones
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.85] font-black tracking-tighter uppercase mb-2 text-[#2D3748] dark:text-white" id="hero-title">
              {USER_INFO.name.split(' ')[0]}<br />
              <span className="text-[#1F4E5F] dark:text-sky-400">
                {USER_INFO.name.split(' ').slice(1).join(' ') || 'Analytics'}
              </span>
            </h1>

            <p className="text-lg font-semibold text-[#5B7C6D] dark:text-emerald-400 max-w-md mt-2" id="hero-subtitle">
              {USER_INFO.subtitle}
            </p>

            <p className="text-sm text-[#2D3748]/70 dark:text-slate-350 mt-4 max-w-sm leading-relaxed" id="hero-tagline">
              {USER_INFO.tagline}
            </p>

            {/* Resume Callouts */}
            <div className="flex flex-wrap gap-4 mt-6" id="hero-actions">
              <button 
                onClick={() => setIsCVMopen(true)}
                className="bg-[#1F4E5F] dark:bg-sky-500 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-[#1F4E5F]/20 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                id="hero-download-cv"
              >
                <Icons.FileDown className="w-4 h-4" /> Descargar CV
              </button>
              <a 
                href="#contact" 
                className="border-2 border-[#1F4E5F] dark:border-sky-400 text-[#1F4E5F] dark:text-sky-300 px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
                id="hero-contact-button"
              >
                <Icons.Mail className="w-4 h-4" /> Contacto
              </a>
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200/50 dark:border-slate-800 pt-6">
              <div>
                <span className="text-2xl font-extrabold font-mono text-[#1F4E5F] dark:text-sky-400">+5 años</span>
                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium mt-0.5">De Trayectoria Técnica</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold font-mono text-[#5B7C6D] dark:text-emerald-400">30+</span>
                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium mt-0.5">Modelos Implementados</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold font-mono text-neutral-800 dark:text-white">$220K+</span>
                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium mt-0.5">Retorno ROI Identificado</span>
              </div>
            </div>
          </div>

          {/* Interactive Graph Column */}
          <div className="lg:col-span-5" id="hero-graphic">
            <div className="relative">
              {/* Abs decorative gradient block */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#1F4E5F]/5 dark:bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#5B7C6D]/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
              
              <DataConstellation />
            </div>
          </div>

        </div>
      </section>

      {/* SOBRE MÍ SECTION */}
      <section id="about" className="bg-white dark:bg-slate-900/40 py-16 md:py-24 border-y border-gray-200/40 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Title & Avatar */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-6">
              <span className="text-[11px] font-mono font-bold text-[#1F4E5F] dark:text-sky-400 uppercase tracking-widest block">
                01 . BIOGRAFÍA PROFESIONAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#2D3748] dark:text-white">
                Analizar no es solo agrupar números; es predecir el rumbo de un negocio.
              </h2>
              
              {/* Vector styled analyst avatar representation */}
              <div className="p-4 rounded-2xl bg-brand-bg dark:bg-slate-800/80 border border-gray-200/50 dark:border-slate-700/50 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#1F4E5F] to-[#5B7C6D] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  {/* Styled avatar shape */}
                  <Icons.User className="w-9 h-9 text-white opacity-90" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white">{USER_INFO.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Mastering SQL, Python & Business Growth Insights</p>
                  <div className="flex gap-2.5 mt-1.5 text-[10px] text-gray-400 font-mono">
                    <span className="flex items-center gap-0.5"><Icons.MapPin className="w-3 h-3 text-red-500" /> Argentina</span>
                    <span className="flex items-center gap-0.5"><Icons.Globe className="w-3 h-3 text-sky-500" /> Full-remote</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed font-sans font-light">
                {USER_INFO.aboutLong}
              </p>
              
              <div className="border-l-2 border-[#1F4E5F] dark:border-sky-400 pl-4 py-1 italic text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                &ldquo;Un buen analista no solo responde las preguntas de los directivos; rediseña los datos para que el equipo descubra las preguntas que ni siquiera sabían que debían formular.&rdquo;
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3.5 bg-brand-bg dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800/80">
                  <span className="text-xs font-bold text-[#1F4E5F] dark:text-sky-300 block mb-1">Enfoque de Resolución</span>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    Trabajo con retrospectiva diagnóstica para sanar fugas y análisis prospectivos con foco estocástico para planificar crecimiento.
                  </p>
                </div>
                <div className="p-3.5 bg-brand-bg dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800/80">
                  <span className="text-xs font-bold text-[#5B7C6D] dark:text-emerald-400 block mb-1">Interés de Producto</span>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    Apasionado por la modelación de hábitos de retención de cohortes y agilización del ratio de activación de nuevas features.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-mono font-bold text-[#1F4E5F] dark:text-sky-400 uppercase tracking-widest block mb-2">
            02 . HABILIDAS TÉCNICAS Y METODOLOGÍAS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#2D3748] dark:text-white">
            Un Stack de Herramientas Construido para Aportar Precisión Analítica
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-2">
            Divididas por dominio para demostrar experiencia en análisis puro, extracción y transformación de datos, y comprensión estratégica de negocio.
          </p>
        </div>

        <div className="mb-10 last:mb-0">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200/50 dark:border-slate-800 pb-2">
            <div className="p-1.5 rounded-lg bg-[#1F4E5F]/5 dark:bg-sky-400/10 text-[#1F4E5F] dark:text-sky-300">
              <Icons.TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white font-display">
              Especialización en Herramientas de Análisis
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {SKILLS.filter(s => s.category === 'Análisis').map((skill, idx) => (
              <div 
                key={idx}
                className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#1F4E5F]/40 dark:hover:border-sky-500/40 transition duration-300 group flex flex-col items-center justify-center text-center gap-3"
                id={`skill-card-${skill.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="p-3.5 rounded-xl bg-brand-bg dark:bg-slate-900 text-[#1F4E5F] dark:text-sky-300 group-hover:bg-[#1F4E5F]/10 dark:group-hover:bg-sky-400/20 transition-all">
                  {renderIcon(skill.iconName, "w-6 h-6")}
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white tracking-tight">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS SECTION (THE MASTERPIECE CORE) */}
      <section id="projects" className="bg-white dark:bg-slate-950/60 py-16 md:py-24 border-y border-gray-200/40 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#1F4E5F] dark:text-sky-400 uppercase tracking-widest block mb-2">
                03 . PORTFOLIO DE PROYECTOS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#2D3748] dark:text-white">
                Casos de Negocio en Producción
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-xl">
                Haz clic en <strong className="text-[#1F4E5F] dark:text-sky-400">Ver Demo Interactiva</strong> en cualquiera de los proyectos para probar el algoritmo simulador directamente sobre el navegador.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-brand-bg dark:bg-slate-800 p-1 rounded-lg border border-gray-200/50 dark:border-slate-800" role="tablist">
              {(['All', 'Sales', 'Product', 'Business', 'Finance'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setExpandedDemo(null);
                  }}
                  className={`text-[11px] font-bold px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-slate-900 text-[#1F4E5F] dark:text-sky-300 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-slate-200'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab}
                >
                  {tab === 'All' ? 'Todos' : tab === 'Sales' ? 'Ventas' : tab === 'Product' ? 'Producto' : tab === 'Business' ? 'Negocio' : 'Finanzas'}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of projected cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-list-container">
            {filteredProjects.map((project) => {
              const isOpen = expandedDemo === project.id;
              
              return (
                <article 
                  key={project.id}
                  className="bg-brand-bg dark:bg-slate-900/60 rounded-3xl border border-gray-150 dark:border-slate-800 overflow-hidden shadow-xs hover:border-gray-200 dark:hover:border-slate-700 transition flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col gap-6 p-6 sm:p-8 justify-between h-full flex-grow">
                    
                    {/* Visual mockup sidebar inside card (left col) */}
                    <div className="flex flex-col justify-between space-y-4 bg-white dark:bg-slate-955 p-5 rounded-2xl border border-gray-100 dark:border-slate-850">
                      <div>
                        {/* Metricas mini dashboard inside visual */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-gray-400">Líneas de Telemetría</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        
                        <div className="space-y-2.5">
                          {project.metrics.map((metric, mIdx) => (
                            <div key={mIdx} className="p-2 bg-brand-bg dark:bg-slate-900/50 rounded-lg border border-gray-50 dark:border-slate-800 flex justify-between items-center">
                              <span className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">{metric.label}</span>
                              <div className="text-right">
                                <span className="text-xs font-bold font-mono text-gray-800 dark:text-white block">{metric.value}</span>
                                <span className={`text-[9px] font-mono flex items-center justify-end font-semibold ${
                                  metric.trend === 'up' ? 'text-emerald-600' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                                }`}>
                                  {metric.trend === 'up' ? '▲' : metric.trend === 'down' ? '▼' : '●'} {metric.change}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Code placeholder snippet */}
                      <div className="p-2.5 bg-neutral-900 rounded-lg text-[9px] font-mono text-emerald-400 border border-neutral-800 leading-tight">
                        <span className="text-gray-500">// BigQuery SQL Query optimized</span> <br />
                        <span className="text-indigo-400">SELECT</span> region, <span className="text-indigo-400">ROUND</span>(<span className="text-sky-300">SUM</span>(rev)) <span className="text-indigo-400">AS</span> KPI <br />
                        <span className="text-indigo-400">FROM</span> `dw.{project.id}` <br />
                        <span className="text-indigo-400">GROUP BY</span> 1;
                      </div>
                    </div>

                    {/* Main content specifications (right col) */}
                    <div className="flex flex-col justify-between space-y-5 flex-grow">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-mono font-bold uppercase py-0.5 px-2 bg-[#1F4E5F]/15 text-[#1F4E5F] dark:bg-sky-400/10 dark:text-sky-300 rounded border border-[#1F4E5F]/10">
                            {project.category}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-slate-400 font-mono">
                            {project.subtitle}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-800 dark:text-white">
                          {project.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-350 leading-relaxed font-sans font-light">
                          {project.description}
                        </p>

                        {/* Impact callout box */}
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 dark:border-emerald-900/40 rounded-xl flex items-start gap-2">
                          <Icons.BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide block">Impacto Comercial Demostrado</span>
                            <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-tight mt-0.5 font-medium">{project.impact}</p>
                          </div>
                        </div>

                        {/* Tech list */}
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {project.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-slate-800 text-gray-500 dark:text-slate-300 border border-gray-200/40 dark:border-slate-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project actions */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50 dark:border-slate-800">
                        <button
                          onClick={() => setExpandedDemo(isOpen ? null : project.id)}
                          className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition ${
                            isOpen 
                              ? 'bg-amber-500 text-white hover:bg-amber-600' 
                              : 'bg-[#1F4E5F] dark:bg-sky-500 text-white hover:bg-[#15343F] dark:hover:bg-sky-600'
                          } shadow-sm cursor-pointer`}
                          aria-expanded={isOpen}
                        >
                          <Icons.LineChart className="w-3.5 h-3.5" />
                          {isOpen ? "Cerrar Demo" : "Ver Demo Interactiva"}
                        </button>
                        
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                          </svg>
                          <span>Repository</span>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* Expandible simulator container with animations */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-150 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                      >
                        <div className="p-6 sm:p-8 bg-gray-50/50 dark:bg-slate-900/50">
                          {renderProjectSimulator(project.id)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* EDUCACIÓN Y CERTIFICACIONES SECTION */}
      <section id="certifications" className="bg-white dark:bg-slate-900/40 py-16 md:py-24 border-y border-gray-200/40 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-bold text-[#1F4E5F] dark:text-sky-400 uppercase tracking-widest block mb-2">
              05 . FORMACIÓN Y VALORES DE RESPALDO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#2D3748] dark:text-white">
              Educación Científica y Credenciales
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-2">
              Títulos formales de grado acompañados de certificaciones técnicas autorizadas por líderes de la industria.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Col: Academics */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-gray-150 dark:border-slate-850 pb-2">
                <Icons.GraduationCap className="w-5 h-5 text-[#1F4E5F] dark:text-sky-300" />
                <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white font-display">Estudios Universitarios</h3>
              </div>

              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className="p-5 rounded-2xl bg-brand-bg dark:bg-slate-800/80 border border-gray-150 dark:border-slate-800 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-700 flex items-center justify-center text-[#1F4E5F] dark:text-sky-300 shrink-0 shadow-xs">
                      <Icons.BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-gray-800 dark:text-white leading-snug">{edu.degree}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-150 dark:bg-slate-700 text-gray-500 dark:text-slate-350">{edu.period}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#1F4E5F] dark:text-sky-300 block">{edu.institution}</span>
                      {edu.details && (
                        <p className="text-[11px] sm:text-xs text-gray-500 dark:text-slate-400 text-light leading-relaxed">{edu.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Certifications list */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-gray-150 dark:border-slate-850 pb-2">
                <Icons.Award className="w-5 h-5 text-[#5B7C6D] dark:text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white font-display">Certificados Profesionales</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CERTIFICATIONS.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-gray-150 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 transition flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-[#5B7C6D]/10 text-[#5B7C6D] dark:bg-emerald-400/10 dark:text-emerald-400 font-bold border border-[#5B7C6D]/10">
                        {cert.issuer}
                      </span>
                      <h4 className="text-xs font-bold text-gray-800 dark:text-white leading-tight mt-1">{cert.name}</h4>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800 mt-3 pt-2">
                      <span className="text-[10px] text-gray-400">Expedido: {cert.year}</span>
                      <a 
                        href={cert.credentialUrl}
                        className="text-[10px] font-bold text-[#1F4E5F] dark:text-sky-400 hover:underline inline-flex items-center gap-0.5"
                      >
                        Licencia <Icons.ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-outer-block">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold text-[#1F4E5F] dark:text-sky-400 uppercase tracking-widest block">
                06 . CONEXIÓN Y CONSULTAS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#2D3748] dark:text-white leading-tight">
                Diseñemos el Próximo Salto Analítico
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-sans">
                ¿Buscas optimizar un embudo de conversión roto, auditar el retorno del gasto publicitario, o automatizar un ETL? Envíame un mensaje directo para coordinar un café virtual o revisar tu base de datos de manera gratuita.
              </p>
            </div>

            {/* Structured addresses */}
            <div className="space-y-3.5 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gray-150 dark:bg-slate-800 text-gray-600 dark:text-slate-350">
                  <Icons.Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-mono">Email Directo</span>
                  <a href={`mailto:${USER_INFO.email}`} className="text-xs font-bold text-[#1F4E5F] dark:text-sky-300 hover:underline">{USER_INFO.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gray-150 dark:bg-slate-800 text-gray-600 dark:text-slate-350">
                  <Icons.Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-mono">Red Profesional</span>
                  <a href={USER_INFO.linkedin} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#1F4E5F] dark:text-sky-300 hover:underline">{USER_INFO.linkedin.replace('https://', '')}</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gray-150 dark:bg-slate-800 text-gray-600 dark:text-slate-350">
                  <Icons.Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-mono">Repocitorios Código</span>
                  <a href={USER_INFO.github} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#1F4E5F] dark:text-sky-300 hover:underline">{USER_INFO.github.replace('https://', '')}</a>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic">
              * Respuestas garantizadas en menos de 24 horas hábiles.
            </p>
          </div>

          {/* Right Live Transaction Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-gray-800 dark:text-white block pb-4 border-b border-gray-100 dark:border-slate-800 mb-5">
              Formulario de Consulta Directo
            </h3>

            {formStatus === 'sent' ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <Icons.CheckCircle2 className="w-6 h-6 animate-bounce" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-200">Mensaje Procesado con Éxito</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
                    La petición ha sido insertada en el repositorio portafolio. ¡Me pondré en contacto contigo de inmediato a tu email!
                  </p>
                </div>

                {/* Simulated SQL transactional codeblock to delight recruiters */}
                <div className="p-4 bg-neutral-900 text-[10px] font-mono text-emerald-400 rounded-xl leading-relaxed max-w-md mx-auto text-left shadow-lg">
                  <span className="text-gray-500">-- TRANSACTION LOG_PROCESSED SUCCESS --</span> <br />
                  <span className="text-indigo-400">BEGIN TRANSACTION;</span> <br />
                  <span className="text-emerald-400">INSERT INTO</span> contact_leads (name, email, status) <br />
                  <span className="text-orange-300">VALUES</span> ('{name}', '{email}', 'Hot Lead'); <br />
                  <span className="text-indigo-400">COMMIT;</span> <br />
                  <span className="text-gray-400">// Status Code: 201 Created (1 row affected in 0.04s)</span>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={resetForm}
                    className="text-xs font-semibold text-[#1F4E5F] dark:text-sky-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Icons.RotateCcw className="w-3.5 h-3.5" /> Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-slate-450 mb-1" htmlFor="input_name">
                    Tu nombre o Empresa
                  </label>
                  <input 
                    name="name"
                    id="input_name"
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Sofía Martín (Hiring Manager)"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-brand-bg dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#1F4E5F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-slate-450 mb-1" htmlFor="input_email">
                    Correo electrónico de contacto
                  </label>
                  <input 
                    name="email"
                    id="input_email"
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej. sofia@empresa.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-brand-bg dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#1F4E5F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-slate-450 mb-1" htmlFor="input_message">
                    ¿Cuál es tu requerimiento de datos?
                  </label>
                  <textarea 
                    name="message"
                    id="input_message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe el reto técnico o de negocio que deseas conversar..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-brand-bg dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#1F4E5F] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={formStatus === 'sending'}
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold py-3 px-4 rounded-xl bg-[#1F4E5F] dark:bg-sky-500 text-white hover:bg-[#15343F] dark:hover:bg-sky-600 transition disabled:opacity-50 shadow-sm cursor-pointer"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Icons.Loader2 className="w-4 h-4 animate-spin" />
                        <span>INSERTING INTO contacts_schema...</span>
                      </>
                    ) : (
                      <>
                        <Icons.Send className="w-3.5 h-3.5" />
                        <span>Ejecutar Envío (Enviar Mensaje)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Inline compliance statement */}
            <div className="mt-4 pt-3 border-t border-gray-150 dark:border-slate-800 text-[10px] text-gray-400 flex items-center justify-between">
              <span className="flex items-center gap-1"><Icons.Lock className="w-3 h-3 text-[#5B7C6D]" /> Encriptación segura SSL</span>
              <span>{USER_INFO.name} © 2026</span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1F4E5F]/10 bg-white/20 dark:bg-slate-900/40 py-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2D3748] dark:text-slate-300">Disponible para nuevos proyectos</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#1F4E5F]/20"></div>
            <span className="text-[10px] font-mono opacity-70 text-[#2D3748] dark:text-slate-400">{USER_INFO.email}</span>
          </div>
          <div className="flex gap-6 text-xs font-black uppercase tracking-widest text-[#2D3748]/60 dark:text-slate-300/60">
            <a href={USER_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#1F4E5F] dark:hover:text-sky-300 transition-colors">LinkedIn</a>
            <a href={USER_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#1F4E5F] dark:hover:text-sky-300 transition-colors">GitHub</a>
            <a href={`mailto:${USER_INFO.email}`} className="hover:text-[#1F4E5F] dark:hover:text-sky-305 transition-colors">Contacto</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mt-6 border-t border-[#1F4E5F]/10 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-[#2D3748]/50 dark:text-slate-400/50">
          <span>Última actualización de queries: Junio, 2026</span>
          <span>{USER_INFO.name} © Todos los Derechos Reservados</span>
        </div>
      </footer>

      {/* CV IMPRESION / VER MODAL OVERLAY */}
      <AnimatePresence>
        {isCVMopen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsCVMopen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-gray-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-gray-150 flex flex-col justify-between max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#1F4E5F] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.FileText className="w-5 h-5 text-sky-300" />
                  <span className="font-bold text-sm">Resumen Ejecutivo de {USER_INFO.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      window.print();
                    }}
                    className="p-1 px-3 text-xs bg-white/10 hover:bg-white/20 rounded-md font-bold transition flex items-center gap-1"
                  >
                    <Icons.Printer className="w-3.5 h-3.5" /> Imprimir / PDF
                  </button>
                  <button 
                    onClick={() => setIsCVMopen(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition"
                    aria-label="Cerrar modal"
                  >
                    <Icons.X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 printable-region" id="cv-printable-body">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row items-baseline justify-between border-b pb-4 gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900">{USER_INFO.name}</h2>
                    <span className="text-xs font-semibold text-[#1F4E5F]">{USER_INFO.subtitle}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 font-mono space-y-0.5">
                    <div>Buenos Aires, Argentina (Híbrido/Remoto)</div>
                    <div>{USER_INFO.email}</div>
                    <div>{USER_INFO.linkedin}</div>
                  </div>
                </div>

                {/* Profile */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F4E5F] border-b pb-0.5">Perfil Profesional</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">{USER_INFO.aboutLong}</p>
                </div>

                {/* Core Stack */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F4E5F] border-b pb-0.5">Dominio Tecnológico</h3>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-700">
                    <div>
                      <strong className="text-gray-900 block">Análisis Puro:</strong> SQL, Excel Avanzado, Power BI, Looker
                    </div>
                    <div>
                      <strong className="text-gray-900 block">Estructuración / ETL:</strong> Alteryx, ETL pipelines, validación de datos
                    </div>
                    <div>
                      <strong className="text-gray-900 block">Dominio Estratégico:</strong> Product cohorting, Funnel tracking, maquetados Figma, QA
                    </div>
                  </div>
                </div>

                {/* Experience truncated */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F4E5F] border-b pb-0.5 text-left">Trayectoria Distintiva</h3>
                  
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="text-xs space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="font-bold text-gray-900">{exp.role} — <span className="text-[#1F4E5F] font-semibold">{exp.company}</span></span>
                        <span className="font-mono text-gray-500 text-[10px]">{exp.period}</span>
                      </div>
                      <p className="text-[11px] text-gray-605 italic font-medium">Logros notables: {exp.metricsMoved.map(m => `${m.label} (${m.value})`).join(" | ")}</p>
                      <ul className="list-disc pl-4 text-gray-650 text-[10.5px] leading-relaxed">
                        {exp.bullets.slice(0, 2).map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education brief */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1F4E5F] border-b pb-0.5">Educación y Certificaciones</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10.5px]">
                    <div>
                      <ul className="space-y-1.5 list-disc pl-3 text-gray-600">
                        {EDUCATION.map(edu => (
                          <li key={edu.id}><strong>{edu.degree}</strong> ({edu.institution}, {edu.period})</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-1 text-gray-600">
                        {CERTIFICATIONS.map(cert => (
                          <li key={cert.id}>✔ {cert.name} ({cert.issuer}, {cert.year})</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer warning */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                <span className="text-[10px] text-gray-400">Presiona Ctrl+P o CMD+P para guardar este CV como archivo PDF.</span>
                <button 
                  onClick={() => setIsCVMopen(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-lg transition shrink-0"
                >
                  Cerrar Resumen
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
