import React, { JSX } from "react";
import { SegundosTempo } from "../utils/SegundosTempo";

interface Props {
    mainTime: number;
}

export default function Cronometro({ mainTime }: Props): JSX.Element {
    return <div className="timer">{SegundosTempo(mainTime)}</div>;
}
