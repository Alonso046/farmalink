import React from 'react';

// Datos inventados para productos en alerta
const alertas = [
  { id: 1, nombre: "Paracetamol 500mg", categoria: "Analgésicos", estado: "Vencido", fechaVencimiento: "2024-01-10", lote: "A001", descripcion: "Producto vencido, necesita reposición" },
  { id: 2, nombre: "Amoxicilina 500mg", categoria: "Antibióticos", estado: "Por vencer", fechaVencimiento: "2024-02-05", lote: "B002", descripcion: "Cerca de vencer, revisar stock" },
  { id: 3, nombre: "Vitamina C 1000mg", categoria: "Vitaminas", estado: "En stock bajo", fechaVencimiento: "2024-03-15", lote: "C003", descripcion: "El stock está por debajo del umbral" },
  { id: 4, nombre: "Ibuprofeno 400mg", categoria: "Analgésicos", estado: "Vencido", fechaVencimiento: "2023-12-20", lote: "D004", descripcion: "Producto vencido, necesita reposición" },
];

// Log de alertas
const logs = [
  { id: 1, mensaje: "Se venció el lote A001 de Paracetamol 500mg" },
  { id: 2, mensaje: "Se recibió un nuevo lote de Amoxicilina 500mg" },
  { id: 3, mensaje: "Se actualizó el stock de Vitamina C 1000mg" },
  { id: 4, mensaje: "Se venció el lote D004 de Ibuprofeno 400mg" },
];

// Componente de Badge para mostrar colores según estado
const Pill = ({ children, color }) => (
  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${color} rounded-full`}>
    {children}
  </span>
);

function Alertas() {
  return (
    <div className="p-6">
      {/* Card envolviendo la tabla */}
      <div className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-grey-500 bg-[var(--card-bg)] rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Productos en Alerta</h2>
        
        {/* Tabla con los productos */}
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Nombre</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Categoría</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Estado</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Fecha de Vencimiento</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Lote</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold">Descripción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {alertas.map((alerta) => (
              <tr key={alerta.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{alerta.nombre}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100">
                  {alerta.categoria}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {/* Colores según el estado de alerta */}
                  <Pill color={
                    alerta.estado === "Vencido" ? "bg-red-700 text-white" :
                    alerta.estado === "Por vencer" ? "bg-orange-600 text-white" :
                    alerta.estado === "En stock bajo" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
                  }>
                    {alerta.estado}
                  </Pill>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{alerta.fechaVencimiento}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{alerta.lote}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{alerta.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log de alertas */}
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Log de Alertas</h2>
      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        {logs.map((log) => (
          <div key={log.id} className="text-white mb-2">
            <p>{log.mensaje}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alertas;
