import Link from "next/link";

interface MovieDetail {
  Title: string;
  Poster: string;
  Plot: string;
  Year: string;
  Genre: string;
}

async function getMovie(id: string): Promise<MovieDetail | null> {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=b8416258`,
    { cache: "no-store" }
  );

  const text = await res.text();
  console.log("RESPOSTA BRUTA:", text);

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Erro ao converter JSON");
    return null;
  }
}

export default async function MoviePage({ params }: any) {
  const { id } = await params;

  const movie = await getMovie(id);

  if (!movie) {
    return <p>Erro ao carregar filme...</p>;
  }

  const genres = movie.Genre ? movie.Genre.split(",").map((g) => g.trim()) : [];

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>{movie.Title}</h1>

        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          style={styles.poster}
        />

        <p style={styles.year}><strong>Ano:</strong> {movie.Year}</p>

        {genres.length > 0 && (
          <div style={styles.genreContainer}>
            {genres.map((genre) => (
              <span key={genre} style={styles.genreBadge}>
                {genre}
              </span>
            ))}
          </div>
        )}

        <p style={styles.plot}>{movie.Plot}</p>

        <Link href="/" style={styles.backLink}>
          ← Voltar
        </Link>
      </div>
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: "#0a0e27",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
  },
  title: {
    color: "#fff",
    fontSize: "2rem",
    marginBottom: "24px",
  },
  poster: {
    width: "300px",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    marginBottom: "20px",
  },
  year: {
    color: "#ccc",
    fontSize: "1rem",
    marginBottom: "12px",
  },
  genreContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  genreBadge: {
    backgroundColor: "#1a1f3a",
    color: "#ffd700",
    border: "1px solid #3a3f5a",
    padding: "4px 14px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "bold" as const,
  },
  plot: {
    color: "#ccc",
    fontSize: "1rem",
    lineHeight: "1.7",
    marginBottom: "28px",
    maxWidth: "500px",
  },
  backLink: {
    display: "inline-block",
    padding: "10px 24px",
    backgroundColor: "#e50914",
    color: "white",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "bold" as const,
    fontSize: "0.95rem",
  },
};