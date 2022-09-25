import React, { useState } from "react";

import './css/Home.css'
import './components/css/texts.css'
import './components/css/boxes.css'

import {tratarUsuario} from './components/functions/tratamentoDeErros.js'

import BoxItem from "./components/boxComponents/BoxItem";
import BoxText from "./components/boxComponents/BoxText";
import SubmitButton from "./components/buttons/SubmitButton";
import MensagemErro from "./components/boxComponents/MensagemErro";

export default function Registro(props) {
    const [inputs, setInputs] = useState({});
    const [usuarioValido, setUsuarioValido] = useState(true);
    const [senhaValida, setSenhaValida] = useState(true) 
    const [nomeValido, setNomeValido] = useState(true)
    const [idadeValida, setIdadeValida] = useState(true)
    const [erros, setErros] = useState([])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        let erros = 0
        validateAll()
        setErros([])
        event.preventDefault();
        if (!tratarUsuario(inputs['usuario'])) {
            erros += 1
            setUsuarioValido(false)
            updateErros('Coloque um nome de usuário!')
        } 
        if (inputs['senha'] != inputs['senhaRepetida']) {
            erros += 1
            setSenhaValida(false)
            updateErros('Senhas precisam ser iguais!')
        }
        fetchData('http://127.0.0.1:5000/registro?username='+inputs['usuario']+
        '&password='+inputs['senha']+
        '&name='+inputs['nome']+
        '&birth_date='+inputs['data'])
    }

    async function fetchData(url) {
        const headers = new Headers();
        const response = await fetch(url);
        const data = await response.json();
    
        if (data.ja_existe == true) {
            console.log(data)
            setUsuarioValido(false)
            updateErros('Esse nome de usuário já existe!')
        } else {
            console.log(data)
        }
    }

    function validateAll() {
        setUsuarioValido(true)
        setSenhaValida(true)
    }

    function updateErros(erro) {
        setErros(old => [...old, erro])
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="boxContainer flex-wrap column">
            <div className="boxItem">
                <h1 className="titulo">Registro</h1>
            </div>
            <BoxItem>
                <MensagemErro erros={erros}></MensagemErro>
            </BoxItem>
           <BoxItem>
                <BoxText text={'Nome de Usuário'}/>
                <input className={usuarioValido ? 'boxInput inputText' : 'boxInput inputText invalid'}
                name="usuario" maxLength={25} required
                type='text' value={inputs.usuario} onChange={handleChange}>
                </input>
           </BoxItem>
           <BoxItem>
                <BoxText text={'Senha'}/>
                <input className={senhaValida ? 'boxInput inputText' : 'boxInput inputText invalid'}
                name="senha" minLength={8} maxLength={25} required
                type={'password'} value={inputs.senha} onChange={handleChange}>
                </input>
           </BoxItem>
           <BoxItem>
                <BoxText text={'Repetir a Senha'}/>
                <input className={senhaValida ? 'boxInput inputText' : 'boxInput inputText invalid'}
                name="senhaRepetida" minLength={8} maxLength={25} required
                type={'password'} value={inputs.senhaRepetida} onChange={handleChange}>
                </input>
           </BoxItem>
           <BoxItem>
                <BoxText text={'Nome Completo'}/>
                <input className={nomeValido ? 'boxInput inputText' : 'boxInput inputText invalid'}
                name = 'nome' minLength={8} maxLength={50} required
                type={'text'} value={inputs.nome} onChange={handleChange}/>
           </BoxItem>
           <BoxItem>
                <BoxText text={'Data de Nascimento'}/>
                <input className={idadeValida ? 'boxInput inputText dateInput' : 'boxInput inputText dateInput invalid'}
                name = 'data' required
                type={'date'} value={inputs.data} onChange={handleChange}/>
           </BoxItem>
           <BoxItem>
                <SubmitButton action={'http://127.0.0.1:5000/register'} text={'Registrar'}></SubmitButton>
           </BoxItem>
        </div>
        </form>
        </>
    )
}