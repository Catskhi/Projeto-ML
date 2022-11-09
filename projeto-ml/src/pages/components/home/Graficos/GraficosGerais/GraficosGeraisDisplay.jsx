import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DadosEmTabela from "./DadosEmTabela";

import './GraficosGerais.css'

export default function GraficosGeraisDisplay (props) {
    const [dados, setDados] = useState()

    useEffect(() => {
        async function getData() {
            const response = await fetch('http://127.0.0.1:5000/get-all-general-registers')
            const data = await response.json()
            setDados(data)
        }
        getData()
    })

    function renderData () {
        if (dados) {
            let rows = []
            for (let i = 0; i < dados.length; i++) {
                rows.push(
                    <>
                    <tr>
                        {dados[i][0] == 'Yes' ? <th className='textoVerde'>Sim</th> : <th className='textoVermelho'>Não</th>}
                        {dados[i][1] >= 7 && dados[i][1] <= 9 ? 
                        <th className='textoVerde'>{dados[i][1]}</th> : <th className='textoVermelho'>{dados[i][1]}</th>}
                        {dados[i][2] == 'Yes' ? <th className='textoVermelho'>Sim</th> : <th className='textoVerde'>Não</th>}
                        {dados[i][3] == 'Yes' ? <th className='textoVermelho'>Sim</th> : <th className='textoVerde'>Não</th>}
                        {dados[i][4] <= 3 ? <th className='textoVerde'>{dados[i][4]}</th> : <th className='textoVermelho'>{dados[i][4]}</th>}
                        {dados[i][5] == 'Yes' ? <th className='textoVerde'>Sim</th> : <th className='textoVermelho'>Não</th>}
                    </tr>
                    </>
                )
            }
            return (
                rows
            )
        }
    }

    return(
        <>
        <h1 className="titulo1">Estes são os nossos dados coletados para estudo:</h1>
        <table className="tabela">
            <>
            <tr>
                <th>Suficiente</th>
                <th>Horas</th>
                <th>Celular por perto</th>
                <th>Usou celular</th>
                <th>Cansaço</th>
                <th>Café</th>
            </tr>
            </>
            {renderData()}
        </table>
        </>
    )
}