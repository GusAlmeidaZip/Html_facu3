// pages/api/editoras/[codEditora].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';  // Importa o controle de editoras

// Função para tratar as requisições da API
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { codEditora } = req.query;

    // Garantir que o código da editora seja um número
    const codEditoraNumber = parseInt(codEditora as string, 10);

    if (isNaN(codEditoraNumber)) {
      return res.status(400).json({ message: 'Código da editora inválido' });
    }

    switch (req.method) {
      case 'GET':
        // Obter o nome da editora usando o método getNomeEditora
        const nomeEditora = controleEditora.getNomeEditora(codEditoraNumber);

        if (nomeEditora) {
          // Se a editora for encontrada, retorna o nome
          res.status(200).json({ nome: nomeEditora });
        } else {
          // Se a editora não for encontrada
          res.status(404).json({ message: 'Editora não encontrada' });
        }
        break;
      default:
        // Método não permitido
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: 'Método não permitido' });
        break;
    }
  } catch (error) {
    // Erro no servidor
    res.status(500).json({ message: 'Erro no servidor', error: "error.message" });
  }
};
