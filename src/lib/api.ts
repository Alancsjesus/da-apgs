import type {
  Noticia,
  Evento,
  Documento,
  EdicaoRevista,
  Trabalho,
  Disciplina,
  DemandaPayload,
} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API ${path} retornou ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  noticias: {
    list: () => get<Noticia[]>('/noticias'),
    get: (slug: string) => get<Noticia>(`/noticias/${slug}`),
  },
  eventos: {
    list: () => get<Evento[]>('/eventos'),
  },
  transparencia: {
    atas: () => get<Documento[]>('/transparencia/atas'),
    relatorios: () => get<Documento[]>('/transparencia/relatorios'),
    prestacoes: () => get<Documento[]>('/transparencia/prestacoes'),
  },
  revista: {
    list: () => get<EdicaoRevista[]>('/revista'),
    get: (slug: string) => get<EdicaoRevista>(`/revista/${slug}`),
  },
  acervo: {
    trabalhos: () => get<Trabalho[]>('/acervo/trabalhos'),
    disciplinas: () => get<Disciplina[]>('/acervo/disciplinas'),
  },
  escuta: {
    submeter: (payload: DemandaPayload) =>
      fetch(`${BASE_URL}/api/v1/escuta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((r) => r.json()),
  },
}
