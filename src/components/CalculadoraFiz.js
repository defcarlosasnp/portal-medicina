import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Calculator, Hash } from 'lucide-react';

export default function CalculadoraFiz({ isOpen, onClose }) {
  const [filas, setFilas] = useState([{ id: 1, nota: '', peso: '' }]);
  
  // Estado para el mini-calculador de promedios simples (los 7 controles)
  const [showSubCalc, setShowSubCalc] = useState(false);
  const [subNotas, setSubNotas] = useState(['', '', '']);

  const agregarFila = () => setFilas([...filas, { id: Date.now(), nota: '', peso: '' }]);
  const eliminarFila = (id) => filas.length > 1 && setFilas(filas.filter(f => f.id !== id));
  
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
    return { promedio: sumaProductos.toFixed(2), totalPeso: sumaPesos };
  };

  const promediarSubNotas = () => {
    const validas = subNotas.map(n => parseFloat(n)).filter(n => !isNaN(n));
    if (validas.length === 0) return 0;
    const promedio = validas.reduce((a, b) => a + b, 0) / validas.length;
    
    // Meter el promedio en la primera fila vacía o crear una nueva
    const nuevaFila = { id: Date.now(), nota: promedio.toFixed(1), peso: '' };
    setFilas([...filas, nuevaFila]);
    setShowSubCalc(false);
    setSubNotas(['', '', '']);
  };

  const { promedio, totalPeso } = calcularResultado();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1e293b] border border-white/10 w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Calculator className="text-purple-400" />
              <h3 className="text-xl font-black text-white italic uppercase italic">Simulador UC</h3>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white"><X /></button>
          </div>

          <div className="p-6 space-y-4">
            {/* Botón para abrir el promediador de los 7 controles */}
            <button 
              onClick={() => setShowSubCalc(!showSubCalc)}
              className="w-full py-3 bg-purple-600/10 border border-purple-500/30 rounded-2xl text-purple-400 text-[10px] font-black uppercase tracking-widest hover:bg-purple-600/20 transition-all"
            >
              {showSubCalc ? 'Cerrar Promediador' : '¿Tienes un grupo de notas? (Ejem: 7 controles)'}
            </button>

            {showSubCalc && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="bg-black/20 p-4 rounded-3xl border border-white/5 space-y-3">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">Ingresa tus controles (se promediarán al 100%)</p>
                <div className="grid grid-cols-4 gap-2">
                  {subNotas.map((n, i) => (
                    <input 
                      key={i} type="number" placeholder="Nota"
                      className="bg-white/5 border border-white/10 rounded-xl p-2 text-white text-center text-xs"
                      value={n} onChange={e => {
                        const newSub = [...subNotas];
                        newSub[i] = e.target.value;
                        setSubNotas(newSub);
                      }}
                    />
                  ))}
                  <button onClick={() => setSubNotas([...subNotas, ''])} className="bg-white/5 rounded-xl text-slate-400">+</button>
                </div>
                <button onClick={promediarSubNotas} className="w-full bg-emerald-500/20 text-emerald-500 py-2 rounded-xl text-[10px] font-bold uppercase">Calcular y Usar Promedio</button>
              </motion.div>
            )}

            {/* Filas principales */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {filas.map((f) => (
                <div key={f.id} className="flex gap-2">
                  <input 
                    type="number" placeholder="Nota" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-3 text-white text-center font-bold"
                    value={f.nota} onChange={e => actualizarFila(f.id, 'nota', e.target.value)}
                  />
                  <input 
                    type="number" placeholder="Peso %" 
                    className="w-20 bg-white/5 border border-white/10 rounded-2xl p-3 text-white text-center"
                    value={f.peso} onChange={e => actualizarFila(f.id, 'peso', e.target.value)}
                  />
                  <button onClick={() => eliminarFila(f.id)} className="text-slate-600 hover:text-rose-500"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-[30px] text-center ${parseFloat(promedio) >= 4 ? 'bg-purple-600/20 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'bg-slate-800 border border-white/5'}`}>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tu Promedio Final</p>
              <h4 className="text-5xl font-black text-white italic tracking-tighter">{promedio}</h4>
              <p className="text-[9px] font-bold text-slate-600 uppercase mt-2">Peso acumulado: {totalPeso}%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}