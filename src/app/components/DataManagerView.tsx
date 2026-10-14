import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight, ChevronDown, Home, Search, RefreshCw,
  LayoutGrid, Network, Copy, Database, Hash, Calendar,
  Rows3,
} from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  type: 'group' | 'field-date' | 'field-id' | 'field-number';
  children?: TreeNode[];
}

const tree: TreeNode[] = [
  {
    id: 'solicitudes', label: 'Solicitudes', type: 'group',
    children: [
      { id: 'abaco', label: 'Abaco', type: 'group' },
      { id: 'activo', label: 'Activo', type: 'group' },
      { id: 'bugtrack', label: 'BugTrack', type: 'group' },
      { id: 'campana', label: 'CampañaOnboarding', type: 'group' },
      { id: 'categoria', label: 'CategoriaDePruebas', type: 'group' },
      { id: 'category2', label: 'Category2', type: 'group' },
      { id: 'comentarios', label: 'Comentarios', type: 'group' },
      { id: 'control', label: 'ControlFlujo', type: 'group' },
      { id: 'datamanager', label: 'Data Manager', type: 'group' },
      { id: 'destinatario', label: 'Destinatario', type: 'group' },
      { id: 'encomienda', label: 'Encomienda', type: 'group' },
      { id: 'fgg', label: 'fggfgfgfd', type: 'group' },
      { id: 'flujo', label: 'FlujoCircularPrueba', type: 'group' },
      { id: 'gladys', label: 'Gladys', type: 'group' },
      { id: 'guard', label: 'GuardVarMMFinal', type: 'group' },
      { id: 'ia', label: 'Integracion IA', type: 'group' },
      { id: 'notif', label: 'NotificacionesBT', type: 'group' },
      { id: 'nuevanotif', label: 'NuevaNotificacionBT', type: 'group' },
      { id: 'nuevocomentario', label: 'NuevoComentario', type: 'group' },
      { id: 'nuevoflujo', label: 'NuevoFlujo', type: 'group' },
      { id: 'number', label: 'Number', type: 'group' },
      { id: 'onboarding', label: 'Onboarding', type: 'group' },
      { id: 'pruebabm', label: 'PruebaBM', type: 'group' },
      { id: 'pruebamm', label: 'PruebaMsNombreMM1', type: 'group' },
      { id: 'pruebasmwd', label: 'Pruebas MWD', type: 'group' },
      { id: 'remitente', label: 'Remitente', type: 'group' },
      { id: 's', label: 's', type: 'group' },
      { id: 'tes', label: 'Tes', type: 'group' },
      { id: 'tyty', label: 'tytyrtdgtr', type: 'group' },
      { id: 'variables', label: 'variables', type: 'group' },
      { id: 'varglob', label: 'VariablesGlobales', type: 'group' },
    ],
  },
  { id: 'fechaCreacion', label: 'FechaCreacion', type: 'field-date' },
  { id: 'fechaMod', label: 'FechaUltimaModificacion', type: 'field-date' },
  { id: 'idComite', label: 'IdComitePendiente', type: 'field-id' },
  { id: 'idEstado', label: 'IdEstado', type: 'field-id' },
  { id: 'idPlan', label: 'IdPlan', type: 'field-id' },
  { id: 'idProceso', label: 'IdProcesoActual', type: 'field-id' },
  { id: 'idProducto', label: 'IdProducto', type: 'field-id' },
  { id: 'idScoring', label: 'IdScoring', type: 'field-id' },
  { id: 'idUsuario', label: 'IdUsuarioCreacion', type: 'field-id' },
  { id: 'idZona', label: 'IdZona', type: 'field-id' },
  { id: 'puntaje', label: 'PuntajeSolicitud', type: 'field-number' },
  { id: 'valorDesemb', label: 'ValorDesembolsado', type: 'field-number' },
  { id: 'valorPre', label: 'ValorPreaprobado', type: 'field-number' },
  { id: 'valorSol', label: 'ValorSolicitud', type: 'field-number' },
];

const typeIconClass: Record<TreeNode['type'], string> = {
  group: 'text-primary',
  'field-date': 'text-success',
  'field-id': 'text-subtle',
  'field-number': 'text-subtle',
};

function NodeIconBox({ type }: { type: TreeNode['type'] }) {
  const Icon = type === 'field-date' ? Calendar : type === 'field-number' ? Hash : Database;
  return <Icon className={`w-[13px] h-[13px] flex-shrink-0 ${typeIconClass[type]}`} />;
}

function TypeBadge({ type }: { type: TreeNode['type'] }) {
  const labels: Record<TreeNode['type'], string> = {
    group: 'grupo', 'field-date': 'fecha', 'field-number': 'número', 'field-id': 'id',
  };
  return (
    <span className="text-[10px] px-1.5 py-px rounded whitespace-nowrap bg-surface border border-border/70 text-subtle">
      {labels[type]}
    </span>
  );
}

