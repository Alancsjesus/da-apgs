import Link from 'next/link'
import { Instagram, Mail, BookOpen } from 'lucide-react'

export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-primary-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Identidade */}
          <div>
            <div className="flex items-center gap-2 text-white mb-3">
              <BookOpen className="h-5 w-5 text-gold-400" />
              <span className="font-serif font-bold">DA APGS / UFBA</span>
            </div>
            <p className="text-sm leading-relaxed">
              Diretório Acadêmico de Administração Pública e Gestão Social —
              Escola de Administração da UFBA. Gestão 2026.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/transparencia', label: 'Transparência' },
                { href: '/da-escuta',     label: 'DA Escuta (Ouvidoria)' },
                { href: '/revista',       label: 'Revista Saber em Movimento' },
                { href: '/acervo',        label: 'Acervo Acadêmico' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Contato
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:da.apgs.ufba@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                da.apgs.ufba@gmail.com
              </a>
              <a
                href="https://instagram.com/da.apgs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @da.apgs
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-700 pt-6 text-center text-xs text-primary-400">
          © {ano} Diretório Acadêmico APGS/UFBA — Código aberto e transparente.
        </div>
      </div>
    </footer>
  )
}
