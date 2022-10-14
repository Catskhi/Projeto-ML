import React from "react";

import '../css/homeCSS.css'

export default function Separador(props) {
    return (
        <>
            <div className="separador wrap">
                {props.children}
            </div>
        </>
    )
}