'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/',              label: 'Início' },
  { href: '/transparencia', label: 'Transparência' },
  { href: '/da-escuta',     label: 'DA Escuta' },
  { href: '/revista',       label: 'Revista' },
  { href: '/acervo',        label: 'Acervo' },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-primary-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <BookOpen className="h-6 w-6 text-gold-400" />
            <span className="font-serif text-lg font-bold leading-tight">
              DA APGS<span className="text-gold-400">/UFBA</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-primary-700 text-gold-400'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden rounded-md p-2 text-primary-100 hover:bg-primary-700"
            onClick={() => setAberto(!aberto)}
            aria-label="Menu"
          >
            {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {aberto && (
        <nav className="md:hidden border-t border-primary-700 bg-primary-800 px-4 pb-4 pt-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setAberto(false)}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-primary-700 text-gold-400'
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
