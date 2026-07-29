/** Colores DSM en hex (para charts, canvas, SVG inline, etc.) */
export const MANTIZ_COLORS = {
  primary: "#1f7fb2",
  primaryHover: "#166a96",
  brand: "#163a53",
  brandGlow: "#1f7fb2",
  accent: "#e9eef3",
  accentForeground: "#2c5e7e",
  background: "#f7f9fb",
  foreground: "#163a53",
  card: "#ffffff",
  surface: "#f7f9fb",
  mutedForeground: "#5c7689",
  border: "#d0dae3",
  success: "#2e7d5b",
  warning: "#c48a2c",
  destructive: "#b03a3a",
  certaintyArc: "#1f7fb2",
} as const;

/** Escala tipográfica usada en la demo CCA (paneles, documentos, chat) */
export const UI_TYPE = {
  panelTitle: "text-sm font-semibold text-foreground",
  sectionLabel: "text-xs font-medium text-muted-foreground",
  body: "text-sm text-foreground",
  bodyStrong: "text-sm font-semibold text-foreground",
  docTitle: "text-xs font-semibold text-foreground",
  hint: "text-xs leading-relaxed text-muted-foreground",
  caption: "text-xs text-muted-foreground",
  badge: "text-xs font-semibold leading-tight",
  meta: "text-xs font-medium text-muted-foreground",
} as const;

/** Clases reutilizables para cards y headers de marca */
export const MANTIZ_SURFACES = {
  card: "rounded-2xl border border-border/70 bg-card p-4 shadow-soft",
  brandHeader: "bg-brand text-brand-foreground bg-gradient-brand",
  chatBubbleAgent:
    "rounded-xl rounded-tl-sm border border-border/50 bg-surface-elevated text-card-foreground",
  chatBubbleUser: "rounded-xl rounded-tr-sm bg-primary text-primary-foreground shadow-sm",
} as const;

/** URL de Google Fonts — Montserrat (pesos usados en CCA) */
export const MONTSERRAT_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap";
