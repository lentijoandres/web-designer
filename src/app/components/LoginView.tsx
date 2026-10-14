import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Monitor } from 'lucide-react';
import imgReactor from '@/imports/Login/e8e738b188bb40258dbfb8828b7a34491870a438.png';
import imgIconWhite from '@/imports/Login/3e00088b67ed5fd0e942543fec21c60951e960e7.png';
import imgLogoBlack from '@/imports/Login/7676dce60824acd20714db99fe10413e52335dd3.png';

const APP_NAME = 'Web Designer';

export default function LoginView() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/web-designer');
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* Top nav bar */}
      <div className="flex-shrink-0 h-[60px] flex items-center px-4 gap-3 bg-brand">
        <img src={imgIconWhite} alt="Mantiz icon" className="h-[44px] w-[45px] object-contain" />
        <p className="text-brand-foreground text-[19px] whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span style={{ fontWeight: 400 }}>MANTIZ</span>
          <span style={{ fontWeight: 700 }}>{` ${APP_NAME}`}</span>
        </p>
      </div>

      {/* Main area — 12-col grid */}
      <div className="flex-1 min-h-0 grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>

        {/* Col 1: left margin */}
        <div />

        {/* Cols 2–6: image */}
        <div className="col-span-5 flex items-center justify-center">
          <img
            src={imgReactor}
            alt="Mantiz Reactor"
            className="object-contain max-h-full max-w-full"
            style={{ maxHeight: '70vh' }}
          />
        </div>

        {/* Cols 7–11: login form */}
        <div className="col-span-5 flex flex-col items-center justify-center px-4">

          <div
            className="flex items-center gap-2 px-5 py-2 rounded-full z-10 bg-primary shadow-glow"
            style={{ marginBottom: -16 }}
          >
            <Monitor className="w-3.5 h-3.5 text-primary-foreground" />
            <span className="text-primary-foreground text-[13px] font-bold whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>
              {APP_NAME}
            </span>
          </div>

          <form
            onSubmit={handleLogin}
            className="w-full max-w-[417px] flex flex-col gap-6 rounded-[10px] border border-border bg-card px-[25px] pt-[33px] pb-[25px]"
          >
            <img src={imgLogoBlack} alt="Mantiz" className="h-[46px] w-[166px] object-contain" />

            <div className="flex flex-col gap-2">
              <label className="text-foreground text-sm font-semibold">
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="usuario@dominio.com"
                className="h-[39px] w-full rounded-[10px] border border-input px-3 text-sm text-foreground font-normal focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-foreground text-sm font-semibold">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-[39px] w-full rounded-[10px] border border-input px-3 pr-10 text-sm text-foreground font-normal focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-foreground/40"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-foreground text-sm font-semibold opacity-50 hover:opacity-80 transition-opacity"
              >
                Olvide mi Contraseña
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-[10px] py-[7px] transition-opacity hover:opacity-90 bg-primary text-primary-foreground text-sm font-semibold"
            >
              Ingresar
            </button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
            MANTIZ 2026 Derechos Reservados
          </p>
        </div>

        {/* Col 12: right margin */}
        <div />
      </div>
    </div>
  );
}
