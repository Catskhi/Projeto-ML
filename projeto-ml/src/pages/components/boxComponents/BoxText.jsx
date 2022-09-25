import React from "react";

import '../css/texts.css'

export default function BoxText(props) {
    return (
        <p className={"boxText " + props.className}>{props.text}</p>
    )
}