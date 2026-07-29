import { ChevronDown } from 'lucide-react';

/* ── FieldLabel ─────────────────────────────────────────────── */
export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="text-subtle text-[10px] font-bold uppercase tracking-[0.04em]">
      {children}{required && <span className="text-destructive ml-0.5">*</span>}
    </span>
  );
}

/* ── Field wrapper ──────────────────────────────────────────── */
export function Field({
  label, required, children, span,
}: {
  label: string; required?: boolean; children: React.ReactNode; span?: 2 | 3 | 4;
}) {
  const colSpan = span ? `col-span-${span}` : '';
  return (
    <div className={`flex flex-col gap-1 ${colSpan}`}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
    </div>
  );
}

/* ── FieldGrid – 1 to 4 columns ─────────────────────────────── */
export function FieldGrid({ cols, children }: { cols: 1 | 2 | 3 | 4; children: React.ReactNode }) {
  const colClass = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[cols];
  return <div className={`grid ${colClass} gap-x-5 gap-y-3`}>{children}</div>;
}

/* ── Section with titled header ─────────────────────────────── */
export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <div className="px-5 py-2.5 border-b border-border bg-surface">
        <span className="text-foreground text-[11px] font-bold uppercase tracking-[0.06em]">
          {title}
        </span>
      </div>
      <div className="px-5 py-4 bg-card">{children}</div>
    </div>
  );
}

/* ── TextInput ──────────────────────────────────────────────── */
export function TextInput({
  value, onChange, placeholder, readOnly, disabled,
}: {
  value: string; onChange?: (v: string) => void;
  placeholder?: string; readOnly?: boolean; disabled?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-lg px-2.5 h-[32px] text-xs focus:outline-none focus:border-primary transition-colors disabled:cursor-not-allowed text-foreground border
        ${readOnly || disabled ? 'border-border bg-surface' : 'border-input bg-card'}`}
    />
  );
}

/* ── SelectInput ────────────────────────────────────────────── */
export function SelectInput({
  value, options, onChange, placeholder,
}: {
  value: string; options: string[]; onChange?: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={`w-full rounded-lg px-2.5 h-[32px] text-xs appearance-none pr-7 focus:outline-none focus:border-primary transition-colors border border-input bg-card
          ${value ? 'text-foreground' : 'text-subtle'}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 text-subtle" />
    </div>
  );
}

/* ── TextArea ───────────────────────────────────────────────── */
export function TextArea({
  value, onChange, placeholder, readOnly, rows = 4,
}: {
  value: string; onChange?: (v: string) => void;
  placeholder?: string; readOnly?: boolean; rows?: number;
}) {
  return (
    <textarea
      value={value}
      readOnly={readOnly}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-primary transition-colors resize-none text-foreground border
        ${readOnly ? 'border-border bg-surface' : 'border-input bg-card'}`}
    />
  );
}

/* ── Button ─────────────────────────────────────────────────── */
export function Btn({
  variant = 'primary', onClick, children, disabled, type = 'button',
}: {
  variant?: 'primary' | 'ghost' | 'danger';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  const variantClass = {
    primary: 'bg-primary text-primary-foreground border-0',
    ghost:   'bg-transparent text-muted-foreground border border-input',
    danger:  'bg-transparent text-destructive border border-destructive/20',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 h-[32px] text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-40 flex items-center gap-1.5 whitespace-nowrap ${variantClass}`}
    >
      {children}
    </button>
  );
}

/* ── RadioGroup ─────────────────────────────────────────────── */
export function RadioGroup({
  name, value, onChange,
}: {
  name: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-4 h-[32px] items-center">
      {(['SI', 'NO'] as const).map(v => (
        <label key={v} className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === v}
            onChange={() => onChange(v)}
            className="accent-primary w-3.5 h-3.5"
          />
          <span className="text-xs text-foreground">{v}</span>
        </label>
      ))}
    </div>
  );
}
