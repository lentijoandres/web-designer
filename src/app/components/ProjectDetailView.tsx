import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ChevronRight, Home, RefreshCw, LayoutGrid, Upload, Download,
  MoreVertical, Search, Layers, Lock, Type, AlignLeft, Hash, Calendar,
  Braces, CheckSquare, List, CircleDot, ChevronDown, Image, Grid3X3,
  MoveVertical, Minus, SquareDashed, Square, Paperclip, Rows3,
} from 'lucide-react';
import { FieldGrid, Field, FieldLabel, TextInput, SelectInput, TextArea, Btn, FormSection } from './FormComponents';

const tabs = ['Reporte Bug', 'DatosRadicador', 'Forma Detalle Prueba'];

const componentGroups = [
  {
    label: 'Input',
    items: [
      { label: 'Text field', icon: Type },
      { label: 'Text area', icon: AlignLeft },
      { label: 'Number', icon: Hash, accent: true },
      { label: 'Date time', icon: Calendar },
      { label: 'Validate', icon: Braces },
    ],
  },
  {
    label: 'Selection',
    items: [
      { label: 'Checkbox', icon: CheckSquare },
      { label: 'List Box', icon: List },
      { label: 'Radio group', icon: CircleDot },
      { label: 'Select', icon: ChevronDown },
    ],
  },
  {
    label: 'Presentation',
    items: [
      { label: 'Text view', icon: Type },
      { label: 'Image view', icon: Image },
      { label: 'Grid View', icon: Grid3X3 },
      { label: 'Spacer', icon: MoveVertical },
      { label: 'Separator', icon: Minus },
    ],
  },
  {
    label: 'Containers',
    items: [
      { label: 'Group', icon: SquareDashed },
    ],
  },
  {
    label: 'Action',
    items: [
      { label: 'Button', icon: Square },
    ],
  },
];

