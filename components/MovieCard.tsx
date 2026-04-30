'use client';

import { Filme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Props {
  filme: Filme;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function MovieCard({ filme, onRemove, onToggle }: Props) {
  return (
    <div style={{
      backgroundColor: "#1a1f3a",
      borderRadius: "12px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      border: "1px solid #2a2f4a",
    }}>
      <img
        src={filme.poster}
        alt={filme.title}
        style={{ width: "100%", height: "280px", objectFit: "cover" }}
      />
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <h3 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: "bold" }}>{filme.title}</h3>
        <p style={{ color: "#aaa", fontSize: "0.8rem" }}>{filme.year}</p>
        <Badge
          variant={filme.status === 'assistido' ? 'default' : 'secondary'}
          style={{
            width: "fit-content",
            backgroundColor: filme.status === 'assistido' ? '#16a34a' : '#2a2f4a',
            color: filme.status === 'assistido' ? 'white' : '#aaa',
          }}
        >
          {filme.status === 'assistido' ? '✅ Assistido' : '⏳ Pendente'}
        </Badge>
        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggle(filme.id)}
            style={{ flex: 1, fontSize: "0.75rem", borderColor: "#3a3f5a", color: "#fff" }}
          >
            Alternar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onRemove(filme.id)}
            style={{ fontSize: "0.75rem" }}
          >
            Remover
          </Button>
        </div>
      </div>
    </div>
  );
}