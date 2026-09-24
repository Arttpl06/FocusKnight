# Focus Knight ⚔️

**Um Pomodoro retrô para transformar o tempo de foco em uma missão.**

O Focus Knight é uma aplicação web de produtividade com visual inspirado em jogos pixel art. Ela alterna automaticamente entre períodos de concentração e descanso, mostra o progresso do ciclo e acompanha as estatísticas da sessão.

## Funcionalidades

- Temporizador com **25 minutos de foco**, **5 minutos de pausa curta** e **15 minutos de pausa longa**.
- Pausa longa a cada **4 pomodoros concluídos**.
- Alternância automática entre foco e descanso, com efeitos sonoros nas transições.
- Controles para iniciar ou reiniciar o foco, iniciar uma pausa curta, pausar e continuar.
- Barra de progresso, indicador do ciclo e estatísticas de pomodoros, ciclos e minutos de foco.
- Interface responsiva em português, com tema de aventura em vermelho, preto e branco.

> As estatísticas ficam disponíveis enquanto a página estiver aberta. Ao recarregá-la, a sessão começa novamente.

## Como executar

Você precisa ter **Node.js** e **npm** instalados.

```bash
git clone https://github.com/Arttpl06/FocusKnight.git
cd FocusKnight
npm ci
npm start
```

Abra `http://localhost:3000` no navegador. Se a porta estiver ocupada, o servidor de desenvolvimento poderá oferecer outra porta.

## Como usar

1. Clique em **INICIAR FOCO** e trabalhe até o temporizador chegar a zero.
2. A pausa curta começa automaticamente. Ao terminar, um novo período de foco é iniciado.
3. Depois de quatro períodos de foco completos, começa uma pausa longa.
4. Use **PAUSAR** e **CONTINUAR** para controlar o período atual. **INICIAR FOCO** e **DESCANSAR** iniciam o período escolhido desde o começo.

## Tecnologias

- **React** e **TypeScript** para a interface e a lógica do temporizador.
- **CSS** para o layout responsivo e a identidade visual pixel art.
- **Create React App** (`react-scripts`) para executar e gerar a aplicação.

## Estrutura do projeto

| Caminho | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Define os tempos e o número de pomodoros por ciclo. |
| `src/components/pomodoroCrono.tsx` | Controla os modos, a contagem, as transições e as estatísticas. |
| `src/components/Cronometro.tsx` | Exibe o tempo restante. |
| `src/components/Botao.tsx` | Renderiza os botões de ação. |
| `src/hooks/intervalo.tsx` | Gerencia o intervalo de atualização do relógio. |
| `src/utils/SegundosTempo.ts` | Formata o tempo em `mm:ss`. |
| `src/index.css` | Define estilos, cores e adaptação da interface. |
| `src/assets/` e `src/sounds/` | Guardam a arte, a fonte e os efeitos sonoros. |

Para alterar as durações, edite as propriedades passadas a `PomodoroCrono` em `src/App.tsx`. Os valores estão em **segundos**:

```tsx
<PomodoroCrono
  TempoPadrao={1500}    // 25 minutos de foco
  descansoTempoC={300}  // 5 minutos de pausa curta
  descansoTempoL={900}  // 15 minutos de pausa longa
  ciclos={4}            // pomodoros por ciclo
/>
```

## Comandos disponíveis

| Comando | O que faz |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção na pasta `build/`. |
| `npm test` | Inicia o executor de testes do Create React App. |

---

Feito por [Artur](https://github.com/Arttpl06). Um level de cada vez. ✦

OBS:O design da interface foi criado com ajuda de IA. A lógica do temporizador, os componentes e o hook de intervalo em TypeScript foram desenvolvidos por mim no caso de alguns erros envolvendo código ou matemática pedi pra ia analisar e me explicar como corrigir.
