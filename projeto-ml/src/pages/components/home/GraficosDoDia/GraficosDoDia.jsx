import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CommonButton from "../../buttons/CommonButton";
import CaixaUsuarioDias from "../Caixas/CaixaUsuarioDias";
import CustomLineChart from "./Graficos/CustomLineChart";
import './GraficosDoDia.css'

export default function GraficosDoDia(props) {
    const navigate = useNavigate()
    let todayDate = new Date()
    let today = todayDate.getFullYear() + '-' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + '-' + ('0' + todayDate.getDate()).slice(-2)

    const [jaVerificou, setJaVerificou] = useState(null)
    const [userLastDaysData, setUserLastDaysData] = useState([])
    const [suficienteData, setSuficienteData] = useState([])
    const [horasData, setHorasData] = useState([])

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
            const response = await fetch('http://localhost:5000/get-user-last-days/HenrikNailo/5')
            const newData = await response.json()
            //console.log(newData.map((element) => console.log(element)))
            for (let i = 0; i < newData.length; i++) {
                console.log(newData[i][2])
                setUserLastDaysData(userLastDaysData => ([...userLastDaysData, {
                    date: newData[i][2],
                    suficiente: newData[i][3],
                    horas: newData[i][4],
                    celularPorPerto: newData[i][5],
                    usouCelular: newData[6],
                    cansado: newData[i][7],
                    cafe: newData[i][8]
                }]))
            }
            // Reverse way
            let suficienteSim = 0, suficienteNao = 0
            for (let i = newData.length - 1; i >= 0; i--) {
                setSuficienteData(suficienteData => ([...suficienteData, {
                    data: newData[i][2],
                    suficiente: newData[i][3] == 'Yes' ? 'Sim' : 'Não'
                }]))

                // Seta os dados sobre as horas
                setHorasData(horasData => ([...horasData, {
                    name: newData[i][2],
                    horas: newData[i][4]
                }]))
            }
        }
        getUserLastDaysData()
        
    }, []);
    
    if (jaVerificou === true && userLastDaysData.length >= 1) {
        return (
            <>
                <h1 className="titulo1">Estes são os seus dados dos últimos dias</h1>
                <h1 className="titulo1">Você dormiu o suficiente nos últimos dias?</h1>
                <CaixaUsuarioDias data={suficienteData}></CaixaUsuarioDias>
                <h1 className="titulo1">Quantas horas você dormiu nos últimos dias:</h1>
                <CustomLineChart data={horasData} dataKey={'horas'}/>
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
