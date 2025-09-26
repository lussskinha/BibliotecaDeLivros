import React, { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Buscar livros da API
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await api.get("/books");
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  // Adicionar livro
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) return;

    const newBook = { title, author };
    const response = await api.post("/books", newBook);
    setBooks([...books, response.data]);

    setTitle("");
    setAuthor("");
  };

  // Remover livro
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este livro?")) {
      await api.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Biblioteca</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Adicionar Livro</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author}
            <button onClick={() => handleDelete(book.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
