'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Newspaper, Calendar, FileText,
  BookOpen, GraduationCap, MessageSquare, LogOut, BookMarked
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SENHA_ADMIN = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'daapgs2026'

const NAV = [
  { href: '/admin',                icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/noticias',       icon: Newspaper,        label: 'Notícias' },
  { href: '/admin/eventos',        icon: Calendar,         label: 'Eventos' },
  { href: '/admin/transparencia',  icon: FileText,         label: 'Transparência' },
  { href: '/admin/revista',        icon: BookOpen,         label: 'Revista' },
  { href: '/admin/acervo',         icon: GraduationCap,    label: 'Acervo' },
  { href: '/admin/escuta',         icon: MessageSquare,    label: 'DA Escuta' },
]

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (senha === SENHA_ADMIN) {
      sessionStorage.setItem('admin_auth', '1')
      onLogin()
    } else {
      setErro(true)
    }
  }

  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <BookMarked className="mx-auto h-10 w-10 text-primary-700 mb-2" />
          <h1 className="font-serif text-xl font-bold text-primary-900">Painel Admin</h1>
          <p className="mt-1 text-xs text-slate-500">DA APGS / UFBA — Gestão 2026</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => { setSenha(e.target.value); setErro(false) }}
              placeholder="••••••••"
              className={cn(
                'w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2',
                erro
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-slate-300 focus:ring-primary-600'
              )}
            />
            {erro && <p className="mt-1 text-xs text-red-600">Senha incorreta.</p>}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary-700 py-2 text-sm font-medium text-white hover:bg-primary-800 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [autenticado, setAutenticado] = useState(false)
  const [verificando, setVerificando] = useState(true)

  useEffect(() => {
    setAutenticado(sessionStorage.getItem('admin_auth') === '1')
    setVerificando(false)
  }, [])

  if (verificando) return null
  if (!autenticado) return <LoginScreen onLogin={() => setAutenticado(true)} />

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-primary-900 text-white flex flex-col">
        <div className="px-5 py-4 border-b border-primary-700">
          <p className="font-serif font-bold text-sm">DA APGS Admin</p>
          <p className="text-xs text-primary-300">Gestão 2026</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-primary-700 text-gold-400'
                  : 'text-primary-200 hover:bg-primary-800 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-primary-700">
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAutenticado(false) }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary-300 hover:bg-primary-800 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
