import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Briefcase,
  Database,
  ClipboardCheck,
  Shield,
  FileText,
  ShieldAlert,
  List,
  Link,
  Calculator,
  BookOpen,
  Sparkles,
  BarChart3,
  Lock,
  Users,
  ExternalLink,
  FileBarChart,
  KeyRound,
  ScanLine,
  Calendar,
  Smile,
  Clock,
  Wrench,
  FileCode,
} from 'lucide-react';

type Category = 'all' | 'management' | 'security' | 'data' | 'settings';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'management' | 'security' | 'data' | 'settings';
  route?: string;
}

const modules: Module[] = [
  {
    id: 'project',
    title: 'Projects',
    description: 'Gestiona proyectos, tareas y recursos del equipo',
    icon: <Briefcase className="w-5 h-5" />,
    category: 'management',
    route: '/web-designer/projects',
  },
  {
    id: 'data',
    title: 'Datasets',
    description: 'Administra bases de datos y modelos de información',
    icon: <Database className="w-5 h-5" />,
    category: 'data',
    route: '/web-designer/data-manager',
  },
  {
    id: 'task',
    title: 'Tasks',
    description: 'Organiza y da seguimiento a tareas individuales',
    icon: <ClipboardCheck className="w-5 h-5" />,
    category: 'management',
    route: '/web-designer/task-manager',
  },
  {
    id: 'rule',
    title: 'Rules',
    description: 'Define reglas de negocio y validaciones automáticas',
    icon: <Shield className="w-5 h-5" />,
    category: 'settings',
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Almacena y gestiona documentos del sistema',
    icon: <FileText className="w-5 h-5" />,
    category: 'management',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Configura permisos y políticas de seguridad',
    icon: <ShieldAlert className="w-5 h-5" />,
    category: 'security',
  },
  {
    id: 'list',
    title: 'Lists',
    description: 'Crea y administra listas y catálogos personalizados',
    icon: <List className="w-5 h-5" />,
    category: 'data',
  },
  {
    id: 'connection',
    title: 'Connections',
    description: 'Gestiona integraciones con sistemas externos',
    icon: <Link className="w-5 h-5" />,
    category: 'settings',
  },
  {
    id: 'calculation',
    title: 'Calculation Engines',
    description: 'Define fórmulas y cálculos automatizados',
    icon: <Calculator className="w-5 h-5" />,
    category: 'data',
  },
  {
    id: 'standards',
    title: 'Standards',
    description: 'Establece estándares y plantillas del sistema',
    icon: <BookOpen className="w-5 h-5" />,
    category: 'settings',
    route: '/web-designer/standards-manager',
  },
  {
    id: 'cleaning',
    title: 'Data Cleaning',
    description: 'Limpia y normaliza información de datos',
    icon: <Sparkles className="w-5 h-5" />,
    category: 'data',
  },
  {
    id: 'bam',
    title: 'BAM',
    description: 'Monitorea actividades y análisis de negocio',
    icon: <BarChart3 className="w-5 h-5" />,
    category: 'management',
  },
  {
    id: 'policy',
    title: 'Native Policies',
    description: 'Administra políticas nativas del sistema',
    icon: <Lock className="w-5 h-5" />,
    category: 'security',
  },
  {
    id: 'groups',
    title: 'Project Groups',
    description: 'Organiza proyectos en grupos y carpetas',
    icon: <Users className="w-5 h-5" />,
    category: 'management',
  },
  {
    id: 'portal',
    title: 'Portal Settings',
    description: 'Configura apariencia y comportamiento del portal',
    icon: <ExternalLink className="w-5 h-5" />,
    category: 'settings',
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Crea y programa informes personalizados',
    icon: <FileBarChart className="w-5 h-5" />,
    category: 'management',
  },
  {
    id: 'credentials',
    title: 'Credentials',
    description: 'Gestiona credenciales y autenticación',
    icon: <KeyRound className="w-5 h-5" />,
    category: 'security',
  },
  {
    id: 'ocr',
    title: 'OCR Designer',
    description: 'Diseña plantillas de reconocimiento óptico',
    icon: <ScanLine className="w-5 h-5" />,
    category: 'data',
  },
  {
    id: 'holidays',
    title: 'Public Holidays',
    description: 'Define calendarios y días festivos',
    icon: <Calendar className="w-5 h-5" />,
    category: 'settings',
  },
  {
    id: 'state',
    title: 'Request States',
    description: 'Configura estados y flujos de solicitudes',
    icon: <Smile className="w-5 h-5" />,
    category: 'management',
  },
  {
    id: 'time',
    title: 'Time Tables',
    description: 'Gestiona horarios y calendarios de trabajo',
    icon: <Clock className="w-5 h-5" />,
    category: 'settings',
  },
  {
    id: 'jobs',
    title: 'Jobs Designer',
    description: 'Diseña y programa tareas automatizadas',
    icon: <Wrench className="w-5 h-5" />,
    category: 'settings',
  },
  {
    id: 'format',
    title: 'Formats & Expressions',
    description: 'Define formatos y expresiones regulares',
    icon: <FileCode className="w-5 h-5" />,
    category: 'data',
  },
];

const categoryIconColors = {
  management: 'text-primary',
  security: 'text-destructive',
  data: 'text-success',
  settings: 'text-warning',
};

const categoryLabels = {
  all: 'Todos',
  management: 'Gestión',
  security: 'Seguridad',
  data: 'Datos',
  settings: 'Configuración',
};

import PageHeader from './PageHeader';

export default function ModulesView() {
  const navigate = useNavigate();
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredModules = selectedCategory === 'all'
    ? modules
    : modules.filter(m => m.category === selectedCategory);

  const categoryCounts = {
    all: modules.length,
    management: modules.filter(m => m.category === 'management').length,
    security: modules.filter(m => m.category === 'security').length,
    data: modules.filter(m => m.category === 'data').length,
    settings: modules.filter(m => m.category === 'settings').length,
  };

  const handleModuleClick = (module: Module) => {
    if (module.route) {
      navigate(module.route);
    }
  };

  return (
    <main className="container mx-auto px-6 py-6">
      <PageHeader
        title="Panel de Administración"
        breadcrumbs={[{ label: 'Inicio' }]}
      />
      {/* Category Filter */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-foreground">Filtrar por:</span>
        {(['all', 'management', 'security', 'data', 'settings'] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-1.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${selectedCategory === cat
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-foreground border border-border hover:border-primary'
              }
            `}
          >
            {categoryLabels[cat]} ({categoryCounts[cat]})
          </button>
        ))}
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className={`
              bg-card border border-border rounded-lg p-4 cursor-pointer
              transition-all duration-200
              ${hoveredModule === module.id
                ? 'transform -translate-y-1 shadow-lg border-primary'
                : 'shadow-sm hover:shadow-md'
              }
            `}
            onMouseEnter={() => setHoveredModule(module.id)}
            onMouseLeave={() => setHoveredModule(null)}
            onClick={() => handleModuleClick(module)}
          >
            {/* Icon */}
            <div className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-3 ${categoryIconColors[module.category]}`}>
              {module.icon}
            </div>

            {/* Title */}
            <h3 className="text-xs font-semibold text-foreground mb-1.5 leading-snug">
              {module.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {module.description}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-subtle">No hay módulos en esta categoría</p>
        </div>
      )}
    </main>
  );
}
