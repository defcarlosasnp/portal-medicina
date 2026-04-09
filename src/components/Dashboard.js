import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, CheckCircle2, Circle, Layout } from 'lucide-react';

export default function Dashboard({ ramos, calcularPromedio, onSelectRamo }) {
  const [pendientes, setPendientes] = useState([]);
  const [nuevoP, setNuevoP] = useState("");

  // 1. Cargar pendientes desde Supabase al iniciar
  useEffect(() => {
    fetchPendientes();
  }, []);

  async function fetchPendientes() {
    const { data, error } = await supabase
      .from('tareas') // Usamos la tabla 'tareas' que creamos en Supabase
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      // Mapeamos los datos de la BD a tu formato de objeto
      const formateados = data.map(t => ({
        id: t.id,
        texto: t.texto,
        completado: t.completada
      }));
      setPendientes(formateados);
    }
  }

  // 2. Agregar pendiente a Supabase
  const addP = async (e) => {
    e.preventDefault();
    if (!nuevoP.trim()) return;

    const { data, error } = await supabase
      .from('tareas')
      .insert([{ texto: nuevoP, completada: false }])
      .select();

    if (data) {
      const nuevoObj = { id: data[0].id, texto: data[0].texto, completado: false };
      setPendientes([nuevoObj, ...pendientes]);
      setNuevoP("");
    }
  };

  // 3. Cambiar estado (Check/Uncheck) en Supabase
  const toggleP = async (id, estadoActual) => {
    const { error } = await supabase
      .from('tareas')
      .update({ completada: !estadoActual })
      .eq('id', id);

    if (!error) {
      setPendientes(pendientes.map(p => 
        p.id === id ? { ...p, completado: !estadoActual } : p
      ));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="grid grid-cols-1 lg:grid-cols-3 gap-10"
    >
      {/* Sección Izquierda: Grilla de Ramos */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Mi Semestre</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Gestión de ramos activos</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black text-slate-500 uppercase">Total Ramos</p>
            <p className="text-2xl font-black text-purple-500">{ramos.length}</p>
          </div>
        </div>

        {ramos.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-20 rounded-[40px] border-2 border-dashed border-white/5 bg-white/[0.02]"
          >
            <div className="p-6 rounded-full bg-purple-600/10 text-purple-500 mb-6">
              <Layout size={40} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dashboard Vacío</h3>
            <p className="text-slate-500 text-center max-w-xs text-sm leading-relaxed">
              Selecciona los ramos que estás cursando en el <b>Panel Lateral</b> para empezar a gestionar tus notas.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {ramos.map((ramo) => (
                <motion.div 
                  layout
                  key={ramo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => onSelectRamo(ramo)}
                  className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group shadow-xl relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${ramo.color} opacity-[0.03] blur-3xl`} />
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className={`p-4 rounded-2xl ${ramo.color} bg-opacity-20 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <BookOpen size={28} />
                    </div>
                    <div className="text-right font-black italic">
                      <p className="text-[10px] text-slate-500 uppercase not-italic">Promedio</p>
                      <p className={`text-3xl tracking-tighter ${parseFloat(calcularPromedio(ramo.notas)) >= 4 ? 'text-white' : 'text-red-400'}`}>
                        {calcularPromedio(ramo.notas)}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight leading-tight">
                    {ramo.nombre}
                  </h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Sección Derecha: Panel de Pendientes */}
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-sm h-fit shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
          
          <h3 className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
            Pendientes
            <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-md font-black">
              {pendientes.filter(p => !p.completado).length}
            </span>
          </h3>

          <form onSubmit={addP} className="relative mb-6">
            <input 
              value={nuevoP} 
              onChange={(e) => setNuevoP(e.target.value)}
              type="text" 
              placeholder="Nueva tarea..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-sm outline-none focus:border-purple-500 transition-all text-white placeholder:text-slate-600"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 p-2 bg-purple-600 rounded-xl text-white hover:bg-purple-500 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-purple-900/20"
            >
              <Plus size={20} />
            </button>
          </form>

          <div className="space-y-3">
            {pendientes.map((p) => (
              <motion.div 
                layout
                key={p.id} 
                onClick={() => toggleP(p.id, p.completado)}
                className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${
                  p.completado 
                  ? 'bg-emerald-500/5 border-transparent opacity-40' 
                  : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                {p.completado ? (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-500 shrink-0" />
                )}
                <span className={`text-sm font-medium truncate ${p.completado ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {p.texto}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-[30px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Dato del día</p>
          <p className="text-xs text-slate-400 italic">"Anatomía se gana con repetición y paciencia. ¡Tú puedes!"</p>
        </div>
      </div>
    </motion.div>
  );
}