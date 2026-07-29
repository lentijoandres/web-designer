import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => navigate('/web-designer')}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-subtle" />
            {item.path ? (
              <button
                onClick={() => navigate(item.path)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-sm text-foreground font-medium">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
    </div>
  );
}
