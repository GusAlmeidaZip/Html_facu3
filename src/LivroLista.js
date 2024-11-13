import React, { useState, useEffect } from 'react';
import { ControleEditora } from './controle/ControleEditora';
import { ControleLivros } from './controle/ControleLivros';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

// Componente auxiliar para renderizar uma linha da tabela de livros
const LinhaLivro = ({ livro, excluir }) => {
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                {livro.titulo}
                <button onClick={() => excluir(livro.codigo)} className="btn btn-danger btn-sm ml-2">
                    Excluir
                </button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

// Componente principal para exibir a lista de livros
const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // Carregar a lista de livros ao montar o componente
    useEffect(() => {
        if (!carregado) {
            setLivros(controleLivro.obterLivros());
            setCarregado(true);
        }
    }, [carregado]);

    // Função para excluir um livro e atualizar a lista
    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main className="container">
            <h1>Lista de Livros</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
