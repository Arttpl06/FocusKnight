import React, { JSX } from "react";

interface Props {
    text: string;
    onClick: () => void;
    className?: string;
}

export default function Button({ text, onClick, className }: Props): JSX.Element {
    return (
        <button type="button" onClick={onClick} className={className}>{text}</button>
    );
}
