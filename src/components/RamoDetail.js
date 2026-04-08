import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, TrendingUp } from 'lucide-react';

export default function RamoDetail({ ramo, onBack, onAddNota, eliminarNota, calcularPromedio, calcularProgresoPeso }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        Volver al Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-3 h-3 rounded-full ${ramo.color}`}></span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Materia Seleccionada</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">{ramo.nombre}</h2>
        </div>
        <button 
          onClick={onAddNota}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl transition-all shadow-xl shadow-purple-500/25 font-bold uppercase text-xs tracking-widest"
        >
          <Plus size={20} /> Añadir Nota
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
          <div className="flex items-center gap-2 mb-8 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
            <TrendingUp size={16} /> Registro de Calificaciones
          </div>
          <table className="w-full text-left">
            <thead className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/10">
              <tr>
                <th className="pb-4">Evaluación</th>
                <th className="pb-4 text-center">Nota</th>
                <th className="pb-4 text-center">Peso</th>
                <th className="pb-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {ramo.notas.length > 0 ? ramo.notas.map(n => (
                <tr key={n.id} className="border-b border-white/5 group">
                  <td className="py-5 font-bold text-white">{n.nombre}</td>
                  <td className="py-5 text-center font-black text-2xl text-purple-400 italic">{n.nota.toFixed(1)}</td>
                  <td className="py-5 text-center text-slate-500 font-mono">{n.peso}%</td>
                  <td className="py-5 text-right">
                    <button onClick={() => eliminarNota(n.id)} className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="py-20 text-center text-slate-500 italic font-medium">No hay registros</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-10 rounded-[50px] bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 flex flex-col items-center text-center shadow-2xl h-fit">
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-4">Promedio Final</p>
          <h3 className="text-8xl font-black text-white italic tracking-tighter mb-4">{calcularPromedio(ramo.notas)}</h3>
          <div className="w-full h-2 bg-black/20 rounded-full mt-4 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${calcularProgresoPeso(ramo.notas)}%` }} className="h-full bg-white shadow-[0_0_15px_white]" />
          </div>
          <p className="text-[10px] text-slate-500 mt-4 font-bold uppercase tracking-widest">{calcularProgresoPeso(ramo.notas)}% Evaluado</p>
        </div>
      </div>
    </motion.div>
  );
}