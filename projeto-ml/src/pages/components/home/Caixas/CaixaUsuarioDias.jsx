import React from "react";

import './CaixaUsuarioDias.css'

export default function CaixaUsuarioDias (props) {
    let data = props.data
    
    const retornaListaData = (data) => {
        return data.map(data => <p>{data.data}: {data.suficiente}</p>)
    }

    return (
        <div className="caixa">
            <p>{retornaListaData(data)}</p>
        </div>
    )
}