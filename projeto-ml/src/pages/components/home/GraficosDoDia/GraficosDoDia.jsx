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
    const [celularPorPertoData, setCelularPorPertoData] = useState([])
    const [usouCelularData, setUsouCelularData] =  useState([])
    const [cansadoData, setCansadoData] = useState([])
    const [tomouCafeData, setTomouCafeData] = useState([])

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
        async function getUserRegisterSize() {
            const response = await fetch('http://localhost:5000/get-user-register-size/'+sessionStorage.getItem('username'))
            const data = await response.json()
            sessionStorage.setItem('registerSize', data.length)
        }
        getUserRegisterSize()
        async function getUserLastDaysData() {
            const response = await fetch('http://localhost:5000/get-user-last-days/'+sessionStorage.getItem('username')+'/5')
            const newData = await response.json()
            //console.log(newData.map((element) => console.log(element)))
            for (let i = 0; i < newData.length; i++) {
                setUserLastDaysData(userLastDaysData => ([...userLastDaysData, {
                    date: newData[i][2],
                    suficiente: newData[i][3],
                    horas: newData[i][4],
                    celularPorPerto: newData[i][5],
                    usouCelular: newData[6],
                    cansado: newData[i][7],
                    cafe: newData[i][8]
                }]))

                setSuficienteData(suficienteData => ([...suficienteData, {
                    data: newData[i][2],
                    suficiente: newData[i][3] == 'Yes' ? 'Sim' : 'Não'
                }]))

                setCelularPorPertoData(celularPorPerto => ([...celularPorPerto, {
                    data: newData[i][2],
                    celularPorPerto: newData[i][5] == 'Yes' ? 'Sim' : 'Não'
                }]))
    
                setUsouCelularData(usouCelularData => ([...usouCelularData, {
                    data: newData[i][2],
                    usouCelular: newData[i][6] == 'Yes' ? 'Sim' : 'Não'
                }]))
                
                setTomouCafeData(tomouCafeData => ([...tomouCafeData, {
                    data: newData[i][2],
                    tomouCafe: newData[i][8] == 'Yes' ? 'Sim' : 'Não'
                }]))
            }
            // Reverse way
            for (let i = newData.length - 1; i >= 0; i--) {

                // Seta os dados sobre as horas
                setHorasData(horasData => ([...horasData, {
                    name: newData[i][2],
                    horas: newData[i][4]
                }]))


                setCansadoData(cansadoData => ([...cansadoData, {
                    name: newData[i][2],
                    cansaço: newData[i][7]
                }]))
            }
        }
        getUserLastDaysData()
        
    }, []);

    function calculateMaxRenderSize() {
        let registerSize = sessionStorage.getItem('registerSize')
        if (registerSize <= 5) {
            return 5
        } else if (registerSize <= 10) {
            return 10
        } else if (registerSize <= 15) {
            return 15
        }
    }

    function renderOptions(renderSize) {
        for (let i = 0; i <= renderSize; i++) {
            return (
                <option value={i}>{i}</option>
            )
        }
    }
    
    if (jaVerificou === true && userLastDaysData.length >= 1) {
        let maxRenderSize = calculateMaxRenderSize()
        
        return (
            <>
                <h1 className="titulo1">Estes são os seus dados dos últimos dias</h1>
                <h1 className="titulo1">Você dormiu o suficiente nos últimos dias?</h1>
                <CaixaUsuarioDias data={suficienteData} dataKey={'suficiente'}
                reverseColors={false}/>
                <h1 className="titulo1">Quantas horas você dormiu nos últimos dias:</h1>
                <CustomLineChart data={horasData} dataKey={'horas'}/>
                <h1 className="titulo1">Você deixou seu celular por perto enquanto dormia nos últimos dias?</h1>
                <CaixaUsuarioDias data={celularPorPertoData} dataKey={'celularPorPerto'}
                reverseColors={true}/>
                <h1 className="titulo1">Você usou seu celular pelo menos 30min antes de dormir nos últimos dias?</h1>
                <CaixaUsuarioDias data={usouCelularData} dataKey={'usouCelular'}
                reverseColors={true}/>
                <h1 className="titulo1">O seu nível de cansaço nos últimos dias: ( de 1 a 5 )</h1>
                <CustomLineChart data={cansadoData} dataKey={'cansaço'}/>
                <h1 className="titulo1">Você tomou café da manhã nos últimos dias?</h1>
                <CaixaUsuarioDias data={tomouCafeData} dataKey={'tomouCafe'}/>
                <div className="Fim"></div>
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
