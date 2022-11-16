import React from "react";
import GraphIconSVG from "../../componentIcons/GraphIconSVG";
import HouseIconSVG from "../../componentIcons/HouseIconSVG";

import './BarraLateral.css'

export default (props) => {

    function fechaBarraLateral() {
        //document.getElementById("barraLateral").style.width = "0";
        //document.getElementById("main").style.marginLeft= "0";
        document.getElementById("barraLateral").classList.toggle('hidden')
    }
    

    return (
        <>
            <div className="barraLateral hidden" id="barraLateral">
                {props.children}
                <a href="javascript:void(0)" className="closeButton" onClick={fechaBarraLateral}>x</a>
                <a href="/home" className="itemBarra"><HouseIconSVG className="linkIcon"/> Início</a>
                <a href="/dados" className="itemBarra"><GraphIconSVG className="linkIcon"/> Dados</a>
            </div>
        </>
    )
}