import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros from './controle/ControleLivros';  // Importando controlador de livros
import ControleEditora from './controle/ControleEditora';  // Importando controlador de editoras

const LivroDados = () => {
    // Instanciando os controladores
    const controleLivro = new ControleLivros();
    const controleEditora = new ControleEditora();

    // Definindo os estados para os campos do formulário
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);

    // Definindo as opções de editoras
    const [opcoes, setOpcoes] = useState([]);
    useEffect(() => {
        const editoras = controleEditora.getEditoras();
        setOpcoes(editoras.map(editora => ({
            value: editora.codEditora,
            text: editora.nome
        })));
    }, [controleEditora]);

    // Hook para navegação
    const navigate = useNavigate();

    // Método para tratar mudança na seleção de editora
    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value)); // Atualiza o estado com o código da editora selecionada
    };

    // Método para inclusão de um novo livro
    const incluir = (event) => {
        event.preventDefault();  // Impede o comportamento padrão do formulário

        // Criando o objeto Livro com os dados fornecidos
        const livro = {
            codigo: 0,  // O código será atribuído automaticamente pelo controlador
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n'),  // Convertendo a string de autores em um array de strings
            codEditora: codEditora
        };

        // Incluindo o livro no controlador
        controleLivro.incluir(livro);

        // Navega de volta para a página de lista de livros
        navigate('/');
    };

    return (
        <main className="container mt-4">
            <h1>Cadastro de Livro</h1>
            <form onSubmit={incluir}>
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
                        rows="3"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="autores" className="form-label">Autores (separe por linha)</label>
                    <textarea
                        className="form-control"
                        id="autores"
                        rows="3"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="editora" className="form-label">Editora</label>
                    <select
                        className="form-select"
                        id="editora"
                        value={codEditora}
                        onChange={tratarCombo}
                    >
                        {opcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Cadastrar Livro</button>
            </form>
        </main>
    );
};

export default LivroDados;
