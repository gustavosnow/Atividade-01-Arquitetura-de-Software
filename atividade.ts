/* 

// Código original

class MySQLConnection {
    public buscarDadosFinanceiros(): string[] {
        console.log("[INFRA] Conectando ao MySQL e buscando lançamentoos...")
        return["Receita: R$15.000.00", "Despesa: R$8.200,00", "Lucro: R$6.800,00"];
    }
}

class SmtpEmailSender {
    public enviarEmail(destino: string, mensagem: string): void {
        console.log(`[INFRA] Enviando email para ${destino} com a mensagem: ${mensagem}`);
    }
}

export class GeradorRelatorioLegado {
    public processarEMandar(destino: string): void {
        // VIOLACAO: Acomplamento rígido via operador 'new'
        const banco = new MySQLConnection();
        const emailSender = new SmtpEmailSender();

        const dados = banco.buscarDadosFinanceiros();
        const relatorioFormatado = ` --- Relatório Financeiro:\n${dados.join("\n")}`;

        emailSender.enviarEmail(destino, relatorioFormatado);
    }
}

*/

// Implementações concretas que respeitam os contratos

interface RepositorioDados {
    buscarDadosFinanceiros(): string[];
}

interface ServicoNotificacao {
    enviar(destino: string, mensagem: string): void;
}

class MySQLConnection implements RepositorioDados {
    public buscarDadosFinanceiros(): string[] {
        console.log("[INFRA] Conectando ao MySQL e buscando lançamentos...");
        return ["Receita: R$15.000,00", "Despesa: R$8.200,00", "Lucro: R$6.800,00"];
    }
}

class SmtpEmailSender implements ServicoNotificacao {
    public enviar(destino: string, mensagem: string): void {
        console.log(`[INFRA] Enviando email para ${destino} com a mensagem: ${mensagem}`);
    }
}

// Classe refatorada com Injeção de Dependência via construtor
class GeradorRelatorio {
    constructor(
        private readonly repositorio: RepositorioDados,
        private readonly notificacao: ServicoNotificacao
    ) {}

    public processarEMandar(destino: string): void {
        const dados = this.repositorio.buscarDadosFinanceiros();
        const relatorioFormatado = ` \n--- Relatório Financeiro:\n${dados.join("\n")}`;

        this.notificacao.enviar(destino, relatorioFormatado);
    }
}

// Instanciação das dependências (injetadas de fora)
const banco = new MySQLConnection();
const email = new SmtpEmailSender();

// Injeção via construtor
const relatorio = new GeradorRelatorio(banco, email);

// Chamada do método
relatorio.processarEMandar("financeiro@empresa.com");