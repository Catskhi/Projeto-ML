import React from "react";

import './Nome.css'

export default (props) => {
    const username = sessionStorage.getItem('username')
    return (
        <div className="tituloNome">
            Bom dia, {username}.
        </div>
    )
}