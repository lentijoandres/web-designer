import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Home, ChevronRight, Plus, Search, SlidersHorizontal,
  ClipboardCheck, Globe, LayoutGrid, Database, Play,
  FileText, Zap, Users, ChevronsLeft, ChevronsRight,
} from 'lucide-react';

type TaskType = 'web' | 'form' | 'data' | 'process' | 'document' | 'event' | 'human';

interface Task {
  id: string;
  name: string;
  type: TaskType;
}

const tasks: Task[] = [
  { id: '1', name: 'AI Document Intelligence JM', type: 'event' },
  { id: '2', name: 'Avanzar Solicitud Onboarding', type: 'process' },
  { id: '3', name: 'BT_bug Cerrado', type: 'form' },
  { id: '4', name: 'BT_bug Cerrado', type: 'form' },
  { id: '5', name: 'BT_bug Cerrado', type: 'form' },
  { id: '6', name: 'Creacion Prospecto', type: 'form' },
  { id: '7', name: 'data', type: 'event' },
  { id: '8', name: 'Desscripcion', type: 'form' },
  { id: '9', name: 'Enviar Decision Asesor Humano', type: 'web' },
  { id: '10', name: 'Enviar Mensaje Campaña', type: 'web' },
  { id: '11', name: 'error', type: 'web' },
  { id: '12', name: 'error', type: 'form' },
  { id: '13', name: 'f', type: 'event' },
  { id: '14', name: 'fin', type: 'event' },
  { id: '15', name: 'Forma Test', type: 'form' },
  { id: '16', name: 'GrabarDatosPrueba', type: 'form' },
  { id: '17', name: 'Guardar datos iniciales onboarding', type: 'form' },
  { id: '18', name: 'Guardar Informacion Contacto Prospecto', type: 'form' },
  { id: '19', name: 'Guardar Informacion Informar Condiciones', type: 'form' },
  { id: '20', name: 'Guardar Informacion Solicitar Validacion Identidad', type: 'form' },
  { id: '21', name: 'Guardar Información Toma de datos', type: 'form' },
  { id: '22', name: 'JEFERSON MELO', type: 'form' },
  { id: '23', name: 'JEFERSON MELO', type: 'event' },
  { id: '24', name: 'jefferson', type: 'document' },
  { id: '25', name: 'jefferson', type: 'event' },
  { id: '26', name: 'Mantiz web', type: 'web' },
  { id: '27', name: 'New Form', type: 'form' },
  { id: '28', name: 'nombre', type: 'web' },
  { id: '29', name: 'Nuevo Cartridge', type: 'web' },
  { id: '30', name: 'NuevoInicio', type: 'form' },
  { id: '31', name: 'ObtenerSPAR', type: 'form' },
  { id: '32', name: 'otraPrueba', type: 'web' },
  { id: '33', name: 'OtroInicio', type: 'form' },
  { id: '34', name: 'PRUEBA', type: 'form' },
  { id: '35', name: 'PRUEBA 3', type: 'form' },
  { id: '36', name: 'PRUEBA 3', type: 'form' },
  { id: '37', name: 'PRUEBA 3', type: 'event' },
  { id: '38', name: 'PuebaCargueDeDatos', type: 'event' },
  { id: '39', name: 'PuebaCargueDeDatos', type: 'event' },
  { id: '40', name: 'PruebaLoadData', type: 'web' },
  { id: '41', name: 'PruebaRest1802', type: 'web' },
  { id: '42', name: 'PruebaTarea', type: 'event' },
  { id: '43', name: 'ReasignaciónUsuarios', type: 'human' },
  { id: '44', name: 'Rest api', type: 'web' },
  { id: '45', name: 'ServiesTasks', type: 'web' },
  { id: '46', name: 'Table', type: 'data' },
];

const typeIcon: Record<TaskType, { icon: React.ElementType; cssVar: string }> = {
  web:      { icon: Globe,        cssVar: 'var(--primary)' },
  form:     { icon: LayoutGrid,   cssVar: 'var(--muted-foreground)' },
  data:     { icon: Database,     cssVar: 'var(--success)' },
  process:  { icon: Play,         cssVar: 'var(--warning)' },
  document: { icon: FileText,     cssVar: 'var(--muted-foreground)' },
  event:    { icon: Zap,          cssVar: 'var(--destructive)' },
  human:    { icon: Users,        cssVar: 'var(--info)' },
};

