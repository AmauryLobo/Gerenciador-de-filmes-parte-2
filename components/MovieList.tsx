'use client';

import { useState, useMemo } from 'react';
import { Filme } from '@/lib/types';
import { MovieCard } from './MovieCard';
import { Button } from '@/components/ui/button';

type Filtro = 'todos' | 'assistido' | 'pendente';

interface Props {
  filmes: Filme[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function MovieList({ filmes, onRemove, onToggle }: Props) {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const filtrados = useMemo(() =>
    filtro === 'todos' ? filmes : filmes.filter(f => f.status === filtro),
    [filmes, filtro]
  );

  const assistidos = filmes.filter(f => f.status === 'assistido').length;

  if (filmes.length === 0) {
    return (
      <p style={{ color: "#aaa", textAlign: "center", padding: "60px 0", fontSize: "1.1rem" }}>
        Nenhum filme salvo ainda. Busque um filme acima! 🎬
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
          {filmes.length} filmes • {assistidos} assistidos
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          {(['todos', 'assistido', 'pendente'] as Filtro[]).map(f => (
            <Button
              key={f}
              size="sm"
              onClick={() => setFiltro(f)}
              style={{
                backgroundColor: filtro === f ? "#e50914" : "#1a1f3a",
                color: "white",
                border: "1px solid #3a3f5a",
                borderRadius: "20px",
              }}
            >
              {f === 'todos' ? 'Todos' : f === 'assistido' ? 'Assistidos' : 'Pendentes'}
            </Button>
          ))}
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
      }}>
        {filtrados.map(f => (
          <MovieCard key={f.id} filme={f} onRemove={onRemove} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}