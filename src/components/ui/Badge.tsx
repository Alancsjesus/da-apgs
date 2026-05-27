import { cn } from '@/lib/utils'

type Variante = 'novo' | 'categoria' | 'tipo' | 'semestre'

interface BadgeProps {
  children: React.ReactNode
  variante?: Variante
  className?: string
}

const estilos: Record<Variante, string> = {
  novo:      'bg-emerald-100 text-emerald-800',
  categoria: 'bg-primary-100 text-primary-800',
  tipo:      'bg-gold-100 text-gold-800',
  semestre:  'bg-slate-100 text-slate-700',
}

export default function Badge({ children, variante = 'categoria', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        estilos[variante],
        className
      )}
    >
      {children}
    </span>
  )
}