export default function TaskManagerView() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = tasks.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">

      {/* Breadcrumb + top-right button */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <button onClick={() => navigate('/web-designer')} className="hover:text-primary flex items-center gap-1 transition-colors">
            <Home className="w-3 h-3" /> Home
          </button>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-foreground font-medium">Task Manager</span>
        </nav>
        <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main area */}
      <div className="flex mx-6 mb-6 min-h-0 flex-1 gap-4">

        {/* Sidebar */}
        <div
          className="flex-shrink-0 flex flex-col rounded-xl shadow-sm transition-all duration-200"
          style={{ width: sidebarOpen ? 220 : 40, minHeight: 0 }}
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
          {sidebarOpen ? (
            <>
              {/* Tabs */}
              <div className="flex border-b border-border/70 flex-shrink-0">
                <button className="flex-1 py-2.5 text-xs border-b-2 border-primary text-primary font-medium transition-colors">
                  Tasks
                </button>
                <button
                  onClick={() => navigate('/data-manager')}
                  className="flex-1 py-2.5 text-xs border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
                >
                  Data Manager
                </button>
              </div>

              {/* Title + filter */}
              <div className="px-4 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <ClipboardCheck className="w-3.5 h-3.5 text-foreground" />
                  <span className="text-foreground text-[11px] font-bold uppercase tracking-[0.06em]">Tasks</span>
                </div>
                <button className="w-6 h-6 rounded flex items-center justify-center text-subtle hover:text-primary transition-colors">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Search */}
              <div className="px-3 pb-2 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-subtle" />
                  <input
                    type="text"
                    placeholder="Type a task to search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 text-xs bg-surface border border-border rounded-lg
                               focus:outline-none focus:border-primary text-foreground placeholder:text-placeholder"
                  />
                </div>
              </div>

              {/* Task list */}
              <div className="min-h-0 flex-1 overflow-y-auto px-1.5 pb-1">
                {filtered.map(task => {
                  const { icon: Icon, cssVar } = typeIcon[task.type];
                  const isSelected = selectedTask?.id === task.id;
                  return (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors
                        ${isSelected ? 'bg-primary-muted' : 'hover:bg-surface'}`}
                    >
                      <Icon style={{ width: 13, height: 13, color: cssVar, flexShrink: 0 }} />
                      <span className={`truncate text-xs ${isSelected ? 'text-primary font-semibold' : 'text-foreground font-normal'}`}>
                        {task.name}
                      </span>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="text-xs text-subtle text-center py-4">Sin resultados</p>
                )}
              </div>

              {/* Collapse button */}
              <div className="flex-shrink-0 border-t border-border/70">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full py-2 flex items-center justify-center gap-1 text-xs text-subtle hover:text-primary hover:bg-surface transition-colors"
                >
                  <ChevronsLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            /* Collapsed sidebar — icon arriba, mismo pie que al expandir */
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex flex-1 justify-center pt-3">
                <ClipboardCheck className="w-4 h-4 text-placeholder" />
              </div>
              <div className="shrink-0 border-t border-border/70">
                <button
                  onClick={() => setSidebarOpen(true)}
                  title="Expandir"
                  className="flex w-full items-center justify-center py-2 text-subtle transition-colors hover:bg-surface hover:text-primary"
                >
                  <ChevronsRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 min-h-0 flex flex-col rounded-xl shadow-sm">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
          {selectedTask ? (
            <>
              {/* Task detail header */}
              <div className="px-6 py-4 border-b border-border/70 flex items-center gap-3 flex-shrink-0">
                {(() => {
                  const { icon: Icon, cssVar } = typeIcon[selectedTask.type];
                  return <Icon style={{ width: 16, height: 16, color: cssVar }} />;
                })()}
                <span className="text-sm text-foreground">{selectedTask.name}</span>
                <span className="text-[10px] px-1.5 py-px rounded bg-surface border border-border/70 text-subtle">
                  {selectedTask.type}
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-border/70 flex items-center justify-center mx-auto mb-3">
                    <ClipboardCheck className="w-6 h-6 text-placeholder" />
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedTask.name}</p>
                  <p className="text-xs text-subtle mt-1">Contenido de la tarea</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-surface border border-border/70 flex items-center justify-center mx-auto mb-3">
                  <ClipboardCheck className="w-7 h-7 text-placeholder" />
                </div>
                <p className="text-sm text-muted-foreground">Select a task to view details</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
