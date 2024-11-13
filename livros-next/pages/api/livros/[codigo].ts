// pages/api/livros/[codigo].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { codigo } = req.query;

    if (typeof codigo !== 'string') {
        return res.status(400).json({ message: 'Código inválido' });
    }

    const codigoNum = parseInt(codigo, 10);

    if (req.method === 'DELETE') {
        try {
            const response = controleLivro.excluir(codigoNum);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir livro' });
        }
    } else {
        return res.status(405).json({ message: 'Método não permitido' });
    }
};
