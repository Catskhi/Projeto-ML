import React from "react";
import { useState } from "react";

import './components/css/boxes.css'

import BoxItem from "./components/boxComponents/BoxItem";
import MensagemErro from "./components/boxComponents/MensagemErro";
import FormContainer from "./components/formContainer/FormContainer";
import FormTitulo from "./components/Textos/formContainer/FormTitulo";
import BoxText from "./components/boxComponents/BoxText";
import SubmitButton from "./components/buttons/SubmitButton";
import FormQuestionLink from "./components/formContainer/FormQuestionLink";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [inputs, setInputs] = useState({});
    const [usuarioValido, setUsuarioValido] = useState(true);
    const [senhaValida, setSenhaValida] = useState(true) 
    const [erros, setErros] = useState([])
    const navigate = useNavigate()

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        validateAll()
        setErros([])
        event.preventDefault();
        fetchData('http://127.0.0.1:5000/login?username='+inputs['usuario']+'&password='+inputs['senha'])
    }

    async function fetchData(url) {
        var loginData = {
            username: inputs['usuario'],
            password: inputs['senha']
        }
        const headers = new Headers();
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(loginData)
        });
        const data = await response.json();
    
        if (data.login == false) {
            console.log(data)
            setUsuarioValido(false)
            setSenhaValida(false)
            updateErros('Nome ou senha incorretos!')
        } else {
            sessionStorage.setItem('username', data.username)
            console.log(data)
            navigate('/home')
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
            <FormContainer>
                <BoxItem>
                    <FormTitulo text='Login' />
                </BoxItem>
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
                    <FormQuestionLink text={'Não tem uma conta? '}
                    link={'/registro'} linkName={'Crie uma!'}/>
                </BoxItem>
                <BoxItem>
                    <SubmitButton action={'http://127.0.0.1:5000/login'} text={'Login'}></SubmitButton>
                </BoxItem>
            </FormContainer>
            </form>
        </>
    )

}