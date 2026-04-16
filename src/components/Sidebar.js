import React from 'react';
import { LayoutDashboard, Calendar, LogOut, ChevronDown, Map, Clock, Calculator } from 'lucide-react';

export default function Sidebar({ 
  view, 
  setView, 
  onLogout, 
  malla, 
  semestreActivo, 
  setSemestreActivo, 
  ramosSeleccionados, 
  toggleRamo,
  onOpenCalculadora // CORRECCIÓN: Se añade esta prop para que el botón funcione
}) {
  return (
    <aside className="w-20 md:w-64 border-r border-white/10 bg-[#0f172a]/80 backdrop-blur-md flex flex-col p-4 z-20 h-full overflow-y-auto custom-scrollbar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8 font-bold text-white uppercase italic shrink-0">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">UC</div>
        <span className="hidden md:block tracking-tighter text-xl">Académico</span>
      </div>
      
      {/* Navegación Principal */}
      <nav className="space-y-2 mb-10 shrink-0">
        <SidebarItem 
          icon={<LayoutDashboard size={20} />} 
          label="Inicio" 
          active={view === 'dashboard'} 
          onClick={() => setView('dashboard')} 
        />
        <SidebarItem 
          icon={<Clock size={20} />} 
          label="Horario" 
          active={view === 'horario'} 
          onClick={() => setView('horario')} 
        />
        <SidebarItem 
          icon={<Calendar size={20} />} 
          label="Calendario" 
          active={view === 'calendario'} 
          onClick={() => setView('calendario')} 
        />
        <SidebarItem
          icon={<Map size={20} />}
          label="Malla"
          active={view === 'malla'}
          onClick={() => setView('malla')}
        />
        {/* Botón del Simulador */}
        <SidebarItem 
          icon={<Calculator size={20} />} 
          label="Simulador" 
          active={false} 
          onClick={onOpenCalculadora} 
        />
      </nav>

      {/* Sección de Selección de Ramos */}
      <div className="hidden md:flex flex-col flex-1 min-h-0">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
          Gestión de Ramos
        </p>
        
        {/* Selector de Semestre */}
        <div className="relative mb-6 px-2 shrink-0">
          <select 
            value={semestreActivo}
            onChange={(e) => setSemestreActivo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-slate-300 appearance-none outline-none focus:border-purple-500 transition-all cursor-pointer"
          >
            {Object.keys(malla).map(sem => (
              <option key={sem} value={sem} className="bg-[#1e293b] text-white">{sem}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-5 top-3.5 text-slate-500 pointer-events-none" />
        </div>

        {/* Lista de Ramos con Scroll Minimalista */}
        <div className="space-y-1 px-1 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {malla[semestreActivo]?.map(ramo => {
            const isSelected = ramosSeleccionados.includes(ramo.id);
            return (
              <button
                key={ramo.id}
                onClick={() => toggleRamo(ramo.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all text-left group border ${
                  isSelected 
                  ? 'bg-purple-600/20 text-white border-purple-500/30 shadow-lg shadow-purple-900/10' 
                  : 'text-slate-500 hover:bg-white/5 border-transparent hover:text-slate-300'
                }`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${ramo.color} ${isSelected ? 'shadow-[0_0_10px_currentColor] scale-110' : 'opacity-30'}`} />
                <span className="text-[11px] font-bold leading-tight truncate">
                  {ramo.nombre}
                </span>
                {isSelected && (
                  <div className="ml-auto w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_5px_#a855f7] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón Salir */}
      <div className="mt-auto pt-6 border-t border-white/5 shrink-0">
        <SidebarItem 
          icon={<LogOut size={20} />} 
          label="Salir" 
          onClick={onLogout} 
        />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
        active 
        ? 'bg-purple-600 text-white shadow-xl shadow-purple-500/20' 
        : 'text-slate-500 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className={active ? 'scale-110' : 'scale-100'}>{icon}</div>
      <span className="hidden md:block font-bold text-xs uppercase tracking-widest">
        {label}
      </span>
    </button>
  );
}