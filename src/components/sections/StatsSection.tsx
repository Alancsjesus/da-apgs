import { Users, FileText, BookOpen, MessageSquare } from 'lucide-react'

const STATS = [
  { icon: Users,         valor: '400+', label: 'Estudantes Representados' },
  { icon: FileText,      valor: '100%', label: 'Transparência Pública' },
  { icon: BookOpen,      valor: 'Open', label: 'Acervo Livre' },
  { icon: MessageSquare, valor: '7d',   label: 'Prazo de Resposta' },
]

export default function StatsSection() {
  return (
    <section className="bg-primary-800 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map(({ icon: Icon, valor, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="mb-2 rounded-full bg-primary-700 p-3">
                <Icon className="h-5 w-5 text-gold-400" />
              </div>
              <span className="font-serif text-2xl font-bold text-gold-400">{valor}</span>
              <span className="mt-1 text-xs text-primary-200">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
