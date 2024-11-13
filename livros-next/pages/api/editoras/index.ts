// pages/api/editoras/index.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Classe que controla as editoras
class ControleEditora {
  private editoras: { codEditora: number, nome: string }[];

  constructor() {
    // Simulação de um banco de dados de editoras
    this.editoras = [
      { codEditora: 1, nome: "Editora A" },
      { codEditora: 2, nome: "Editora B" },
      { codEditora: 3, nome: "Editora C" }
    ];
  }

  // Método para obter todas as editoras
  getEditoras() {
    return this.editoras;
  }

  // Método para obter o nome da editora com base no código
  getNomeEditora(codEditora: number) {
    const editora = this.editoras.find(e => e.codEditora === codEditora);
    return editora ? editora.nome : null;
  }
}

// Instanciando o controlador de editoras
export const controleEditora = new ControleEditora();

// Função para tratar as requisições da API
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        // Resposta com todas as editoras no formato JSON
        res.status(200).json(controleEditora.getEditoras());
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
