import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | DA APGS – UFBA',
    default: 'DA APGS – Diretório Acadêmico UFBA',
  },
  description:
    'Portal oficial do Diretório Acadêmico de Administração Pública e Gestão Social da UFBA. Transparência, acervo acadêmico e canais de ouvidoria estudantil.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'DA APGS / UFBA',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
