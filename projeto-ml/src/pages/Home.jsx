import React, { useEffect } from "react";
import { Navigate, RedirectFunction } from "react-router-dom";
import './css/Home.css'

import { useNavigate } from "react-router-dom";

import PainelInicio from "./components/PainelInicio/PainelInicio";
import Grafico from "./components/home/Grafico";
import Separador from "./components/home/Separador/Separador";
import ItemDoSeparador from "./components/home/Separador/ItemDoSeparador";
import Navegador from "./components/home/BarraLateral/BarraLateral";

export default (props) => {

    const navigate = useNavigate()

    if (sessionStorage.getItem('username')) {
        console.log('No login!')
    } else {
        return (
            <Navigate to={'/login'}/>
        )
    }

    function abreBarraLateral() {
        document.getElementById("barraLateral").style.width = "250px";
        //document.getElementById("main").style.marginLeft = "250px";
    }

    function fechaBarraLateral() {
        document.getElementById("barraLateral").style.width = "0";
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
                </ItemDoSeparador>
            </Separador>
        </>
    )
}