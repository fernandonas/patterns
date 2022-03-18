import { promises } from "fs";
import { resolve } from "path";
// tipo comportamental

//Template Method é um padrão de projeto comportamental que define o esqueleto de um algoritmo na superclasse mas deixa
// as subclasses sobrescreverem etapas específicas do algoritmo sem modificar sua estrutura.

export type CustomerData = { nome: string, idade: string, cpf: string }

export abstract class CustomerDataParser {
    public customerData: CustomerData[] = [];

    constructor(protected filePath: string) { }

    readonly fixCustomerData = async (): Promise<void> => {
        this.customerData = await this.parseData();
        this.customerData = this.fixCpf();
    }

    abstract parseData(): Promise<CustomerData[]>;

    private fixCpf(): CustomerData[] {
        return this.customerData.map(customer => {
            return { ...customer, cpf: customer.cpf.replace(/\D/g, '') }
        })
    }
}

export class CustomerDataParserTxt extends CustomerDataParser {
    public async parseData(): Promise<CustomerData[]> {
        const rawData = await promises.readFile(this.filePath);
        const data = rawData.toString();
        const lines = data.split('\r\n');
        const customerData: CustomerData[] = [];
        for (const line of lines) {
            const [nome, idade, cpf] = line.split(" ");
            customerData.push({ nome, idade, cpf })
        }
        return customerData;
    }
}

export class CustomerDataParserJson extends CustomerDataParser {
    public async parseData(): Promise<CustomerData[]> {
        const rawData = await promises.readFile(this.filePath);
        const data = JSON.parse(rawData.toString());
        const customerData: CustomerData[] = [];
        for (const customer of data) {
            const { nome, idade, cpf } = customer;
            customerData.push({ nome, idade, cpf })
        }
        return customerData;
    }
}

async function runTxt() {
    const filePathTxt = resolve(__dirname, 'files', 'customer.txt');
    const customerDataParserTxt = new CustomerDataParserTxt(filePathTxt);
    await customerDataParserTxt.fixCustomerData();

    console.log(customerDataParserTxt.customerData);
}

async function runJson() {
    const filePathJson = resolve(__dirname, 'files', 'customer.json');
    const customerDataParserJson = new CustomerDataParserJson(filePathJson);
    await customerDataParserJson.fixCustomerData();

    console.log(customerDataParserJson.customerData);
}

runTxt();
runJson();
