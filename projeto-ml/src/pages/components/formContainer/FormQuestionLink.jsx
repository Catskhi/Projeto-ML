import React from "react";

import '../css/texts.css'

export default function FormQuestionLink(props) {
    return (
        <p className={'mensagemDeLink'}>{props.text}
            <a className="linkLoginRegistro" href={props.link}>{props.linkName}</a>
        </p>
    )
}