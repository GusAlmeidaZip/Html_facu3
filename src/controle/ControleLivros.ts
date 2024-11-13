import { Livro } from '../modelo/Livro';

// Variável `livros` contendo ao menos três livros no formato JSON
const livros: Array<Livro> = [
    { codigo: 1, codEditora: 1, titulo: 'Livro A', resumo: 'Resumo do Livro A', autores: ['Autor 1', 'Autor 2'] },
    { codigo: 2, codEditora: 2, titulo: 'Livro B', resumo: 'Resumo do Livro B', autores: ['Autor 3'] },
    { codigo: 3, codEditora: 3, titulo: 'Livro C', resumo: 'Resumo do Livro C', autores: ['Autor 4', 'Autor 5'] }
];

export class ControleLivros {
    // Método que retorna o vetor de livros
    obterLivros(): Array<Livro> {
        return livros;
    }

    // Método para incluir um novo livro
    incluir(livro: Livro): void {
        const maxCodigo = livros.length > 0 ? Math.max(...livros.map(l => l.codigo)) : 0;
        livro.codigo = maxCodigo + 1;
        livros.push(livro);
    }

    // Método para excluir um livro pelo código
    excluir(codigo: number): void {
        const index = livros.findIndex(livro => livro.codigo === codigo);
        if (index >= 0) {
            livros.splice(index, 1);
        }
    }
}
