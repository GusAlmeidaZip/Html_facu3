// components/LinhaLivro.tsx
import { FC } from "react";
import { ControleEditora } from "../classes/controle/controle";  // Importar o controlador da editora
import { Livro } from "../classes/modelo/modelo";  // Tipo Livro

// Instancia o controle da editora (assumindo que ControleEditora está implementado no projeto)
const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

export const LinhaLivro: FC<LinhaLivroProps> = ({ livro, excluir }) => {
  // Obtém o nome da editora (por exemplo, usando o código da editora)
  const editora = controleEditora.getNomeEditora(livro.codigoEditora);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.autores}</td>
      <td>{editora}</td>
      <td>
        <button className="btn btn-danger" onClick={excluir}>
          Excluir
        </button>
      </td>
    </tr>
  );
};
