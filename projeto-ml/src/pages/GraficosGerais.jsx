import React from "react";
import ItemDoSeparador from "./components/home/Separador/ItemDoSeparador";
import Separador from "./components/home/Separador/Separador";
import Navegador from "./components/home/BarraLateral/BarraLateral";

import './css/Home.css'
import PainelInicio from "./components/PainelInicio/PainelInicio";
import GraficosGeraisDisplay from "./components/home/Graficos/GraficosGerais/GraficosGeraisDisplay";

export default function GraficosGerais (props) {
    return (
        <>
            <Separador>
                <ItemDoSeparador>
                    <Navegador className='grow1'>
                    </Navegador>
                </ItemDoSeparador>
                <ItemDoSeparador className='grow2'>
                    <PainelInicio/>
                    <GraficosGeraisDisplay/>
                </ItemDoSeparador>
            </Separador>
        </>
    )
}