import React, { useMemo, useState } from "react";

/* -----------------------------------------
   Badges y helpers pequeños
----------------------------------------- */
function StatusBadge({ value }) {
  const map = {
    Activo:
      "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-800",
    Inactivo:
      "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-100 dark:border-rose-800",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${map[value] || ""}`}
    >
      {value}
    </span>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-4 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </span>
  );
}

/* -----------------------------------------
   Modal para crear producto
----------------------------------------- */
function AddProductModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    code: "",
    name: "",
    category: "",
    threshold: "",
    status: "Activo",
  });

  const disabled =
    !form.code.trim() ||
    !form.name.trim() ||
    !form.category.trim() ||
    !String(form.threshold).trim();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-lg border border-slate-300 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Nuevo Producto
          </h3>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cerrar
          </button>
        </header>

        <div className="grid gap-3 p-4">
          <label className="grid gap-1">
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Código
            </span>
            <input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-600"
              placeholder="PARA001"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Nombre
            </span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-600"
              placeholder="Paracetamol 500mg"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Categoría
            </span>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-600"
              placeholder="Analgésicos"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Umbral Stock
            </span>
            <input
              type="number"
              min={0}
              value={form.threshold}
              onChange={(e) => setForm({ ...form, threshold: e.target.value })}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-600"
              placeholder="10"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-slate-600 dark:text-slate-300">
              Estado
            </span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-600"
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </label>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3 dark:border-slate-700">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancelar
          </button>
          <button
            disabled={disabled}
            onClick={() => {
              onCreate({
                id: crypto.randomUUID(),
                code: form.code.trim(),
                name: form.name.trim(),
                category: form.category.trim(),
                threshold: Number(form.threshold),
                status: form.status,
              });
              onClose();
            }}
            className={`rounded-md px-3 py-1.5 text-sm text-white ${disabled ? "cursor-not-allowed bg-emerald-400/60" : "bg-emerald-600 hover:bg-emerald-700"}`}
          >
            Crear
          </button>
        </footer>
      </div>
    </div>
  );
}

/* -----------------------------------------
   Vista principal de Productos
----------------------------------------- */
export default function Productos() {
  const [rows, setRows] = useState([
    { id: "1", code: "PARA001", name: "Paracetamol 500mg", category: "Analgésicos", threshold: 10, status: "Activo" },
    { id: "2", code: "AMOX002", name: "Amoxicilina 500mg", category: "Antibióticos", threshold: 15, status: "Activo" },
    { id: "3", code: "VIT003", name: "Vitamina C 1000mg", category: "Vitaminas", threshold: 20, status: "Activo" },
    { id: "4", code: "IBUP004", name: "Ibuprofeno 400mg", category: "Analgésicos", threshold: 8, status: "Inactivo" },
  ]);

  const [query, setQuery] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("Todas");

  const categories = useMemo(() => {
    const set = new Set(rows.map((r) => r.category));
    return ["Todas", ...Array.from(set)];
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return rows.filter((r) => {
      const okQuery = !q || r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
      const okCat = categoryFilter === "Todas" || r.category === categoryFilter;
      return okQuery && okCat;
    });
  }, [rows, query, categoryFilter]);

  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <section className="rounded-lg border border-slate-200 bg-[var(--card-bg)] shadow-sm dark:border-slate-700">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Gestión de Productos
          </h2>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-600"
              title="Filtrar por categoría"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={() => setOpenCreate(true)}
              className="inline-flex h-9 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"
            >
              <span className="text-lg leading-none">+</span>
              <span>Nuevo Producto</span>
            </button>
          </div>
        </header>

        <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos… (código, nombre, categoría)"
              className="w-full rounded-md border border-slate-300 bg-white pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-slate-600"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-blue-50 text-slate-600 dark:bg-blue-800 dark:text-slate-300">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 text-left text-base font-semibold">Código</th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-base font-semibold">Nombre</th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-base font-semibold">Categoría</th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-base font-semibold">Umbral Stock</th>
                <th className="whitespace-nowrap px-6 py-4 text-left text-base font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="whitespace-nowrap px-6 py-4 text-base text-slate-500 dark:text-slate-400">{r.code}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-base font-medium text-slate-800 dark:text-slate-100">
                    {r.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Pill>{r.category}</Pill>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-base text-slate-700 dark:text-slate-200">{r.threshold}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <StatusBadge value={r.status} />
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No se encontraron productos para “{query}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <AddProductModal open={openCreate} onClose={() => setOpenCreate(false)} onCreate={(p) => setRows((cur) => [p, ...cur])} />
    </div>
  );
}
