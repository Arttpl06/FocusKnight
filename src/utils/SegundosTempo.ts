export function SegundosTempo(segundos:number): string{
    const tempoSeguro = Math.max(0, Math.floor(segundos));
    const minutos = Math.floor(tempoSeguro / 60);
    const segundosRestantes = tempoSeguro % 60;

    return `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
}
