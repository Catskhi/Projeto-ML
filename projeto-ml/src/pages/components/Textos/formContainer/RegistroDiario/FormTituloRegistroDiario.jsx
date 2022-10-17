import React from "react";

import './FormTituloDiario.css'

export default function FormTituloRegistroDiario(props) {
    return (
        <h1 className="tituloRegistroDiario">
            {props.text}
        </h1>
    )
}