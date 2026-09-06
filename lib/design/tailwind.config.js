/* ============================================================
 * lib/design/tailwind.config.js
 * Shared Tailwind runtime config (M3 tokens).
 * Must be loaded AFTER lib/design/tailwindcss.js so the global
 * `tailwind` object exists.
 * ============================================================ */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        m3: {
          surface: 'rgb(var(--bg-rgb) / <alpha-value>)',
          surfaceContainer: 'rgb(var(--surface-rgb) / <alpha-value>)',
          surfaceContainerHigh: 'rgb(var(--surface-high-rgb) / <alpha-value>)',
          primary: 'rgb(var(--accent-rgb) / <alpha-value>)',
          onPrimary: '#ffffff',
          primaryContainer: ({ opacityValue = 1 }) => `rgb(var(--accent-rgb) / calc(var(--accent-dim-alpha) * ${opacityValue}))`,
          onPrimaryContainer: 'rgb(var(--accent-on-rgb) / <alpha-value>)',
          outline: 'rgb(var(--outline-rgb) / <alpha-value>)',
          outlineVariant: 'rgb(var(--border-rgb) / <alpha-value>)',
          onSurface: 'rgb(var(--text-rgb) / <alpha-value>)',
          onSurfaceVariant: 'rgb(var(--muted-rgb) / <alpha-value>)'
        }
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'HarmonyOS Sans', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      borderRadius: {
        'm3-xs': '4px',
        'm3-sm': '8px',
        'm3-md': '12px',
        'm3-lg': '16px',
        'm3-xl': '24px',
        'm3-full': '9999px',
      }
    }
  }
};
