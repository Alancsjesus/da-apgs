import { Metadata } from 'next'
import { Download, BookOpen, ExternalLink } from 'lucide-react'
import { conteudo } from '@/lib/content-static'
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = { title: 'Revista Saber em Movimento' }

export default function RevistaPage() {
  const edicoes = conteudo.revista()

  return (
    <div className="page-container">
      {/* Cabeçalho */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="section-title text-3xl">Saber em Movimento</h1>
          <p className="section-subtitle mt-2 max-w-xl">
            Revista estudantil de Administração Pública e Gestão Social da UFBA.
            Publicação semestral em modelo Open Access — livre para ler, baixar e citar.
          </p>
        </div>
        <a
          href="mailto:da.apgs.ufba@gmail.com?subject=Submissão de Artigo – Saber em Movimento"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-md bg-gold-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-gold-600 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Submeter Artigo
        </a>
      </div>

      {edicoes.length === 0 ? (
        <div className="rounded-xl bg-primary-50 p-12 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-primary-300 mb-3" />
          <p className="text-sm text-primary-600">A primeira edição será publicada em breve.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {edicoes.map((e) => (
            <Card key={e.slug}>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variante="tipo">Vol. {e.volume} Nº {e.numero}</Badge>
                  <Badge variante="semestre">{e.ano}</Badge>
                </div>
                <h2 className="font-serif text-xl font-bold text-primary-900">{e.titulo}</h2>
                <p className="mt-1 text-sm text-slate-500">{e.descricao}</p>
              </CardHeader>

              {e.artigos?.length > 0 && (
                <CardBody>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Artigos desta edição
                  </h3>
                  <div className="divide-y divide-slate-100">
                    {e.artigos.map((a, i) => (
                      <div key={i} className="py-3 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-primary-800">{a.titulo}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{a.autores.join(', ')}</p>
                        </div>
                        <a
                          href={a.drive_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-primary-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </CardBody>
              )}

              <CardFooter className="flex justify-end">
                <a
                  href={e.drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Baixar edição completa
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
