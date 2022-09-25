import React from "react";

import '../css/buttons.css'

export default function SubmitButton(props) {
    return (
        <>
        <input className="submitButton" type={'submit'} value={props.text} formAction={props.action}/>
        </>
    )
}