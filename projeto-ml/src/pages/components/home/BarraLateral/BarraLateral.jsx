import React from "react";
import HouseIconSVG from "../../componentIcons/HouseIconSVG";

import './BarraLateral.css'

export default (props) => {

    function fechaBarraLateral() {
        document.getElementById("barraLateral").style.width = "0";
        //document.getElementById("main").style.marginLeft= "0";
    }
    

    return (
        <>
            <div className="barraLateral" id="barraLateral">
                {props.children}
                <a href="javascript:void(0)" className="closeButton" onClick={fechaBarraLateral}>x</a>
                <a href="/home" className="itemBarra"><HouseIconSVG className="linkIcon"/>Menu</a>
            </div>
        </>
    )
}