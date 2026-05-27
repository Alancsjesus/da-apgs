import { Newspaper, FileText, MessageSquare, BookOpen, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const ATALHOS = [
  {
    href: '/admin/noticias',
    icon: Newspaper,
    titulo: 'Nova Notícia',
    descricao: 'Publicar comunicado ou notícia',
    cor: 'bg-blue-50 text-blue-700 ring-blue-200',
  },
  {
    href: '/admin/transparencia',
    icon: FileText,
    titulo: 'Novo Documento',
    descricao: 'Publicar ata, relatório ou prestação de contas',
    cor: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  {
    href: '/admin/escuta',
    icon: MessageSquare,
    titulo: 'Ver Demandas',
    descricao: 'Responder as solicitações da ouvidoria',
    cor: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  {
    href: '/admin/revista',
    icon: BookOpen,
    titulo: 'Publicar Edição',
    descricao: 'Cadastrar nova edição da revista',
    cor: 'bg-purple-50 text-purple-700 ring-purple-200',
  },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-primary-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Bem-vindo ao painel de gerenciamento do DA APGS.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
        {ATALHOS.map(({ href, icon: Icon, titulo, descricao, cor }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 hover:shadow-md transition-shadow ${cor}`}
          >
            <div className={`rounded-lg p-3 ring-1 ${cor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-800">{titulo}</p>
              <p className="text-xs text-slate-500 mt-0.5">{descricao}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl bg-primary-50 border border-primary-100 p-5">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-primary-600" />
          <h2 className="text-sm font-semibold text-primary-800">Lembretes de Gestão</h2>
        </div>
        <ul className="space-y-1.5 text-sm text-primary-700">
          <li>• Atas devem ser publicadas em até <strong>10 dias úteis</strong> após cada reunião.</li>
          <li>• Relatórios mensais devem ser publicados até o <strong>5º dia útil</strong> do mês seguinte.</li>
          <li>• Demandas da DA Escuta devem ser respondidas em <strong>7 dias úteis</strong>.</li>
        </ul>
      </div>
    </div>
  )
}
