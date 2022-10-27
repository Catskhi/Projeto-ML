import React from "react";

import '../css/buttons.css'

export default function CommonButton(props) {
    return (
        <>
            <button onClick={props.onClick} className={"commonButton " + props.className}>{props.text}</button>
        </>
    )
}