export default function ProjectDetailView() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [componentSearch, setComponentSearch] = useState('');
  const [controlSearch, setControlSearch] = useState('');
  const [toolbarExpanded, setToolbarExpanded] = useState(false);

  const filteredGroups = componentGroups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(componentSearch.toLowerCase())
    ),
  })).filter(g => g.items.length > 0);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Breadcrumb + Action bar */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <button onClick={() => navigate('/web-designer')} className="hover:text-primary flex items-center gap-1 transition-colors">
            <Home className="w-3 h-3" /> Home
          </button>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <button onClick={() => navigate('/projects')} className="hover:text-primary transition-colors">
            Projects Manager
          </button>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-foreground font-medium">Process: BT_Reporte Bug</span>
        </nav>
        <div className="flex items-center gap-1.5">
          {[
            { icon: RefreshCw, title: 'Recargar' },
            { icon: LayoutGrid, title: 'Vista' },
            { icon: Upload, title: 'Exportar' },
            { icon: Download, title: 'Importar' },
          ].map(({ icon: Icon, title }) => (
            <button
              key={title}
              title={title}
              style={toolbarExpanded
                ? { padding: '6px 12px', borderRadius: '8px' }
                : { width: '32px', height: '32px', borderRadius: '8px', justifyContent: 'center' }
              }
              className="bg-primary text-primary-foreground flex items-center gap-2 hover:bg-primary-hover transition-colors overflow-hidden"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {toolbarExpanded && (
                <span className="text-xs whitespace-nowrap">{title}</span>
              )}
            </button>
          ))}
          <button className="w-8 h-8 rounded-lg bg-card border border-border text-muted-foreground flex items-center justify-center hover:border-primary transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
          {/* Toggle compact/expanded */}
          <button
            title={toolbarExpanded ? 'Vista compacta' : 'Vista expandida'}
            onClick={() => setToolbarExpanded(v => !v)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border
              ${toolbarExpanded
                ? 'bg-primary-muted border-primary text-primary'
                : 'bg-card border-border text-muted-foreground'
              }`}
          >
            <Rows3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main workspace */}
      <div className="flex flex-1 min-h-0 mx-6 mb-6 gap-4">

        {/* Left sidebar */}
        <div className="w-56 flex-shrink-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          {/* Sidebar header */}
          <div className="bg-brand text-brand-foreground px-4 py-3 flex items-center justify-between flex-shrink-0">
            <span className="text-sm font-medium">Data Manager</span>
            <List className="w-4 h-4 opacity-70" />
          </div>

          {/* Search */}
          <div className="px-3 py-2.5 border-b border-border/70 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle" />
              <input
                type="text"
                placeholder="Search components"
                value={componentSearch}
                onChange={e => setComponentSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-lg
                           focus:outline-none focus:border-primary text-foreground placeholder:text-subtle"
              />
            </div>
          </div>

          {/* Component groups */}
          <div className="overflow-y-auto flex-1 py-2">
            {filteredGroups.map(group => (
              <div key={group.label} className="mb-3">
                <p className="px-3 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </p>

                {toolbarExpanded ? (
                  /* List view: icon left, label right */
                  <div className="flex flex-col px-2 gap-0.5">
                    {group.items.map(({ label, icon: Icon, accent }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-surface transition-colors group"
                      >
                        <div
                          className={`w-7 h-7 rounded-[7px] flex-shrink-0 flex items-center justify-center border
                            ${accent ? 'bg-primary-muted border-primary/30' : 'bg-surface border-border'}`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${accent ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className="text-xs text-muted-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Grid view: icon + label below */
                  <div className="grid grid-cols-3 gap-1 px-2">
                    {group.items.map(({ label, icon: Icon, accent }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-1 p-1.5 rounded-lg cursor-pointer hover:bg-surface transition-colors group"
                      >
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center
                          ${accent ? 'border-primary/30 bg-primary-muted' : 'border-border bg-surface'}
                          group-hover:border-primary/40`}
                        >
                          <Icon className={`w-4 h-4 ${accent ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className="text-[9px] text-muted-foreground text-center leading-tight">{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm">

          {/* Tabs + search row */}
          <div className="flex items-center border-b border-border/70 px-5 flex-shrink-0">
            <div className="flex items-center gap-0 flex-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap
                    ${activeTab === i
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 py-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle" />
                <input
                  type="text"
                  placeholder="Search for a Control"
                  value={controlSearch}
                  onChange={e => setControlSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-lg
                             focus:outline-none focus:border-primary text-foreground placeholder:text-subtle w-48"
                />
              </div>
              <button className="w-7 h-7 rounded-lg bg-surface border border-border flex items-center justify-center text-muted-foreground hover:border-primary transition-colors">
                <Layers className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

            {/* Section 1: Información de la solicitud — 4 columnas */}
            <FormSection title="Información de la solicitud">
              <FieldGrid cols={4}>
                <Field label="Número solicitud">
                  <TextInput value="" readOnly placeholder="—" />
                </Field>
                <Field label="Fecha Radicación">
                  <TextInput value="" readOnly placeholder="mm/dd/yyyy" />
                </Field>
                <div className="flex flex-col gap-1">
                  <FieldLabel>Imagen adjunta</FieldLabel>
                  <div className="h-[32px] rounded-lg flex items-center justify-center bg-surface border border-dashed border-input">
                    <Image className="w-4 h-4 text-placeholder" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <FieldLabel>&nbsp;</FieldLabel>
                  <Btn variant="ghost">Ver Datos del Radicador</Btn>
                </div>
              </FieldGrid>
            </FormSection>

            {/* Section 2: Reporte caso — 4 columnas */}
            <FormSection title="Reporte caso">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-surface border border-border/70">
                  <p className="text-muted-foreground text-xs leading-relaxed flex-1">
                    Capture los datos del Reporte y haga clic en "Siguiente" para continuar. Puede adjuntar uno o varios soportes del caso (tamaño máximo 9999 KB).
                  </p>
                  <Lock className="w-3.5 h-3.5 text-subtle flex-shrink-0 mt-0.5" />
                </div>

                <FieldGrid cols={4}>
                  <Field label="Proyectos">
                    <SelectInput value="" options={['Proyecto A', 'Proyecto B']} placeholder="Seleccionar" />
                  </Field>
                  <Field label="Flujo Proyecto" required>
                    <SelectInput value="" options={['Flujo 1', 'Flujo 2']} placeholder="Seleccionar" />
                  </Field>
                  <Field label="Tipo Reporte">
                    <SelectInput value="" options={['Bug', 'Mejora', 'Consulta']} placeholder="Seleccionar" />
                  </Field>
                  <div className="flex flex-col gap-1">
                    <FieldLabel>&nbsp;</FieldLabel>
                    <div className="flex gap-2">
                      <Btn variant="ghost">
                        <Paperclip className="w-3 h-3" /> Adjuntar
                      </Btn>
                      <Btn>Siguiente →</Btn>
                    </div>
                  </div>
                </FieldGrid>

                <Field label="Descripción Corta">
                  <TextArea value="" readOnly rows={4} placeholder="—" />
                </Field>
              </div>
            </FormSection>

          </div>
        </div>
      </div>
    </div>
  );
}
