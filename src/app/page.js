'use client'
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Calendario from '../components/Calendario';
import RamoDetail from '../components/RamoDetail';
import ModalNota from '../components/ModalNota';
import Login from '../components/Login';

// --- BASE DE DATOS DE LA MALLA (Sigue completando según la foto) ---
const mallaMedicina = {
  "Semestre 1": [
    { id: 1, nombre: 'Ética y Filosofía de la Medicina', color: 'bg-slate-600' },
    { id: 2, nombre: 'Introducción a la Medicina', color: 'bg-rose-600' },
    { id: 3, nombre: 'Anatomía Humana', color: 'bg-blue-600' },
    { id: 4, nombre: 'Biología Celular', color: 'bg-emerald-600' },
    { id: 5, nombre: 'Química', color: 'bg-purple-600' },
    { id: 6, nombre: 'Matemática y Física', color: 'bg-orange-600' },
    { id: 7, nombre: 'Inglés I', color: 'bg-cyan-600' }
  ],
  "Semestre 2": [
    { id: 8, nombre: 'Técnicas de Info. y Comunicación', color: 'bg-blue-500' },
    { id: 9, nombre: 'Humanización de la Medicina I', color: 'bg-emerald-500' },
    { id: 10, nombre: 'Histología General', color: 'bg-purple-500' },
    { id: 11, nombre: 'Bioquímica', color: 'bg-orange-500' },
    { id: 12, nombre: 'Inglés II', color: 'bg-cyan-500' },
    { id: 13, nombre: 'Electivo Sello', color: 'bg-slate-500' }
  ],
  "Semestre 3": [
    { id: 14, nombre: 'Introducción a la Urgencia', color: 'bg-red-600' },
    { id: 15, nombre: 'Fisiología I', color: 'bg-blue-400' },
    { id: 16, nombre: 'Histología de Sistemas', color: 'bg-purple-400' },
    { id: 17, nombre: 'Humanización de la Medicina II', color: 'bg-emerald-400' },
    { id: 18, nombre: 'Electivo I', color: 'bg-slate-400' },
    { id: 19, nombre: 'Gestión y Técnicas de Enfermería', color: 'bg-cyan-400' },
    { id: 20, nombre: 'Inglés III', color: 'bg-sky-400' }
  ],
  "Semestre 4": [
    { id: 21, nombre: 'Parasitología', color: 'bg-orange-400' },
    { id: 22, nombre: 'Fisiología II', color: 'bg-blue-400' },
    { id: 23, nombre: 'Embriología', color: 'bg-rose-400' },
    { id: 24, nombre: 'Farmacología General', color: 'bg-indigo-400' },
    { id: 25, nombre: 'Metodología de la Investigación', color: 'bg-slate-400' },
    { id: 26, nombre: 'Fisiopatología General', color: 'bg-red-400' },
    { id: 27, nombre: 'Inglés IV', color: 'bg-sky-400' }
  ],
  "Semestre 5": [
    { id: 28, nombre: 'Semiología', color: 'bg-blue-700' },
    { id: 29, nombre: 'Microbiología Clínica', color: 'bg-emerald-700' },
    { id: 30, nombre: 'Fisiopatología Clínica', color: 'bg-red-700' },
    { id: 31, nombre: 'Semiología Neurológica', color: 'bg-indigo-700' },
    { id: 32, nombre: 'Farmacología Clínica', color: 'bg-purple-700' },
    { id: 33, nombre: 'Electivo II', color: 'bg-slate-700' }
  ],
  "Semestre 6": [
    { id: 34, nombre: 'Medicina Interna I', color: 'bg-blue-800' },
    { id: 35, nombre: 'Introducción a la Imagenología', color: 'bg-cyan-700' },
    { id: 36, nombre: 'Anatomía Patológica I', color: 'bg-orange-700' },
    { id: 37, nombre: 'Neurociencias', color: 'bg-violet-700' },
    { id: 38, nombre: 'Cirugía I', color: 'bg-rose-700' }
  ],
  "Semestre 7": [
    { id: 39, nombre: 'Medicina Interna II', color: 'bg-blue-900' },
    { id: 40, nombre: 'Medicina Basada en Evidencia', color: 'bg-slate-600' },
    { id: 41, nombre: 'Fisiatría', color: 'bg-emerald-600' },
    { id: 42, nombre: 'Anatomía Patológica II', color: 'bg-orange-800' },
    { id: 43, nombre: 'Salud Pública', color: 'bg-cyan-800' },
    { id: 44, nombre: 'Neurología', color: 'bg-violet-800' }
  ],
  "Semestre 8": [
    { id: 45, nombre: 'Nutrición', color: 'bg-green-500' },
    { id: 46, nombre: 'Geriatría', color: 'bg-stone-500' },
    { id: 47, nombre: 'Epidemiología', color: 'bg-cyan-600' },
    { id: 48, nombre: 'Ética de la Investigación', color: 'bg-slate-700' },
    { id: 49, nombre: 'Cirugía II', color: 'bg-rose-800' }
  ],
  "Semestre 9": [
    { id: 50, nombre: 'Clínica de Especialidades', color: 'bg-indigo-600' },
    { id: 51, nombre: 'Ginecología y Obstetricia', color: 'bg-pink-600' },
    { id: 52, nombre: 'Medicina Legal', color: 'bg-zinc-700' },
    { id: 53, nombre: 'Psiquiatría Adultos', color: 'bg-violet-600' },
    { id: 54, nombre: 'Ética de la Decisión Médica', color: 'bg-slate-800' }
  ],
  "Semestre 10": [
    { id: 55, nombre: 'Pediatría', color: 'bg-orange-500' },
    { id: 56, nombre: 'Psiquiatría Infantil', color: 'bg-violet-400' },
    { id: 57, nombre: 'Salud Comunitaria', color: 'bg-emerald-500' },
    { id: 58, nombre: 'Administración en Salud', color: 'bg-slate-500' }
  ],
  "Semestre 11 & 12": [
    { id: 59, nombre: 'Internado Medicina Interna', color: 'bg-blue-900' },
    { id: 60, nombre: 'Internado Pediatría', color: 'bg-orange-600' }
  ],
  "Semestre 13 & 14": [
    { id: 61, nombre: 'Internado Cirugía', color: 'bg-rose-900' },
    { id: 62, nombre: 'Internado Ginecología y Obstetricia', color: 'bg-pink-700' },
    { id: 63, nombre: 'Internado Salud Comunitaria', color: 'bg-emerald-700' }
  ]
};

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('dashboard');
  const [selectedRamo, setSelectedRamo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Estados de la Malla
  const [semestreActivo, setSemestreActivo] = useState("Semestre 1");
  const [ramosSeleccionados, setRamosSeleccionados] = useState([1, 2, 3]); // IDs que aparecen en Dashboard
  
  // Estado de todas las notas (Se guardan por ID de ramo)
  const [notasGlobales, setNotasGlobales] = useState({});
  const [nuevaNota, setNuevaNota] = useState({ nombre: '', nota: '', peso: '' });

  // --- LÓGICA DE DATOS ---
  
  // 1. Unimos la info básica de la malla con las notas que el usuario ha ingresado
  const obtenerRamosCompletos = () => {
    return Object.values(mallaMedicina)
      .flat()
      .map(ramo => ({
        ...ramo,
        notas: notasGlobales[ramo.id] || []
      }));
  };

  // 2. Filtramos solo los que ella marcó en el Sidebar para mostrar en el Dashboard
  const ramosVisibles = obtenerRamosCompletos().filter(r => ramosSeleccionados.includes(r.id));

  const toggleRamo = (id) => {
    setRamosSeleccionados(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const calcularPromedio = (listaNotas) => {
    if (!listaNotas || listaNotas.length === 0) return "0.0";
    let suma = 0;
    listaNotas.forEach(n => suma += (parseFloat(n.nota) * (parseFloat(n.peso) / 100)));
    return suma.toFixed(1);
  };

  const calcularProgresoPeso = (listaNotas) => {
    if (!listaNotas) return 0;
    return listaNotas.reduce((acc, n) => acc + parseFloat(n.peso || 0), 0);
  };

  const agregarNota = () => {
    if (nuevaNota.nombre && nuevaNota.nota && nuevaNota.peso && selectedRamo) {
      const notaFinal = { 
        ...nuevaNota, 
        id: Date.now(), 
        nota: parseFloat(nuevaNota.nota), 
        peso: parseFloat(nuevaNota.peso) 
      };
      
      const notasActualesRamo = notasGlobales[selectedRamo.id] || [];
      const nuevasNotasRamo = [...notasActualesRamo, notaFinal];
      
      setNotasGlobales({ ...notasGlobales, [selectedRamo.id]: nuevasNotasRamo });
      
      // Actualizamos el objeto seleccionado para que la vista detalle se refresque
      setSelectedRamo({ ...selectedRamo, notas: nuevasNotasRamo });
      
      setNuevaNota({ nombre: '', nota: '', peso: '' });
      setShowModal(false);
    }
  };

  const eliminarNota = (idNota) => {
    const nuevasNotasRamo = (notasGlobales[selectedRamo.id] || []).filter(n => n.id !== idNota);
    setNotasGlobales({ ...notasGlobales, [selectedRamo.id]: nuevasNotasRamo });
    setSelectedRamo({ ...selectedRamo, notas: nuevasNotasRamo });
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      
      <Sidebar 
        view={view} 
        setView={setView} 
        onLogout={() => setIsLoggedIn(false)}
        malla={mallaMedicina}
        semestreActivo={semestreActivo}
        setSemestreActivo={setSemestreActivo}
        ramosSeleccionados={ramosSeleccionados}
        toggleRamo={toggleRamo}
      />

      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <AnimatePresence mode="wait">
          
          {view === 'dashboard' && !selectedRamo && (
            <Dashboard 
              key="dash" 
              ramos={ramosVisibles} 
              calcularPromedio={calcularPromedio} 
              onSelectRamo={setSelectedRamo} 
            />
          )}

          {view === 'calendario' && <Calendario key="cal" />}

          {selectedRamo && (
            <RamoDetail 
              key="detail"
              ramo={selectedRamo} 
              onBack={() => setSelectedRamo(null)} 
              onAddNota={() => setShowModal(true)}
              eliminarNota={eliminarNota}
              calcularPromedio={calcularPromedio}
              calcularProgresoPeso={calcularProgresoPeso}
            />
          )}

        </AnimatePresence>
      </main>

      <ModalNota 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        nuevaNota={nuevaNota} 
        setNuevaNota={setNuevaNota} 
        onSave={agregarNota} 
      />
    </div>
  );
}