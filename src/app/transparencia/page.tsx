import { Metadata } from 'next'
import { FileText, Download, Clock } from 'lucide-react'
import { conteudo } from '@/lib/content-static'
import { Card, CardBody } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatarDataCurta, isNovo } from '@/lib/utils'

export const metadata: Metadata = { title: 'Transparência' }

const ABAS = [
  { key: 'atas',       label: 'Atas de Reuniões' },
  { key: 'relatorios', label: 'Relatórios Mensais' },
  { key: 'prestacoes', label: 'Prestações de Contas' },
] as const

function getData() {
  return {
    atas:       conteudo.atas(),
    relatorios: conteudo.relatorios(),
    prestacoes: conteudo.prestacoes(),
  }
}

function ListaDocumentos({ docs, tipo }: { docs: Documento[]; tipo: string }) {
  if (docs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-400">
        Nenhum documento publicado ainda.
      </p>
    )
  }
  return (
    <div className="space-y-3">
      {docs.map((d) => (
        <Card key={d.slug} hover>
          <CardBody className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-start gap-3 min-w-0">
              <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-primary-900 text-sm">{d.titulo}</span>
                  {isNovo(d.publicado_em) && <Badge variante="novo">Novo</Badge>}
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  {formatarDataCurta(d.publicado_em)} · {d.responsavel}
                </p>
              </div>
            </div>
            <a
              href={d.drive_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-800 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </a>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default function TransparenciaPage() {
  const { atas, relatorios, prestacoes } = getData()
  const dados = { atas, relatorios, prestacoes }

  return (
    <div className="page-container">
      <div className="mb-10">
        <h1 className="section-title text-3xl">Transparência</h1>
        <p className="section-subtitle mt-2 max-w-xl">
          Documentos publicados em até 10 dias úteis conforme nosso Estatuto.
          Todos os arquivos são públicos e acessíveis sem cadastro.
        </p>
      </div>

      <div className="space-y-12">
        {ABAS.map(({ key, label }) => (
          <section key={key}>
            <h2 className="mb-4 font-serif text-xl font-bold text-primary-800 border-b border-slate-200 pb-2">
              {label}
            </h2>
            <ListaDocumentos docs={dados[key]} tipo={key} />
          </section>
        ))}
      </div>
    </div>
  )
}
