'use client';

import { useState, useEffect, useCallback } from 'react';
import { Filme } from '@/lib/types';
import { listarFilmes, salvarFilme, removerFilme, toggleStatus } from '@/lib/storage';
import { SearchBar } from '@/components/SearchBar';
import { MovieResult } from '@/components/MovieResult';
import { MovieList } from '@/components/MovieList';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [resultado, setResultado] = useState<Filme | null>(null);
  const [mensagem, setMensagem] = useState('');

  const recarregar = useCallback(() => setFilmes(listarFilmes()), []);
  useEffect(() => { recarregar(); }, [recarregar]);

  const handleResult = (filme: Filme | null) => {
    if (!filme) return setMensagem('Filme não encontrado.');
    setResultado(filme);
    setMensagem('');
  };

  const handleSalvar = (filme: Filme) => {
    const salvo = salvarFilme(filme);
    if (!salvo) return setMensagem('Filme já está na lista!');
    setResultado(null);
    setMensagem('');
    recarregar();
  };

  const handleRemove = (id: string) => { removerFilme(id); recarregar(); };
  const handleToggle = (id: string) => { toggleStatus(id); recarregar(); };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27" }}>
      {/* HEADER */}
      <div style={{ backgroundColor: "#0a0e27", padding: "40px 20px 20px" }}>
        <h1 style={{ textAlign: "center", color: "#e50914", fontSize: "2.5rem", marginBottom: "8px", fontWeight: "bold" }}>
          🎬 Gerenciador de Filmes
        </h1>
        <p style={{ textAlign: "center", color: "#ccc", marginBottom: "30px" }}>
          Busque, salve e organize seus filmes favoritos
        </p>

        {/* BUSCA */}
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <SearchBar onResult={handleResult} />
          {mensagem && (
            <Alert variant="destructive" className="mt-3">
              <AlertDescription>{mensagem}</AlertDescription>
            </Alert>
          )}
          {resultado && <MovieResult filme={resultado} onSalvar={handleSalvar} />}
        </div>
      </div>

      {/* LISTA */}
      <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
        <h2 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "20px" }}>
          🎞️ Minha Lista ({filmes.length})
        </h2>
        <MovieList filmes={filmes} onRemove={handleRemove} onToggle={handleToggle} />
      </div>
    </div>
  );
}