// Tipo :  Criacional

// Prós

//Ajuda na criação de objetos complexos
//Reutilização de código
//principios de responsabilidade única.

//Contras
// Pode ficar muito complexo em alguns casos.

export interface IParteDoCarro {
    obterValotTotal(): number;
}

export abstract class ParteDoCarro implements IParteDoCarro {
    constructor(
        private readonly valor: number
    ) { }
    public obterValotTotal(): number {
        return this.valor;
    }
}

export class Pneu extends ParteDoCarro { }
export class Porta extends ParteDoCarro { }
export class ArCondicionado extends ParteDoCarro { }
export class Vidro extends ParteDoCarro { }

export class Carro implements IParteDoCarro {
    private readonly partesDoCarro: ParteDoCarro[] = [];
    private carro = '';
    private valor = 0

    public definirTipoDoCarro(tipoDoCarro: string): void {
        this.carro = tipoDoCarro;
    }
    public definirValorDoCarro(valor: number): void {
        this.valor = valor;
    }
    public obterTipoDoCarro(): string {
        return this.carro;
    }
    public obterValorDoCarro(): number {
        return this.valor;
    }
    public obterValotTotal(): number {
        return this.partesDoCarro.reduce((soma, parte) => soma + parte.obterValotTotal(), 0) + this.obterValorDoCarro();
    }
    public adicionarParte(parteDoCarro: ParteDoCarro): void {
        this.partesDoCarro.push(parteDoCarro);
    }
}

export interface IContrutorDoCarro {
    carroSimples(): this;
    carroTop(): this;
    adicionarPneu(valor: number): this;
    adicionarVidros(valor: number): this;
    adicionarArCondicionado(valor: number): this;
    finalizar(): string;
    obterValorTotal(): number;
    reset(): void;
}

export class ConstrutorDoCarro implements IContrutorDoCarro {
    private carro: Carro = new Carro();

    public carroSimples(): this {
        this.carro.definirTipoDoCarro('Monza');
        this.carro.definirValorDoCarro(6000);
        return this;
    }

    public carroTop(): this {
        this.carro.definirTipoDoCarro('Tesla');
        this.carro.definirValorDoCarro(1500000);
        return this;
    }

    public adicionarPneu(valor: number): this {
        const pneu = new Pneu(valor);
        this.carro.adicionarParte(pneu);
        return this
    }
    public adicionarVidros(valor: number): this {
        const vidro = new Vidro(valor);
        this.carro.adicionarParte(vidro);
        return this;
    }
    public adicionarArCondicionado(valor: number): this {
        if (this.carro.obterTipoDoCarro() === 'Tesla') {
            throw new Error("Carro já possui ar condicionado!");
        }
        const arCondicionado = new ArCondicionado(valor);
        this.carro.adicionarParte(arCondicionado);
        return this;
    }
    public finalizar(): string {
        return `Parabéns seu novo carro: ${this.carro.obterTipoDoCarro()}, foi finalizado pelo valor de: ${this.obterValorTotal()}.`
    }
    public obterValorTotal(): number {
        return this.carro.obterValotTotal();
    }
    public reset(): this {
        this.carro = new Carro();
        return this;
    }
}

const novoCarro = new ConstrutorDoCarro();
console.log(
    novoCarro.carroSimples()
        .adicionarPneu(1600)
        .adicionarVidros(1500)
        .adicionarArCondicionado(2000)
        .finalizar()
);

novoCarro.reset();
console.log(
    novoCarro.carroTop().finalizar()
);



export interface IPessoa {
    nome: string;
    idade: number;
}

export class Pessoa implements IPessoa {
    nome = '';
    idade = 0;

    definirNome(nome: string): this {
        this.nome = nome;
        return this;
    }

    definirIdade(idade: number): this {
        this.idade = idade
        return this;
    }

    criarPessoa(): string {
        return `Nome: ${this.nome} Idade: ${this.idade}`;
    }
}

const pessoa = new Pessoa();

console.log(pessoa.definirNome('Fernando').definirIdade(35).criarPessoa());
