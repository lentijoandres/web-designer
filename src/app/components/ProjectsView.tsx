import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FolderOpen, Search, Plus, Lock, Users } from 'lucide-react';
import PageHeader from './PageHeader';

type FilterType = 'all' | 'private' | 'shared';

interface Project {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
}

const projects: Project[] = [
  { id: '1', name: 'Proyecto 1', description: 'Proyecto base de configuración inicial', isPrivate: true },
  { id: '2', name: 'Proyecto 2', description: 'Extensión del proyecto principal', isPrivate: false },
  { id: '3', name: 'Rcg Smart', description: 'Gestión inteligente de recursos', isPrivate: false },
  { id: '4', name: 'Rcg Smart copy', description: 'Copia de trabajo de Rcg Smart', isPrivate: true },
  { id: '5', name: 'Consola Open Responder', description: 'Consola de respuesta abierta en tiempo real', isPrivate: false },
  { id: '6', name: 'Creador Expedite abril 2023', description: 'Flujos de creación rápida, abril 2023', isPrivate: false },
  { id: '7', name: 'DEMO', description: 'Entorno de demostración general', isPrivate: true },
  { id: '8', name: 'DEMO 1', description: 'Primera variante de demostración', isPrivate: false },
  { id: '9', name: 'Demostración Delivery & Carga', description: 'Demo de módulo de entregas y carga', isPrivate: false },
  { id: '10', name: 'Economía 1 - Casos Paralelo', description: 'Análisis de casos económicos en paralelo', isPrivate: false },
  { id: '11', name: 'Economía 1 - Casos Paralelo copy', description: 'Copia de análisis de casos económicos', isPrivate: true },
  { id: '12', name: 'Flujo Paralelo Del Identificador', description: 'Procesamiento paralelo de identificadores', isPrivate: false },
  { id: '13', name: 'Importación', description: 'Módulo de importación de datos', isPrivate: false },
  { id: '14', name: 'Importación 2', description: 'Segunda versión del módulo de importación', isPrivate: true },
  { id: '15', name: 'Listados Estándar', description: 'Generación de listados con formato estándar', isPrivate: false },
  { id: '16', name: 'Listados Estándar 2', description: 'Variante extendida de listados estándar', isPrivate: false },
  { id: '17', name: 'Mejor Agente API', description: 'Integración optimizada con API de agentes', isPrivate: true },
  { id: '18', name: 'Mejor Agil', description: 'Flujos ágiles mejorados de trabajo', isPrivate: false },
  { id: '19', name: 'Nuevos', description: 'Módulos y funciones en desarrollo', isPrivate: false },
  { id: '20', name: 'Ordenador Separado de Crédito', description: 'Ordenamiento y separación de créditos', isPrivate: true },
  { id: '21', name: 'Ordenador Separado de Crédito Georgii', description: 'Variante Georgii del ordenador de crédito', isPrivate: false },
  { id: '22', name: 'Patinetas Sin Torno fue', description: 'Prueba de flujo sin torno de patinetas', isPrivate: false },
  { id: '23', name: 'PlazoCred', description: 'Gestión de créditos a plazo', isPrivate: true },
  { id: '24', name: 'Prueba Conductor de Reos', description: 'Prueba del módulo conductor de reos', isPrivate: false },
  { id: '25', name: 'Proceso Conductor', description: 'Proceso principal de conducción de flujos', isPrivate: false },
  { id: '26', name: 'Procesos 1', description: 'Primera configuración de procesos', isPrivate: true },
  { id: '27', name: 'Procesos 2', description: 'Segunda configuración de procesos', isPrivate: false },
  { id: '28', name: 'PRUEBAS MAS2', description: 'Suite de pruebas MAS segunda generación', isPrivate: false },
  { id: '29', name: 'PRUEBAS MAS2 copy', description: 'Copia de la suite de pruebas MAS2', isPrivate: true },
  { id: '30', name: 'Test', description: 'Entorno de pruebas generales', isPrivate: false },
  { id: '31', name: 'Testregistry', description: 'Registro centralizado de pruebas', isPrivate: false },
];

const filterLabels = {
  all: 'Todos los Proyectos',
  private: 'Privados',
  shared: 'Compartido conmigo',
};

export default function ProjectsView() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'private' && project.isPrivate) ||
      (selectedFilter === 'shared' && !project.isPrivate);
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="container mx-auto px-6 py-6">
      <PageHeader
        title="Gestor de Proyectos"
        breadcrumbs={[
          { label: 'Inicio', path: '/' },
          { label: 'Project Manager' }
        ]}
      />

      {/* Toolbar */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        {/* Filters */}
        <div className="flex items-center gap-2">
          {(['all', 'private', 'shared'] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`
                px-4 py-1.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${selectedFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-foreground border border-border hover:border-primary'
                }
              `}
            >
              {filterLabels[filter]}
            </button>
          ))}
        </div>

        {/* Search and New Project */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-1.5 rounded-lg text-sm border border-border
                       focus:outline-none focus:border-primary bg-card text-foreground
                       placeholder:text-subtle w-64"
            />
          </div>
          <button
            className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium
                     hover:bg-primary-hover transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`
              bg-card border border-border rounded-lg p-4 cursor-pointer
              transition-all duration-200 relative
              ${hoveredProject === project.id
                ? 'transform -translate-y-1 shadow-lg border-primary'
                : 'shadow-sm hover:shadow-md'
              }
            `}
            onClick={() => navigate(`/web-designer/projects/${project.id}`)}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Privacy Badge */}
            <div className="absolute top-2 right-2">
              {project.isPrivate ? (
                <div className="bg-muted rounded-full p-1.5" title="Privado">
                  <Lock className="w-3 h-3 text-muted-foreground" />
                </div>
              ) : (
                <div className="bg-primary-muted rounded-full p-1.5" title="Compartido">
                  <Users className="w-3 h-3 text-primary" />
                </div>
              )}
            </div>

            {/* Icon */}
            <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center mb-3">
              <FolderOpen className="w-5 h-5 text-primary" />
            </div>

            {/* Project Name */}
            <h3 className="text-sm font-medium text-foreground mb-1 leading-snug pr-6">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-subtle">No se encontraron proyectos</p>
        </div>
      )}
    </main>
  );
}
