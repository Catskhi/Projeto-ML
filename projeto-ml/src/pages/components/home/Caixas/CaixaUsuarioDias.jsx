import React from "react";

import './CaixaUsuarioDias.css'

export default function CaixaUsuarioDias (props) {
    let data = props.data
    
    const retornaListaData = (data) => {
        if (props.reverseColors) {
            return data.map(data => <div className="linhaCaixa"><span className="tituloData">{data.data}:</span> 
            {data[props.dataKey] == 'Sim' ? <span className="textoVermelho">Sim</span> : <span className="textoVerde">Não</span>}</div>)
        } else {
            return data.map(data => <div className="linhaCaixa"><span className="tituloData">{data.data}:</span> 
            {data[props.dataKey] == 'Sim' ? <span className="textoVerde">Sim</span> : <span className="textoVermelho">Não</span>}</div>)
        }
    }

    return (
        <div className="caixa">
            <p>{retornaListaData(data)}</p>
        </div>
    )
}