import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import NewsSection from '@/components/sections/NewsSection'
import { conteudo } from '@/lib/content-static'
import { MapPin } from 'lucide-react'

// Site estático: dados lidos dos JSONs em tempo de build
function getData() {
  return {
    noticias: conteudo.noticias(),
    eventos:  conteudo.eventos(),
  }
}

export default function HomePage() {
  const { noticias, eventos } = getData()

  return (
    <>
      <Hero />
      <StatsSection />
      <NewsSection noticias={noticias} />

      {/* Próximos eventos */}
      {eventos.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="section-title mb-8">Próximos Eventos</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {eventos.slice(0, 3).map((e) => (
                <div
                  key={e.slug}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-white min-w-[52px]">
                    <span className="text-xl font-bold leading-none">
                      {new Date(e.data_evento).getDate()}
                    </span>
                    <span className="text-xs uppercase">
                      {new Date(e.data_evento).toLocaleString('pt-BR', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 text-sm leading-snug">{e.titulo}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" /> {e.local}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
