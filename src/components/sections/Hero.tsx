import Link from 'next/link'
import { FileText, MessageSquare } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-gold-500/20 px-3 py-1 text-sm font-medium text-gold-300 mb-4">
            Gestão 2026
          </span>
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Diretório Acadêmico<br />
            <span className="text-gold-400">APGS / UFBA</span>
          </h1>
          <p className="mt-4 text-lg text-primary-100 leading-relaxed">
            Representação estudantil transparente, participativa e acessível.
            Aqui você encontra documentos oficiais, canais de escuta e o acervo
            acadêmico do curso de Administração Pública e Gestão Social.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/transparencia"
              className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-gold-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Ver Documentos
            </Link>
            <Link
              href="/da-escuta"
              className="inline-flex items-center gap-2 rounded-md bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              DA Escuta
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
