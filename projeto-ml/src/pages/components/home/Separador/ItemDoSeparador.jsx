import React from "react";

import '../css/homeCSS.css'

export default function ItemDoSeparador(props) {
    return (
        <>
        <div className={"itemDoSeparador " + props.className} id={props.id}>
            {props.children}
        </div>
        </>
    )
}