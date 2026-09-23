import React, { JSX, useCallback, useEffect, useMemo, useState } from "react";
import { Intervalo } from "../hooks/intervalo";
import Button from "./Botao";
import Cronometro from "./Cronometro";
import questWorld from "../assets/quest-world.svg";

const SinoSom = require("../sounds/bell-2-352062.mp3")
const SinoClock = require("../sounds/mixkit-retract-clock-mechanism-1049.wav")

type Modo = "inativo" | "foco" | "pausa-curta" | "pausa-longa"

interface Props {
  TempoPadrao: number
  descansoTempoC: number
  descansoTempoL: number;
  ciclos: number
}
const tocarSom = (arquivo: string) => {
  const audio = new Audio(arquivo);
  audio.play().catch(() => {
  });
};

export default function PomodoroCrono({TempoPadrao,descansoTempoC,descansoTempoL,ciclos,}: Props): JSX.Element {
  const totalCiclos = Math.max(1, Math.floor(ciclos));
  const tempoFoco = Math.max(1, Math.floor(TempoPadrao));
  const tempoPausaCurta = Math.max(1, Math.floor(descansoTempoC))

  const tempoPausaLonga = Math.max(1, Math.floor(descansoTempoL));

  const [modo, setModo] = useState<Modo>("inativo")
  const [mainTime, setMainTime] = useState(tempoFoco)
  const [timeConta, setTimeConta] = useState(false)
  const [ciclosCompletos, setCiclosCompletos] = useState(0)
  
  const [tempoTrabalho, setTempoTrabalho] = useState(0);
  const [pomodorosCompletos, setPomodorosCompletos] = useState(0);

  const trabalhando = modo === "foco";
  const descansando = modo === "pausa-curta" || modo === "pausa-longa";

  const iniciarTrabalho = useCallback(() => {
    setModo("foco");
    setMainTime(tempoFoco);
    setTimeConta(true);
    tocarSom(SinoClock);
  }, [tempoFoco]);

  const iniciarDescanso = useCallback(
    (longo = false) => {
      setModo(longo ? "pausa-longa" : "pausa-curta");
      setMainTime(longo ? tempoPausaLonga : tempoPausaCurta);
      setTimeConta(true);
      tocarSom(SinoSom);
    },
    [tempoPausaCurta, tempoPausaLonga],
  );

  Intervalo(
    () => {
      setMainTime((tempoAtual) => Math.max(0, tempoAtual - 1));
      if (trabalhando) {
        setTempoTrabalho((tempoAtual) => tempoAtual + 1);
      }
    },
    timeConta ? 1000 : null,
  );

  useEffect(() => {
    if (mainTime !== 0 || !timeConta) return;

    if (trabalhando) {
      const novoTotal = pomodorosCompletos + 1;
      const terminouCiclo = novoTotal % totalCiclos === 0;

      setPomodorosCompletos(novoTotal);
      if (terminouCiclo) {
        setCiclosCompletos((totalAtual) => totalAtual + 1);
      }
      iniciarDescanso(terminouCiclo);
      return;
    }

    if (descansando) {
      iniciarTrabalho();
    }
  }, [
    descansando,
    iniciarDescanso,
    iniciarTrabalho,
    mainTime,
    pomodorosCompletos,
    timeConta,
    totalCiclos,
    trabalhando,
  ]);

  useEffect(() => {
    document.body.dataset.mode = modo;
    return () => {
      delete document.body.dataset.mode;
    };
  }, [modo]);

  const duracaoAtual = trabalhando
    ? tempoFoco
    : modo === "pausa-longa"
      ? tempoPausaLonga
      : modo === "pausa-curta"
        ? tempoPausaCurta
        : tempoFoco;

  const progresso = Math.min(100, Math.max(0, ((duracaoAtual - mainTime) / duracaoAtual) * 100));
  const cicloAtual = pomodorosCompletos % totalCiclos;

  const textos = useMemo(() => {
    if (modo === "foco") {
      return { titulo: "MISSÃO EM ANDAMENTO", subtitulo: "Mantenha o foco até o sinal." };
    }
    if (modo === "pausa-longa") {
      return { titulo: "PAUSA LONGA", subtitulo: "Ciclo concluído. Recarregue as energias." };
    }
    if (modo === "pausa-curta") {
      return { titulo: "PAUSA CURTA", subtitulo: "Respire um pouco antes da próxima missão." };
    }
    return { titulo: "PRONTO PARA COMEÇAR?", subtitulo: "Escolha foco ou descanso para iniciar." };
  }, [modo]);

  return (
    <main className="pomodoro">
      <header className="brand-bar">
        <div>
          <span className="brand-mark" aria-hidden="true">✦</span>
          <div>
            <p className="eyebrow">UM POMODORO. UMA NOVA MISSÃO.</p>
            <h1>FOCUS KNIGHT</h1>
          </div>
        </div>
        <div className="header-right"><a href="#como-jogar">COMO JOGAR <span aria-hidden="true">↗</span></a>
        <span className={`status-light ${timeConta ? "online" : ""}`}>
          {timeConta ? "EM EXECUÇÃO" : "EM ESPERA"}
        </span></div>
      </header>

      <div className="quest-layout">
      <div className="timer-column">
      <div className="chapter-label"><span>01 / SUA MISSÃO</span><span>FOCO + DISCIPLINA</span></div>
      <section className="console-screen" aria-label="Temporizador Pomodoro">
        <span className="corner corner-tl" aria-hidden="true" /><span className="corner corner-br" aria-hidden="true" />
        <div className="screen-topline">
          <span>{modo === "inativo" ? "SISTEMA PRONTO" : modo.replace("-", " ").toUpperCase()}</span>
          <span className="time-badge">{Math.round(duracaoAtual / 60)} MIN</span>
        </div>

        <div className="mission-copy" role="status">
          <p className="mode-title">{textos.titulo}</p>
          <p className="mode-subtitle">{textos.subtitulo}</p>
        </div>

        <Cronometro mainTime={mainTime} />
        <div className="timer-caption">MINUTOS <span aria-hidden="true">/</span> SEGUNDOS</div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Progresso do período atual"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progresso)}
        >
          <span style={{ width: `${progresso}%` }} />
        </div>

        <div className="cycle-map">
          <span className="cycle-label">CICLO</span>
          <div className="cycle-dots" aria-label={`${cicloAtual} de ${totalCiclos} pomodoros no ciclo atual`}>
            {Array.from({ length: totalCiclos }, (_, indice) => (
              <span
                key={indice}
                className={
                  indice < cicloAtual
                    ? "complete"
                    : trabalhando && indice === cicloAtual
                      ? "active"
                      : ""
                }
              >
                {indice + 1}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="controls">
        <Button className="arcade-button primary" text={trabalhando ? "REINICIAR FOCO" : "INICIAR FOCO"} onClick={iniciarTrabalho} />
        <Button className="arcade-button secondary" text="DESCANSAR" onClick={() => iniciarDescanso(false)} />
        {(trabalhando || descansando) && (
          <Button
            className="arcade-button pause"
            text={timeConta ? "PAUSAR" : "CONTINUAR"}
            onClick={() => setTimeConta((estaContando) => !estaContando)}
          />
        )}
      </div>

      <p className="session-note"><span aria-hidden="true">✦</span> Pequenos passos. Grandes conquistas.</p>
      </div>
      <aside className="quest-story" aria-label="Sua jornada de foco">
        <p className="story-tag"><span aria-hidden="true">+</span> MODO AVENTURA: ATIVADO</p>
        <h2>SEU TEMPO.<br />SUA MISSÃO.<br /><span>SEU PRÓXIMO<br />LEVEL.</span></h2>
        <p className="story-description">Deixe as distrações para trás.<br />A próxima conquista começa com foco.</p>
        <img className="quest-art" src={questWorld} alt="Cavaleiro em pixel art diante de um castelo sob uma lua vermelha" />
        <div className="world-caption"><span aria-hidden="true">◆</span> MUNDO 01 <span>/</span> A JORNADA COMEÇA</div>
      </aside>
      </div>
      <div className="stats-heading"><h2>SEU PROGRESSO</h2><span>NESTA SESSÃO</span></div>
      <section className="stats" aria-label="Estatísticas da sessão">
        <div>
          <span className="stat-icon" aria-hidden="true">◆</span>
          <p><strong>{ciclosCompletos}</strong><small>CICLOS CONCLUÍDOS</small></p>
        </div>
        <div>
          <span className="stat-icon" aria-hidden="true">◷</span>
          <p><strong>{Math.floor(tempoTrabalho / 60)}</strong><sup>MIN</sup><small>TEMPO DE FOCO</small></p>
        </div>
        <div>
          <span className="stat-icon" aria-hidden="true">●</span>
          <p><strong>{pomodorosCompletos}</strong><small>POMODOROS</small></p>
        </div>
      </section>

      <details className="how-to" id="como-jogar">
        <summary>COMO JOGAR <span>GUIA RÁPIDO +</span></summary>
        <div className="guide-grid">
          <p><strong>01 / ENTRE EM FOCO</strong>Escolha uma tarefa e inicie {Math.round(tempoFoco / 60)} minutos de concentração.</p>
          <p><strong>02 / RECARREGUE</strong>A pausa de {Math.round(tempoPausaCurta / 60)} minutos começa automaticamente. Depois, você volta ao foco.</p>
          <p><strong>03 / COMPLETE O CICLO</strong>A cada {totalCiclos} pomodoros, aproveite uma pausa longa de {Math.round(tempoPausaLonga / 60)} minutos.</p>
        </div>
        <p className="guide-note">Iniciar foco ou descanso reinicia o período. Use Pausar / Continuar para manter o tempo restante.</p>
      </details>
      <footer className="page-footer"><span>FOCUS KNIGHT <span aria-hidden="true">✦</span> UM LEVEL DE CADA VEZ.</span><p>O progresso é mantido enquanto esta página estiver aberta.</p></footer>
    </main>
  );
}
