import React from "react";
import './PainelInicio.css'

import Nome from "../Textos/Nome/Nome";
import ListIconSVG from "../componentIcons/ListIconSVG";

export default function PainelInicio() {
    function abreBarraLateral() {
        document.getElementById("barraLateral").classList.remove('hidden')
        //document.getElementById("main").style.marginLeft = "250px";
    }
    return (
        <div className="PainelInicio">
            <button className="homeButton" onClick={abreBarraLateral}>
                <ListIconSVG className='flex1'/>
            </button>
            <Nome className='flex1'></Nome>
        </div>
    )
}