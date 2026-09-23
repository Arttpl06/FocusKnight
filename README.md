# Focus Knight

Um temporizador Pomodoro com visual inspirado em jogos retrô. O **Focus Knight** transforma períodos de concentração em pequenas missões, alternando automaticamente entre foco e descanso e acompanhando o progresso durante a sessão.

## Sobre o projeto

A aplicação utiliza a Técnica Pomodoro para organizar o tempo em períodos de trabalho e pausas. Na configuração padrão, cada missão possui:

- 25 minutos de foco;
- 5 minutos de pausa curta;
- 15 minutos de pausa longa após 4 pomodoros;
- transição automática entre foco e descanso;
- alertas sonoros ao trocar de período.

O progresso é mantido enquanto a página estiver aberta. O painel exibe o tempo restante, a etapa atual do ciclo, uma barra de progresso e as estatísticas da sessão.

## Funcionalidades

- Iniciar ou reiniciar um período de foco;
- iniciar uma pausa curta manualmente;
- pausar e continuar o cronômetro;
- iniciar automaticamente a próxima etapa;
- acompanhar pomodoros e ciclos concluídos;
- visualizar o total de minutos focados na sessão;
- receber avisos sonoros nas mudanças de etapa;
- acessar um guia rápido de uso na própria página;
- usar a aplicação em telas desktop e dispositivos móveis.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS
- Create React App

## Como executar

### Pré-requisitos

Tenha o [Node.js](https://nodejs.org/) e o npm instalados.

### Instalação

Clone o repositório e entre na pasta da aplicação:

```bash
git clone <URL_DO_REPOSITORIO>
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm start
```

A aplicação será aberta em [http://localhost:3000](http://localhost:3000).

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Executa a aplicação em modo de desenvolvimento. |
| `npm run build` | Gera a versão otimizada para produção na pasta `build`. |
| `npm test` | Executa os testes em modo interativo. |
| `npm run eject` | Expõe as configurações internas do Create React App. Essa ação não pode ser desfeita. |

## Como usar

1. Escolha uma tarefa para realizar.
2. Clique em **Iniciar foco** e trabalhe até o cronômetro terminar.
3. Faça a pausa curta iniciada automaticamente.
4. Repita o processo. Após quatro pomodoros, será iniciada uma pausa longa.
5. Use **Pausar** e **Continuar** quando precisar interromper temporariamente a contagem.

Também é possível clicar em **Descansar** para iniciar uma pausa curta a qualquer momento. Iniciar novamente o foco ou o descanso reinicia o período correspondente.

## Personalização dos períodos

As durações são informadas em segundos no componente `PomodoroCrono`, dentro de `src/App.tsx`:

```tsx
<PomodoroCrono
  TempoPadrao={1500}
  descansoTempoC={300}
  descansoTempoL={900}
  ciclos={4}
/>
```

| Propriedade | Finalidade | Valor padrão |
| --- | --- | ---: |
| `TempoPadrao` | Duração do foco | 1500 segundos (25 min) |
| `descansoTempoC` | Duração da pausa curta | 300 segundos (5 min) |
| `descansoTempoL` | Duração da pausa longa | 900 segundos (15 min) |
| `ciclos` | Pomodoros necessários para a pausa longa | 4 |

## Estrutura do projeto

```text
pomodoro/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Ilustração e fonte em pixel art
│   ├── components/      # Temporizador, cronômetro e botão
│   ├── hooks/           # Hook responsável pelo intervalo
│   ├── sounds/          # Efeitos sonoros
│   ├── utils/           # Formatação do tempo
│   ├── App.tsx          # Configuração principal da aplicação
│   ├── index.css        # Estilos e responsividade
│   └── index.tsx        # Ponto de entrada
├── package.json
└── tsconfig.json
```

## Observações

- As estatísticas são armazenadas apenas no estado da aplicação e são reiniciadas ao recarregar ou fechar a página.
- Alguns navegadores podem bloquear a reprodução automática de áudio até que o usuário interaja com a página.

---

Desenvolvido como uma experiência de foco: um pomodoro, uma nova missão.
