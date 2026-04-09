import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, TrendingUp } from 'lucide-react';

export default function RamoDetail({ ramo, onBack, onAddNota, eliminarNota, calcularPromedio, calcularProgresoPeso }) {
  
  // Función para determinar el color de la nota (por debajo de 4.0 es rojo)
  const getNotaColor = (nota) => {
    return nota >= 4.0 ? 'text-purple-400' : 'text-rose-400';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Botón Volver */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors group font-bold uppercase text-[10px] tracking-widest"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Volver al Dashboard
      </button>

      {/* Cabecera del Ramo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-3 h-3 rounded-full ${ramo.color} shadow-[0_0_10px_currentColor]`}></span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Materia Seleccionada</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">{ramo.nombre}</h2>
        </div>
        
        <button 
          onClick={onAddNota}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl transition-all shadow-xl shadow-purple-500/25 font-bold uppercase text-xs tracking-widest active:scale-95"
        >
          <Plus size={20} /> Añadir Nota
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Histórico de Notas (Tabla) */}
        <div className="lg:col-span-2 p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />
          
          <div className="flex items-center gap-2 mb-8 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
            <TrendingUp size={16} /> Registro de Calificaciones
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/10">
                <tr>
                  <th className="pb-4">Evaluación</th>
                  <th className="pb-4 text-center">Nota</th>
                  <th className="pb-4 text-center">Peso</th>
                  <th className="pb-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {ramo.notas && ramo.notas.length > 0 ? ramo.notas.map(n => (
                  <tr key={n.id} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 font-bold text-white uppercase text-sm tracking-tight">{n.nombre}</td>
                    <td className={`py-5 text-center font-black text-3xl italic tracking-tighter ${getNotaColor(n.nota)}`}>
                      {parseFloat(n.nota).toFixed(1)}
                    </td>
                    <td className="py-5 text-center text-slate-500 font-mono text-sm">{n.peso}%</td>
                    <td className="py-5 text-right">
                      <button 
                        onClick={() => eliminarNota(n.id)} 
                        className="p-2 text-slate-600 hover:text-rose-400 transition-all hover:scale-110"
                        title="Eliminar nota"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-slate-500 italic font-medium uppercase text-[10px] tracking-widest">
                      No hay registros en la base de datos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen Promedio */}
        <div className="p-10 rounded-[50px] bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 flex flex-col items-center text-center shadow-2xl h-fit relative overflow-hidden">
          <div className={`absolute -top-10 -right-10 w-32 h-32 ${ramo.color} opacity-10 blur-3xl`} />
          
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-4">Promedio Actual</p>
          <h3 className={`text-8xl font-black italic tracking-tighter mb-4 ${parseFloat(calcularPromedio(ramo.notas)) >= 4 ? 'text-white' : 'text-rose-400'}`}>
            {calcularPromedio(ramo.notas)}
          </h3>

          <div className="w-full h-2 bg-black/40 rounded-full mt-4 overflow-hidden p-[1px]">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${calcularProgresoPeso(ramo.notas)}%` }} 
              className={`h-full rounded-full ${parseFloat(calcularPromedio(ramo.notas)) >= 4 ? 'bg-purple-500' : 'bg-rose-500'} shadow-[0_0_15px_rgba(168,85,247,0.5)]`}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-4 font-bold uppercase tracking-widest">
            {calcularProgresoPeso(ramo.notas)}% de la materia evaluada
          </p>
        </div>
      </div>
    </motion.div>
  );
}