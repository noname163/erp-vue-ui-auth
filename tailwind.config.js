export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2E7DFF', 600: '#1F6BEB', tint: '#E6F0FF' },
        surface: 'var(--bg-surface)',
        canvas: 'var(--bg-canvas)',
        text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)', muted: 'var(--text-muted)' },
        border: { subtle: 'var(--border-subtle)', strong: 'var(--border-strong)' },
        success: '#12B76A', warning: '#F79009', danger: '#E5484D', info: '#2E90FA'
      },
      boxShadow: { elev1:'0 1px 2px rgba(0,0,0,0.05)', elev2:'0 4px 12px rgba(0,0,0,0.08)', elev3:'0 10px 24px rgba(0,0,0,0.10)' },
      borderRadius: { sm:'6px', md:'10px', lg:'14px', pill:'999px' },
      spacing: { 0:'0px', 1:'4px', 2:'8px', 3:'12px', 4:'16px', 6:'24px', 8:'32px', 12:'48px' }
    }
  }
}
