import { Editora } from '../modelo/Editora';

// Variável `editoras` com pelo menos três editoras
const editoras: Array<Editora> = [
    new Editora(1, 'Editora A'),
    new Editora(2, 'Editora B'),
    new Editora(3, 'Editora C')
];

export class ControleEditora {
    // Método que retorna o vetor de editoras
    getEditoras(): Array<Editora> {
        return editoras;
    }

    // Método que retorna o nome da editora baseado no código
    getNomeEditora(codEditora: number): string | undefined {
        const editora = editoras.find(e => e.codEditora === codEditora);
        return editora ? editora.nome : undefined;
    }
}
