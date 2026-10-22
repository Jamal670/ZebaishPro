// utils/colorUtils.ts
// Swatch color resolver for fashion and fabric colors

const REJECTED_COLOR_KEYWORDS = new Set([
  'transparent',
  'inherit',
  'initial',
  'unset',
  'currentcolor',
]);

const FASHION_COLOR_MAP: Record<string, string> = {
  maroon: '#800000',
  mustard: '#FFDB58',
  mehndi: '#556B2F',
  mehendi: '#556B2F',
  peach: '#FFE5B4',
  'off white': '#FAF9F6',
  'off-white': '#FAF9F6',
  offwhite: '#FAF9F6',
  beige: '#F5F5DC',
  fawn: '#E5AA70',
  zinc: '#71717A',
  rust: '#B7410E',
  pista: '#93C572',
  pistachio: '#93C572',
  lilac: '#C8A2C8',
  lavender: '#E6E6FA',
  mauve: '#E0B0FF',
  plum: '#DDA0DD',
  burgundy: '#800020',
  teal: '#008080',
  coral: '#FF7F50',
  camel: '#C19A6B',
  copper: '#B87333',
  charcoal: '#36454F',
  emerald: '#065F46',
  crimson: '#990000',
  gold: '#D97706',
  indigo: '#1E3A8A',
  navy: '#0F172A',
};

const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const STANDARD_CSS_COLORS = new Set([
  'black',
  'white',
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'pink',
  'orange',
  'brown',
  'gray',
  'grey',
  'navy',
  'cyan',
  'magenta',
  'silver',
  'gold',
  'olive',
  'lime',
  'aqua',
  'violet',
  'indigo',
  'khaki',
  'coral',
  'salmon',
  'turquoise',
  'tan',
  'crimson',
  'chocolate',
  'beige',
  'maroon',
  'plum',
  'teal',
]);

/**
 * Resolves a swatch color from a DB color code or fashion/standard color name.
 * Returns a valid CSS color string or null if unresolvable.
 */
export function resolveSwatchColor(
  colorCode?: string | null,
  colorName?: string | null
): string | null {
  // 1. Check colorCode
  if (colorCode && typeof colorCode === 'string') {
    const trimmedCode = colorCode.trim();
    if (trimmedCode) {
      if (HEX_COLOR_REGEX.test(trimmedCode)) {
        return trimmedCode;
      }
      if (
        typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        CSS.supports('color', trimmedCode)
      ) {
        const lowerCode = trimmedCode.toLowerCase();
        if (!REJECTED_COLOR_KEYWORDS.has(lowerCode)) {
          return trimmedCode;
        }
      }
    }
  }

  // 2. Check colorName
  if (!colorName || typeof colorName !== 'string') {
    return null;
  }

  const trimmedName = colorName.trim().toLowerCase();
  if (!trimmedName || REJECTED_COLOR_KEYWORDS.has(trimmedName)) {
    return null;
  }

  // Check fashion color map first for Pakistani / multi-word fashion names
  if (FASHION_COLOR_MAP[trimmedName]) {
    return FASHION_COLOR_MAP[trimmedName];
  }

  // Check if valid CSS named color in browser
  if (
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('color', trimmedName)
  ) {
    return trimmedName;
  }

  // SSR fallback for standard CSS colors
  if (STANDARD_CSS_COLORS.has(trimmedName)) {
    return trimmedName;
  }

  return null;
}
