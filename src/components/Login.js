import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart } from 'lucide-react';

export default function Login({ onLogin }) {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4 bg-[#0f172a]">
      {/* Esferas de luz con colores más intensos para generar contraste detras */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 md:p-12 rounded-[50px] bg-slate-900/40 border border-white/20 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative z-20"
      >
        <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-purple-400 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-500/40">
          <CheckCircle size={40} className="text-white" />
        </div>
        
        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter italic uppercase drop-shadow-md">
          ¡Hola Amor!
        </h1>
        <p className="text-slate-300 mb-10 font-medium">
          Lista para organizar el semestre con estilo <Heart size={16} className="inline text-purple-400 ml-1 fill-purple-400" />
        </p>

        <div className="space-y-6 text-left mb-10">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] ml-2">Usuario</label>
                <input 
                  type="text" 
                  placeholder="Escribe tu nombre..." 
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-slate-600" 
                />
            </div>
        </div>

        <motion.button 
          onClick={onLogin} 
          whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }} 
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-slate-950 font-black py-5 rounded-2xl shadow-lg shadow-black/20 transition-all uppercase tracking-[0.2em] text-xs"
        >
          Entrar al Portal
        </motion.button>
      </motion.div>
    </div>
  );
}