// pages/api/livros/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

class ControleLivro {
    livros = [
        { codigo: 1, titulo: "Livro 1", autor: "Autor A" },
        { codigo: 2, titulo: "Livro 2", autor: "Autor B" },
    ];

    obterLivros() {
        return this.livros;
    }

    incluir(livro: { titulo: string, autor: string }) {
        const novoCodigo = this.livros.length + 1;
        const livroNovo = { codigo: novoCodigo, ...livro };
        this.livros.push(livroNovo);
        return livroNovo;
    }

    excluir(codigo: number) {
        this.livros = this.livros.filter(livro => livro.codigo !== codigo);
        return { message: "Livro excluído com sucesso" };
    }
}

export const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const livros = controleLivro.obterLivros();
            return res.status(200).json(livros);
        } catch (error) {
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    } else if (req.method === 'POST') {
        try {
            const { titulo, autor } = req.body;
            const livroNovo = controleLivro.incluir({ titulo, autor });
            return res.status(200).json({ message: 'Livro adicionado com sucesso', livro: livroNovo });
        } catch (error) {
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    } else {
        return res.status(405).json({ message: 'Método não permitido' });
    }
};
