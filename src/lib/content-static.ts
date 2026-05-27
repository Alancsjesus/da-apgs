/**
 * Leitura de conteúdo em tempo de BUILD (Node.js fs).
 * Usado nas Server Components do Next.js para gerar páginas estáticas.
 * Não depende de nenhum backend em runtime — tudo vira HTML puro no output/.
 */
import { readFileSync } from 'fs'
import { join } from 'path'
import type {
  Noticia, Evento, Documento, EdicaoRevista, Trabalho, Disciplina,
} from '@/types'

const CONTENT_ROOT = join(process.cwd(), 'content')

function ler<T>(caminho: string): T {
  try {
    return JSON.parse(readFileSync(join(CONTENT_ROOT, caminho), 'utf-8')) as T
  } catch {
    return [] as unknown as T
  }
}

export const conteudo = {
  noticias:    () => ler<Noticia[]>('noticias/index.json'),
  eventos:     () => ler<Evento[]>('eventos/index.json'),
  atas:        () => ler<Documento[]>('transparencia/atas.json'),
  relatorios:  () => ler<Documento[]>('transparencia/relatorios.json'),
  prestacoes:  () => ler<Documento[]>('transparencia/prestacoes.json'),
  revista:     () => ler<EdicaoRevista[]>('revista/index.json'),
  trabalhos:   () => ler<Trabalho[]>('acervo/trabalhos.json'),
  disciplinas: () => ler<Disciplina[]>('acervo/disciplinas.json'),
}
