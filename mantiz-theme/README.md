# @mantiz/ui-theme

Paquete de tema **DSM MANTIZ** extraído de la demo CCA. Incluye tokens de color, tipografía Montserrat, gradientes, sombras y utilidades Tailwind para que otro proyecto React se vea igual.

## Contenido

```
mantiz-theme/
├── package.json
├── README.md
├── src/
│   ├── foundation.css   ← tokens + utilidades (importar en tu CSS global)
│   ├── tokens.ts        ← colores en JS + UI_TYPE + superficies
│   └── index.ts
└── examples/
    └── consumer-styles.css
```

---

## Crear el ZIP

### Windows (PowerShell)

Desde la carpeta padre de `mantiz-theme` (por ejemplo `D:\MANTIZ\CCA`):

```powershell
Compress-Archive -Path ".\mantiz-theme" -DestinationPath ".\mantiz-ui-theme.zip" -Force
```

El archivo `mantiz-ui-theme.zip` quedará listo para compartir.

### macOS / Linux

```bash
cd /ruta/al/padre
zip -r mantiz-ui-theme.zip mantiz-theme
```

### Alternativa: tarball npm

```bash
cd mantiz-theme
npm pack
```

Genera `@mantiz-ui-theme-1.0.0.tgz` (útil si prefieres `npm install` desde archivo).

---

## Instalar en tu otro proyecto React

### 1. Descomprime y coloca el paquete

Opción A — carpeta local (recomendado para empezar):

```
tu-proyecto/
├── mantiz-theme/          ← descomprime aquí
├── src/
└── package.json
```

Opción B — hermano del proyecto:

```
proyectos/
├── mantiz-theme/
└── mi-app-react/
```

### 2. Dependencias en el proyecto destino

```bash
npm i tailwindcss @tailwindcss/vite tw-animate-css tailwind-merge clsx
```

Si usas componentes shadcn (opcional):

```bash
npm i class-variance-authority lucide-react
```

### 3. Vite (`vite.config.ts`)

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 4. CSS global (`src/styles.css`)

Copia `examples/consumer-styles.css` o usa:

```css
@import "tailwindcss";
@source "../src";
@import "tw-animate-css";
@import "@mantiz/ui-theme/foundation.css";
```

Importa ese CSS en tu entry (`main.tsx`):

```ts
import "./styles.css";
```

### 5. Enlazar el paquete local en `package.json`

**Si `mantiz-theme` está dentro del proyecto:**

```json
{
  "dependencies": {
    "@mantiz/ui-theme": "file:./mantiz-theme"
  }
}
```

**Si está en carpeta hermana:**

```json
{
  "dependencies": {
    "@mantiz/ui-theme": "file:../mantiz-theme"
  }
}
```

Luego:

```bash
npm install
```

### 6. Fuente Montserrat

En `index.html` o layout raíz:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

### 7. Body base

```tsx
<body className="min-h-screen bg-background text-foreground">
```

---

## Usar tokens en TypeScript

```ts
import { MANTIZ_COLORS, UI_TYPE, MANTIZ_SURFACES } from "@mantiz/ui-theme";

// SVG / Recharts
stroke={MANTIZ_COLORS.certaintyArc}

// Tipografía de panel
<h2 className={UI_TYPE.panelTitle}>Documentos</h2>

// Card estándar
<div className={MANTIZ_SURFACES.card}>…</div>
```

---

## Clases Tailwind más usadas (look CCA)

| Uso | Clases |
|-----|--------|
| Fondo app | `bg-background` |
| Card / panel | `rounded-2xl border border-border/70 bg-card shadow-soft` |
| Header marca | `bg-brand text-brand-foreground bg-gradient-brand` |
| Botón primario | `bg-primary text-primary-foreground hover:bg-primary-hover` |
| Texto secundario | `text-muted-foreground` |
| Éxito / aviso | `text-success`, `text-warning`, `border-warning/35 bg-warning/5` |
| Hero mesh | `bg-gradient-mesh grid-bg` |
| Animación entrada | `animate-float-up` |

---

## Componentes shadcn (opcional, +10 % fidelidad)

Este paquete **no incluye** `components/ui`. Para botones, tooltips, etc. idénticos a CCA:

1. Inicializa shadcn en tu proyecto (`npx shadcn@latest init`).
2. Copia desde CCA: `src/components/ui/` y `src/lib/utils.ts`.
3. Apunta `components.json` → `"css": "src/styles.css"`.

Los componentes ya usan `primary`, `shadow-soft` y `rounded-lg` del tema.

---

## Next.js

En `app/globals.css`:

```css
@import "tailwindcss";
@source "../app";
@import "tw-animate-css";
@import "@mantiz/ui-theme/foundation.css";
```

Montserrat con `next/font/google`:

```ts
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });
```

---

## Actualizar el tema

1. Edita `mantiz-theme/src/foundation.css` o `tokens.ts` en CCA.
2. Vuelve a generar el ZIP.
3. En el otro proyecto: reemplaza la carpeta y ejecuta `npm install`.

---

## Requisitos

- React 18+
- Tailwind CSS **v4**
- Vite (recomendado) u otro bundler con soporte CSS `@import`
