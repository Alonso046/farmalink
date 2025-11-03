import React, { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import { Productos, Compras, Empleados, Alertas } from "./sections";

// Usuarios disponibles (mock login)
const USERS = {
  "Administrador@gmail.com": { password: "adm123", role: "admin" },
  "Empleado@gmail.com": { password: "empleado123", role: "employee" },
};

// Formulario de inicio de sesión
function LoginPanel({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const u = USERS[email?.trim()];
    if (u && u.password === pass) {
      onLogin({ email, role: u.role });
    } else {
      setErr("Correo o contraseña inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--app-bg)] text-[var(--app-fg)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-700/40 bg-slate-900/60 p-6 shadow-lg"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">FarmaLink — Iniciar sesión</h1>

        <label className="text-sm mb-1 block">Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 outline-none"
          placeholder="usuario@dominio.cl"
          required
        />

        <label className="text-sm mb-1 block">Contraseña</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full mb-3 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 outline-none"
          placeholder="••••••••"
          required
        />

        {err && <p className="text-red-400 text-sm mb-3">{err}</p>}

        <button
          type="submit"
          className="w-full rounded-md border border-indigo-500/60 bg-indigo-600/90 px-3 py-2 font-medium hover:bg-indigo-600"
        >
          Entrar
        </button>

        <div className="mt-4 text-xs text-slate-400">
          Admin: Administrador@gmail.com / adm123 <br />
          Empleado: Empleado@gmail.com / empleado123
        </div>
      </form>
    </div>
  );
}

// ErrorBoundary (para evitar caídas de render)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("App render error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, background: "#fef2f2", color: "#7f1d1d" }}>
          <h1 style={{ marginTop: 0 }}>Se rompió el render 😵‍💫</h1>
          <p>
            <strong>Error:</strong>{" "}
            {this.state.error?.message || String(this.state.error)}
          </p>
          <p style={{ color: "#991b1b" }}>
            Revisa la consola del navegador (F12 → Console) para más detalle.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Secciones disponibles
const SECTIONS = {
  productos: Productos,
  compras: Compras,
  empleados: Empleados,
  alertas: Alertas,
};

// Dashboard de inventario
function InventoryDashboard() {
  const StatCard = ({ value, label, tone = "amber" }) => {
    const tones = {
      amber: { border: "border-amber-600/40", bg: "bg-amber-500/10", number: "text-amber-300", sub: "text-amber-300/80" },
      orange: { border: "border-orange-600/40", bg: "bg-orange-500/10", number: "text-orange-300", sub: "text-orange-300/80" },
      red: { border: "border-red-700/40", bg: "bg-red-500/10", number: "text-red-300", sub: "text-red-300/80" },
    };
    const c = tones[tone] ?? tones.amber;
    return (
      <div className={["rounded-xl border", c.border, c.bg, "px-5 py-4"].join(" ")} >
        <div className={["text-2xl font-semibold", c.number].join(" ")}>{value}</div>
        <div className={["mt-2 text-xs", c.sub].join(" ")}>{label}</div>
      </div>
    );
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-6 text-indigo-400">Dashboard de Inventario</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard value={1} label="Stock Bajo" tone="amber" />
        <StatCard value={1} label="Por Vencer" tone="orange" />
        <StatCard value={2} label="Vencidos" tone="red" />
      </div>
    </div>
  );
}

// Botones y modo oscuro
function ThemeToggle() {
  const [mode, setMode] = React.useState(() =>
    document.documentElement.classList.contains("light") ? "light" : "dark"
  );
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode === "light" ? "light" : "dark");
  }, [mode]);
  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <button onClick={() => setMode("dark")} className="rounded-md px-3 py-1 border">🌙 Oscuro</button>
      <button onClick={() => setMode("light")} className="rounded-md px-3 py-1 border">☀️ Claro</button>
    </div>
  );
}

function HomeButton({ onReset }) {
  return (
    <button
      onClick={onReset}
      className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium
               border-slate-300 bg-white text-slate-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300
               dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 hover:dark:bg-slate-800 dark:focus:ring-slate-600"
      title="Salir de la sección activa"
    >
      🏠
    </button>
  );
}

/* ========== APP PRINCIPAL ========== */
export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("farma_user")) ?? null; } catch { return null; }
  });
  const [section, setSection] = useState("");
  const [menuCollapsed, setMenuCollapsed] = useState(true); // Estado de visibilidad del menú

  const onLogin = (u) => {
    setUser(u);
    sessionStorage.setItem("farma_user", JSON.stringify(u));
  };
  const onLogout = () => {
    setUser(null);
    setSection("");
    sessionStorage.removeItem("farma_user");
  };

  const allowedKeys =
    user?.role === "admin"
      ? ["productos", "compras", "empleados", "alertas"]
      : user?.role === "employee"
      ? ["productos", "compras"]
      : [];

  const safeSection = allowedKeys.includes(section) ? section : allowedKeys[0] ?? "";
  const CurrentView = useMemo(() => SECTIONS[safeSection] ?? (() => null), [safeSection]);

  if (!user) return <LoginPanel onLogin={onLogin} />;

  return (
    <ErrorBoundary>
      <div className="min-h-screen text-[var(--app-fg)] bg-[var(--app-bg)]">

        <header className="fixed inset-x-0 top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur border-b border-slate-200/50 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-3 text-center relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <HomeButton onReset={() => setSection("")} />
              <ThemeToggle />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {user.email} ({user.role})
              </span>
              <button onClick={onLogout} className="rounded-md border px-2 py-1 text-sm">
                Salir
              </button>
            </div>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 m-0">
              FarmaLink
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm m-0">
              Sistema de Gestión de Inventario
            </p>
          </div>
        </header>

        <div className="flex pt-20">
          {/* Sidebar “ninja”: ocupa solo 12px y se despliega sobre el contenido al pasar el mouse */}
          <div className="relative shrink-0 w-3">
            <Sidebar
              active={safeSection}
              onSelect={(key) => allowedKeys.includes(key) && setSection(key)}
              role={user.role}
            />
          </div>
          <main className="flex-1 p-6">
            {safeSection && <InventoryDashboard />}
            <CurrentView />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
