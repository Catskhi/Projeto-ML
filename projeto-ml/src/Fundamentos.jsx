import React from "react";

import Primeiro from './components/Fundamentos/basicos/Primeiro'
import ComParametro from './components/Fundamentos/basicos/ComParametro'
import ComFilhos from './components/Fundamentos/basicos/ComFilhos'
import Card from './components/layout/Card'
import Repeticao from './components/Fundamentos/basicos/Repeticao'
import Condicional from './components/Fundamentos/basicos/Condicional';
import CondicionalComIf from './components/Fundamentos/basicos/CondicionaComIf';
import Pai from './components/Fundamentos/comunicacao/direta/Pai'
import Super from './components/Fundamentos/comunicacao/Indireta/Super';
import Input from './components/Fundamentos/form/Input';
import Contador from './components/Fundamentos/contador/Contador';

export default (props) => {
    return (
        <>
        <h1>Fundamentos React</h1>
        <div className='Cards'>
            <Card titulo="#10 - Contador" color='#000'>
                <Contador passo={10}></Contador>
            </Card>
            <Card titulo="#09 - Input" color='#000'>
                <Input></Input>
            </Card>
            <Card titulo="#08 - Comunicacao Indireta" color='#000'>
                <Super></Super>
            </Card>
            <Card titulo="#07 - Comunicacao Direta" color='rgb(240, 97, 97)'>
                <Pai sobrenome='Silva'></Pai>
            </Card>
            <Card titulo="#06 - Condicional v2" color='rgb(240, 97, 97)'>
                <CondicionalComIf numero={10}></CondicionalComIf>
            </Card>
            <Card titulo="#05 - Condicional v1" color='#153066'>
                <Condicional numero={11}></Condicional>
            </Card>
            <Card titulo="#04 - Repeticao" color='#bf0310'>
                <Repeticao></Repeticao>
            </Card>
            <Card titulo="#03 - Componente com filhos" color='#ac71e3'>
                <ComFilhos>
                    <ul>
                        <li>Ana</li>
                        <li>Bia</li>
                        <li>Carlos</li>
                        <li>Daniel</li>
                    </ul>
                </ComFilhos>
            </Card>
            <Card titulo="#02 - Componente com parametro" color='#fa8d03'>
                <ComParametro titulo="Esse é o título"
                    subtitulo="Esse é o subtítulo"></ComParametro>
            </Card>
            <Card titulo="#01 - Primeiro Componente" color='#558035'>
                <Primeiro />
            </Card>
        </div>
        </>
    )
}