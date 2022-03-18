//tipo Estrutural


//O Decorator é um padrão de projeto estrutural que permite que você acople novos comportamentos para objetos ao colocá-los
//dentro de invólucros de objetos que contém os comportamentos.

export interface IProduto {
    obterPreco(): number;
    obterNome(): string;
}

export class Camiseta implements IProduto {
    private nome = 'Camiseta';
    private preco = 49.90;

    obterPreco(): number {
        return this.preco;
    }
    obterNome(): string {
        return this.nome;
    }
}

export class ProdutoDecorator implements IProduto {
    constructor(
        protected produto: IProduto
    ) { }
    obterPreco(): number {
        return this.produto.obterPreco();
    }
    obterNome(): string {
        return this.produto.obterNome();
    }
}

export class ProdutoComEstampa extends ProdutoDecorator {
    obterPreco(): number {
        return this.produto.obterPreco() + 10;
    }

    obterNome(): string {
        return this.produto.obterNome() + '(Estampada)';
    }
}

export class ProdutoCustomizado extends ProdutoDecorator {
    obterPreco(): number {
        return this.produto.obterPreco() + 50;
    }

    obterNome(): string {
        return this.produto.obterNome() + '(Customizada)';
    }
}

const camiseta = new Camiseta();
console.log(camiseta.obterPreco(), camiseta.obterNome());

const camisetaComEstampa = new ProdutoComEstampa(camiseta);
console.log(camisetaComEstampa.obterPreco(), camisetaComEstampa.obterNome());

const camisetaComDuasEstampas = new ProdutoComEstampa(camisetaComEstampa);
console.log(camisetaComDuasEstampas.obterPreco(), camisetaComDuasEstampas.obterNome());

const camisetaCustomizada = new ProdutoCustomizado(camiseta);
console.log(camisetaCustomizada.obterPreco(), camisetaCustomizada.obterNome());
