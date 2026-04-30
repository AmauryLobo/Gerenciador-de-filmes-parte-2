import { Filme } from './types';

const KEY = 'meus-filmes';

export const listarFilmes = (): Filme[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) || '[]');
};

export const salvarFilme = (filme: Filme): boolean => {
  const lista = listarFilmes();
  if (lista.find(f => f.id === filme.id)) return false;
  localStorage.setItem(KEY, JSON.stringify([filme, ...lista]));
  return true;
};

export const removerFilme = (id: string): void => {
  const lista = listarFilmes().filter(f => f.id !== id);
  localStorage.setItem(KEY, JSON.stringify(lista));
};

export const toggleStatus = (id: string): void => {
  const lista = listarFilmes().map(f =>
    f.id === id
      ? { ...f, status: f.status === 'assistido' ? 'pendente' : 'assistido' as const }
      : f
  );
  localStorage.setItem(KEY, JSON.stringify(lista));
};