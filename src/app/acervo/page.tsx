import { Metadata } from 'next'
import { Download, BookOpen, GraduationCap } from 'lucide-react'
import { conteudo } from '@/lib/content-static'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = { title: 'Acervo Acadêmico' }

export default function AcervoPage() {
  const trabalhos  = conteudo.trabalhos()
  const disciplinas = conteudo.disciplinas()

  const semestres = [...new Set(disciplinas.map((d) => d.semestre))].sort((a, b) => a - b)

  return (
    <div className="page-container">
      <div className="mb-10">
        <h1 className="section-title text-3xl">Acervo Acadêmico</h1>
        <p className="section-subtitle mt-2 max-w-xl">
          Repositório de trabalhos estudantis e materiais de apoio organizados por disciplina.
        </p>
      </div>

      {/* Trabalhos */}
      <section className="mb-14">
        <h2 className="font-serif text-xl font-bold text-primary-800 border-b border-slate-200 pb-2 mb-6">
          Repositório de Trabalhos
        </h2>
        {trabalhos.length === 0 ? (
          <p className="text-sm text-slate-400">Nenhum trabalho publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trabalhos.map((t) => (
              <Card key={t.slug} hover>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variante="tipo">{t.tipo}</Badge>
                    <Badge variante="semestre">{t.ano}</Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-primary-900 leading-snug line-clamp-2">
                    {t.titulo}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">{t.autores.join(', ')}</p>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-xs text-slate-600 line-clamp-3">{t.resumo}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.palavras_chave?.slice(0, 3).map((p) => (
                      <span key={p} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {p}
                      </span>
                    ))}
                  </div>
                  <a
                    href={t.drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-700 hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" /> Baixar PDF
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Disciplinas por semestre */}
      <section>
        <h2 className="font-serif text-xl font-bold text-primary-800 border-b border-slate-200 pb-2 mb-6">
          Central de Disciplinas
        </h2>
        {semestres.length === 0 ? (
          <p className="text-sm text-slate-400">Conteúdo em preparação.</p>
        ) : (
          <div className="space-y-8">
            {semestres.map((sem) => {
              const disc = disciplinas.filter((d) => d.semestre === sem)
              return (
                <div key={sem}>
                  <h3 className="mb-4 flex items-center gap-2 font-semibold text-primary-700">
                    <GraduationCap className="h-4 w-4" />
                    {sem}º Semestre
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {disc.map((d) => (
                      <Card key={d.slug}>
                        <CardBody className="py-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-primary-900">{d.nome}</p>
                              <Badge variante="categoria" className="mt-1">{d.area}</Badge>
                            </div>
                          </div>
                          {d.materiais?.length > 0 && (
                            <div className="mt-3 space-y-1">
                              {d.materiais.map((m) => (
                                <a
                                  key={m.titulo}
                                  href={m.drive_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs text-primary-600 hover:underline"
                                >
                                  <BookOpen className="h-3 w-3" /> {m.titulo}
                                </a>
                              ))}
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
