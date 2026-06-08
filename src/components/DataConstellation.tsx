import { useState } from 'react';
import { motion } from 'motion/react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  description: string;
}

const CONST_NODES: Node[] = [
  { id: "database", label: "SQL Warehouse", x: 120, y: 70, color: "#1F4E5F", description: "Esquemas de estrella, CTEs y modelado Snowflake/BigQuery" },
  { id: "etl", label: "Pipeline ETL (dbt)", x: 260, y: 60, color: "#5B7C6D", description: "Orquestación de transformaciones incrementales con control de calidad" },
  { id: "analytics", label: "Product Analytics", x: 210, y: 180, color: "#2c6e8f", description: "Cohortería de usuarios, embudos y tasa de conversión" },
  { id: "ml", label: "Modelos Predictivos (ML)", x: 70, y: 150, color: "#a2a79e", description: "Clasificación de churn, árboles de decisión y scoring" },
  { id: "bi", label: "Dashboards (Power BI / Tableau)", x: 140, y: 260, color: "#5B7C6D", description: "Data storytelling y KPIs ejecutivos unificados" },
  { id: "growth", label: "Crecimiento Financiero (ROI)", x: 320, y: 230, color: "#1F4E5F", description: "Runway, LTV y costo de adquisición (CAC) optimizados" },
];

const CONNECTIONS = [
  { from: "database", to: "etl" },
  { from: "etl", to: "analytics" },
  { from: "database", to: "ml" },
  { from: "analytics", to: "bi" },
  { from: "ml", to: "bi" },
  { from: "bi", to: "growth" },
  { from: "etl", to: "growth" }
];

export default function DataConstellation() {
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900/60 rounded-2xl border border-gray-100 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group">
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

      {/* Header of the visualization card */}
      <div className="z-10 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-wider text-[#1F4E5F] dark:text-sky-400 uppercase font-bold">Mapa Operativo Técnico</span>
          <h5 className="text-xs font-bold text-gray-700 dark:text-slate-300">Grafo de Flujo y Ecosistema de Datos</h5>
        </div>
        <div className="text-[10px] font-mono text-gray-400 dark:text-slate-500">
          Interactuar pasándole el cursor
        </div>
      </div>

      {/* Connection Graph */}
      <div className="flex-1 w-full relative min-h-[170px] flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px]">
          {/* Connection Lines */}
          {CONNECTIONS.map((conn, idx) => {
            const fromNode = CONST_NODES.find(n => n.id === conn.from);
            const toNode = CONST_NODES.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted = activeNode && (activeNode.id === conn.from || activeNode.id === conn.to);

            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isHighlighted ? "#1F4E5F" : "#E2E8F0"}
                strokeWidth={isHighlighted ? 2.5 : 1}
                className="transition-all duration-300 dark:stroke-slate-700"
                strokeDasharray={isHighlighted ? "none" : "3,3"}
              />
            );
          })}

          {/* Connection Nodes */}
          {CONST_NODES.map((node) => {
            const isHovered = activeNode?.id === node.id;
            
            return (
              <g 
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Glow filter underlay */}
                {isHovered && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={18}
                    fill={node.color}
                    opacity={0.2}
                    className="animate-ping"
                  />
                )}
                {/* Outer circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 11 : 7}
                  fill="white"
                  stroke={node.color}
                  strokeWidth={isHovered ? 4.5 : 2.5}
                  className="transition-all duration-300 dark:fill-slate-900"
                />
                
                {/* Text Label */}
                <text
                  x={node.x}
                  y={node.y - 14}
                  textAnchor="middle"
                  className={`text-[10px] font-sans font-semibold tracking-tight transition-all text-neutral-800 dark:text-slate-200 ${
                    isHovered ? 'scale-110 fill-[#1F4E5F] dark:fill-sky-400 font-bold' : ''
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Description Panel */}
      <div className="z-10 h-11 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-100/50 dark:border-slate-800 rounded-xl p-2 flex items-center justify-between text-xs transition-all">
        {activeNode ? (
          <div className="animate-fade-in flex items-center gap-1.5 w-full">
            <span 
              className="w-2.5 h-2.5 rounded-full shrink-0" 
              style={{ backgroundColor: activeNode.color }} 
            />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-800 dark:text-slate-200 mr-1 block sm:inline">{activeNode.label}:</span>
              <span className="text-gray-500 dark:text-slate-400 truncate">{activeNode.description}</span>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 dark:text-slate-500 italic text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
            Pasa el cursor por los nodos para ver el flujo de la infraestructura de datos.
          </div>
        )}
      </div>
    </div>
  );
}
