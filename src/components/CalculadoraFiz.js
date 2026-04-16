import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Calculator } from 'lucide-react';

export default function CalculadoraFiz({ isOpen, onClose }) {
  const [filas, setFilas] = useState([{ id: 1, nota: '', peso: '' }]);

  const agregarFila = () => {
    setFilas([...filas, { id: Date.now(), nota: '', peso: '' }]);
  };

  const eliminarFila = (id) => {
    if (filas.length > 1) setFilas(filas.filter(f => f.id !== id));
  };

  const actualizarFila = (id, campo, valor) => {
    setFilas(filas.map(f => f.id === id ? { ...f, [campo]: valor } : f));
  };

  const calcularResultado = () => {
    let sumaProductos = 0;
    let sumaPesos = 0;

    filas.forEach(f => {
      const n = parseFloat(f.nota);
      const p = parseFloat(f.peso);
      if (!isNaN(n) && !isNaN(p)) {
        sumaProductos += n * (p / 100);
        sumaPesos += p;
      }
    });

    return {
      promedio: sumaProductos.toFixed(2),
      totalPeso: sumaPesos
    };
  };

  const { promedio, totalPeso } = calcularResultado();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[#1e293b] border border-white/10 w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600/20 text-purple-400 rounded-2xl">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Simulador de Notas</h3>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X /></button>
          </div>

          <div className="p-8 space-y-6">
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {filas.map((fila) => (
                <div key={fila.id} className="flex gap-3 items-center">
                  <input 
                    type="number" 
                    placeholder="Nota (Ej: 7.0)" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500 transition-all text-center font-bold"
                    value={fila.nota}
                    onChange={(e) => actualizarFila(fila.id, 'nota', e.target.value)}
                  />
                  <input 
                    type="number" 
                    placeholder="Peso %" 
                    className="w-24 bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500 transition-all text-center"
                    value={fila.peso}
                    onChange={(e) => actualizarFila(fila.id, 'peso', e.target.value)}
                  />
                  <button onClick={() => eliminarFila(fila.id)} className="p-2 text-slate-600 hover:text-rose-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={agregarFila}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-slate-500 hover:text-purple-400 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2 font-bold uppercase text-[10px] tracking-widest"
            >
              <Plus size={16} /> Añadir Evaluación
            </button>

            {/* Resultado Final */}
            <div className={`p-8 rounded-[30px] transition-all duration-500 text-center ${parseFloat(promedio) >= 4 ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-slate-800 border border-white/5'}`}>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Promedio Proyectado</p>
              <h4 className="text-6xl font-black text-white italic tracking-tighter">{promedio}</h4>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-full max-w-[150px] h-1.5 bg-black/20 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-500" style={{ width: `${Math.min(totalPeso, 100)}%` }} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{totalPeso}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}