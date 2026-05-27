import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardBody, CardFooter, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatarDataCurta, isNovo } from '@/lib/utils'
import type { Noticia } from '@/types'

interface NewsSectionProps {
  noticias: Noticia[]
}

export default function NewsSection({ noticias }: NewsSectionProps) {
  return (
    <section className="py-16 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">Últimas Notícias</h2>
            <p className="mt-1 text-sm text-slate-500">Fique por dentro das atividades do DA</p>
          </div>
          <Link
            href="/noticias"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-primary-700 hover:underline"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.slice(0, 3).map((n) => (
            <Card key={n.slug} hover>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variante="categoria">{n.categoria}</Badge>
                  {isNovo(n.publicado_em) && <Badge variante="novo">Novo</Badge>}
                </div>
                <h3 className="mt-3 font-semibold text-primary-900 leading-snug line-clamp-2">
                  {n.titulo}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-slate-600 line-clamp-3">{n.resumo}</p>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {formatarDataCurta(n.publicado_em)}
                </span>
                <Link
                  href={`/noticias/${n.slug}`}
                  className="text-xs font-medium text-primary-700 hover:underline"
                >
                  Leia mais →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
