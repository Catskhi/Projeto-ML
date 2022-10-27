import React from "react";

import '../css/texts.css'

export default function MensagemErro(props) {
    return (
        <>
            {props.erros.map((erro) => (
                <>
                    <p className="boxText invalidText">{erro}</p>
                </>
            ))}
        </>
    )
}