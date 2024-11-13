// classes/controle.ts
import { Livro } from "../modelo/modelo"; // Importa o tipo Livro

// Supondo que você tenha uma lista de editoras (por exemplo, um banco de dados ou array)
interface Editora {
  codigo: number;
  nome: string;
}

export class ControleEditora {
  // Um vetor fictício de editoras para exemplificar
  private editoras: Editora[] = [
    { codigo: 1, nome: "Editora A" },
    { codigo: 2, nome: "Editora B" },
    { codigo: 3, nome: "Editora C" },
    // Adicione mais editoras conforme necessário
  ];
    getEditoras: any;

  // Método para obter o nome da editora com base no código
  public getNomeEditora(codigoEditora: number): string {
    const editora = this.editoras.find(e => e.codigo === codigoEditora);
    return editora ? editora.nome : "Editora não encontrada"; // Retorna o nome ou uma mensagem padrão
  }
}
