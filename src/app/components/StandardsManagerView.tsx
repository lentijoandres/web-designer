import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight,
  Search,
  BookOpen,
  Plus,
  Save,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Bell,
  FileText,
  ArrowLeftRight,
  CheckSquare,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface Standard {
  id: number;
  name: string;
}

const standardsList: Standard[] = [
  { id: 13, name: 'PRUEBA' },
  { id: 1,  name: 'a' },
  { id: 2,  name: 'zo' },
  { id: 3,  name: 'test 1' },
  { id: 13, name: 'PRUEBA' },
  { id: 4,  name: 'Mantiz' },
  { id: 5,  name: 'hola' },
  { id: 6,  name: 'Standards' },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.02em]">
      {children}
    </span>
  );
}

function TextInput({ value, onChange }: { value: string; onChange?: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className="w-full border border-input rounded-lg px-2.5 h-[32px] text-xs focus:outline-none focus:border-primary transition-colors bg-card text-foreground"
    />
  );
}

function SelectInput({ value, options }: { value: string; options: string[] }) {
  return (
    <div className="relative w-full">
      <select
        defaultValue={value}
        className="w-full border border-input rounded-lg px-2.5 h-[32px] text-xs focus:outline-none focus:border-primary transition-colors bg-card appearance-none pr-7 cursor-pointer text-foreground"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle pointer-events-none" />
    </div>
  );
}

function Field({ label, children, span = 1 }: { label: string; children: React.ReactNode; span?: 1 | 2 | 3 }) {
  const spanClass = span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : 'col-span-1';
  return (
    <div className={`flex flex-col gap-1 ${spanClass}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/70">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-surface transition-colors"
      >
        <span className="text-foreground font-semibold text-[13px]">{title}</span>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-subtle" />
          : <ChevronDown className="w-3.5 h-3.5 text-subtle" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function StandardsManagerView() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(4);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState('PRUEBA');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [quantityHL, setQuantityHL] = useState('0');
  const [reqPerExec, setReqPerExec] = useState('0');
  const [maxDays, setMaxDays] = useState('0');
  const [eraseEvery, setEraseEvery] = useState('0');

  const filtered = standardsList.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Breadcrumb + actions */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <button onClick={() => navigate('/web-designer')} className="hover:text-primary transition-colors">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-placeholder" />
          <span className="text-foreground font-medium">Standards Manager</span>
        </nav>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg border border-border bg-card text-muted-foreground flex items-center justify-center hover:bg-surface transition-colors shadow-sm">
            <Save className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg border border-border bg-card text-muted-foreground flex items-center justify-center hover:bg-surface transition-colors shadow-sm">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex mx-6 mb-6 gap-4" style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>

        {/* Sidebar */}
        {sidebarOpen ? (
          <div
            className="flex-shrink-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm"
            style={{ width: 220 }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/70 flex-shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-foreground" />
              <span className="text-foreground text-[11px] font-bold uppercase tracking-[0.06em]">Standards</span>
            </div>

            <div className="px-3 pb-2 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-placeholder" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search standards..."
                  className="w-full pl-7 pr-2 py-1.5 text-xs bg-surface border border-border rounded-lg focus:outline-none focus:border-primary text-foreground placeholder:text-placeholder"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-1.5 pb-1">
              {filtered.map((s, i) => {
                const isSelected = i === selectedIdx;
                return (
                  <button
                    key={`${s.id}-${i}`}
                    onClick={() => setSelectedIdx(i)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${isSelected ? 'bg-primary-muted' : 'hover:bg-surface'}`}
                  >
                    <BookOpen className={`w-[13px] h-[13px] flex-shrink-0 ${isSelected ? 'text-primary' : 'text-subtle'}`} />
                    <span className={`truncate text-xs ${isSelected ? 'text-primary font-semibold' : 'text-foreground font-normal'}`}>
                      {s.name}
                    </span>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-xs text-subtle text-center py-4">Sin resultados</p>
              )}
            </div>

            <div className="flex-shrink-0 border-t border-border/70">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full py-2 flex items-center justify-center text-subtle hover:text-primary hover:bg-surface transition-colors"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-3 bg-card border border-border rounded-xl shadow-sm flex-shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-subtle hover:text-primary hover:bg-surface transition-colors"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main panel */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">

          {/* Record title */}
          <div className="px-5 py-3 border-b border-border/70 flex-shrink-0">
            <span className="text-foreground font-bold text-[17px]">PRUEBA</span>
          </div>

          <div className="flex-1 overflow-y-auto">

            {/* ── Properties ─────────────────────────────────── */}
            <Section title="Properties">
              {/* Row 1 — 3 cols */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Field label="ID">
                  <TextInput value="13" />
                </Field>
                <Field label="Name">
                  <TextInput value={name} onChange={setName} />
                </Field>
                <Field label="Variable">
                  <SelectInput
                    value="Min. Tiempo calendario"
                    options={['Min. Tiempo calendario', 'Max. Tiempo calendario', 'Tiempo promedio']}
                  />
                </Field>
              </div>

              {/* Row 2 — description (2 cols) + actions (1 col) */}
              <div className="grid grid-cols-3 gap-4">
                <Field label="Description" span={2}>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={3}
                    className="w-full border border-input rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-primary transition-colors resize-none text-foreground"
                  />
                </Field>
                <Field label="Actions">
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    {[
                      { icon: Bell,           label: 'Notification' },
                      { icon: FileText,       label: 'Reports' },
                      { icon: ArrowLeftRight, label: 'Change Process' },
                      { icon: CheckSquare,    label: 'Task' },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="flex items-center gap-1.5 px-2.5 h-[28px] rounded-lg border border-border hover:bg-surface transition-colors text-xs text-foreground w-full"
                      >
                        <Icon className="w-3 h-3 text-muted-foreground" />
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </Section>

            {/* ── General Settings ───────────────────────────── */}
            <Section title="General Settings">
              {/* Row 1 */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Field label="Unit Time">
                  <SelectInput value="Minutes" options={['Minutes', 'Hours', 'Days', 'Weeks']} />
                </Field>
                <Field label="Quantity">
                  <TextInput value={quantity} onChange={setQuantity} />
                </Field>
                <Field label="Quantity Higher Level">
                  <TextInput value={quantityHL} onChange={setQuantityHL} />
                </Field>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Field label="Executing User">
                  <SelectInput value="None" options={['None', 'iduque@odb.com', 'admin@mantiz.com']} />
                </Field>
                <Field label="Supervisor">
                  <SelectInput value="None" options={['None', 'iduque@odb.com', 'admin@mantiz.com']} />
                </Field>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-4">
                <Field label="Requests per execution" span={1}>
                  <TextInput value={reqPerExec} onChange={setReqPerExec} />
                </Field>
                <Field label="Max. days for request in standard" span={2}>
                  <TextInput value={maxDays} onChange={setMaxDays} />
                </Field>
              </div>
            </Section>

            {/* ── Standards Log Erasing ──────────────────────── */}
            <Section title="Standards Log Erasing">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Erase every">
                  <TextInput value={eraseEvery} onChange={setEraseEvery} />
                </Field>
                <Field label="Erase final records">
                  <div className="flex items-center h-[32px]">
                    <input type="radio" className="w-3.5 h-3.5 cursor-pointer accent-primary" />
                  </div>
                </Field>
              </div>
            </Section>

            {/* ── Programming ────────────────────────────────── */}
            <Section title="Programming" defaultOpen={false}>
              <p className="text-xs text-subtle">No hay configuración de programación definida.</p>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
