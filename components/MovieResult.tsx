'use client';

import { Filme } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface Props {
  filme: Filme;
  onSalvar: (filme: Filme) => void;
}

export function MovieResult({ filme, onSalvar }: Props) {
  return (
    <div style={{
      display: "flex",
      gap: "16px",
      marginTop: "16px",
      padding: "16px",
      backgroundColor: "#1a1f3a",
      borderRadius: "12px",
      border: "1px solid #2a2f4a",
    }}>
      <img
        src={filme.poster}
        alt={filme.title}
        style={{ width: "100px", height: "150px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "6px" }}>
          {filme.title}
        </h3>
        <p style={{ color: "#ffd700", fontSize: "0.85rem", marginBottom: "8px" }}>
          {filme.year} • {filme.genre}
        </p>
        <p style={{ color: "#ccc", fontSize: "0.9rem", marginBottom: "12px", lineHeight: 1.5 }}>
          {filme.plot}
        </p>
        <Button onClick={() => onSalvar(filme)} style={{ backgroundColor: "#e50914", color: "white", border: "none" }}>
          ➕ Salvar na lista
        </Button>
      </div>
    </div>
  );
}