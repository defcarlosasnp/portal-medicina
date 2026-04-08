import React from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a] overflow-hidden">
      
      {/* Decoración de fondo: Esferas animadas */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]" 
      />

      {/* Tarjeta de Login */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8 mx-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">Bienvenida</h1>
          <p className="text-slate-400 mt-2">Organiza tus ramos y conquista el semestre</p>
        </div>

        <form className="space-y-6">
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Correo institucional"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-purple-500/50 transition-all duration-300 placeholder:text-slate-500"
            />
          </div>

          <div className="relative group">
            <input 
              type="password" 
              placeholder="Contraseña"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-purple-500/50 transition-all duration-300 placeholder:text-slate-500"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all"
          >
            Comenzar Sesión
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;