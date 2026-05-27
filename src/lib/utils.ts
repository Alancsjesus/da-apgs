import { format, formatDistanceToNow, isWithinInterval, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatarData(iso: string): string {
  return format(new Date(iso), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function formatarDataCurta(iso: string): string {
  return format(new Date(iso), 'dd/MM/yyyy', { locale: ptBR })
}

export function tempoRelativo(iso: string): string {
  return formatDistanceToNow(new Date(iso), { locale: ptBR, addSuffix: true })
}

export function isNovo(iso: string, dias = 10): boolean {
  const data = new Date(iso)
  return isWithinInterval(data, { start: subDays(new Date(), dias), end: new Date() })
}

export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
