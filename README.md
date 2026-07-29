# Mantiz Web Designer

UI de **Mantiz Web Designer** (React + Vite + Tailwind + shadcn), con tema DSM Mantiz.

Demo / prototipo de pantallas: login → módulos → projects, data manager, task manager, standards.

## Requisitos

- Node.js 20+
- npm

## Local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Stack

- React 18 + Vite 6
- Tailwind CSS 4
- shadcn/ui (`src/app/components/ui`)
- Tokens en `src/styles/theme.css` y paquete `@mantiz/ui-theme`

## Rutas

| Ruta | Pantalla |
|------|----------|
| `/` o `/login` | Login |
| `/web-designer` | Panel de módulos |
| `/web-designer/projects` | Projects |
| `/web-designer/data-manager` | Data Manager |
| `/web-designer/task-manager` | Task Manager |
| `/web-designer/standards-manager` | Standards Manager |

## Deploy en Netlify

1. Conecta el repo `lentijoandres/web-designer` en [Netlify](https://app.netlify.com).
2. Build settings (también en `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node:** 20
3. El redirect SPA (`/* → /index.html`) ya está en `netlify.toml`.

Deploy continuo: cada push a `main` publica automáticamente si el sitio está linkeado al repo.

## Notas para desarrollo

- Login es mock (cualquier credencial → entra).
- Datos de pantallas son estáticos / demo.
- Colores: usar tokens del tema (`bg-primary`, `text-foreground`, etc.), no hex sueltos.
