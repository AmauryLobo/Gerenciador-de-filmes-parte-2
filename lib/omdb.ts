import { Filme } from './types';

export async function buscarFilme(titulo: string): Promise<Filme | null> {
  const key = 'b8416258';
  if (!titulo.trim()) return null;

  try {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${key}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    if (data.Response === 'False') return null;

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster !== 'N/A' ? data.Poster : '/no-poster.png',
      genre: data.Genre,
      plot: data.Plot,
      status: 'pendente',
      savedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
    return null;
  }
}