'use client'
import React, { useState, useEffect } from 'react'; // Corregido: añadido useEffect
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase'; // Corregido: añadido supabase

import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Calendario from '../components/Calendario';
import RamoDetail from '../components/RamoDetail';
import ModalNota from '../components/ModalNota';
import Login from '../components/Login';

// --- BASE DE DATOS DE LA MALLA ---
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

  const [semestreActivo, setSemestreActivo] = useState("Semestre 1");
  const [ramosSeleccionados, setRamosSeleccionados] = useState([]);
  const [notasGlobales, setNotasGlobales] = useState({});
  const [nuevaNota, setNuevaNota] = useState({ nombre: '', nota: '', peso: '' });

  // --- 1. CARGA INICIAL DE DATOS DESDE SUPABASE ---
  useEffect(() => {
    const cargarDatos = async () => {
      const { data: ramosBD } = await supabase.from('ramos').select('id_malla');
      if (ramosBD) setRamosSeleccionados(ramosBD.map(r => r.id_malla));

      const { data: notasBD } = await supabase.from('notas').select('*');
      if (notasBD) {
        const notasAgrupadas = {};
        notasBD.forEach(n => {
          if (!notasAgrupadas[n.ramo_id]) notasAgrupadas[n.ramo_id] = [];
          notasAgrupadas[n.ramo_id].push({
            id: n.id,
            nombre: n.nombre,
            nota: n.valor,
            peso: n.ponderacion
          });
        });
        setNotasGlobales(notasAgrupadas);
      }
    };

    if (isLoggedIn) cargarDatos();
  }, [isLoggedIn]);

  // --- 2. LÓGICA DE ACTUALIZACIÓN ---

  const toggleRamo = async (id) => {
    const existe = ramosSeleccionados.includes(id);
    if (existe) {
      await supabase.from('ramos').delete().eq('id_malla', id);
      setRamosSeleccionados(prev => prev.filter(item => item !== id));
    } else {
      await supabase.from('ramos').insert([{ id_malla: id }]);
      setRamosSeleccionados(prev => [...prev, id]);
    }
  };

  const agregarNota = async () => {
    if (nuevaNota.nombre && nuevaNota.nota && nuevaNota.peso && selectedRamo) {
      const { data } = await supabase.from('notas').insert([{
        nombre: nuevaNota.nombre,
        valor: parseFloat(nuevaNota.nota),
        ponderacion: parseInt(nuevaNota.peso),
        ramo_id: selectedRamo.id
      }]).select();

      if (data) {
        const notaNueva = { 
          id: data[0].id, 
          nombre: data[0].nombre, 
          nota: data[0].valor, 
          peso: data[0].ponderacion 
        };
        
        const nuevasNotas = [...(notasGlobales[selectedRamo.id] || []), notaNueva];
        setNotasGlobales({ ...notasGlobales, [selectedRamo.id]: nuevasNotas });
        setSelectedRamo({ ...selectedRamo, notas: nuevasNotas });
        setNuevaNota({ nombre: '', nota: '', peso: '' });
        setShowModal(false);
      }
    }
  };

  const eliminarNota = async (idNota) => {
    const { error } = await supabase.from('notas').delete().eq('id', idNota);
    if (!error) {
      const nuevasNotasRamo = (notasGlobales[selectedRamo.id] || []).filter(n => n.id !== idNota);
      setNotasGlobales({ ...notasGlobales, [selectedRamo.id]: nuevasNotasRamo });
      setSelectedRamo({ ...selectedRamo, notas: nuevasNotasRamo });
    }
  };

  const obtenerRamosCompletos = () => {
    return Object.values(mallaMedicina)
      .flat()
      .map(ramo => ({
        ...ramo,
        notas: notasGlobales[ramo.id] || []
      }));
  };

  const ramosVisibles = obtenerRamosCompletos().filter(r => ramosSeleccionados.includes(r.id));

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