// pages/LivroDados.tsx
import { useState } from 'react';
import { Livro } from '../classes/modelo/modelo';  // Certifique-se de que o tipo 'Livro' está corretamente definido
import { ControleEditora } from '../classes/controle/controle'; // Classe para controlar editoras
import styles from '../styles/Home.module.css'; // Estilos importados
import {Menu} from '../componentes/Menu'; // Supondo que Menu seja um componente de navegação
import Head from 'next/head';
import { useRouter } from 'next/router';  // Para navegação no Next.js

const baseURL = "http://localhost:3000/api/livros";

const controleEditora = new ControleEditora();

const LivroDados = () => {
  const router = useRouter(); // Hook para navegação
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState<number>(0);

  // Obtém as editoras disponíveis

  // Função para tratar a mudança do combo de editoras
  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value)); // Converte o valor para número
  };

  // Função para incluir o livro
  const incluirLivro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Lil: Livro = {
        codigo: 0, // código 0 para novo livro
        titulo,
        resumo,
        autores: autores.split('\n'), // Divide os autores por linha
        codigoEditora: codEditora,
        editora: ''
    };

    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Lil),
      });
      const result = await response.json();
      if (result.ok) {
        router.push('/LivroLista'); // Redireciona para a lista de livros após incluir
      } else {
        alert('Erro ao incluir livro.');
      }
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Adicionar Livro</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Adicionar Novo Livro</h1>
        <form onSubmit={incluirLivro}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">Resumo</label>
            <textarea
              className="form-control"
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">Autores</label>
            <textarea
              className="form-control"
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editora" className="form-label">Editora</label>
            <select
              id="editora"
              className="form-control"
              value={codEditora}
              onChange={tratarCombo}
            >
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Adicionar Livro</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
