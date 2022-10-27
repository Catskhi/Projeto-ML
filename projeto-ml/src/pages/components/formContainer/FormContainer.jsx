import React from "react";

import '../css/boxes.css'

export default function FormContainer(props) {
    return (
        <div className="boxContainer flex-wrap column">
            {props.children}
        </div>
    )
}