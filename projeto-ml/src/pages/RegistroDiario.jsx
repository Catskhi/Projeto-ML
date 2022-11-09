import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BoxItem from "./components/boxComponents/BoxItem";
import FormContainer from "./components/formContainer/FormContainer";
import FormTituloRegistroDiario from "./components/Textos/formContainer/RegistroDiario/FormTituloRegistroDiario";
import SelectMenuRegistroDiario from "./components/Textos/formContainer/RegistroDiario/SelectMenuRegistroDiario";

import './css/RegistroDiario.css'
import './components/css/boxes.css'
import './components/home/Graficos/GraficosDoDia/GraficosDoDia.css'
import SubmitButton from "./components/buttons/SubmitButton";

export default function RegistroDiario(props) {
    const navigate = useNavigate()
    const [jaRegistrou, setJaRegistrou] = useState(null)
    const [suficiente, setSuficiente] = useState('Yes')
    const [horas, setHoras] = useState(1)
    const [celularPorPerto, setCelularPorPerto] = useState('Yes')
    const [usouCelular, setUsouCelular] = useState('Yes')
    const [cansado, setCansado] = useState(1)
    const [cafe, setCafe] = useState('Yes')

    let todayDate = new Date()
    let today = todayDate.getFullYear() + '-' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + '-' + ('0' + todayDate.getDate()).slice(-2)
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        let url = 'http://127.0.0.1:5000/set-user-sleep-data?'+
        'username='+sessionStorage.getItem('username')+
        '&date='+today+
        '&suficiente='+suficiente+
        '&horas='+horas+
        '&celularPorPerto='+celularPorPerto+
        '&usouCelular='+usouCelular+
        '&cansado='+cansado+
        '&cafe='+cafe
        await Registra(url)
    }

    async function Registra(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchData(url) {
        const headers = new Headers();
        const response = await fetch(url);
        const data = await response.json()
        return data
    }

    function handleChange(event) {
        if (event.target.name === 'suficiente') {
            setSuficiente(event.target.value)
        } else if (event.target.name === 'horas') {
            setHoras(event.target.value)
        } else if (event.target.name === 'celularPorPerto') {
            setCelularPorPerto(event.target.value)
        } else if (event.target.name === 'usouCelular') {
            setUsouCelular(event.target.value)
        } else if (event.target.name === 'cansado') {
            setCansado(event.target.value)
        } else if (event.target.name === 'cafe') {
            setCafe(event.target.value)
        }
    }

    useEffect(() => {
        async function verificaSeDiaFoiRegistrado() {
            const result = await fetchData("http://127.0.0.1:5000/get-user-sleep-data?username="+sessionStorage.getItem('username'))
            if (result[2] == today) {
                setJaRegistrou(true)
            } else {
                setJaRegistrou(false)
            }
        }
        verificaSeDiaFoiRegistrado()
    }, [])
    
    if (jaRegistrou === true) {
        return (
            <Navigate to={'/home'}/>
        )
    } else if (jaRegistrou === false) {
        return (
            <>
            <form onSubmit={handleSubmit} className='formRegistroDiario'>
            <FormContainer>
                <BoxItem>
                    <FormTituloRegistroDiario text={'Você acredita que dormiu o suficiente hoje?'}/>
                </BoxItem>
                <BoxItem>
                    <SelectMenuRegistroDiario className='selectMenu'
                     name='suficiente' value={suficiente} onChange={handleChange}>
                        <option value={'Yes'}>Sim</option>
                        <option value={'No'}>Não</option>
                    </SelectMenuRegistroDiario>
                </BoxItem>
                <BoxItem>
                    <FormTituloRegistroDiario text={'Por quantas horas você dormiu?'}/>
                </BoxItem>
                <BoxItem>
                    <input name="horas" className="boxInput inputText inputNumeroDiario"
                    type={'number'} max={14} min={1} onChange={handleChange}
                    required value={horas}>
                    </input>
                </BoxItem>
                <BoxItem>
                    <FormTituloRegistroDiario text={'Você deixou seu celular por perto enquanto dormia?'}/>
                </BoxItem>
                <BoxItem>
                    <SelectMenuRegistroDiario className='selectMenu'
                     name='celularPorPerto' value={celularPorPerto} onChange={handleChange}>
                        <option value={'Yes'}>Sim</option>
                        <option value={'No'}>Não</option>
                    </SelectMenuRegistroDiario>
                </BoxItem>
                <BoxItem>
                    <FormTituloRegistroDiario text={'Você usou seu celular 30 minutos antes de ir dormir?'}/>
                </BoxItem>
                <BoxItem>
                    <SelectMenuRegistroDiario className='selectMenu'
                     name='usouCelular' value={usouCelular} onChange={handleChange}>
                        <option value={'Yes'}>Sim</option>
                        <option value={'No'}>Não</option>
                    </SelectMenuRegistroDiario>
                </BoxItem>
                <BoxItem>
                    <FormTituloRegistroDiario text={'De 1 a 5, o quanto você ficou cansado durante o dia?'}/>
                </BoxItem>
                <BoxItem>
                    <input name="cansado" className="boxInput inputText inputNumeroDiario"
                    type={'number'} max={5} min={1} onChange={handleChange}
                    required value={cansado}>
                    </input>
                </BoxItem>
                <BoxItem>
                    <FormTituloRegistroDiario text={'Você costuma comer café da manhã?'}/>
                </BoxItem>
                <BoxItem>
                    <SelectMenuRegistroDiario className='selectMenu'
                     name='cafe' value={cafe} onChange={handleChange}>
                        <option value={'Yes'}>Sim</option>
                        <option value={'No'}>Não</option>
                    </SelectMenuRegistroDiario>
                </BoxItem>
                <SubmitButton className={'botaoRegistroDiario'} text={'Enviar'}></SubmitButton>
            </FormContainer>
            </form>
            </>
        )
    } else if (jaRegistrou == null) {
        return (
            <h1 className="titulo1">Carregando...</h1>
        )
    }

}