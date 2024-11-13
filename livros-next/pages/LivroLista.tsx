// pages/LivroLista.tsx
import { useState, useEffect } from 'react';
import { Livro } from '../classes/modelo/modelo'; // Supondo que Livro seja um tipo ou interface definida
import { LinhaLivro } from '../componentes/LinhaLivro'; // Componente que exibe uma linha do livro
import styles from '../styles/Home.module.css'; // Estilos importados
import {Menu} from '../componentes/Menu'; // Supondo que Menu seja um componente de navegação
import Head from 'next/head';

const baseURL = "http://localhost:3000/api/livros";

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);  // Estado para armazenar a lista de livros
  const [carregado, setCarregado] = useState<boolean>(false);  // Estado para controlar carregamento

  // Função para obter livros via fetch
  const obterLivros = async () => {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      setLivros(data);
      setCarregado(true);
    } catch (error) {
      console.error("Erro ao obter livros:", error);
      setCarregado(true);  // Garantir que a página pare de carregar
    }
  };

  // Função para excluir um livro
  const excluirLivro = async (codigo: number) => {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.ok) {
        setLivros(livros.filter(livro => livro.codigo !== codigo));  // Atualiza a lista de livros
        setCarregado(false);  // Força o redesenho
      } else {
        alert("Erro ao excluir o livro.");
      }
    } catch (error) {
      console.error("Erro ao excluir o livro:", error);
    }
  };

  // Hook useEffect para obter os livros ao carregar o componente
  useEffect(() => {
    obterLivros();
  }, []);  // O array vazio faz com que a função execute apenas uma vez ao montar o componente

  if (!carregado) {
    return <div>Carregando livros...</div>; // Exibe um carregando enquanto os dados não estão prontos
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de Livros</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Editora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(livro => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluirLivro(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
