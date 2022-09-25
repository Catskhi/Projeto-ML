import React from "react";

import '../css/boxes.css'

export default function BoxItem(props) {
    return (
        <div className="boxItem">
            {props.children}
        </div>
    )
}