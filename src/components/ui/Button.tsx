import { cn } from '@/lib/utils'

type Variante = 'primario' | 'secundario' | 'outline' | 'ghost'
type Tamanho  = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  tamanho?: Tamanho
  loading?: boolean
}

const variantes: Record<Variante, string> = {
  primario:   'bg-primary-700 text-white hover:bg-primary-800 focus-visible:ring-primary-600',
  secundario: 'bg-gold-500 text-white hover:bg-gold-600 focus-visible:ring-gold-400',
  outline:    'border border-primary-700 text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-600',
  ghost:      'text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-600',
}

const tamanhos: Record<Tamanho, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variante = 'primario',
  tamanho = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantes[variante],
        tamanhos[tamanho],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
