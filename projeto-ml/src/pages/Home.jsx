import React, { useEffect } from "react";
import { Navigate, RedirectFunction } from "react-router-dom";
import './css/Home.css'

import { useNavigate } from "react-router-dom";

import PainelInicio from "./components/PainelInicio/PainelInicio";
import Grafico from "./components/home/Grafico";
import Separador from "./components/home/Separador/Separador";
import ItemDoSeparador from "./components/home/Separador/ItemDoSeparador";
import Navegador from "./components/home/BarraLateral/BarraLateral";
import GraficosDoDia from "./components/home/GraficosDoDia/GraficosDoDia";

export default (props) => {

    const navigate = useNavigate()

    if (sessionStorage.getItem('username')) {
        console.log('login!')
    } else {
        return (
            <Navigate to={'/login'}/>
        )
    }

    function abreBarraLateral() {
        document.getElementById("barraLateral").classList.replace('hidden', '')
        //document.getElementById("main").style.marginLeft = "250px";
        console.log('aqui')
    }

    function fechaBarraLateral() {
        document.getElementById("barraLateral").classList.toggle('hidden')
        //document.getElementById("main").style.marginLeft= "0";
    }
    
    return (
        <>
            <Separador>
                <ItemDoSeparador>
                    <Navegador className='grow1'>
                    </Navegador>
                </ItemDoSeparador>
                <ItemDoSeparador className='grow2'>
                    <PainelInicio/>
                    <GraficosDoDia/>
                </ItemDoSeparador>
            </Separador>
        </>
    )
}