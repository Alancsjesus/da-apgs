export interface Noticia {
  slug: string
  titulo: string
  resumo: string
  conteudo: string
  categoria: string
  imagem?: string
  publicado_em: string
  autor: string
}

export interface Evento {
  slug: string
  titulo: string
  descricao: string
  local: string
  data_evento: string
  tipo: string
}

export interface Documento {
  slug: string
  titulo: string
  tipo: string
  drive_url: string
  publicado_em: string
  responsavel: string
}

export interface Artigo {
  titulo: string
  autores: string[]
  resumo: string
  drive_url: string
  palavras_chave: string[]
}

export interface EdicaoRevista {
  slug: string
  volume: number
  numero: number
  ano: number
  titulo: string
  descricao: string
  drive_url: string
  artigos: Artigo[]
}

export interface Trabalho {
  slug: string
  titulo: string
  tipo: string
  autores: string[]
  orientador?: string
  ano: number
  resumo: string
  drive_url: string
  palavras_chave: string[]
}

export interface Material {
  titulo: string
  drive_url: string
  tipo: string
}

export interface Disciplina {
  slug: string
  nome: string
  semestre: number
  area: string
  ementa: string
  bibliografias: string[]
  materiais: Material[]
}

export interface DemandaPayload {
  tipo: string
  descricao: string
  anonimo: boolean
  nome?: string
  email?: string
}

export type TipoDemanda =
  | 'Acadêmica'
  | 'Assistência Estudantil'
  | 'Sugestão'
  | 'Denúncia'
  | 'Outro'
