import React from "react";

import '../../css/texts.css'

export default function FormTitulo(props) {
    return (
        <h1 className="tituloForm">
            {props.text}
        </h1>
    )
}