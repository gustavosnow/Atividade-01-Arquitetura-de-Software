# Atividade Prática: Refatoração de Arquitetura de Software

* **Aluno(a):** Gustavo Neves Coelho
* **Matrícula:** 20240022476
* **Disciplina:** Arquitetura de Software - Prof. Jacqueline Teixeira

**1. Análise do Código Legado e Violações Encontradas**
No código original fornecido, observamos os seguintes problemas estruturais:

**- Alto Acoplamento Concreto:**
A classe GeradorRelatorioLegado instancia diretamente classes de infraestrutura (new MySQLConnection() e new SmtpEmailSender()), gerando um forte grau de dependência entre módulos e amarrando a regra de negócio a implementações rígidas em vez de contratos estáveis.

**- Violação do DIP:**
Os módulos de alto nível (a geração de relatórios) dependem diretamente de módulos de baixo nível (infraestrutura de banco de dados e envio de e-mail), contrariando a Inversão de Dependência, que estabelece que ambos devem depender de abstrações e interfaces bem definidas.

**- Violação do OCP:**
Para estender ou modificar a fonte de dados (ex.: trocar o banco) ou o canal de notificação (ex.: adicionar envio via WhatsApp ou Slack), é obrigatório editar o código interno da própria classe GeradorRelatorioLegado, ferindo a capacidade de evolução sem quebra de código.

**- Impossibilidade de Testes Unitários:**
Não é possível testar de maneira isolada a lógica do relatório em um nível micro de Design de Software, pois o ciclo de vida dos componentes externos está embutido de forma fixa, impossibilitando a substituição por implementações simuladas (mocks ou stubs).

**2. Mudanças Efetuadas e Justificativa Técnica**

**2.1 Criação de Contratos (Interfaces):**
- Justificativa:
Criação de fronteiras explícitas (RepositorioDados e ServicoNotificacao) para que os componentes se comuniquem exclusivamente por meio de interfaces públicas e estáveis, encapsulando os detalhes de implementação e garantindo baixo acoplamento.

**2.2 Injeção de Dependência (DI):**
- Justificativa:
Aplicação prática da Inversão de Controle (IoC) ao fornecer as dependências externamente via construtor (constructor), eliminando o uso do operador new dentro da regra de negócio e permitindo a substituição transparente de tecnologias.

---

### 3. Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Compilar e executar o código refatorado
npm start
