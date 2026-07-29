import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';
import imgIconWhite from '@/imports/Login/3e00088b67ed5fd0e942543fec21c60951e960e7.png';

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex-shrink-0 h-[60px] flex items-center px-4 justify-between bg-brand" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Brand */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/web-designer')}
      >
        <img src={imgIconWhite} alt="Mantiz icon" className="h-[44px] w-[45px] object-contain" />
        <p className="text-brand-foreground text-[19px] whitespace-nowrap m-0">
          <span style={{ fontWeight: 400 }}>MANTIZ</span>
          <span style={{ fontWeight: 700 }}>{' Web Designer'}</span>
        </p>
      </div>

      {/* Session info + menu */}
      <div className="flex items-center gap-3 relative" ref={menuRef}>
        <div className="flex flex-col items-end">
          <span className="text-brand-foreground text-sm font-semibold">iduque@odb.com</span>
          <span className="text-brand-foreground/60 text-xs font-normal">Administrator (Global)</span>
        </div>
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80 w-[38px] h-[38px] bg-primary flex-shrink-0"
        >
          <span className="text-primary-foreground text-sm font-semibold">IQ</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-[46px] w-52 rounded-xl overflow-hidden z-50 bg-card shadow-elevated border border-border">
            <div className="px-4 py-3 border-b border-border/70">
              <p className="text-foreground text-[13px] font-semibold">iduque@odb.com</p>
              <p className="text-subtle text-[11px]">Administrator (Global)</p>
            </div>
            <button
              onClick={() => { setMenuOpen(false); navigate('/'); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4 text-destructive" />
              <span className="text-destructive text-[13px]">Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
