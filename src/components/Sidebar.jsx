import React, { useState, useCallback } from "react";
// src/components/Sidebar.jsx
// Sidebar “hover-reveal”:
// - Siempre oculto (solo queda una franja de 12px para hover).
// - Al pasar el mouse, se desliza hacia adentro.
// - Filtra opciones según el rol (admin/employee).

export default function Sidebar({ active, onSelect, role }) {
  const menuItems = [
    { key: "productos", label: "Productos" },
    { key: "compras",   label: "Compras"   },
    ...(role === "admin"
      ? [
          { key: "empleados", label: "Empleados" },
          { key: "alertas",   label: "Alertas"   },
        ]
      : []),
  ];

  return (
    // El contenedor ocupa el ancho del “borde” (lo define el padre, w-3).
    // Usamos absolute + translate para desplegar el panel sobre el main.
    <aside className="group relative h-full">
      {/* Zona de hover (toma el ancho del contenedor padre, ej. w-3) */}
      <div
        className="absolute inset-y-0 inset-x-0 z-20 cursor-pointer"
        aria-hidden="true"
      />

      {/* Panel deslizante */}
      <div
        className="
          pointer-events-none
          absolute inset-y-0 left-0 z-30
          w-[260px]
          -translate-x-[248px]
          group-hover:translate-x-0
          transition-transform duration-200 ease-out
        "
      >
        <nav
          className="
            pointer-events-auto
            h-full w-[260px]
            bg-slate-900 text-white
            border-r border-slate-800
            shadow-xl
            px-3 py-4
          "
        >
          <div className="mb-3 text-xs uppercase tracking-wider text-slate-400/80">
            Menú
          </div>

          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => onSelect(item.key)}
                  className={`w-full text-left rounded-md px-3 py-2 transition
                    ${
                      active === item.key
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-slate-800/60"
                    }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Sombra de borde para sensación de profundidad al desplegar */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-2 bg-gradient-to-r from-black/20 to-transparent" />
        </nav>
      </div>
    </aside>
  );
}
