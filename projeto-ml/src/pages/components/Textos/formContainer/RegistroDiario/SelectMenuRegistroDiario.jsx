import React from "react";

export default function SelectMenuRegistroDiario(props) {
    return (
        <>
            <select defaultValue={props.defaultValue} name={props.name} className="selectMenu" onChange={props.onChange}>
                {props.children}
            </select>
        </>
    )
}