export default function DataManagerView() {
  const navigate = useNavigate();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['solicitudes']));
  const [search, setSearch] = useState('');
  const [listExpanded, setListExpanded] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const matchesSearch = (label: string) =>
    label.toLowerCase().includes(search.toLowerCase());

  const renderNode = (node: TreeNode, depth = 0) => {
    const isOpen = expandedNodes.has(node.id);
    const hasChildren = !!node.children?.length;
    const visible = !search || matchesSearch(node.label) ||
      node.children?.some(c => matchesSearch(c.label));
    if (!visible) return null;

    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id}>
        <div
          onClick={() => { if (hasChildren) toggleNode(node.id); setSelectedNode(node); }}
          style={{ paddingLeft: depth * 16 + 6 }}
          className={`flex items-center gap-2 py-1 pr-2 rounded-lg transition-colors cursor-pointer select-none
            ${isSelected ? 'bg-primary-muted' : 'hover:bg-surface'}`}
        >
          <div className="w-3.5 flex-shrink-0 flex items-center">
            {hasChildren && (
              isOpen
                ? <ChevronDown className="w-3 h-3 text-subtle" />
                : <ChevronRight className="w-3 h-3 text-subtle" />
            )}
          </div>
          <NodeIconBox type={node.type} />
          <span className={`flex-1 truncate text-xs ${isSelected ? 'text-primary font-semibold' : 'text-foreground font-normal'}`}>
            {node.label}
          </span>
          {listExpanded && <TypeBadge type={node.type} />}
        </div>
        {hasChildren && isOpen && (
          <div>{node.children!.map(c => renderNode(c, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">

      {/* Top bar: breadcrumb + toolbar */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
            <button onClick={() => navigate('/web-designer')} className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="w-3 h-3" /> Home
            </button>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-foreground font-medium">Data Manager</span>
          </nav>

          {/* Left icon buttons — matches image */}
          {[
            { icon: Network, title: 'Conexiones' },
            { icon: Database, title: 'Base de datos' },
            { icon: Copy, title: 'Copiar' },
          ].map(({ icon: Icon, title }) => (
            <button
              key={title}
              title={title}
              className="w-9 h-9 rounded-lg bg-card border border-border text-muted-foreground
                         flex items-center justify-center hover:border-primary hover:text-primary transition-colors shadow-sm"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Right icon buttons — matches image */}
        <div className="flex items-center gap-1.5">
          {[
            { icon: LayoutGrid, title: 'Vista' },
            { icon: RefreshCw, title: 'Recargar' },
          ].map(({ icon: Icon, title }) => (
            <button
              key={title}
              title={title}
              style={listExpanded
                ? { padding: '6px 12px', borderRadius: 8 }
                : { width: 32, height: 32, borderRadius: 8, justifyContent: 'center' }
              }
              className="bg-primary text-primary-foreground flex items-center gap-2 hover:bg-primary-hover transition-colors"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {listExpanded && <span className="text-xs whitespace-nowrap">{title}</span>}
            </button>
          ))}
          <button
            onClick={() => setListExpanded(v => !v)}
            title={listExpanded ? 'Vista compacta' : 'Vista expandida'}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border
              ${listExpanded
                ? 'bg-primary-muted border-primary text-primary'
                : 'bg-card border-border text-muted-foreground'
              }`}
          >
            <Rows3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main area: sidebar tree + body */}
      <div className="flex mx-6 mb-6 min-h-0 flex-1 gap-4">

        {/* Sidebar — search + tree */}
        <div className="flex-shrink-0 flex flex-col rounded-xl shadow-sm" style={{ width: 220, minHeight: 0 }}>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="px-4 py-2.5 border-b border-border/70 flex-shrink-0 flex items-center gap-2">
            <span className="text-foreground text-[11px] font-bold uppercase tracking-[0.06em]">Data Manager</span>
          </div>
          <div className="px-3 py-2.5 border-b border-border/70 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-lg
                           focus:outline-none focus:border-primary text-foreground placeholder:text-subtle"
              />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-1.5">
            {tree.map(node => renderNode(node))}
          </div>
          </div>
        </div>

        {/* Body / content area */}
        <div className="flex-1 min-h-0 flex flex-col rounded-xl shadow-sm">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
          {selectedNode ? (
            <div className="flex flex-col h-full">
              {/* Content header */}
              <div className="px-6 py-4 border-b border-border/70 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-muted flex items-center justify-center flex-shrink-0">
                  <NodeIconBox type={selectedNode.type} />
                </div>
                <div>
                  <h2 className="text-sm text-foreground">{selectedNode.label}</h2>
                  <TypeBadge type={selectedNode.type} />
                </div>
              </div>
              {/* Placeholder content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center mx-auto mb-3">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{selectedNode.label}</p>
                  <p className="text-xs text-subtle mt-1">Selecciona una entidad para ver su contenido</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-surface border border-border/70 flex items-center justify-center mx-auto mb-3">
                  <Database className="w-7 h-7 text-placeholder" />
                </div>
                <p className="text-sm text-muted-foreground">Selecciona una entidad del árbol</p>
                <p className="text-xs text-subtle mt-1">El contenido aparecerá aquí</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
