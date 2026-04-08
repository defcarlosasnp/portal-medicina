'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Trash2, X, Clock } from 'lucide-react';

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventos, setEventos] = useState([
    { id: 1, dia: 15, mes: 3, titulo: 'Solemne Anatomía', tipo: 'Examen' },
    { id: 2, dia: 22, mes: 3, titulo: 'Entrega Química', tipo: 'Laboratorio' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDia, setSelectedDia] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', tipo: 'Examen' });

  const diasSemana = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  const nombreMes = currentDate.toLocaleString('es-ES', { month: 'long' });
  const mesActual = currentDate.getMonth();

  // Lógica para generar los días del mes
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const diasDelMes = Array.from({ length: getDaysInMonth(2026, mesActual) }, (_, i) => i + 1);

  const agregarEvento = () => {
    if (!nuevoEvento.titulo) return;
    const evento = {
      id: Date.now(),
      dia: selectedDia,
      mes: mesActual,
      titulo: nuevoEvento.titulo,
      tipo: nuevoEvento.tipo
    };
    setEventos([...eventos, evento]);
    setNuevoEvento({ titulo: '', tipo: 'Examen' });
    setShowAddModal(false);
  };

  const eliminarEvento = (id) => {
    setEventos(eventos.filter(e => e.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 relative">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Calendario</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Planificación Académica</p>
        </div>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-sm shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-bold text-white capitalize">{nombreMes} 2026</h3>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-slate-400 transition-colors"><ChevronLeft size={20}/></button>
            <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-slate-400 transition-colors"><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {diasSemana.map(d => (
            <div key={d} className="text-center text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">{d}</div>
          ))}
          
          {diasDelMes.map(dia => {
            const evs = eventos.filter(e => e.dia === dia && e.mes === mesActual);
            return (
              <motion.div 
                key={dia} 
                onClick={() => { setSelectedDia(dia); setShowAddModal(true); }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                className={`min-h-[100px] rounded-3xl border border-white/5 p-3 flex flex-col justify-between transition-all cursor-pointer relative ${evs.length > 0 ? 'bg-purple-600/5 border-purple-500/20' : 'bg-white/[0.02]'}`}
              >
                <span className={`text-xs font-bold ${evs.length > 0 ? 'text-purple-400' : 'text-slate-600'}`}>{dia}</span>
                
                <div className="space-y-1 mt-2">
                  {evs.map(e => (
                    <div key={e.id} className="group relative">
                      <div className="text-[9px] font-bold text-white bg-purple-600/40 p-1.5 rounded-lg border border-purple-500/30 truncate">
                        {e.titulo}
                      </div>
                      <button 
                        onClick={(ex) => { ex.stopPropagation(); eliminarEvento(e.id); }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={8} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MODAL PARA AGREGAR EVENTO */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm p-8 rounded-[35px] bg-[#1e293b] border border-white/10 shadow-2xl">
              <h4 className="text-xl font-black text-white mb-6 uppercase italic">Evento para el día {selectedDia}</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Título</label>
                  <input 
                    autoFocus
                    value={nuevoEvento.titulo} 
                    onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
                    placeholder="Ej: Prueba de Histología" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 mt-1" 
                  />
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Categoría</label>
                  <select 
                    value={nuevoEvento.tipo} 
                    onChange={(e) => setNuevoEvento({...nuevoEvento, tipo: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 mt-1 appearance-none"
                  >
                    <option value="Examen">Examen</option>
                    <option value="Laboratorio">Laboratorio</option>
                    <option value="Turno">Turno / Práctica</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <button 
                  onClick={agregarEvento}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs mt-2"
                >
                  Guardar en Agenda
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}