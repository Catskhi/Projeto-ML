import { isContentEditable } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LineChart } from "recharts";
import CommonButton from "../../buttons/CommonButton";

import './GraficosDoDia.css'

export default function GraficosDoDia(props) {
    const navigate = useNavigate()
    let todayDate = new Date()
    let today = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate()

    const [jaVerificou, setJaVerificou] = useState(null)
    const [userLastDaysData, setUserLastDaysData] = useState([])

    function redireciona() {
        navigate('/registro-diario')
    }
    async function fetchData(url) {
        const response = await fetch(url)
        const data = await response.json();
        setJaVerificou(true)
        return data
    }
    useEffect(() => {
        async function verificaRegistroDiario() {
            const response = await fetchData('http://127.0.0.1:5000/get-user-sleep-data?username='+sessionStorage.getItem('username'))
            if (response[2] == today) {
                setJaVerificou(true)
            } else {
                setJaVerificou(false)
            }
        }
        verificaRegistroDiario()
        async function getUserLastDaysData() {
            fetch('http://localhost:5000/get-user-last-days/HenrikNailo/5')
            .then(response => response.json())
            .then(data => setUserLastDaysData(data))
            .then(console.log(userLastDaysData));
        }
        getUserLastDaysData()
    }, []);

    if (jaVerificou === true) {
        return (
            <>
                <h1 className="titulo1">Estes são os seus dados dos últimos dias:</h1>
                <h1 className="titulo1">{userLastDaysData[0]}</h1>

                
            </>
        )
    } else if (jaVerificou === false) {
        return(
        <div className="columnFlex">
            <h1 className="titulo1">Parece que você não registrou seu sono hoje.</h1>
            <CommonButton onClick={redireciona} className='flexButton' text='Registrar agora'/>
        </div>
        )
    } else if (jaVerificou == null) {
        return (
            <h1 className="titulo1">Carregando...</h1>
        )
    }
}
