import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ModalNota({ isOpen, onClose, nuevaNota, setNuevaNota, onSave }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} className="relative w-full max-w-md p-10 rounded-[40px] bg-[#1e293b] border border-white/10 shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            <h3 className="text-3xl font-black text-white mb-8 italic uppercase tracking-tighter">Nueva Nota</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descripción</label>
                <input value={nuevaNota.nombre} onChange={(e) => setNuevaNota({...nuevaNota, nombre: e.target.value})} type="text" placeholder="Ej: Certamen 1" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500 mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nota</label>
                  <input value={nuevaNota.nota} onChange={(e) => setNuevaNota({...nuevaNota, nota: e.target.value})} type="number" step="0.1" placeholder="1.0 - 7.0" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500 mt-2" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Peso %</label>
                  <input value={nuevaNota.peso} onChange={(e) => setNuevaNota({...nuevaNota, peso: e.target.value})} type="number" placeholder="%" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500 mt-2" />
                </div>
              </div>
              <button onClick={onSave} className="w-full bg-white text-black font-black py-5 rounded-2xl mt-4 shadow-xl shadow-white/10 transition-all uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98]">
                Guardar Calificación
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}