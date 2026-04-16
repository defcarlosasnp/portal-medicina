import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const BLOQUES = [
  '08:00', '09:40', '11:20', '13:00', '14:40', '16:20', '18:00'
];

export default function Horario() {
  const [clases, setClases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaClase, setNuevaClase] = useState({ nombre: '', dia: 'Lunes', bloque: '08:00' });

  useEffect(() => {
    fetchHorario();
  }, []);

  async function fetchHorario() {
    const { data } = await supabase.from('horario').select('*');
    if (data) setClases(data);
  }

  const guardarClase = async () => {
    const { data } = await supabase.from('horario').insert([{
      nombre_clase: nuevaClase.nombre,
      dia: nuevaClase.dia,
      bloque_inicio: nuevaClase.bloque
    }]).select();
    
    if (data) {
      setClases([...clases, data[0]]);
      setShowModal(false);
      setNuevaClase({ nombre: '', dia: 'Lunes', bloque: '08:00' });
    }
  };

  const eliminarClase = async (id) => {
    await supabase.from('horario').delete().eq('id', id);
    setClases(clases.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Horario Semanal</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Organización de bloques académicos</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-purple-600 p-4 rounded-2xl text-white hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="overflow-x-auto rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-6 border-b border-white/10 bg-white/[0.02]"></th>
              {DIAS.map(dia => (
                <th key={dia} className="p-6 text-slate-500 font-black uppercase text-[10px] tracking-widest border-b border-white/10">
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BLOQUES.map(bloque => (
              <tr key={bloque}>
                <td className="p-6 text-slate-500 font-mono text-[10px] border-r border-white/10 bg-white/[0.01]">
                  {bloque}
                </td>
                {DIAS.map(dia => {
  const clase = clases.find(c => c.dia === dia && c.bloque_inicio.startsWith(bloque));
  return (
    <td key={`${dia}-${bloque}`} className="p-2 border border-white/5 h-32 relative">
      {clase ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-full w-full bg-purple-600/10 border border-purple-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] group transition-all hover:bg-purple-600/20"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-tighter opacity-70">En curso</span>
            <span className="text-xs font-black text-white uppercase leading-tight tracking-tight group-hover:text-purple-300 transition-colors">
              {clase.nombre_clase}
            </span>
          </div>
          
          <button 
            onClick={() => eliminarClase(clase.id)}
            className="self-end p-2 bg-rose-500/10 text-rose-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white"
          >
            <Trash2 size={12} />
          </button>
        </motion.div>
      ) : (
        <div 
          onClick={() => {
            setNuevaClase({ ...nuevaClase, dia, bloque });
            setShowModal(true);
          }}
          className="h-full w-full rounded-2xl border-2 border-dashed border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all cursor-pointer flex items-center justify-center group"
        >
          <Plus size={20} className="text-slate-800 group-hover:text-purple-500/50 transition-colors" />
        </div>
      )}
    </td>
  );
})}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1e293b] p-8 rounded-[40px] border border-white/10 w-full max-w-md">
            <h3 className="text-2xl font-black text-white uppercase italic mb-6">Agendar Bloque</h3>
            <div className="space-y-4">
              <input 
                placeholder="Nombre de la clase..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none"
                value={nuevaClase.nombre}
                onChange={e => setNuevaClase({...nuevaClase, nombre: e.target.value})}
              />
              <div className="flex gap-4">
                <select 
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none"
                  value={nuevaClase.dia}
                  onChange={e => setNuevaClase({...nuevaClase, dia: e.target.value})}
                >
                  {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select 
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none"
                  value={nuevaClase.bloque}
                  onChange={e => setNuevaClase({...nuevaClase, bloque: e.target.value})}
                >
                  {BLOQUES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 text-slate-500 font-bold uppercase text-xs">Cancelar</button>
                <button onClick={guardarClase} className="flex-1 bg-purple-600 p-4 rounded-2xl text-white font-bold uppercase text-xs">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}