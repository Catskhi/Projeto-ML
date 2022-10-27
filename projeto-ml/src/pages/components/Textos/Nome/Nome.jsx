import React from "react";

import './Nome.css'

export default (props) => {
    const username = sessionStorage.getItem('username')
    const date = new Date();
    let hora = date.getHours();
    let message = ''
    if (hora >= 5 && hora < 12) {
        message = 'Bom dia'
    } else if (hora >= 12 && hora < 18) {
        message = 'Boa tarde'
    } else {
        message = 'Boa noite'
    }
    return (
        <div className="tituloNome">
            {message}, {username}.
        </div>
    )
}