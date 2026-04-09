import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

export default function MallaCurricular({ malla, aprobados, toggleAprobado, onSelectRamo }) {
  return (
    <div className="space-y-12 pb-20">
      {/* Encabezado con Progreso */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Ruta Académica</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Progreso total de la carrera</p>
        </div>
        <div className="bg-white/5 px-6 py-4 rounded-[25px] border border-white/10 text-right backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-50" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ramos Logrados</p>
          <p className="text-3xl font-black text-emerald-500 italic">
            {aprobados.length} <span className="text-slate-700 not-italic text-lg">/ 63</span>
          </p>
        </div>
      </div>

      {/* Grilla Responsiva */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Object.entries(malla).map(([semestre, ramos]) => (
          <div key={semestre} className="space-y-5">
            <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] pl-2 border-l-2 border-purple-500/30">
              {semestre}
            </h3>
            
            <div className="space-y-3">
              {ramos.map((ramo) => {
                const isAprobado = aprobados.includes(ramo.id);
                
                return (
                  <motion.div
                    key={ramo.id}
                    whileHover={{ x: 4 }}
                    className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      isAprobado 
                      ? 'bg-emerald-500/5 border-emerald-500/20' 
                      : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                    }`}
                  >
                    {/* Lado Izquierdo: Nombre del Ramo (Clic para ver detalle/histórico) */}
                    <div 
                      className="flex-1 cursor-pointer pr-4"
                      onClick={() => onSelectRamo(ramo.id)}
                    >
                      <p className={`text-[11px] font-bold uppercase tracking-tight leading-tight transition-colors ${
                        isAprobado ? 'text-emerald-500/60 line-through' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {ramo.nombre}
                      </p>
                    </div>

                    {/* Lado Derecho: Botón para Tachar (Clic para aprobar) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAprobado(ramo.id);
                      }}
                      className={`shrink-0 p-2 rounded-xl transition-all ${
                        isAprobado 
                        ? 'bg-emerald-500/20 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                        : 'bg-white/5 text-slate-600 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {isAprobado ? <CheckCircle size={18} /> : <Circle size={18} />}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}