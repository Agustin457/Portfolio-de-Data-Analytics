import { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Database, 
  HelpCircle, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle,
  Play, 
  Sparkles,
  Calculator,
  RefreshCw,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

// ==========================================
// 1. SALES SIMULATOR
// ==========================================
export function SalesSimulator() {
  const [region, setRegion] = useState<'Norte' | 'Sur' | 'Centro'>('Norte');
  const [category, setCategory] = useState<'all' | 'electronics' | 'clothing' | 'home'>('all');

  const baseSales = {
    Norte: { electronics: [120, 150, 140, 190, 170, 210], clothing: [60, 70, 65, 80, 85, 95], home: [40, 42, 50, 48, 55, 62] },
    Sur: { electronics: [80, 95, 110, 105, 120, 130], clothing: [90, 110, 105, 130, 140, 155], home: [30, 35, 38, 42, 45, 52] },
    Centro: { electronics: [100, 110, 105, 130, 125, 145], clothing: [70, 75, 80, 90, 95, 105], home: [50, 58, 62, 60, 68, 75] }
  };

  const monthlyData = useMemo(() => {
    const rData = baseSales[region];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    return months.map((month, idx) => {
      let sales = 0;
      if (category === 'all') {
        sales = rData.electronics[idx] + rData.clothing[idx] + rData.home[idx];
      } else {
        sales = rData[category][idx];
      }
      return { month, sales };
    });
  }, [region, category]);

  const stats = useMemo(() => {
    const total = monthlyData.reduce((acc, curr) => acc + curr.sales, 0);
    const avg = Math.round(total / monthlyData.length);
    const margin = category === 'electronics' ? 22 : category === 'clothing' ? 45 : category === 'home' ? 35 : 32;
    const grossProfit = Math.round(total * (margin / 100));
    return { total, avg, margin, grossProfit };
  }, [monthlyData, category]);

  const maxVal = Math.max(...monthlyData.map(d => d.sales)) || 1;

  return (
    <div className="p-5 font-sans bg-[#FBFBFA] border border-gray-100 rounded-2xl">
      <div className="flex flex-col gap-4 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1F4E5F]/10 text-[#1F4E5F] mb-1">
            <Database className="w-3 h-3" /> SQL + Power BI Engine Live Demo
          </span>
          <h4 className="text-sm font-semibold text-gray-800">Panel Omnicanal de Ventas Interactivo</h4>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div>
            <label className="block text-[10px] text-gray-500 uppercase font-mono">Región</label>
            <select 
              value={region} 
              onChange={(e) => setRegion(e.target.value as any)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#1F4E5F]"
            >
              <option value="Norte">Región Norte</option>
              <option value="Sur">Región Sur</option>
              <option value="Centro">Región Centro</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-500 uppercase font-mono">Categoría</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value as any)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#1F4E5F]"
            >
              <option value="all">Todas</option>
              <option value="electronics">Tecnología (Bajo Margen)</option>
              <option value="clothing">Indumentaria (Alto Margen)</option>
              <option value="home">Hogar (Medio Margen)</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] text-gray-400 block font-medium uppercase">Total Ventas</span>
          <span className="text-sm sm:text-base font-bold font-mono text-gray-800">${stats.total.toLocaleString()}K</span>
          <span className="text-[9px] text-[#5B7C6D] flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> +14% QoQ
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] text-gray-400 block font-medium uppercase">Margen Prom.</span>
          <span className="text-sm sm:text-base font-bold font-mono text-gray-800">{stats.margin}%</span>
          <span className="text-[9px] text-gray-400 mt-1 block">Fórmula de Producto</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] text-gray-400 block font-medium uppercase">Utilidad Estim.</span>
          <span className="text-sm sm:text-base font-bold font-mono text-gray-800">${stats.grossProfit.toLocaleString()}K</span>
          <span className="text-[9px] text-[#5B7C6D] flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> Optimizado
          </span>
        </div>
      </div>

      {/* Chart Visualizer */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono mb-2">
          <span>Facturación Mensual (Miles USD)</span>
          <span>Max: ${maxVal}K</span>
        </div>
        
        {/* Custom SVG/CSS Bar Chart with beautiful alignments */}
        <div className="h-28 flex items-end justify-between gap-2.5 px-2 bg-white rounded-xl border border-gray-100 p-3 pt-6 relative">
          {monthlyData.map((data, idx) => {
            const heightPercent = Math.max(12, Math.round((data.sales / maxVal) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                {/* Bar */}
                <div 
                  style={{ height: `${heightPercent}%` }} 
                  className="w-full bg-[#1F4E5F]/85 hover:bg-[#1F4E5F] rounded-t-sm transition-all duration-300 relative flex items-start justify-center"
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-[10px] px-1.5 py-0.5 rounded font-mono pointer-events-none whitespace-nowrap z-10 shadow-lg">
                    ${data.sales}K USD
                  </div>
                </div>
                {/* Month Tag */}
                <span className="text-[10px] font-mono text-gray-400 mt-1.5">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-2.5 rounded-lg bg-[#5B7C6D]/5 border border-[#5B7C6D]/15 text-xs text-gray-600 flex gap-2">
        <Sparkles className="w-4 h-4 text-[#5B7C6D] shrink-0 mt-0.5" />
        <p>
          <strong className="text-gray-800">Análisis Comercial:</strong> El canal {region} muestra que el margen cambia significativamente según la categoría seleccionada ({stats.margin}%). Útil para renegociación de compras minoristas.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 2. CHURN SIMULATOR
// ==========================================
export function ChurnSimulator() {
  const [tenure, setTenure] = useState<number>(12); // months
  const [supportTickets, setSupportTickets] = useState<number>(2); // tickets
  const [hasContract, setHasContract] = useState<boolean>(true); // contract type

  const riskResult = useMemo(() => {
    // Basic logic for simulating ML classifier
    // Tenure reduces risk, tickets increase risk, contract reduces risk significantly.
    let baseScore = 50;
    
    // Contract influence
    if (!hasContract) baseScore += 25; // month-to-month boosts risk
    else baseScore -= 20;

    // Tickets influence
    baseScore += (supportTickets * 8);

    // Tenure influence
    baseScore -= (tenure * 0.9);

    // Bound between 3% and 98%
    const score = Math.max(3, Math.min(98, Math.round(baseScore)));

    let description = "Riesgo Bajo";
    let color = "bg-emerald-500";
    let textColor = "text-emerald-700";
    let bgColor = "bg-emerald-50";
    let border = "border-emerald-200";
    let actionPlaybook = "Salud Óptima. Fomentar la conversión a defensores de marca (NPS Promoters) u ofrecer programa de referidos.";

    if (score > 65) {
      description = "Riesgo Crítico";
      color = "bg-red-500";
      textColor = "text-red-700";
      bgColor = "bg-red-50";
      border = "border-red-200";
      actionPlaybook = "Disparar Alerta CSM. Ejecutar playbook inmediato de retención ofreciendo bonificación de renovación y llamada de alineación técnica con Product Owner.";
    } else if (score > 35) {
      description = "Riesgo Moderado";
      color = "bg-amber-500";
      textColor = "text-amber-700";
      bgColor = "bg-amber-50";
      border = "border-amber-200";
      actionPlaybook = "Involucrar campaña de goteo orientada a tutoriales de features no utilizados para impulsar la adopción de funcionalidades clave.";
    }

    return { score, description, color, textColor, bgColor, border, actionPlaybook };
  }, [tenure, supportTickets, hasContract]);

  return (
    <div className="p-5 font-sans bg-[#FBFBFA] border border-gray-100 rounded-2xl">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#5B7C6D]/10 text-[#5B7C6D] mb-1">
          <Calculator className="w-3 h-3" /> Simulador de Machine Learning (ML)
        </span>
        <h4 className="text-sm font-semibold text-gray-800">Motor de Clasificación de Cancelaciones (Churn)</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">Antigüedad del Cliente</span>
              <span className="font-mono text-[#1F4E5F] font-bold">{tenure} meses</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="48" 
              value={tenure} 
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full accent-[#1F4E5F] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
              <span>Nuevo (1 m)</span>
              <span>Maduro (48 m)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">Tickets de Soporte Abiertos</span>
              <span className="font-mono text-[#1F4E5F] font-bold">{supportTickets} tickets</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={supportTickets} 
              onChange={(e) => setSupportTickets(parseInt(e.target.value))}
              className="w-full accent-[#1F4E5F] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
              <span>0 tickets</span>
              <span>10 tickets (Fricción)</span>
            </div>
          </div>

          <div className="p-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-700">Contrato Fijo Anual</span>
              <span className="text-[10px] text-gray-400">Sujeto a renovación formal</span>
            </div>
            <button 
              onClick={() => setHasContract(!hasContract)}
              className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${hasContract ? 'bg-[#1F4E5F]' : 'bg-gray-200'}`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hasContract ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Right Output */}
        <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-xl relative overflow-hidden">
          {/* Circular progress simulated */}
          <div className="text-center mb-3">
            <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider block">Score de Probabilidad</span>
            
            <div className="relative inline-flex items-center justify-center p-2 mt-2">
              {/* Giant number */}
              <div className="text-center">
                <span className="text-3xl font-extrabold font-mono text-gray-800">{riskResult.score}%</span>
                <span className={`block text-[11px] font-bold ${riskResult.textColor} px-2 py-0.5 rounded-full mt-1 ${riskResult.bgColor} border ${riskResult.border}`}>
                  {riskResult.description}
                </span>
              </div>
            </div>
          </div>

          {/* Quick bar representation */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <div 
              style={{ width: `${riskResult.score}%` }} 
              className={`h-2 rounded-full transition-all duration-300 ${riskResult.color}`} 
            />
          </div>

          {/* Recommended action playbook */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-2.5">
            <div className="flex gap-1.5 text-[11px] font-bold text-gray-700 mb-1 items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-600" />
              <span>Estrategia de Retención Recomendada:</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed font-sans">{riskResult.actionPlaybook}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. LEAD SCORING SIMULATOR
// ==========================================
export function LeadScoringSimulator() {
  const [pageViews, setPageViews] = useState<number>(5);
  const [downloadedAsset, setDownloadedAsset] = useState<boolean>(false);
  const [companySize, setCompanySize] = useState<'SMB' | 'MID' | 'ENTERPRISE'>('MID');
  const [hasBusinessEmail, setHasBusinessEmail] = useState<boolean>(true);

  const scoring = useMemo(() => {
    let score = 10; // base score

    // Behavioural score
    score += Math.min(30, pageViews * 4); // each page is 4 points up to 30
    if (downloadedAsset) score += 20;

    // Firmographic score
    if (companySize === 'ENTERPRISE') score += 30;
    else if (companySize === 'MID') score += 15;
    else score += 5;

    // Email authenticity score
    if (hasBusinessEmail) score += 15;
    else score -= 10;

    // Clamp score
    const finalScore = Math.max(0, Math.min(100, score));

    let tier: 'A' | 'B' | 'C' | 'D' = 'D';
    let action = 'Noregistrado / Descartar';
    let labelColor = 'bg-gray-100 text-gray-700 border-gray-200';

    if (finalScore >= 75) {
      tier = 'A';
      action = 'Derivar de inmediato a Account Executive para llamada inmediata (Alta Prioridad)';
      labelColor = 'bg-red-50 text-red-700 border-red-200';
    } else if (finalScore >= 50) {
      tier = 'B';
      action = 'Planificar secuencia drip de automatización de correos de Producto en ActiveCampaign';
      labelColor = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (finalScore >= 25) {
      tier = 'C';
      action = 'Nutrir lead agregando en lista de newsletter científico e invitaciones a webinars';
      labelColor = 'bg-blue-50 text-blue-700 border-blue-200';
    } else {
      tier = 'D';
      action = 'Monitorear pasivamente. Marcar como lead frío pre-recalificación.';
      labelColor = 'bg-stone-50 text-stone-600 border-stone-200';
    }

    return { score: finalScore, tier, action, labelColor };
  }, [pageViews, downloadedAsset, companySize, hasBusinessEmail]);

  return (
    <div className="p-5 font-sans bg-[#FBFBFA] border border-gray-100 rounded-2xl">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-[#1F4E5F] mb-1">
          <Clock className="w-3 h-3" /> Predictive Scoring Algorithm
        </span>
        <h4 className="text-sm font-semibold text-gray-800">Calificador Inteligente de Prospectos Comerciales</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Form controls */}
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-gray-100">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Páginas Web Visitadas (30 d)</span>
              <span className="font-mono text-gray-700 font-bold">{pageViews} vistas</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={pageViews} 
              onChange={(e) => setPageViews(parseInt(e.target.value))}
              className="w-full accent-blue-900 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <span className="text-xs text-gray-600">Descargó Sandbox / Whitepaper</span>
            <input 
              type="checkbox" 
              checked={downloadedAsset}
              onChange={() => setDownloadedAsset(!downloadedAsset)}
              className="rounded text-blue-950 focus:ring-blue-900 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-50">
            <span className="text-xs text-gray-600">Correo Electrónico Corporativo</span>
            <input 
              type="checkbox" 
              checked={hasBusinessEmail}
              onChange={() => setHasBusinessEmail(!hasBusinessEmail)}
              className="rounded text-[#1F4E5F] focus:ring-[#1F4E5F] w-4 h-4 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Tamaño de la Organización</label>
            <div className="grid grid-cols-3 gap-1">
              {(['SMB', 'MID', 'ENTERPRISE'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setCompanySize(size)}
                  className={`text-[10px] font-bold py-1 px-2 border rounded-md transition-all ${
                    companySize === size 
                      ? 'bg-[#1F4E5F] text-white border-transparent' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {size === 'SMB' ? 'Pequeña' : size === 'MID' ? 'Mediana' : 'Enterprise'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="bg-[#1F4E5F] text-white p-4 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-gray-300 font-mono tracking-wider uppercase">Calificación Algorítmica</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${scoring.labelColor.includes('red-50') ? 'bg-red-500 text-white' : scoring.labelColor.includes('amber-50') ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}`}>
                TIER {scoring.tier}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold font-mono text-white">{scoring.score}</span>
              <span className="text-xs text-gray-300">puntos (Lead Score)</span>
            </div>

            <p className="text-[11px] text-gray-100 leading-relaxed font-light mb-4">
              Puntaje paramétrico obtenido cruzando eventos comportamentales en tiempo real (visitas, descargas) con metadatos de enriquecimiento de perfil LinkedIn y Clearbit.
            </p>
          </div>

          <div className="bg-[#10303c] rounded-lg p-2.5 border border-[#23586b]">
            <span className="text-[9px] text-[#A4B3B6] block font-semibold uppercase tracking-wider mb-1">Acción Inmediata (Workflow)</span>
            <div className="flex items-start gap-1">
              <ChevronRight className="w-3.5 h-3.5 text-[#5B7C6D] shrink-0 mt-0.5" />
              <p className="text-[10px] text-white leading-tight">{scoring.action}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. FUNNEL OPTIMIZER
// ==========================================
export function FunnelSimulator() {
  const [visitors, setVisitors] = useState<number>(20000);
  const [rateStep1, setRateStep1] = useState<number>(45); // Visitors to Signups %
  const [rateStep2, setRateStep2] = useState<number>(30); // Signups to Activation %
  const [rateStep3, setRateStep3] = useState<number>(15); // Activation to Cohort Purchase %

  const funnelValues = useMemo(() => {
    const step1Qty = Math.round(visitors * (rateStep1 / 100));
    const step2Qty = Math.round(step1Qty * (rateStep2 / 100));
    const finalQty = Math.round(step2Qty * (rateStep3 / 100));
    
    const revenue = finalQty * 85; // $85 average order value

    return {
      step1Qty,
      step2Qty,
      finalQty,
      revenue
    };
  }, [visitors, rateStep1, rateStep2, rateStep3]);

  return (
    <div className="p-5 font-sans bg-[#FBFBFA] border border-gray-100 rounded-2xl">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 mb-1">
          <TrendingRight className="w-3 h-3" /> Growth Hacking Analytics
        </span>
        <h4 className="text-sm font-semibold text-gray-800">Modelador de Conversión e Impacto Comercial</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Inputs */}
        <div className="space-y-3.5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">Tráfico Inicial de Visitas</span>
              <span className="font-mono text-gray-800 font-bold">{visitors.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="100000" 
              step="5000"
              value={visitors} 
              onChange={(e) => setVisitors(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Registro Completo (Paso 1)</span>
              <span className="font-mono text-indigo-700 font-bold">{rateStep1}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="90" 
              value={rateStep1} 
              onChange={(e) => setRateStep1(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Onboarding Activado (Paso 2)</span>
              <span className="font-mono text-indigo-700 font-bold">{rateStep2}%</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="90" 
              value={rateStep2} 
              onChange={(e) => setRateStep2(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Upgrade de Pago (Paso 3)</span>
              <span className="font-mono text-indigo-700 font-bold">{rateStep3}%</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="60" 
              value={rateStep3} 
              onChange={(e) => setRateStep3(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Funnel Viz */}
        <div className="bg-white p-4 border border-gray-100 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block mb-3 text-center">Embudo Reductor y Fugas de Tráfico</span>

          <div className="space-y-2 flex-grow flex flex-col justify-center">
            {/* Step 1: Visitantes */}
            <div className="flex items-center gap-2">
              <span className="w-16 text-[10px] text-gray-400 text-right font-mono self-center">Visitas:</span>
              <div className="flex-1 bg-gray-100 h-6 rounded relative flex items-center pl-3 overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#1F4E5F]/70 h-full w-full opacity-60" />
                <span className="text-[10px] text-gray-800 font-bold font-mono z-10">{visitors.toLocaleString()}</span>
              </div>
            </div>

            {/* Step 2: Registros */}
            <div className="flex items-center gap-2">
              <span className="w-16 text-[10px] text-gray-400 text-right font-mono self-center">Registrar ({rateStep1}%):</span>
              <div className="flex-1 bg-gray-100 h-6 rounded relative flex items-center pl-3 overflow-hidden">
                <div 
                  style={{ width: `${rateStep1}%` }} 
                  className="absolute top-0 left-0 bg-[#1F4E5F]/80 h-full transition-all duration-300 opacity-75" 
                />
                <span className="text-[10px] text-gray-800 font-bold font-mono z-10">{funnelValues.step1Qty.toLocaleString()}</span>
              </div>
            </div>

            {/* Step 3: Activación */}
            <div className="flex items-center gap-2">
              <span className="w-16 text-[10px] text-gray-400 text-right font-mono self-center">Activo ({rateStep2}%):</span>
              <div className="flex-1 bg-gray-100 h-6 rounded relative flex items-center pl-3 overflow-hidden">
                <div 
                  style={{ width: `${rateStep1 * (rateStep2 / 100)}%` }} 
                  className="absolute top-0 left-0 bg-[#1F4E5F] h-full transition-all duration-300 opacity-90" 
                />
                <span className="text-[10px] text-gray-800 font-bold font-mono z-10">{funnelValues.step2Qty.toLocaleString()}</span>
              </div>
            </div>

            {/* Step 4: Compra */}
            <div className="flex items-center gap-2">
              <span className="w-16 text-[10px] text-gray-400 text-right font-mono self-center">Pagado ({rateStep3}%):</span>
              <div className="flex-1 bg-gray-100 h-6 rounded relative flex items-center pl-3 overflow-hidden">
                <div 
                  style={{ width: `${rateStep1 * (rateStep2 / 100) * (rateStep3 / 100)}%` }} 
                  className="absolute top-0 left-0 bg-[#5B7C6D] h-full transition-all duration-300" 
                />
                <span className="text-[10px] text-emerald-900 font-bold font-mono z-10">{funnelValues.finalQty.toLocaleString()} clientes</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-4 pt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Facturación Estimada ($85/AOV):</span>
            <span className="text-lg font-bold font-mono text-[#5B7C6D]">${funnelValues.revenue.toLocaleString()} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingRight(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

// ==========================================
// 5. RUNWAY SIMULATOR
// ==========================================
export function RunwaySimulator() {
  const [cashBalance, setCashBalance] = useState<number>(85000);
  const [monthlyBurn, setMonthlyBurn] = useState<number>(12000);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(4000);

  const runwayStats = useMemo(() => {
    const netBurn = monthlyBurn - monthlyRevenue;
    
    if (netBurn <= 0) {
      return {
        runway: Infinity,
        label: "Infinito (Rentable)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-100",
        barColor: "bg-emerald-500",
        advice: "El ingreso supera o iguala al egreso. Flujo de caja positivo (Default Alive). Concentrarse en escalar la retención y la captación estratégica."
      };
    }

    const months = parseFloat((cashBalance / netBurn).toFixed(1));
    let label = `${months} meses`;
    let color = "text-emerald-700 bg-[#5B7C6D]/15 border-[#5B7C6D]/30";
    let barColor = "bg-[#5B7C6D]";
    let advice = "Runway saludable. Permite realizar experimentos de adopción de producto y canalizar inversiones de infraestructura con solvencia.";

    if (months < 6) {
      label = `${months} meses (ZONA CRÍTICA)`;
      color = "text-red-700 bg-red-100 border-red-200";
      barColor = "bg-red-500";
      advice = "Peligro: Runway menor a un semestre. Se requiere recortar costos redundantes (-15%), rediseñar el paywall del producto para acelerar cobros o buscar puente de capital rápido.";
    } else if (months < 12) {
      label = `${months} meses (Alerta Moderada)`;
      color = "text-amber-700 bg-amber-100 border-amber-200";
      barColor = "bg-amber-500";
      advice = "Precaución: Diseñar plan de retención inmediato. Frenar contrataciones no prioritarias y ajustar presupuestos de marketing pagado ineficientes.";
    }

    return { runway: months, label, color, barColor, advice };
  }, [cashBalance, monthlyBurn, monthlyRevenue]);

  return (
    <div className="p-5 font-sans bg-[#FBFBFA] border border-gray-100 rounded-2xl">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-stone-700 mb-1">
          <Briefcase className="w-3 h-3" /> Financial Analysis Planning
        </span>
        <h4 className="text-sm font-semibold text-gray-800">Simulador de Proyecciones Financieras y Meses de Runway</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left sliders */}
        <div className="space-y-3.5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Caja Disponible Actual</span>
              <span className="font-mono text-gray-800 font-bold">${cashBalance.toLocaleString()} USD</span>
            </div>
            <input 
              type="range" 
              min="20000" 
              max="250000" 
              step="5000"
              value={cashBalance} 
              onChange={(e) => setCashBalance(parseInt(e.target.value))}
              className="w-full accent-stone-700 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Egresos Mensuales (Burn Rate)</span>
              <span className="font-mono text-red-600 font-bold">${monthlyBurn.toLocaleString()} USD</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="40000" 
              step="1000"
              value={monthlyBurn} 
              onChange={(e) => setMonthlyBurn(parseInt(e.target.value))}
              className="w-full accent-red-500 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Ingresos Mensuales</span>
              <span className="font-mono text-emerald-600 font-bold">${monthlyRevenue.toLocaleString()} USD</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="35000" 
              step="1000"
              value={monthlyRevenue} 
              onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="bg-white p-4 border border-gray-100 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block text-center mb-1">Sustentabilidad de Operaciones</span>
            
            <div className="text-center py-2">
              <span className="text-xs text-gray-400 block font-medium">Límite Estimado de Vida Operacional</span>
              <div className={`mt-2 inline-block px-3 py-1 text-sm font-bold rounded-full border ${runwayStats.color}`}>
                {runwayStats.label}
              </div>
            </div>

            {/* Progress representation */}
            <div className="text-[10px] text-gray-400 font-mono flex justify-between mb-1">
              <span>Nivel Crítico</span>
              <span>Óptimo (12+m)</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
              <div 
                style={{ 
                  width: `${Math.min(100, runwayStats.runway === Infinity ? 100 : (runwayStats.runway / 18) * 100)}%` 
                }}
                className={`h-full transition-all duration-300 ${runwayStats.barColor}`}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
            <span className="text-[9px] text-gray-500 block font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-500" /> Diagnóstico Financiero de Control
            </span>
            <p className="text-[10px] text-gray-500 leading-normal">{runwayStats.advice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
