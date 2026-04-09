import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function MallaCurricular({ malla, aprobados, toggleAprobado }) {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Ruta Académica</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Progreso total de la carrera</p>
        </div>
        <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase">Aprobados</p>
          <p className="text-2xl font-black text-emerald-500">{aprobados.length} / 63</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(malla).map(([semestre, ramos]) => (
          <div key={semestre} className="space-y-4">
            <h3 className="text-sm font-black text-purple-500 uppercase tracking-[0.2em] pl-2">{semestre}</h3>
            <div className="space-y-2">
              {ramos.map((ramo) => {
                const isAprobado = aprobados.includes(ramo.id);
                return (
                  <motion.div
                    key={ramo.id}
                    onClick={() => toggleAprobado(ramo.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center group ${
                      isAprobado 
                      ? 'bg-emerald-500/10 border-emerald-500/30 opacity-60' 
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className={`text-xs font-bold uppercase tracking-tight ${isAprobado ? 'text-emerald-500 line-through' : 'text-slate-300'}`}>
                      {ramo.nombre}
                    </span>
                    {isAprobado && <CheckCircle size={16} className="text-emerald-500" />}
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