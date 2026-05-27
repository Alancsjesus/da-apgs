'use client'

import { useState } from 'react'
import { Send, Shield, Clock, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'
import type { TipoDemanda } from '@/types'

const TIPOS: TipoDemanda[] = [
  'Acadêmica',
  'Assistência Estudantil',
  'Sugestão',
  'Denúncia',
  'Outro',
]

export default function DAEscutaPage() {
  const [anonimo, setAnonimo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErro('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await api.escuta.submeter({
        tipo:      data.get('tipo') as string,
        descricao: data.get('descricao') as string,
        anonimo,
        nome:  anonimo ? undefined : (data.get('nome') as string),
        email: anonimo ? undefined : (data.get('email') as string),
      })
      setEnviado(true)
      form.reset()
    } catch {
      setErro('Não foi possível enviar. Tente novamente ou entre em contato pelo e-mail.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title text-3xl">DA Escuta</h1>
        <p className="section-subtitle mt-2">
          Canal seguro e confidencial para demandas acadêmicas e de assistência estudantil.
        </p>
      </div>

      {/* Garantias */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: Shield, texto: 'Anonimato opcional garantido' },
          { icon: Clock,  texto: 'Resposta em até 7 dias úteis' },
          { icon: CheckCircle, texto: 'Toda demanda é registrada' },
        ].map(({ icon: Icon, texto }) => (
          <div key={texto} className="flex items-center gap-3 rounded-lg bg-primary-50 px-4 py-3">
            <Icon className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span className="text-sm text-primary-800">{texto}</span>
          </div>
        ))}
      </div>

      {enviado ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-3" />
          <h2 className="font-serif text-xl font-bold text-emerald-800">Demanda Registrada!</h2>
          <p className="mt-2 text-sm text-emerald-700">
            Recebemos sua mensagem. Retornaremos em até 7 dias úteis.
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="mt-4 text-sm text-emerald-600 hover:underline"
          >
            Enviar outra demanda
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-5">

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Tipo de demanda <span className="text-red-500">*</span>
            </label>
            <select
              name="tipo"
              required
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            >
              <option value="">Selecione...</option>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Descreva sua demanda <span className="text-red-500">*</span>
            </label>
            <textarea
              name="descricao"
              required
              minLength={20}
              rows={5}
              placeholder="Explique detalhadamente sua demanda, sugestão ou denúncia..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          {/* Toggle anonimato */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAnonimo(!anonimo)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                anonimo ? 'bg-primary-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  anonimo ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-slate-700">Enviar de forma anônima</span>
          </div>

          {/* Identificação (opcional) */}
          {!anonimo && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail para retorno</label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
            </div>
          )}

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <Button type="submit" loading={loading} tamanho="lg" className="w-full">
            <Send className="h-4 w-4" />
            Enviar Demanda
          </Button>
        </form>
      )}
    </div>
  )
}
