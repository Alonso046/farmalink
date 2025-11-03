import React from "react";

// Lista de empleados con datos inventados
const empleados = [
  { id: 1, nombre: "Juan", apellido: "Pérez", rut: "12345678-9", edad: 30, actividad: "Disponible" },
  { id: 2, nombre: "María", apellido: "López", rut: "23456789-0", edad: 28, actividad: "En descanso" },
  { id: 3, nombre: "Carlos", apellido: "García", rut: "34567890-1", edad: 35, actividad: "En turno" },
  { id: 4, nombre: "Ana", apellido: "Torres", rut: "45678901-2", edad: 25, actividad: "Disponible" },
  { id: 5, nombre: "Luis", apellido: "Martínez", rut: "56789012-3", edad: 40, actividad: "En turno" },
];

// Componente de Badge para mostrar categorías o actividad
const Pill = ({ children, color }) => (
  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${color} rounded-full`}>
    {children}
  </span>
);

function Empleados() {
  return (
    <div className="p-6">

      
      {/* Card envolviendo la tabla */}
      <div className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-grey-500 bg-[var(--card-bg)] rounded-lg shadow-md p-4">
       <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Lista de Empleados</h2>
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Nombre</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Apellido</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Rut</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Edad</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Actividad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {empleados.map((empleado) => (
              <tr key={empleado.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{empleado.nombre}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100">
                  {empleado.apellido}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{empleado.rut}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{empleado.edad}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {/* Colores para las actividades */}
                  <Pill color={
                    empleado.actividad === "Disponible" 
                    ? "bg-green-100 text-green-800" 
                    : empleado.actividad === "En descanso" 
                    ? "bg-orange-200 text-orange-800" 
                    : "bg-red-300 text-red-800"
                  }>
                    {empleado.actividad}
                  </Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Empleados;
